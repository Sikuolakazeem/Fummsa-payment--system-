import { supabase } from './supabase';
import { getNextStage, getPreviousStage } from '../utils/approvalHelper';
import { createNotification } from './apiNotifications';
//  For approval roles
export async function getSubmissionsForApproval(role) {
  const { data, error } = await supabase
    .from('submissions')
    .select(
      `
      *,
      beneficiary(*),
      approval_logs(*)
    `,
    )
    .eq('current_stage', role)
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// For VC / D-VC — fully approved only
export async function getApprovedSubmissions() {
  const { data, error } = await supabase
    .from('submissions')
    .select(
      `
      *,
      beneficiary(*),
      approval_logs(*)
    `,
    )
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

//  For user — their own submissions
export async function getMySubmissions(userId) {
  const { data, error } = await supabase
    .from('submissions')
    .select(
      `
      *,
      beneficiary(*),
      approval_logs(*)
    `,
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// Approve
export async function approveSubmission({
  submissionId,
  officialId,
  role,
  comment,
}) {
  console.log('approveSubmission called', { submissionId, officialId, role });

  const nextStage = getNextStage(role);
  const isCompleted = nextStage === 'completed';

  console.log('nextStage:', nextStage, 'isCompleted:', isCompleted);

  // 1. Log approval
  const { error: logError } = await supabase.from('approval_logs').insert([
    {
      submissions_id: submissionId,
      official_id: officialId,
      role,
      status: 'approved',
      comment: comment || null,
    },
  ]);
  if (logError) throw new Error(logError.message);

  // 2. Update submission
  const { error: updateError } = await supabase
    .from('submissions')
    .update({
      current_stage: isCompleted ? null : nextStage,
      status: isCompleted ? 'approved' : 'pending',
    })
    .eq('id', submissionId);
  if (updateError) throw new Error(updateError.message);

  // 3. Notify next official or submission owner
  if (isCompleted) {
    // Notify the user who submitted — get user_id from submissions
    const { data: submission } = await supabase
      .from('submissions')
      .select('user_id')
      .eq('id', submissionId)
      .single();

    if (submission) {
      await createNotification({
        userId: submission.user_id,
        message: 'Your application has been fully approved.',
        submissionsId: submissionId,
      });
    }
  } else {
    console.log('entering else block — looking for:', nextStage);
    try {
      const { data: nextOfficial, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', nextStage)
        .limit(1)
        .maybeSingle();

      console.log('profileError:', profileError); // ← add this
      console.log('nextOfficial:', nextOfficial);

      console.log('isCompleted:', isCompleted);

      if (nextOfficial) {
        await createNotification({
          userId: nextOfficial.id,
          message: `A payment application is waiting for your approval as ${nextStage}.`,
          submissionsId: submissionId,
        });
        console.log('notification created ✅');
      }
    } catch (err) {
      console.error('notification error:', err.message);
    }

    // if (nextOfficial) {
    //   await createNotification({
    //     userId: nextOfficial.id,
    //     message: `A payment application is waiting for your approval as ${nextStage}.`,
    //     submissionsId: submissionId,
    //   });
    // }
  }
}

// Reject
export async function rejectSubmission({
  submissionId,
  officialId,
  role,
  comment,
}) {
  const previousStage = getPreviousStage(role);
  const sentBackToUser = !previousStage;

  // 1. Log rejection
  const { error: logError } = await supabase.from('approval_logs').insert([
    {
      submissions_id: submissionId,
      official_id: officialId,
      role,
      status: 'rejected',
      comment,
    },
  ]);
  if (logError) throw new Error(logError.message);

  // 2. Send back
  const { error: updateError } = await supabase
    .from('submissions')
    .update({
      current_stage: sentBackToUser ? null : previousStage,
      status: 'rejected',
      comment,
    })
    .eq('id', submissionId);
  if (updateError) throw new Error(updateError.message);

  // 3. Notify previous official or the user
  if (sentBackToUser) {
    // Notify the user who submitted
    const { data: submission } = await supabase
      .from('submissions')
      .select('user_id')
      .eq('id', submissionId)
      .maybeSingle();

    if (submission) {
      await createNotification({
        userId: submission.user_id,
        message: `Your application was rejected by ${role}. Reason: ${comment}`,
        submissionsId: submissionId,
      });
    }
  } else {
    // Notify the previous official by role
    const { data: prevOfficial } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', previousStage)
      .limit(1)
      .single();

    if (prevOfficial) {
      await createNotification({
        userId: prevOfficial.id,
        message: `An application was rejected by ${role} and sent back to you. Reason: ${comment}`,
        submissionsId: submissionId,
      });
    }
  }
}

export async function submitApplication(formData, userId) {
  const { data: submission, error: submissionError } = await supabase
    .from('submissions')
    .insert([
      {
        status: 'pending',
        current_stage: 'checker',
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (submissionError) throw new Error(submissionError.message);

  const taxRate = 0.075;
  const stampDutyRate = 0.02;

  const finalAmount = formData.taxIncluded
    ? formData.amount
    : formData.amount +
      formData.amount * taxRate +
      formData.amount * stampDutyRate;

  const { error: beneficiaryError } = await supabase
    .from('beneficiary')
    .insert([
      {
        ...formData,
        amount: finalAmount,
        taxIncluded: true,
        submissions_id: submission.id,
      },
    ]);

  if (beneficiaryError) throw new Error(beneficiaryError.message);

  // Notify checker
  const { data: checker } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'checker')
    .limit(1)
    .single();

  if (checker) {
    await createNotification({
      userId: checker.id,
      message:
        'A new payment application has been submitted and is waiting for your review.',
      submissionsId: submission.id,
    });
  }

  return submission;
}

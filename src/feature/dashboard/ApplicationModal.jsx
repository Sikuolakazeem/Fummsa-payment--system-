import { useState } from 'react';
import { useApproveSubmission, useRejectSubmission } from './useSubmissions';
import { Section } from './Section';
import { ApprovalTrail } from './ApprovalTrail';
import { DetailRow } from './DetailRow';
import { HiOutlineXMark } from 'react-icons/hi2';

export default function ApplicationModal({ record, userRole, onClose }) {
  console.log(record);
  const [comment, setComment] = useState('');
  const { mutate: approve, isPending: isApproving } = useApproveSubmission();
  const { mutate: reject, isPending: isRejecting } = useRejectSubmission();

  function handleApprove() {
    approve({ submissionId: record.id, comment }, { onSuccess: onClose });
  }

  function handleReject() {
    if (!comment.trim()) return;
    reject({ submissionId: record.id, comment }, { onSuccess: onClose });
  }

  const ben = record.beneficiary?.[0];
  console.log(ben);

  return (
    <div className="fixed inset-0 z-200 flex items-end justify-center sm:items-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="border-border bg-bg-card relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-2xl shadow-2xl sm:max-h-[88vh] sm:max-w-2xl sm:rounded-2xl">
        {/* Drag handle — mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1 w-10 rounded-full" />
        </div>

        {/* Header */}
        <div className="bg-text sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <h2 className="text-bg-subtle text-[1.4rem] font-semibold sm:text-[1.3rem]">
              Application Details
            </h2>
            <p className="text-select-bg mt-0.5 hidden text-[0.9rem] sm:block">
              Review and take action
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-bg flex items-center justify-center rounded-lg transition-all hover:bg-white/1"
          >
            <HiOutlineXMark className="h-8 w-8 font-bold" />
          </button>
        </div>

        <div className="space-y-5 p-4 sm:p-6">
          {/* Beneficiary Details */}
          <Section title="Beneficiary Information">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <DetailRow
                label="Beneficiary Name"
                value={ben?.beneficiary_name}
              />
              <DetailRow
                label="Amount"
                value={
                  ben?.amount ? `₦${Number(ben.amount).toLocaleString()}` : null
                }
              />
              <DetailRow label="Bank Name" value={ben?.bank_name} />
              <DetailRow label="Account Number" value={ben?.account_number} />
              <DetailRow label="Account Name" value={ben?.account_name} />
              <DetailRow label="Account Type" value={ben?.account_type} />
              <DetailRow label="Phone Number" value={ben?.phone_number} />
              <DetailRow label="Email" value={ben?.email} />
              <DetailRow label="TIN No" value={ben?.tin_no} />
              <DetailRow label="Ref No" value={ben?.ref_no} />
              <DetailRow label="Vote Head" value={ben?.vote_head} />
              <DetailRow label="Voucher Number" value={ben?.voucher_number} />
              <DetailRow label="Cheque No" value={ben?.cheque_no} />
              <DetailRow label="Exp Code" value={ben?.exp_code} />
              <DetailRow label="Nature of Expense" value={ben?.nature_of_exp} />
              <DetailRow label="Sponsor Unit" value={ben?.sponsor_unit} />
              <DetailRow label="Entered By" value={ben?.entered_by} />
              <DetailRow label="Amount Tax" value={ben?.amount_tax} />
              <DetailRow
                label="Tax Included"
                value={ben?.taxIncluded ? 'Yes' : 'No'}
              />
              <div className="sm:col-span-2">
                <DetailRow label="Description" value={ben?.description} />
              </div>
            </div>
          </Section>

          {/* Approval Trail */}
          <Section title="Approval Trail">
            <ApprovalTrail
              logs={record.approval_logs}
              currentStage={record.current_stage}
            />
          </Section>

          {/* Rejection reason */}
          {record.comment && (
            <div className="rounded-xl border border-red-800/40 bg-red-900/20 p-3 sm:p-4">
              <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500 uppercase">
                Returned — Reason
              </p>
              <p className="text-sm text-red-300">{record.comment}</p>
            </div>
          )}

          {/* Actions — only shown if it's this role's turn */}
          {record.current_stage === userRole && (
            <Section title="Your Action">
              <textarea
                rows={3}
                placeholder="Comment — required for rejection, optional for approval"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="focus:border-text bg-bg border-text text-text mb-3 w-full resize-none rounded-lg border px-3 py-2.5 text-sm placeholder-[#4a4840] transition-colors focus:outline-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleReject}
                  disabled={!comment.trim() || isRejecting}
                  className="flex-1 rounded-lg bg-red-900 py-2.5 text-sm font-medium transition-all hover:bg-red-900/50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isRejecting ? 'Rejecting...' : 'Reject'}
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="text-bg bg-text hover:bg-text/90 flex-1 rounded-lg py-2.5 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isApproving ? 'Approving...' : 'Approve'}
                </button>
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

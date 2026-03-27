import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import {
  getSubmissionsForApproval,
  getApprovedSubmissions,
  getMySubmissions,
  approveSubmission,
  rejectSubmission,
} from '../../services/apiSubmissions';

// For approval roles (checker, approver, auditor, bursar, admin)
// Fetches only submissions at their current stage
//
export function useSubmissionsForApproval() {
  const { user } = useUser();

  return useQuery({
    queryKey: ['submissions', user?.role],
    queryFn: () => getSubmissionsForApproval(user?.role),
    enabled: !!user?.role,
    // only runs when role is available
  });
}

// For VC and D-VC — fully approved records only
export function useApprovedSubmissions() {
  return useQuery({
    queryKey: ['submissions-approved'],
    queryFn: getApprovedSubmissions,
  });
}

// For users — their own submissions

export function useMySubmissions() {
  const { user } = useUser();

  return useQuery({
    queryKey: ['my-submissions', user?.id],
    queryFn: () => getMySubmissions(user?.id),
    enabled: !!user?.id,
  });
}

// Approve a submission

export function useApproveSubmission() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ submissionId, comment }) =>
      approveSubmission({
        submissionId,
        officialId: user?.id,
        role: user?.role,
        comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', user?.role] });
    },
    onError: (error) => {
      console.error('Approve error:', error.message);
    },
  });
}

// Reject a submission

export function useRejectSubmission() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ submissionId, comment }) =>
      rejectSubmission({
        submissionId,
        officialId: user?.id,
        role: user?.role,
        comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', user?.role] });
      queryClient.invalidateQueries({ queryKey: ['my-submissions'] });
    },
    onError: (error) => {
      console.error('Reject error:', error.message);
    },
  });
}

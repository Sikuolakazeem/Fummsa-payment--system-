import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitApplication } from '../../services/apiSubmissions';
import toast from 'react-hot-toast';
import { useUser } from '../authentication/useUser';

export function useSubmitApplication() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => submitApplication(formData, user?.id),
    onSuccess: () => {
      toast.success('Application submitted successfully');
      queryClient.invalidateQueries({ queryKey: ['my-submissions', user?.id] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    submitApplication: mutate,
    isCreating: isPending,
  };
}

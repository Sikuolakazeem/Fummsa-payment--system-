import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUser } from './apiAuthentication';

export function useUpdatePassword() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error) => toast.error(error.message),
  });
  return { resetPassword, isPending };
}

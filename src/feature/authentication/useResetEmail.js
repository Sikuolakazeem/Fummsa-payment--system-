import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../services/apiAuthentication';
import toast from 'react-hot-toast';

export function useResetEmail() {
  const { mutate: sendResetLink, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Reset link as been sent, Please check your email');
    },
    onError: (error) => toast.error(error.message),
  });

  return { sendResetLink, isPending };
}

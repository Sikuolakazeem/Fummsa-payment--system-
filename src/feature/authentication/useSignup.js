import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../services/apiAuthentication';
import toast from 'react-hot-toast';

function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signupUser, isLoading } = useMutation({
    mutationFn: ({ email, password, userName, role }) =>
      signUp({ email, password, userName, role }),
    onSuccess: (user) => {
      console.log(user);
      toast.success('Signup successful');
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { signupUser, isLoading };
}

export default useSignup;

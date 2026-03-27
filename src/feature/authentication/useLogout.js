import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutUser } from '../../services/apiAuthentication';
import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // remove user data from the queries
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });
  return { logout, isLoading };
}

export default useLogout;

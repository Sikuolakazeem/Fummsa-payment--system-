import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/apiAuthentication';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ROLE_ROUTES = {
  checker: '/dashboard',
  approver: '/dashboard',
  auditor: '/dashboard',
  bursar: '/dashboard',
  admin: '/dashboard',
  vc: '/vc',
  'd-vc': '/d-vc',
  user: '/user',
};

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: loginUser, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      const route = ROLE_ROUTES[user?.role] || '/unauthorized';
      navigate(route);
    },
    onError: (err) => toast.error(err.message),
  });
  return { loginUser, isLoading };
}

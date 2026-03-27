import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../feature/authentication/useUser';

import SpinnerFull from './SpinnerFull';

function ProtectedRoute({ children, allowedRole }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useUser();

  const role = user?.role;
  const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
  const hasAccess = roles.includes(role);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isAuthenticated && !hasAccess) {
      navigate('/unauthorized');
    }
  }, [isLoading, isAuthenticated, hasAccess, navigate]);

  if (isLoading) return <SpinnerFull />

  if (isAuthenticated && hasAccess) return children;

  return null;
}

export default ProtectedRoute;

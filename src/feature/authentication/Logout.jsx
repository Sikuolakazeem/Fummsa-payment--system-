import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import useLogout from './useLogout';
import ButtonLogout from '../../ui/ButtonLogout';

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonLogout onClick={logout} disabled={isLoading}>
      <HiArrowRightOnRectangle className="text-text hover:text-text/80 cursor-pointer rounded-full text-[1.8rem] transition-all duration-300" />
    </ButtonLogout>
  );
}

export default Logout;

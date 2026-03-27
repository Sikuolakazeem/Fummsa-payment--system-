import { NavLink } from 'react-router-dom';

function NavLinks({ children, to, className, onClick }) {
  return (
    <NavLink className={className} to={to} onClick={onClick}>
      {children}
    </NavLink>
  );
}
export default NavLinks;

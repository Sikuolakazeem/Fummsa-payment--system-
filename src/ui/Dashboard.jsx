import { useUser } from '../feature/authentication/useUser';
import OfficialsDashboard from './OfficialsDashboard';
import UserDashboard from './UserDashboard';
import SpinnerFull from '../ui/SpinnerFull';

const OFFICIAL_ROLES = [
  'checker',
  'approver',
  'bursar',
  'auditor',
  'admin',
  'D-vc',
  'vc',
];

export default function Dashboard() {
  const { user, isLoading } = useUser();

  if (isLoading) return <SpinnerFull />;

  const role = user?.role;
  console.log('role:', role);

  if (role === 'user') return <UserDashboard />;
  if (OFFICIAL_ROLES.includes(role)) return <OfficialsDashboard />;

  return <p>Unrecognized role: "{role}"</p>;
}

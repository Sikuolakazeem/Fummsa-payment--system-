import DashboardLayout from '../../ui/DashboardLayout';
import DashboardContainer from '../../ui/DashboardContainer';
import MainContainer from '../../ui/MainContainer';
import BeneficiaryForm from '../beneficiary/BeneficiaryForm';

function UserDashboard() {
  return (
    <DashboardContainer>
      <DashboardLayout />
      <MainContainer>
        <BeneficiaryForm />
      </MainContainer>
    </DashboardContainer>
  );
}

export default UserDashboard;

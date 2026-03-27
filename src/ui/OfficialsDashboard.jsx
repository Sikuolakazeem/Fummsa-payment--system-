import DashboardContainer from './DashboardContainer';
import DashboardLayout from './DashboardLayout';
import DataTable from './DataTable';
import MainContainer from './MainContainer';

{
  /* later use official dashboard layout which contains all the data that is needed to be used by the official like view user-all statistics */
}
function OfficialsDashboard() {
  return (
    <DashboardContainer>
      <DashboardLayout />
      <MainContainer>
        {/* official data tables */}
        <DataTable />
      </MainContainer>
    </DashboardContainer>
  );
}

export default OfficialsDashboard;

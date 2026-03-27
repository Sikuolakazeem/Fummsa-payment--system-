function DashboardContainer({ children }) {
  return (
    <div className="page-transition flex h-screen overflow-hidden">
      {children}
    </div>
  );
}

export default DashboardContainer;

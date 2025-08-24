import DashboardNavbar from "../../../app/(components)/(navbar)/dashboardNavbar";
import DashboardSection from "./DashboardSection";

function Dashboard() {
  return (
    <main>
      {/* NavBar */}
      <DashboardNavbar />

      {/* Dashboard Section */} 
      <DashboardSection />
    </main>
  );
}

export default Dashboard;

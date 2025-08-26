import DashboardNavbar from "@/app/(components)/(navbar)/dashboardNavbar";
import ManageCoursesSection from "./ManageCoursesSection";

function ManageCourse() {
  return (
    <main>
      {/* NavBar */}
      <DashboardNavbar />

      {/* Manage Courses Dashboard Section */} 
      <ManageCoursesSection />
    </main>
  );
}

export default ManageCourse;

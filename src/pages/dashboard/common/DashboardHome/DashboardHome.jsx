import CoursesData from "@/pages/dashboard/common/DashboardHome/CoursesData";
import ProgressBar from "@/pages/dashboard/common/DashboardHome/ProgressBar";
import Statistics from "@/pages/dashboard/common/DashboardHome/Statistics";

const DashboardHome = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full">
          <Statistics />
        </div>
        <div className="w-full">
          <ProgressBar />
        </div>
      </div>

      {/* course data. */}

      <CoursesData />
    </div>
  );
};

export default DashboardHome;

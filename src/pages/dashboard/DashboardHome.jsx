import CoursesData from "@/pages/dashboard/CoursesData";
import ProgressBar from "@/pages/dashboard/ProgressBar";
import Statistics from "@/pages/dashboard/Statistics";

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
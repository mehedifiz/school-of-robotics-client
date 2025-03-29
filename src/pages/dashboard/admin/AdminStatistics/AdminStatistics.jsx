import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import Loader from "@/components/shared/Loader";

// Import components
import DashboardHeader from "./DashboardHeader";
import StatisticsSummary from "./StatisticsSummary";
import SubscriptionDistribution from "./SubscriptionDistribution";
import RevenueOverview from "./RevenueOverview";
import RecentTransactions from "./RecentTransactions";
import SalesOverview from "./SalesOverview";
import ContentOverview from "./ContentOverview";

const AdminStatistics = () => {
  const axios = useAxios();
  const [isAnimating, setIsAnimating] = useState(true);

  // Animation toggle effect for ongoing animations
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Fetch dashboard statistics
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axios.get("/user/getBasicStats");
      return res.data.data;
    },
  });

  // Fetch revenue analytics
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ["admin-revenue-analytics"],
    queryFn: async () => {
      const res = await axios.get("/user/revenue-analytics");
      return res.data.data;
    },
  });

  const isLoading = statsLoading || revenueLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader />
      </div>
    );
  }

  // Calculate pro users (all subscription plans except free)
  const proUsers =
    (dashboardStats?.subscriptionStats?.basic || 0) + (dashboardStats?.subscriptionStats?.standard || 0) + (dashboardStats?.subscriptionStats?.premium || 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-4 md:p-6 max-w-[1500px] mx-auto">
      {/* Dashboard Header with Key Metrics */}
      <DashboardHeader stats={dashboardStats} revenue={revenueData?.revenue} transactions={revenueData?.transactions} proUsers={proUsers} />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Left Column - Larger Charts */}
        <div className="xl:col-span-2 space-y-6">
          <StatisticsSummary stats={dashboardStats} />
          <RevenueOverview revenue={revenueData} />
        </div>

        {/* Right Column - Smaller Charts and Info */}
        <div className="space-y-6">
          <SubscriptionDistribution stats={dashboardStats?.subscriptionStats} />
          <ContentOverview books={dashboardStats?.totalBooks} courses={dashboardStats?.totalCourses} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <RecentTransactions />
        <SalesOverview revenueData={revenueData} />
      </div>
    </motion.div>
  );
};

export default AdminStatistics;

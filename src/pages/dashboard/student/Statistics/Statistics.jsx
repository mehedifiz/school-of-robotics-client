import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import Loader from "@/components/shared/Loader";

// Components
import DashboardHeader from "./DashboardHeader";
import ProgressOverview from "./ProgressOverview";
import StatisticsSummary from "./StatisticsSummary";
import QuizPerformance from "./QuizPerformance";
import ReadingProgress from "./ReadingProgress";
import PerformanceChart from "./PerformanceChart";
import WeeklyActivities from "./WeeklyActivities";
import PremiumFeatureOverlay from "./PremiumFeatureOverlay";

const Statistics = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAnimating, setIsAnimating] = useState(true);

  // Check if user has premium subscription
  const isPremium = user?.subscription?.plan && user.subscription.plan !== "free";

  // Animation toggle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Fetch all data using React Query
  const { data: overallStats, isLoading: overallLoading } = useQuery({
    queryKey: ["user-stats-overview"],
    queryFn: async () => {
      const res = await axios.get("/user/stats/overview");
      return res.data.data;
    },
  });

  const { data: quizStats, isLoading: quizLoading } = useQuery({
    queryKey: ["user-stats-quiz"],
    queryFn: async () => {
      const res = await axios.get("/user/stats/quiz");
      return res.data.data;
    },
  });

  const { data: weeklyData, isLoading: weeklyLoading } = useQuery({
    queryKey: ["user-stats-weekly"],
    queryFn: async () => {
      const res = await axios.get("/user/stats/weekly");
      return res.data.data;
    },
  });

  const { data: readingProgress, isLoading: readingLoading } = useQuery({
    queryKey: ["user-reading-progress"],
    queryFn: async () => {
      const res = await axios.get("/user/reading-progress");
      return res.data.data;
    },
  });

  const isLoading = overallLoading || quizLoading || weeklyLoading || readingLoading;

  // Tab options for the dashboard
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "performance", label: "Performance" },
    { id: "reading", label: "Reading" },
    { id: "achievements", label: "Achievements" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loader />
      </div>
    );
  }

  // Prepare stats object for components that need the full stats structure
  const stats = {
    overview: overallStats,
    readingProgress: readingProgress,
    quizStats: quizStats,
    weeklyPerformance: weeklyData,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-4 md:p-6 max-w-[1400px] mx-auto">
      {/* Gradient Header with User Stats */}
      <DashboardHeader user={user} stats={overallStats} />

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden relative">
        <div className="flex overflow-x-auto scrollbar-hide relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-all relative ${
                activeTab === tab.id ? "text-primary" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Professional scroll indicator for mobile with animation */}
        <div className="absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
        <motion.div
          className="absolute right-2 top-1/2 -translate-y-1/2 sm:hidden flex items-center"
          animate={{
            x: isAnimating ? [-2, 2] : [2, -2],
            opacity: isAnimating ? 0.8 : 1,
          }}
          transition={{
            x: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
            opacity: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
          }}
        >
          <MdOutlineKeyboardDoubleArrowRight className="h-6 w-6 text-primary" />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Key Metrics Overview */}
            <ProgressOverview stats={stats} isPremium={isPremium} />

            {/* Performance Summary and Weekly Trends */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <div className="">
                <StatisticsSummary overallStats={overallStats} quizStats={quizStats} isPremium={isPremium} />
              </div>
              <div>
                <QuizPerformance quizStats={quizStats} isPremium={isPremium} />
              </div>
            </div>

            {/* Weekly Performance Chart */}
            <div className="mt-6">
              <WeeklyActivities weeklyPerformance={weeklyData} isPremium={isPremium} />
            </div>
          </motion.div>
        )}

        {activeTab === "performance" && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <PerformanceChart weeklyData={weeklyData} overallStats={overallStats} isPremium={isPremium} />
              <QuizPerformance quizStats={quizStats} isPremium={isPremium} />
            </div>
            <WeeklyActivities weeklyPerformance={weeklyData} compact={true} isPremium={isPremium} />
          </motion.div>
        )}

        {activeTab === "reading" && (
          <motion.div key="reading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <ReadingProgress readingProgress={readingProgress} isPremium={isPremium} />
          </motion.div>
        )}

        {activeTab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-sm text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievements Coming Soon</h2>
            <p className="text-gray-500">Track your badges, certificates and achievements as you progress through your learning journey.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Statistics;

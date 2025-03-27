import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaQuestionCircle } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PremiumFeatureOverlay from "./PremiumFeatureOverlay";

const StatisticsSummary = ({ overallStats, isPremium = true }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isPremium && <PremiumFeatureOverlay message="Upgrade to Premium to access detailed performance insights and statistics" />}

      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">Performance Summary</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 p-6 gap-6 items-center">
        <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2 flex justify-center">
          <div className="w-32 h-32 mb-12 mt-2">
            <CircularProgressbar
              value={overallStats?.overallPercentage || 0}
              text={`${overallStats?.overallPercentage || 0}%`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: `rgba(62, 152, 199, ${overallStats?.overallPercentage / 100})`,
                textColor: "#3e98c7",
                trailColor: "#f3f4f6",
              })}
            />
            <p className="text-center mt-2 text-sm font-medium text-gray-600">Overall Performance</p>
          </div>
        </div>

        <div className="space-y-3">
          <MetricItem icon={<FaCheck className="text-green-500" />} label="Quizzes Passed" value={overallStats?.totalPassed || 0} />
          <MetricItem icon={<FaTimes className="text-red-500" />} label="Quizzes Failed" value={overallStats?.totalFailed || 0} />
          <MetricItem icon={<FaQuestionCircle className="text-blue-500" />} label="Total Attempts" value={overallStats?.totalAttempts || 0} />
        </div>

        <div className="space-y-3">
          <MetricItem
            icon={<span className="text-xs font-bold text-emerald-500">Avg</span>}
            label="Average Score"
            value={`${overallStats?.averageScore || 0}`}
          />
          <MetricItem
            icon={<span className="text-xs font-bold text-amber-500">High</span>}
            label="Highest Score"
            value={`${overallStats?.highestScore || 0}`}
          />
          <MetricItem icon={<span className="text-xs font-bold text-blue-500">Low</span>} label="Lowest Score" value={`${overallStats?.lowestScore || 0}`} />
        </div>
      </div>
    </motion.div>
  );
};

const MetricItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

export default StatisticsSummary;

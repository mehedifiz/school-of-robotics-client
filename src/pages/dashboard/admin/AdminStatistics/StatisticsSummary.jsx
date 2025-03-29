import { motion } from "framer-motion";
import { Users, BookOpen, BookMarked, Layers } from "lucide-react";
import CountUp from "react-countup";

const StatisticsSummary = ({ stats }) => {
  const metrics = [
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      icon: <Users className="h-6 w-6 text-blue-500" />,
      bgColor: "bg-blue-50",
      change: "+5% from last month",
      changeColor: "text-green-500",
    },
    {
      title: "Books Available",
      value: stats?.totalBooks || 0,
      icon: <BookOpen className="h-6 w-6 text-emerald-500" />,
      bgColor: "bg-emerald-50",
      change: "+2 new this month",
      changeColor: "text-green-500",
    },
    {
      title: "Courses Available",
      value: stats?.totalCourses || 0,
      icon: <Layers className="h-6 w-6 text-amber-500" />,
      bgColor: "bg-amber-50",
      change: "Coming soon",
      changeColor: "text-gray-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Platform Statistics</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className={`${metric.bgColor} rounded-lg p-4`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/60">{metric.icon}</div>
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <div className="flex items-baseline space-x-1">
                  <h3 className="text-xl font-bold text-gray-800 mt-1">
                    <CountUp end={metric.value} duration={2} separator="," />
                  </h3>
                  {metric.percentage && <span className="text-sm text-purple-600 font-medium">({metric.percentage})</span>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatisticsSummary;

import { motion } from "framer-motion";
import CountUp from "react-countup";

const SubscriptionDistribution = ({ stats }) => {
  // Calculate total users
  const totalUsers = (stats?.free || 0) + (stats?.basic || 0) + (stats?.standard || 0) + (stats?.premium || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Subscription Distribution</h2>
        <div className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-md font-medium">Real-time</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-2 bg-gray-50 rounded-lg p-3">
          <p className="text-sm font-medium text-gray-600">Total Users</p>
          <p className="text-lg font-bold text-gray-800 mt-1">
            <CountUp end={totalUsers || 0} duration={2} separator="," />
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3">
          <p className="text-sm font-medium text-yellow-600">Free Users</p>
          <p className="text-lg font-bold text-gray-800 mt-1">
            <CountUp end={stats?.free || 0} duration={2} separator="," />
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-600">Basic Users</p>
          <p className="text-lg font-bold text-gray-800 mt-1">
            <CountUp end={stats?.basic || 0} duration={2} separator="," />
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-sm font-medium text-green-600">Standard Users</p>
          <p className="text-lg font-bold text-gray-800 mt-1">
            <CountUp end={stats?.standard || 0} duration={2} separator="," />
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-3">
          <p className="text-sm font-medium text-purple-600">Premium Users</p>
          <p className="text-lg font-bold text-gray-800 mt-1">
            <CountUp end={stats?.premium || 0} duration={2} separator="," />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionDistribution;

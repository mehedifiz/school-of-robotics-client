import { motion } from "framer-motion";
import { Users, BookOpen, CreditCard, TrendingUp } from "lucide-react";
import CountUp from "react-countup";

const DashboardHeader = ({ stats, revenue, transactions, proUsers }) => {
  // Format large numbers
  const formattedRevenue = new Intl.NumberFormat("en-US").format(revenue || 0);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl bg-primary p-6 text-white overflow-hidden shadow-xl"
    >
      {/* Decorative Elements */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full -mt-20 -mr-20 z-0"></div>
      <div className="absolute left-1/2 bottom-0 w-40 h-40 bg-white/5 rounded-full mb-1 z-0"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">School of Robotics Dashboard</h1>
            <p className="text-white/80 mt-1">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
          >
            <Users className="h-6 w-6 mb-2 text-white/90" />
            <h3 className="text-xl font-bold">
              <CountUp end={stats?.totalStudents || 0} duration={2} separator="," />
            </h3>
            <p className="text-sm text-white/80">Total Students</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
          >
            <BookOpen className="h-6 w-6 mb-2 text-white/90" />
            <h3 className="text-xl font-bold">
              <CountUp end={proUsers || 0} duration={2} separator="," />
            </h3>
            <p className="text-sm text-white/80">Paid Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
          >
            <CreditCard className="h-6 w-6 mb-2 text-white/90" />
            <h3 className="text-xl font-bold">
              <CountUp end={transactions || 0} duration={2} separator="," />
            </h3>
            <p className="text-sm text-white/80">Transactions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
          >
            <TrendingUp className="h-6 w-6 mb-2 text-white/90" />
            <h3 className="text-xl font-bold">
              ৳
              <CountUp end={revenue || 0} duration={2.5} separator="," />
            </h3>
            <p className="text-sm text-white/80">Total Revenue</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;

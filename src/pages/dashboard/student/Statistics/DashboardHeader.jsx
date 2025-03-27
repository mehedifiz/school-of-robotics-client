import { CgCloseO, CgCheckO } from "react-icons/cg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Award, Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import CountUp from "react-countup";

const DashboardHeader = ({ user, stats }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl bg-gradient-to-r from-primary/90 to-primary p-6 text-white overflow-hidden mb-8"
    >
      {/* Decorative Elements */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20 z-0"></div>
      <div className="absolute left-1/2 bottom-0 w-32 h-32 bg-white/5 rounded-full mb-1 z-0"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h1>
            <p className="text-white/80 mt-1">
              {user?.subscription?.plan ? (
                <span className="flex flex-col sm:flex-row sm:items-center">
                  <span className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    <span>
                      You're on the <span className="capitalize font-semibold">{user.subscription.plan}</span> plan
                    </span>
                  </span>
                  {user?.subscription?.endDate && (
                    <span className="ml-2 text-sm opacity-80">• Valid until {new Date(user.subscription.endDate).toLocaleDateString()}</span>
                  )}
                </span>
              ) : (
                "You're currently on the free plan"
              )}
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={() => navigate("/dashboard/student-book")}
              className="px-5 py-2.5 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-all shadow-md"
            >
              Continue Learning
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <BookOpen className="h-6 w-6 mb-2 text-white/90" />
            <h3 className="text-xl font-bold">
              <CountUp end={stats?.totalAttempts || 0} duration={2} />
            </h3>
            <p className="text-sm text-white/80">Total Quizzes</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <Award className="h-6 w-6 mb-2 text-white/90" />
            <h3 className="text-xl font-bold">
              <CountUp end={stats?.overallPercentage || 0} duration={2} decimals={1} suffix="%" />
            </h3>
            <p className="text-sm text-white/80">Avg. Score</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <CgCheckO className="h-6 w-6 mb-2 text-white/90" />
                <h3 className="text-xl font-bold">
                  <CountUp end={stats?.totalPassed || 0} duration={2} />
                </h3>
                <p className="text-sm text-white/80">Passed</p>
              </div>
              <div className="text-right">
                <CgCloseO className="h-6 w-6 mb-2 text-white/90 ml-auto" />
                <h3 className="text-xl font-bold">
                  <CountUp end={stats?.totalFailed || 0} duration={2} />
                </h3>
                <p className="text-sm text-white/80">Failed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <Clock className="h-6 w-6 mb-2 text-white/90" />
            <h3 className="text-xl font-bold">
              <CountUp end={stats?.highestScore * (100 / 10) || 0} duration={2} />%
            </h3>
            <p className="text-sm text-white/80">Highest Score</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;

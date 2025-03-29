import { motion } from "framer-motion";
import { BookOpen, Layers, ArrowUpRight, BookPlus, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

const ContentOverview = ({ books = 0, courses = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Content Overview</h2>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded-xl">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-2 bg-white rounded-lg w-fit">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Available Books</h3>
                <p className="text-2xl font-bold mt-1">
                  <CountUp end={books} duration={2} />
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard/manage-books")}
              className="hidden sm:block bg-white text-blue-600 p-1.5 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <BookPlus className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100">
            <button onClick={() => navigate("/dashboard/manage-books")} className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
              Manage Books
              <ArrowUpRight className="h-3.5 w-3.5 ml-1 transform rotate-45" />
            </button>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-2 bg-white rounded-lg w-fit">
                <Layers className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Available Courses</h3>
                <p className="text-2xl font-bold mt-1">
                  <CountUp end={courses} duration={2} />
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block bg-white text-amber-600 p-1.5 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <PlusCircle className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-100">
            <button className="text-sm font-medium text-amber-600 hover:text-amber-800 flex items-center">
              Manage Courses
              <ArrowUpRight className="h-3.5 w-3.5 ml-1 transform rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentOverview;

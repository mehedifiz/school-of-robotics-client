import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import CountUp from "react-countup";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ProgressOverview = ({ stats }) => {
  // Calculate total books and in-progress books
  const totalBooks = stats.readingProgress.length;
  const completedBooks = stats.readingProgress.filter((book) => book.percentage === 1).length;
  const inProgressBooks = stats.readingProgress.filter((book) => book.percentage > 0 && book.percentage < 1).length;
  const notStartedBooks = stats.readingProgress.filter((book) => book.percentage === 0).length;

  // Chart data
  const chartData = {
    labels: ["Book Quizzes", "Course Quizzes"],
    datasets: [
      {
        label: "Average Score",
        data: [stats.quizStats?.bookQuizzes?.averageScore || 0, stats.quizStats?.courseQuizzes?.averageScore || 0],
        backgroundColor: ["rgba(0, 119, 109, 0.8)", "rgba(29, 78, 216, 0.8)"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Average: ${context.raw} points`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        title: {
          display: true,
          text: "Average Score",
        },
      },
    },
  };

  // Doughnut data for reading progress
  const doughnutData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [completedBooks, inProgressBooks, totalBooks - (completedBooks + inProgressBooks)],
        backgroundColor: ["rgba(52, 211, 153, 0.8)", "rgba(59, 130, 246, 0.8)", "rgba(209, 213, 219, 0.8)"],
        borderColor: ["rgba(52, 211, 153, 1)", "rgba(59, 130, 246, 1)", "rgba(209, 213, 219, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8"
    >
      {/* Quiz Performance Overview */}
      <div className="col-span-1 xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Quiz Performance</h2>
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-blue-600 text-sm font-medium">Book Quizzes</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={stats.quizStats?.bookQuizzes?.totalAttempts || 0} duration={2} />
            </h3>
            <p className="text-sm text-gray-500">Attempts</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-green-600 text-sm font-medium">Pass Rate</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={stats.quizStats?.bookQuizzes?.passPercentage || 0} duration={2} decimals={1} suffix="%" />
            </h3>
            <p className="text-sm text-gray-500">Book Quizzes</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-blue-600 text-sm font-medium">Course Quizzes</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={stats.quizStats?.courseQuizzes?.totalAttempts || 0} duration={2} />
            </h3>
            <p className="text-sm text-gray-500">Attempts</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-green-600 text-sm font-medium">Pass Rate</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={stats.quizStats?.courseQuizzes?.passPercentage || 0} duration={2} decimals={1} suffix="%" />
            </h3>
            <p className="text-sm text-gray-500">Course Quizzes</p>
          </div>
        </div>
      </div>

      {/* Reading Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Reading Progress</h2>
        <div className="h-48 flex justify-center">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-purple-600 text-sm font-medium">Total Books</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={totalBooks} duration={2} />
            </h3>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-green-600 text-sm font-medium">Completed</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={completedBooks} duration={2} />
            </h3>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-600 text-sm font-medium">In Progress</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={inProgressBooks} duration={2} />
            </h3>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm font-medium">Not Started</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={notStartedBooks} duration={2} />
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressOverview;

import { motion } from "framer-motion";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { BookText, FileText, Award, AlertTriangle } from "lucide-react";

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const QuizPerformance = ({ quizStats }) => {
  // Extract book and course quiz data
  const bookQuizzes = quizStats?.bookQuizzes || {
    totalAttempts: 0,
    passedQuizzes: 0,
    failedQuizzes: 0,
    averageScore: 0,
    highestScore: 0,
    passPercentage: 0,
    overallPercentage: 0,
  };

  const courseQuizzes = quizStats?.courseQuizzes || {
    totalAttempts: 0,
    passedQuizzes: 0,
    failedQuizzes: 0,
    averageScore: 0,
    highestScore: 0,
    passPercentage: 0,
    overallPercentage: 0,
  };

  // Radar chart data
  const radarData = {
    labels: ["Pass Rate", "Avg Score", "Success Rate", "Highest Score"],
    datasets: [
      {
        label: "Book Quizzes",
        data: [bookQuizzes.passPercentage || 0, bookQuizzes.averageScore * (100 / 10) || 0, bookQuizzes.overallPercentage || 0, bookQuizzes.highestScore * (100 / 10) || 0],
        backgroundColor: "rgba(0, 119, 109, 0.2)",
        borderColor: "rgba(0, 119, 109, 0.8)",
        borderWidth: 1.5,
        pointBackgroundColor: "rgba(0, 119, 109, 1)",
        pointRadius: 3,
      },
      {
        label: "Course Quizzes",
        data: [
          courseQuizzes.passPercentage || 0,
          courseQuizzes.averageScore * (100 / 10) || 0,
          courseQuizzes.overallPercentage || 0,
          courseQuizzes.highestScore * (100 / 10) || 0,
        ],
        backgroundColor: "rgba(29, 78, 216, 0.2)",
        borderColor: "rgba(29, 78, 216, 0.8)",
        borderWidth: 1.5,
        pointBackgroundColor: "rgba(29, 78, 216, 1)",
        pointRadius: 3,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 100,
        angleLines: {
          color: "rgba(201, 203, 207, 0.4)",
        },
        grid: {
          color: "rgba(201, 203, 207, 0.2)",
        },
        ticks: {
          backdropColor: "transparent",
          color: "rgba(75, 85, 99, 0.8)",
          font: {
            size: 10,
          },
          showLabelBackdrop: false,
        },
        pointLabels: {
          color: "rgba(75, 85, 99, 0.8)",
          font: {
            size: 11,
            weight: "500",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        boxPadding: 4,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}%`;
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
    },
    maintainAspectRatio: false,
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants} className="bg-white rounded-xl shadow-sm border border-gray-50 p-5">
      <motion.h2 variants={itemVariants} className="text-lg font-semibold mb-5">
        Quiz Performance
      </motion.h2>

      <motion.div variants={itemVariants} className="h-64 mb-4">
        <Radar data={radarData} options={radarOptions} />
      </motion.div>

      <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-3 mt-4">
        <motion.div variants={itemVariants} className="flex items-start bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3">
          <BookText className="text-primary w-8 h-8 p-1.5 bg-primary/10 rounded-lg mr-2" />
          <div>
            <h3 className="font-medium text-gray-800 text-sm">Book Quizzes</h3>
            <div className="flex items-center mt-1">
              <Award className="w-3.5 h-3.5 text-green-600 mr-1" />
              <span className="text-xs text-gray-600">{bookQuizzes.passedQuizzes} Passed</span>

              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 ml-2 mr-1" />
              <span className="text-xs text-gray-600">{bookQuizzes.failedQuizzes} Failed</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-start bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-3">
          <FileText className="text-blue-600 w-8 h-8 p-1.5 bg-blue-500/10 rounded-lg mr-2" />
          <div>
            <h3 className="font-medium text-gray-800 text-sm">Course Quizzes</h3>
            <div className="flex items-center mt-1">
              <Award className="w-3.5 h-3.5 text-green-600 mr-1" />
              <span className="text-xs text-gray-600">{courseQuizzes.passedQuizzes} Passed</span>

              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 ml-2 mr-1" />
              <span className="text-xs text-gray-600">{courseQuizzes.failedQuizzes} Failed</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default QuizPerformance;

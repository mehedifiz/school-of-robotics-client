import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import PremiumFeatureOverlay from "./PremiumFeatureOverlay";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeeklyActivities = ({ weeklyPerformance, compact = false, isPremium = true }) => {
  // Process data for the chart
  const processChartData = () => {
    // Get dates from the last 7 days
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }

    // Initialize data objects
    const bookAttempts = Array(7).fill(0);
    const courseAttempts = Array(7).fill(0);
    const bookPassed = Array(7).fill(0);
    const coursePassed = Array(7).fill(0);

    // Fill with actual data
    weeklyPerformance.forEach((item) => {
      const dateIndex = dates.indexOf(item._id.date);
      if (dateIndex !== -1) {
        if (item._id.type === "book") {
          bookAttempts[dateIndex] = item.attempts;
          bookPassed[dateIndex] = item.passed;
        } else {
          courseAttempts[dateIndex] = item.attempts;
          coursePassed[dateIndex] = item.passed;
        }
      }
    });

    // Format dates for display
    const displayDates = dates.map((date) => {
      const d = new Date(date);
      return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
    });

    return {
      labels: displayDates,
      bookAttempts,
      courseAttempts,
      bookPassed,
      coursePassed,
    };
  };

  const { labels, bookAttempts, courseAttempts, bookPassed, coursePassed } = processChartData();

  // Determine which datasets to display based on mode
  const datasets = compact
    ? [
        {
          label: "Book Quiz Passed",
          data: bookPassed,
          borderColor: "rgba(16, 185, 129, 1)",
          backgroundColor: "rgba(16, 185, 129, 0.5)",
          tension: 0.3,
        },
        {
          label: "Course Quiz Passed",
          data: coursePassed,
          borderColor: "rgba(79, 70, 229, 1)",
          backgroundColor: "rgba(79, 70, 229, 0.5)",
          tension: 0.3,
        },
      ]
    : [
        {
          label: "Book Quiz Attempts",
          data: bookAttempts,
          borderColor: "rgba(0, 119, 109, 1)",
          backgroundColor: "rgba(0, 119, 109, 0.5)",
          tension: 0.3,
        },
        {
          label: "Course Quiz Attempts",
          data: courseAttempts,
          borderColor: "rgba(29, 78, 216, 1)",
          backgroundColor: "rgba(29, 78, 216, 0.5)",
          tension: 0.3,
        },
        {
          label: "Book Quiz Passed",
          data: bookPassed,
          borderColor: "rgba(16, 185, 129, 1)",
          backgroundColor: "rgba(16, 185, 129, 0.5)",
          tension: 0.3,
          borderDash: [5, 5],
        },
        {
          label: "Course Quiz Passed",
          data: coursePassed,
          borderColor: "rgba(79, 70, 229, 1)",
          backgroundColor: "rgba(79, 70, 229, 0.5)",
          tension: 0.3,
          borderDash: [5, 5],
        },
      ];

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
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
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: !compact,
          text: "Number of Quizzes",
        },
        grid: {
          color: "rgba(243, 244, 246, 0.6)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
  };

  const containerClass = compact ? "bg-white rounded-xl shadow-sm border border-gray-50 p-4" : "bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8";

  const chartHeight = compact ? "h-52" : "h-80";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`${containerClass} relative`}
    >
      {!isPremium && <PremiumFeatureOverlay message="Upgrade to Premium to access detailed weekly performance analytics" />}

      <h2 className={`${compact ? "text-lg" : "text-xl"} font-semibold mb-4`}>Weekly Performance</h2>

      <div className={chartHeight}>
        <Line data={chartData} options={chartOptions} />
      </div>

      {!compact && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-primary/10 rounded-lg p-3 text-center">
            <p className="text-primary text-sm font-medium">Book Attempts</p>
            <h3 className="text-lg font-bold text-gray-800">{bookAttempts.reduce((a, b) => a + b, 0)}</h3>
            <p className="text-xs text-gray-500">This week</p>
          </div>

          <div className="bg-emerald-100 rounded-lg p-3 text-center">
            <p className="text-emerald-700 text-sm font-medium">Book Passed</p>
            <h3 className="text-lg font-bold text-gray-800">{bookPassed.reduce((a, b) => a + b, 0)}</h3>
            <p className="text-xs text-gray-500">This week</p>
          </div>

          <div className="bg-blue-100 rounded-lg p-3 text-center">
            <p className="text-blue-700 text-sm font-medium">Course Attempts</p>
            <h3 className="text-lg font-bold text-gray-800">{courseAttempts.reduce((a, b) => a + b, 0)}</h3>
            <p className="text-xs text-gray-500">This week</p>
          </div>

          <div className="bg-indigo-100 rounded-lg p-3 text-center">
            <p className="text-indigo-700 text-sm font-medium">Course Passed</p>
            <h3 className="text-lg font-bold text-gray-800">{coursePassed.reduce((a, b) => a + b, 0)}</h3>
            <p className="text-xs text-gray-500">This week</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WeeklyActivities;

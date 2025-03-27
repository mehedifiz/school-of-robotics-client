import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";

const PerformanceChart = ({ weeklyData, overallStats }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Score",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: ["#3b82f6"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "#64748b",
            fontSize: "12px",
            fontFamily: "'Inter', sans-serif",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(0) + "%";
          },
          style: {
            colors: "#64748b",
            fontSize: "12px",
            fontFamily: "'Inter', sans-serif",
          },
        },
        min: 0,
        max: 100,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toFixed(1) + "%";
          },
        },
      },
      grid: {
        borderColor: "#f1f5f9",
        strokeDashArray: 4,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 10,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  // Process weekly data when it's available
  useEffect(() => {
    if (weeklyData && weeklyData.length > 0) {
      // Group and aggregate data by date
      const groupedByDate = weeklyData.reduce((acc, item) => {
        const date = item._id.date;
        if (!acc[date]) {
          acc[date] = {
            attempts: 0,
            passed: 0,
            failed: 0,
            totalScore: 0,
          };
        }

        acc[date].attempts += item.attempts;
        acc[date].passed += item.passed;
        acc[date].failed += item.failed;
        acc[date].totalScore += item.averageScore * item.attempts;

        return acc;
      }, {});

      // Calculate daily averages
      const dates = Object.keys(groupedByDate).sort();
      const averageScores = dates.map((date) => {
        const data = groupedByDate[date];
        return data.attempts > 0 ? (data.totalScore / data.attempts) * 10 : 0; // Multiply by 10 to get percentage
      });

      // Format dates for display
      const formattedDates = dates.map((date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      });

      // Update chart data
      setChartData((prev) => ({
        ...prev,
        series: [
          {
            name: "Score",
            data: averageScores,
          },
        ],
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: formattedDates,
          },
        },
      }));
    }
  }, [weeklyData]);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Weekly Performance</h2>
          <p className="text-sm text-gray-500">Quiz scores over the last 7 days</p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Avg: {overallStats?.averageScore * (100 / 10) || 0}%</div>
        </div>
      </div>

      <div className="p-4 h-80">
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height="100%" />
      </div>
    </motion.div>
  );
};

export default PerformanceChart;

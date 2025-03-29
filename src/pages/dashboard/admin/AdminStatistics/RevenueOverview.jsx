import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import CountUp from "react-countup";
import { TrendingUp, CreditCard } from "lucide-react";

const RevenueOverview = ({ revenue }) => {
  // Extract data from the API response - updated to match new format
  const monthlyData = revenue?.monthlyData || [];
  const months = monthlyData.map((item) => item.month);
  const revenueData = monthlyData.map((item) => item.revenue);

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#4f46e5"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: months.length > 0 ? months : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
          return "৳" + new Intl.NumberFormat("en-US").format(val);
        },
        style: {
          colors: "#64748b",
          fontSize: "12px",
          fontFamily: "'Inter', sans-serif",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "৳" + new Intl.NumberFormat("en-US").format(val);
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
  };

  const series = [
    {
      name: "Revenue",
      data: revenueData.length > 0 ? revenueData : [0, 0, 0, 0, 0, 0],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Revenue Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Monthly revenue performance</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <span className="text-sm text-indigo-700 font-medium">Total Revenue</span>
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-bold text-gray-800">
                ৳
                <CountUp end={revenue?.revenue || 0} separator="," duration={2.5} />
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">Monthly Average</span>
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-bold text-gray-800">
                ৳
                <CountUp end={revenue?.monthlyAverage || 0} separator="," duration={2} decimals={0} />
              </p>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ReactApexChart options={chartOptions} series={series} type="area" height="100%" />
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueOverview;

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { TrendingUp, Users, CreditCard, ArrowUpRight } from "lucide-react";
import CountUp from "react-countup";

const SalesOverview = ({ revenueData }) => {
  // Get conversion data from weeklyStats
  const [conversionData, setConversionData] = useState([]);
  const [weekCategories, setWeekCategories] = useState([]);

  useEffect(() => {
    if (revenueData && revenueData.weeklyStats) {
      // Extract conversion rates from weekly stats
      const conversion = revenueData.weeklyStats.map((stat) => stat.conversionRate);
      const weeks = revenueData.weeklyStats.map((stat) => stat.week);

      setConversionData(conversion);
      setWeekCategories(weeks);
    }
  }, [revenueData]);

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "60%",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#8b5cf6"], // Purple color
    xaxis: {
      categories: weekCategories,
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
          return val + "%";
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
          return val + "%";
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
      name: "Conversion Rate",
      data: conversionData,
    },
  ];

  // Get values from revenueData
  const { revenue, transactions, avgTransactionValue, revenuePerUser } = revenueData || {};

  // Calculate average conversion rate from the provided data
  const avgConversion = conversionData.length > 0 ? Math.round(conversionData.reduce((a, b) => a + b, 0) / conversionData.length) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Sales Overview</h2>
          <p className="text-sm text-gray-500">Conversion rates and transaction metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-purple-700 font-medium">Conversion Rate</span>
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-gray-800">
              <CountUp end={avgConversion} duration={2} />%
            </p>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-indigo-700 font-medium">Avg. Transaction Value</span>
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-gray-800">
              ৳
              <CountUp end={avgTransactionValue || 0} separator="," duration={2} />
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="h-64">
          <ReactApexChart options={chartOptions} series={series} type="bar" height="100%" />
        </div>
      </div>

      <div className="px-6 pb-6 grid sm:grid-cols-2 gap-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-full">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Total Transactions</p>
            <p className="text-lg font-bold text-gray-800">
              <CountUp end={transactions || 0} duration={2} />
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-full">
            <CreditCard className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Revenue Per User</p>
            <p className="text-lg font-bold text-gray-800">
              ৳
              <CountUp end={revenuePerUser || 0} duration={2} separator="," />
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SalesOverview;

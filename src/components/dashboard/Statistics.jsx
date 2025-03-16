import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { LuFileCheck, LuFileCheck2 } from "react-icons/lu";
import { GiAlarmClock } from "react-icons/gi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";

const Statistics = () => {
  const [state, setState] = useState({
    series: [85],
    options: {
      chart: {
        height: 200,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          inverseOrder: true,
          hollow: {
            size: "70%",
          },
          track: {
            background: "#e7e7e7",
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "12px",
              color: "#333",
              offsetY: 10, // লেবেল নিচে শিফট
            },
            value: {
              show: true,
              fontSize: "30px",
              fontWeight: "bold",
              color: "#46BD84",
              offsetY: -25, // ভ্যালু উপরে শিফট
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
      labels: ["Grades Completed"],
      colors: ["#46BD84"],
    },
  });

  const statisticsData = {
    learningProgress: {
      coursesEnrolled: 4,
      booksStarted: 3,
      quizzesPassed: 12,
      averageScore: 85,
    },
    achievements: {
      certificatesEarned: 2,
      badgesUnlocked: 8,
      projectsCompleted: 5,
    },
    subscription: {
      currentPlan: "premium",
      expiresIn: "25 days",
      features: [
        "All courses access",
        "All books access",
        "Live mentoring",
        "Project reviews",
      ],
    },
  };

  return (
    <div>
      <div className="bg-white rounded-xl p-5 shadow-lg ">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">Statistics</h2>
          <p className="text-gray-500 text-sm">January - June 2025</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Chart First */}
          <div className="order-1 md:order-2 flex-1">
            <div id="chart">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="radialBar"
                height={200}
              />
            </div>
          </div>

          {/* Learning Progress Second */}
          <div className="order-2 md:order-1 p-4 rounded-lg flex flex-col justify-center md:justify-start items-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Learning Progress
            </h3>
            <div className="mt-3 space-y-2">
              <p className="flex items-center gap-2 text-gray-600">
                <FaUser className="text-blue-500" /> Courses Enrolled:{" "}
                {statisticsData.learningProgress.coursesEnrolled}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <LuFileCheck2 className="text-green-500" /> Quizzes Passed:{" "}
                {statisticsData.learningProgress.quizzesPassed}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <GiAlarmClock className="text-orange-500" /> Average Score:{" "}
                {statisticsData.learningProgress.averageScore}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

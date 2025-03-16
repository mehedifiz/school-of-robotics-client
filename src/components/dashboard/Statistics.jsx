import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { LuFileCheck } from "react-icons/lu";
import { GiAlarmClock } from "react-icons/gi";

const Statistics = () => {
  const [state, setState] = useState({
    series: [75],
    options: {
        chart: {
            height: 300,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                startAngle: 0,
                endAngle: 360,
                inverseOrder: true,
                hollow: {
                    size: '70%',
                },
                track: {
                    background: "#e7e7e7",
                },
                dataLabels: {
                    name: {
                      show: true,
                      fontSize: "16px",
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
                        }
                    }
                }
            },
        },
        labels: ['Grades Completed'],
        colors: ["#46BD84"],
    },
});
  
  return (
    <div>
      <div className="bg-white rounded-xl p-5">
        <div className="">
          <h2 className="text-2xl font-semibold">Statistics</h2>
          <p className="text-[16px] text-gray-400 pt-1">January - June 2025</p>
        </div>
        <div className="flex  items-center gap-x-5">
          <div>
            <div className="flex  gap-x-3">
              <p className=" w-10 h-10 rounded-full bg-[#1294F2]  flex justify-center items-center">
                <FaUser size={22} className="text-white"></FaUser>
              </p>
              <div>
                <h4 className="text-gray-400 text-lg">Absence</h4>
                <p className="text-lg font-semibold">90%</p>
              </div>
            </div>
            <div className="flex  gap-x-2">
              <p className=" w-10 h-10 rounded-full bg-[#5FC493]  flex justify-center items-center">
                <LuFileCheck  size={22} className="text-white"></LuFileCheck >
              </p>
              <div>
                <h4 className="text-gray-400 text-lg">Tasks & Exam</h4>
                <p className="text-lg font-semibold">70%</p>
              </div>
            </div>
            <div className="flex  gap-x-2">
              <p className=" w-10 h-10 rounded-full bg-[#FBA63C]  flex justify-center items-center">
                <GiAlarmClock size={22} className="text-white"></GiAlarmClock>
              </p>
              <div>
                <h4 className="text-gray-400 text-lg">Quiz</h4>
                <p className="text-lg font-semibold">85%</p>
              </div>
            </div>
          </div>
          {/* chart */}
          <div>
          <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="radialBar" height={300} />
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

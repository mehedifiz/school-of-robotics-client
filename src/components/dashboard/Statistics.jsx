import React from "react";
import { FaUser } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";

const Statistics = () => {
        
    const [state, setState] = React.useState({
          
        series: [75],
        options: {
          chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              }
            },
          },
          labels: ['Grades Completed'],
        },
      
      
    });
  
  return (
    <div>
      <div className="bg-white rounded-xl p-3">
        <div className="">
          <h2 className="text-2xl font-semibold">Statistics</h2>
          <p className="text-[16px] text-gray-400 pt-1">January - June 2025</p>
        </div>
        <div className="flex justify-between gap-x-2">
          <div>
            <div className="flex justify-between gap-x-2">
              <p className=" w-10 h-10 rounded-full bg-[#1294F2]  flex justify-center items-center">
                <FaUser size={22} className="text-white"></FaUser>
              </p>
              <div>
                <h4 className="text-gray-400 text-lg">Absence</h4>
                <p className="text-lg font-semibold">90%</p>
              </div>
            </div>
            <div className="flex justify-between gap-x-2">
              <p className=" w-10 h-10 rounded-full bg-[#1294F2]  flex justify-center items-center">
                <FaUser size={22} className="text-white"></FaUser>
              </p>
              <div>
                <h4 className="text-gray-400 text-lg">Absence</h4>
                <p className="text-lg font-semibold">90%</p>
              </div>
            </div>
            <div className="flex justify-between gap-x-2">
              <p className=" w-10 h-10 rounded-full bg-[#1294F2]  flex justify-center items-center">
                <FaUser size={22} className="text-white"></FaUser>
              </p>
              <div>
                <h4 className="text-gray-400 text-lg">Absence</h4>
                <p className="text-lg font-semibold">90%</p>
              </div>
            </div>
          </div>
          {/* chart */}
          <div>
          <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="radialBar" height={350} />
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

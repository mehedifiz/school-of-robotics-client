import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import img1 from '../assets/home/feature1.png';

const OnlineProgramSection = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-6xl border my-10 py-10 flex flex-col lg:flex-row items-center justify-center">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center" data-aos="fade-right" data-aos-duration="1800">
          <div className="card bg-transparent border-0 mb-6 lg:mb-0">
            <img
              src={img1}
              alt="Online Program"
              className="img-fluid rounded-lg"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 text-start flex flex-col items-center lg:items-start px-6" data-aos="fade-left" data-aos-duration="1800">
          <h3 className="text-3xl text-center lg:text-left mb-4">Online Program</h3>
          <p className="text-gray-500 mb-6 text-center lg:text-left max-w-md">
            Now that we've aligned the details, it's time to get things mapped out and organized. Now that we've aligned the details.
          </p>
          <ul className="feature-list space-y-6 mb-6">
            <li className="flex items-center hover:bg-[#00635A]/20 py-2 rounded px-1 hover:text-white transition-colors duration-300">
              <FaCheckCircle className="text-[#00635A] mr-2" />
              <span className='font-thin text-[#00635A]'>IQ-based Customized curriculum</span>
            </li>
            <li className="flex items-center hover:bg-[#00635A]/20 py-2 rounded px-1 hover:text-white transition-colors duration-300">
              <FaCheckCircle className="text-[#00635A]  mr-2" />
              <span className='font-thin text-[#00635A]'>Well-qualified & trained faculties</span>
            </li>
            <li className="flex items-center hover:bg-[#00635A]/20 py-2 rounded px-1 hover:text-white transition-colors duration-300">
              <FaCheckCircle className=" text-[#00635A] mr-2" />
              <span className='font-thin text-[#00635A]'>Well-equipped hi-tech lab facilities</span>
            </li>
          </ul>
          <a
            href="#"
            className="inline-block bg-[#00635A]/80 text-white px-6 py-2 rounded-lg hover:bg-[#00635A] transition-colors duration-300"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default OnlineProgramSection;

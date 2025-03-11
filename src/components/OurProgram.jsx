import React from 'react';
import { FaLaptop, FaRobot, FaCode, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import OnlineProgramSection from './OnlineProgramSection';
// 

const programs = [
  {
    id: 1,
    icon: 'FaLaptop',
    title: 'Basic Computing',
    description:
      'Basic computer skills refer to your ability to perform fundamental tasks on a computer. This can include understanding certain software, applications, programs, and basic hardware functions.',
    link: '#',
    color: 'text-blue-600',
  },
  {
    id: 2,
    icon: 'FaRobot',
    title: 'Robotics',
    description:
      'Robotics is an interdisciplinary branch of computer science and engineering. Robotics involves the design, construction, operation, and use of robots.',
    link: '#',
    color: 'text-green-600',
  },
  {
    id: 3,
    icon: 'FaCode',
    title: 'Programming',
    description:
      'Programming involves tasks such as analysis, generating algorithms, profiling algorithms\' accuracy and resource consumption, and the implementation of algorithms.',
    link: '#',
    color: 'text-purple-600',
  },
  {
    id: 4,
    icon: 'FaShieldAlt',
    title: 'Freelancing',
    description:
      'Finding work as a freelancer can be challenging. Check out our list of the best freelance websites to help you find suitable work quickly.',
    link: '#',
    color: 'text-red-600',
  },
];

const OurProgram = () => {
  // Function to render the icon based on the icon name
  const renderIcon = (icon, color) => {
    switch (icon) {
      case 'FaLaptop':
        return <FaLaptop className={`${color} text-3xl`} />;
      case 'FaRobot':
        return <FaRobot className={`${color} text-3xl`} />;
      case 'FaCode':
        return <FaCode className={`${color} text-3xl`} />;
      case 'FaShieldAlt':
        return <FaShieldAlt className={`${color} text-3xl`} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-white" id="features">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="flex justify-center">
          <div className="lg:w-3/4 md:w-4/5 w-full text-center">
            <h2 className="text-3xl font-bold mb-4">Our Program</h2>
            <p className="text-gray-500 text-lg text-justify">
              Robotics is one of the most pursued and quickly developing disciplines in the realm of today. As many businesses are getting affected by the  utilization of robots, the demand for engineers is increasing. The number of robotics technology engineering positions is expected to grow by nearly 10% in the coming decade, leading to a shortage of skilled professionals in this field.
            </p>
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mt-12 montserrat">
          {programs.map((program) => (
            <div key={program.id} className="relative group p-6 rounded-lg shadow overflow-hidden transition-all duration-300">
              {/* Hover Overlay */}
              <div className="absolute bottom-0 left-0 w-0 h-0 bg-green-200 opacity-0 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:opacity-100"></div>

              <div className="relative flex items-start z-10">
                <div className="flex-shrink-0">
                  {renderIcon(program.icon, program.color)}
                </div>
                <div className="ml-4">
                  <h5 className="text-xl text-start font-semibold mb-2">{program.title}</h5>
                  <p className="text-gray-500 text-justify mb-3">{program.description}</p>
                  <a href={program.link} className={`${program.color} hover:${program.color.replace('600', '800')} flex items-center`}>
                    Read More <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </section>
  );
};

export default OurProgram;

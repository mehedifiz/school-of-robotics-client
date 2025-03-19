import {
  FaArrowRight,
  FaCode,
  FaLaptop,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";

const programs = [
  {
    id: 1,
    icon: <FaLaptop className="text-teal-500 text-4xl" />,
    title: "Basic Computing",
    description:
      "Learn fundamental computer skills including software, applications, and hardware functions.",
    link: "#",
  },
  {
    id: 2,
    icon: <FaRobot className="text-green-500 text-4xl" />,
    title: "Robotics",
    description:
      "Explore the design, construction, operation, and application of robotics in various fields.",
    link: "#",
  },
  {
    id: 3,
    icon: <FaCode className="text-purple-500 text-4xl" />,
    title: "Programming",
    description:
      "Master coding techniques, algorithm design, and software development fundamentals.",
    link: "#",
  },
  {
    id: 4,
    icon: <FaShieldAlt className="text-red-500 text-4xl" />,
    title: "Freelancing",
    description:
      "Discover how to build a successful freelance career and find high-paying clients.",
    link: "#",
  },
];

const OurProgram = () => {
  return (
    <section className="py-16" id="features">
      <div className="container mx-auto ">
        {/* Heading */}
        <div className="text-center  mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Our Program</h2>
          <p className="text-gray-600 mt-3">
            Explore a variety of cutting-edge courses designed to shape your
            future in technology.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-2  gap-8  py-16 ">
          {programs.map(({ id, icon, title, description, link }) => (
            <div
              key={id}
              className=" bg-white shadow-md  p-10 rounded-xl hover:bg-teal-100  flex items-start transition-transform duration-300 hover:scale-105"
            >
              <div className="p-5  rounded-lg space-y-3  ">
                <div className=" flex justify-leftr items-center gap-3">
                  <span>{icon}</span>

                  <h5 className="text-xl font-semibold text-gray-800 mb-2">
                    {title}
                  </h5>
                </div>

                <p className="text-gray-600 mb-3">{description}</p>
                <a
                  href={link}
                  className="text-teal-600 hover:text-teal-800 flex items-center font-medium"
                >
                  Read More <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProgram;

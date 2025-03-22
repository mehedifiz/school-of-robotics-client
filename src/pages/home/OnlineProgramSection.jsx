import { FaCheckCircle } from "react-icons/fa";
import img1 from "../../assets/home/feature1.png";

const OnlineProgramSection = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h3 className="text-4xl mb-5 font-bold text-teal-950">
          Online Program
        </h3>
        <p className="text-teal-950 text-lg ">
          Now that we've aligned the details, it's time to get things mapped out
          and organized. Let's make learning more effective!
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col  p-8 lg:flex-row    justify-between items-center gap-12 bg-gradient-to-l from-gray-900 via-gray-500 to-teal-50 rounded-xl shadow-lg ">
        {/* Image Section */}
        <div
          className="w-full lg:w-1/2 flex gap-5 justify-center"
          data-aos="fade-right"
          data-aos-duration="1800"
        >
          <img
            src={img1}
            alt="Online Program"
            className="rounded-lg  w-full max-w-md"
          />
        </div>

        {/* Content Section */}
        <div
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-5"
          data-aos="fade-left"
          data-aos-duration="1800"
        >
          <ul className="space-y-4 w-11/12">
            {[
              "IQ-based Customized curriculum",
              "Well-qualified & trained faculties",
              "Well-equipped hi-tech lab facilities",
            ].map((text, index) => (
              <li
                key={index}
                className="flex items-center bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <FaCheckCircle className="text-[#00635A] mr-3" />
                <span className="text-[#00635A] font-medium">{text}</span>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="inline-flex justify-center items-center bg-[#00635A] w-1/2 hover:bg-[#004d40] text-white px-6 py-3 rounded-lg transition duration-300 shadow-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default OnlineProgramSection;

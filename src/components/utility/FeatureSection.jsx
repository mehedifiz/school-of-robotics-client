import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import img from "../../assets/images/feature2.png";

const faqData = [
  {
    id: 1,
    title: "Sign up for a course",
    subtitle: "Register with valid details to stay connected with us anytime!",
    content:
      "Join School of Robotics (SoR) to get top-notch education, technological insights, and industry-level mentorship.",
  },
  {
    id: 2,
    title: "Choose your plan",
    subtitle: "Select a course, programming language, and your preferred time.",
    content:
      "Choosing the right course is essential. Explore our structured plans and customize your learning experience.",
  },
  {
    id: 3,
    title: "Get certified",
    subtitle: "Complete your lessons and receive a professional certification.",
    content:
      "Earn globally recognized certifications that enhance your skills and career prospects.",
  },
];

const FeatureSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="container mx-auto">
      <div className="my-16">
        <h3 className="text-3xl text-center text-teal-950 font-bold mb-4">
          Develop Yourself with Us
        </h3>
        <p className="text-teal-950  text-lg text-center mb-6">
          At the School of Robotics (SoR), we provide hands-on learning to help
          you master technology.
        </p>
      </div>
      <div className="flex gap-5 flex-col  mb-16 lg:flex-row items-center rounded-lg justify-between py-16 px-6 md:px-12 bg-gradient-to-r from-gray-900 via-gray-500 to-teal-50 text-white">
        {/* Left Content */}
        <div className="lg:w-1/2 text-start" data-aos="fade-right">
          {/* Accordion Section */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition-all focus:outline-none"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <div>
                    <p className="font-semibold text-lg">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                  <span
                    className={`transform transition-transform ${
                      openIndex === index ? "rotate-90" : ""
                    }`}
                  >
                    <FaArrowRight className="text-teal-600" />
                  </span>
                </button>
                <div
                  className={`transition-all duration-700 ease-in-out overflow-hidden ${
                    openIndex === index
                      ? "max-h-96 opacity-100 py-4 px-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-700">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2  px-4 mt-10 " data-aos="fade-left">
          <img src={img} alt="Feature" className="w-full " />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

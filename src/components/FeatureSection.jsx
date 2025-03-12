import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "../assets/aos/aos.css"; // Import AOS styles
import img from "../assets/images/feature2.png";

const faqData = [
  {
    id: 1,
    title: "Sign up for a course",
    subtitle: "You need to sign up with valid data so that you can connect with us any time!",
    content: "A world-class education for anyone, anywhere. Join School of Robotics (SoR) to get technological help with what you're studying or to learn something new...",
  },
  {
    id: 2,
    title: "Choose the preferred plan",
    subtitle: "You can choose any desired course, programming language, and your preferred time schedule.",
    content: "Choosing a plan can be complicated. Knowing just a few things before you compare plans can make it simpler.",
  },
  {
    id: 3,
    title: "Get certified",
    subtitle: "After live online lessons with our mentors, you will receive a certificate.",
    content: "Get certification exam guides and details. Explore our package-based certifications and our specialty certifications in specific technical areas.",
  },
];

const FeatureSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Global animation duration
      once: true, // Whether animations should happen only once
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-16">
      {/* Left Content */}
      <div className="md:w-1/2 px-4 text-start" data-aos="fade-right" data-aos-duration="1000">
        <h3 className="text-2xl font-bold mb-4">We aim to develop yourself</h3>
        <p className="text-gray-500 mb-6">
          At the School of Robotics (SoR), we believe there is a better way to educate children.
        </p>

        {/* Accordion Section */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100} // Staggered delay for each item
            >
              <button
                className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-all focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="group">
                  <p className="font-semibold group-hover:text-[#00635A] mb-1">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </button>
              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 border-t border-gray-200">
                  <p className="mb-2 text-gray-700">{item.content}</p>
                  <a href="#" className="text-gray-600 hover:text-[#00635A] flex items-center">
                    Check it out <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 px-4 mt-10 md:mt-0" data-aos="fade-left" data-aos-duration="1000">
        <img src={img} alt="Feature" className="w-full rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default FeatureSection;
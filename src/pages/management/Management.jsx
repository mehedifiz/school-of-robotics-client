import { useEffect } from "react";
import { Mail } from "lucide-react";
import { FaTwitter, FaLinkedin, FaQuoteLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionHeader from "@/components/utility/SectionHeader";
import { useLocation } from "react-router-dom";

const Management = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const { pathname } = useLocation();

  const manageData = [
    {
      name: "Md Kamrul Hasan",
      title: "Team Leader",
      position: "Joint Secretary, Planning & Budget Branch, Cabinet Division",
      image: "/src/assets/home/Md-Kamrul-Hasan.png",
      quote: "Empowering the next generation through robotics education",
    },
    {
      name: "Engr Abu Kowsar",
      title: "Project Manager",
      position: "Programmer, Dept. of ICT, ICT Division",
      image: "/src/assets/home/Engr-Abu-Kowsar.png",
      quote: "Building innovative solutions for tomorrow's challenges",
    },
    {
      name: "Shanjit Mondol",
      title: "Master Trainer",
      position: "Senior Robotics Trainer",
      image: "/src/assets/home/Shanjit-Mondol.png",
      quote: "Hands-on learning creates lasting knowledge",
    },
    {
      name: "Jewel Nath",
      title: "Master Trainer",
      position: "Senior Robotics Trainer",
      image: "/src/assets/home/Jewel-Nath.png",
      quote: "Turning complex concepts into accessible knowledge",
    },
  ];

  return (
    <section id="team" className={`bg-gradient-to-b from-gray-50 to-white py-20 relative overflow-hidden ${pathname === "/management" ? "mt-24" : ""}`}>
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Our Leadership"
          title="Management Team"
          description="We work under the guidance of team leaders and alongside other team members to ensure that organizational goals are met."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {manageData.map((member, index) => (
            <div
              key={index}
              className="rounded-xl bg-white overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-72 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-6">
                  <p className="text-white text-center italic mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <FaQuoteLeft className="inline-block mr-2 text-primary/80" size={14} />
                    {member.quote}
                  </p>
                  <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <a
                      href="#"
                      className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-md"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-md"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-md"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="absolute top-64 right-6 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform -translate-y-1/2 group-hover:rotate-12 transition-transform">
                  {index === 0 ? "CEO" : index === 1 ? "PM" : "MT"}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-primary-600 font-medium">{member.title}</p>
                <p className="text-gray-500 text-sm mt-2">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Management;

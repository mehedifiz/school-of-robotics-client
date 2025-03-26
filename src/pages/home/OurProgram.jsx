import { useState, useEffect } from "react";
import { ArrowRight, Computer, Code, Cpu, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionHeader from "@/components/utility/SectionHeader";

const programs = [
  {
    id: "basic-computing",
    title: "Basic Computing",
    description: "Learn fundamental computer skills including software, applications, and hardware functions.",
    icon: <Computer className="h-6 w-6" />,
    color: "bg-blue-500",
  },
  {
    id: "robotics",
    title: "Robotics",
    description: "Explore the design, construction, operation, and application of robotics in various fields.",
    icon: <Cpu className="h-6 w-6" />,
    color: "bg-primary",
  },
  {
    id: "programming",
    title: "Programming",
    description: "Master coding techniques, algorithm design, and software development fundamentals.",
    icon: <Code className="h-6 w-6" />,
    color: "bg-purple-500",
  },
  {
    id: "freelancing",
    title: "Freelancing",
    description: "Discover how to build a successful freelance career and find high-paying clients.",
    icon: <Globe className="h-6 w-6" />,
    color: "bg-red-500",
  },
];

const OurProgram = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <section id="programs" className="bg-white py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Programs"
          title="Our Programs"
          description="Explore a variety of cutting-edge courses designed to shape your future in technology."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className="glass-card p-6 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              onMouseEnter={() => setHoveredCard(program.id)}
              onMouseLeave={() => setHoveredCard(null)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div>
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4", program.color)}>{program.icon}</div>

                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
              </div>

              <div className="flex items-center text-primary font-medium">
                <span>Read More</span>
                <ArrowRight className={cn("ml-2 h-4 w-4 transition-transform", hoveredCard === program.id ? "translate-x-1" : "")} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProgram;

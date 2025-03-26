import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "../../assets/home/home-4.png";
import student1 from "../../assets/home/student-1.jpg";
import student2 from "../../assets/home/student-2.jpg";
import student3 from "../../assets/home/student-3.jpg";
import student4 from "../../assets/home/student-4.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-white to-blue-50 overflow-hidden relative px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid opacity-50"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 max-w-2xl">
            <div className="space-y-1">
              <div data-aos="fade-up">
                <span className="bg-primary px-3 py-1 text-xs text-white rounded-full font-medium">Robotics & Programming</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900" data-aos="fade-up" data-aos-delay="100">
                <span className="text-robotics-yellow">Bangladesh</span>
                <br />
                <span className="text-primary text-glow">School of Robotics</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-2 max-w-lg" data-aos="fade-up" data-aos-delay="200">
                Explore and learn more about everything from machine learning and global networking to scaling your team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
              <Button size="lg" className="bg-primary hover:bg-primary-600 text-white group">
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary-50">
                Learn More
              </Button>
            </div>

            <div className="pt-4 flex items-center gap-6" data-aos="fade-up" data-aos-delay="400">
              <div className="flex -space-x-2">
                {[
                  {
                    id: 1,
                    img: student1,
                  },
                  {
                    id: 2,
                    img: student2,
                  },
                  {
                    id: 3,
                    img: student3,
                  },
                  {
                    id: 4,
                    img: student4,
                  },
                ].map((student) => (
                  <div key={student.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <img src={student.img} alt={`Student ${student.id}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">500+</span> students already enrolled
              </p>
            </div>
          </div>

          <div className="relative lg:ml-auto" data-aos="fade-left" data-aos-duration="1000">
            <div className="relative z-10">
              <img src={heroImage} alt="Robotics Learning Illustration" className="w-full max-w-lg mx-auto" />
            </div>

            <div className="absolute top-1/4 -left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-60"></div>
            <div className="absolute bottom-1/3 -right-8 w-16 h-16 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-primary rounded-full opacity-70"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Banner;

import { useEffect } from "react";
import img1 from "../../assets/home/feature1.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OnlineProgramSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = ["IQ-based Customized curriculum", "Well-qualified & trained faculties", "Well-equipped hi-tech lab facilities"];

  return (
    <section id="online-courses" className="bg-gray-50 py-16 md:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <img src={img1} alt="Online Learning Illustration" className="w-full max-w-md mx-auto rounded-xl" />
          </div>

          <div className="space-y-6" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-bold">Online Program</h2>
            <p className="text-gray-600">
              Now that we've aligned the details, it's time to get things mapped out and organized. Let's make learning more effective!
            </p>

            <div className="space-y-4 py-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mr-3" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>

            <Button className="bg-primary hover:bg-primary-600 text-white">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineProgramSection;

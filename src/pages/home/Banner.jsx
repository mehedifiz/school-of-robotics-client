import { Button } from "@/components/ui/button";
import parth1 from "../../assets/home/home-parth-1.jpg";
import parth2 from "../../assets/home/home-parth-2.png";
import parth3 from "../../assets/home/home-parth-3.png";
import image_1 from "../../assets/images/home-4.png";

const Banner = () => {
  return (
    <div className="mx-auto px-6 md:px-16 lg:mt-[60px] mt-14 bg-gradient-to-r from-[#1d4252] via-[#203a43] to-[#2c5364] rounded-b-xl shadow-xl py-12">
      <div className="sm:container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            School of Robotics <span className="text-yellow-400">Bangladesh</span>
          </h1>
          <p className="md:text-lg text-gray-200 font-light animate-fade-up animate-once animate-duration-[3000ms]">
            Explore and learn more about everything from machine learning and global networking to scaling your team.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg transition duration-300 shadow-lg font-semibold">
              Explore Courses
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex justify-center relative">
          <img src={image_1} alt="Main Visual" className="w-full max-w-md rounded-xl animate-fade-right animate-once animate-duration-[1500ms]" />

          {/* Floating Circular Images */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute top-[70%] left-0 w-16 h-16 rounded-full animate-bounce">
              <img src={parth1} alt="Circle 1" className="w-full h-full rounded-full shadow-md border-2 border-yellow-300" />
            </div>

            <div className="absolute top-20 left-1/3 w-20 h-20 rounded-full animate-bounce delay-200">
              <img src={parth2} alt="Circle 2" className="w-full h-full rounded-full shadow-md border-2 border-yellow-300" />
            </div>

            <div className="absolute top-10 right-0 w-14 h-14 rounded-full animate-bounce delay-300">
              <img src={parth3} alt="Circle 3" className="w-full h-full rounded-full shadow-md border-2 border-yellow-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

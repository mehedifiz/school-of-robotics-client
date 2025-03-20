import AOS from "aos";
import { useEffect } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { Link } from "react-router-dom";

const Management = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const manageData = [
    {
      name: "Md Kamrul Hasan",
      position: "Team Leader",
      details: "Joint Secretary, Planning & Budget Branch, Cabinet Division",
      image: "/src/assets/home/photo_06.jpeg",
    },
    {
      name: "Engr Abu Kowsar",
      position: "Project Manager",
      details: "Programmer, Dept. of ICT, ICT Division",
      image: "/src/assets/home/photo_07.jpeg",
    },
    {
      name: "Shanjit Mondol",
      position: "Master Trainer",
      details: "Senior Robotics Trainer",
      image: "/src/assets/home/photo_08.jpeg",
    },
    {
      name: "Jewel Nath",
      position: "Master Trainer",
      details: "Senior Robotics Trainer",
      image: "/src/assets/home/photo_06.jpeg",
    },
    {
      name: "Engr Abu Kowsar",
      position: "Project Manager",
      details: "Programmer, Dept. of ICT, ICT Division",
      image: "/src/assets/home/photo_07.jpeg",
    },
    {
      name: "Shanjit Mondol",
      position: "Master Trainer",
      details: "Senior Robotics Trainer",
      image: "/src/assets/home/photo_08.jpeg",
    },
  ];
  return (
    <div className="container mx-auto py-16">
      <div className="text-center  max-w-2xl mx-auto">
        <h2 className="text-3xl text-teal-950 mb-5 font-bold">Management</h2>
        <p className="text-teal-950 mb-16 text-lg">
          We work under the guidance of team leaders and alongside other team
          members to ensure that organizational goals are met.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
        {manageData.map((item, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className="shadow-sm p-4 rounded-lg group "
          >
            <Link to={`#`} className=" ">
              <div className="relative  h-[400px]">
                <img
                  src={item?.image}
                  alt="instructor"
                  className="w-full rounded-lg h-full object-cover"
                />

                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 rounded-lg opacity-0 group-hover:opacity-20 duration-500"></div>

                <div className="absolute top-3 group-hover:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center duration-500 opacity-0  group-hover:opacity-100">
                  <span className="p-2">
                    <FaFacebookF className="text-2xl  text-white duration-300 hover:text-[#12A2E0]" />
                  </span>
                  <span className="p-2">
                    <IoLogoTwitter className="text-2xl  text-white duration-300 hover:text-[#12A2E0]" />
                  </span>
                  <span className="p-2">
                    <FaLinkedinIn className="text-2xl  text-white  duration-300 hover:text-[#12A2E0]" />
                  </span>
                  <span className="p-2">
                    <BsInstagram className="text-2xl  text-white  duration-300 hover:text-[#12A2E0]" />
                  </span>
                </div>
              </div>
              <div className="text-center space-y-2 py-3">
                <h2 className="text-xl font-semibold">{item?.name}</h2>
                <p className="text-xs text-[#959393]">{item?.position}</p>
                <p className="text-[#959393] font-light">{item?.details}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Management;

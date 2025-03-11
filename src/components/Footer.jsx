import { BsInstagram, BsVimeo } from "react-icons/bs";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#F3F7F8] mt-20">
        <div className="rounded-xl w-full py-6 lg:p-9 max-w-7xl mx-auto px-4">
          <div className="flex justify-center md:justify-between gap-8 w-full flex-col md:flex-row text-center md:text-left pb-6">
            <div className="space-y-4 basis-3/5 ">
            
              <div className="flex flex-col md:items-start items-center">
              <a href="/" className=""><img className="w-24 " src="/src/assets/images/logo-footer.png" alt="" /></a>
              </div>
              <p className="text-gray-600 font-light mt-2 w-full md:w-2/3 text-center md:text-start px-3 sm:px-10 md:px-0">
              Get In Touch With Us. Experienced with all stages of the development cycle for dynamic projects.
              </p>
              <div className="flex flex-row justify-center md:justify-start items-center mt-6 gap-3">
                    <a href="#" className="w-9 h-9 text-[#12A2E0] border border-[#12A2E0] hover:bg-[#12A2E0] hover:text-white rounded-full flex justify-center transition duration-300 items-center">
                      <FaFacebookF size={18} />
                    </a>
                    <a href="#" className="w-9 h-9 text-[#12A2E0] transition duration-300 border border-[#12A2E0] hover:bg-[#12A2E0] hover:text-white rounded-full flex justify-center items-center">
                      <IoLogoTwitter size={18} />
                    </a>
                    <a href="#" className="w-9 h-9 text-[#12A2E0] transition duration-300 border border-[#12A2E0] hover:bg-[#12A2E0] hover:text-white rounded-full flex justify-center items-center">
                      <BsInstagram  size={18} />
                    </a>
                    <a href="#" className="w-9 h-9 text-[#12A2E0] transition duration-300 border border-[#12A2E0] hover:bg-[#12A2E0] hover:text-white rounded-full flex justify-center items-center">
                      <BsVimeo   size={18} />
                    </a>
                    <a href="#" className="w-9 h-9 text-[#12A2E0] transition duration-300 border border-[#12A2E0] hover:bg-[#12A2E0] hover:text-white rounded-full flex justify-center items-center">
                      <FaGooglePlusG    size={18} />
                    </a>
                    <a href="#" className="w-9 h-9 text-[#12A2E0] transition duration-300 border border-[#12A2E0] hover:bg-[#12A2E0] hover:text-white rounded-full flex justify-center items-center">
                      <FaLinkedinIn    size={18} />
                    </a>
                  </div>
            </div>

            <div className="basis-2/5">
              <h3 className="text-[1.2rem] font-semibold text-text mb-2">
                About Us
              </h3>
              <div className="flex text-black flex-col gap-[10px] nav">
                <a href="/"
                  className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200"
                >
                  Home
                </a>
                <a href="/"
                  className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200"
                >
                  About us
                </a>
                <a href="/"
                  className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200"
                >
                  Order List
                </a>
                <a href="/"
                  className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200"
                >
                  Team Members
                </a>
                <a href="/"
                  className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-[0.9rem] text-gray-600">
              © {new Date().getFullYear()}, School of Robotics (SoR). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[#F3F7F8] py-8 text-center">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Logo */}
        <a href="/" className="block mb-4">
          <img className="w-20 mx-auto" src="/src/assets/images/logo-footer.png" alt="Logo" />
        </a>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-4">
          {[
            { icon: FaFacebookF, link: "#", color: "#1877F2" },
            { icon: IoLogoTwitter, link: "#", color: "#1DA1F2" },
            { icon: BsInstagram, link: "#", color: "#E4405F" },
            { icon: FaLinkedinIn, link: "#", color: "#0077B5" }
          ].map(({ icon: Icon, link, color }, index) => (
            <a key={index} href={link} className="text-xl" style={{ color }}>
              <Icon /> 
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()}, <span className="font-semibold">School of Robotics</span>. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

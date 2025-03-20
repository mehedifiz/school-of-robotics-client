import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  return (
    <footer className=" bg-gray-800 py-8 text-center">
      <div className="max-w-4xl flex justify-between mx-auto px-6">
        {/* Logo */}
        <div>
          <a href="/" className="block mb-4">
            <img
              className="w-20 "
              src="/src/assets/images/logo-footer.png"
              alt="Logo"
            />
          </a>
          <p className="text-sm text-gray-50">
            © {new Date().getFullYear()},{" "}
            <span className="font-semibold">School of Robotics</span>. All
            Rights Reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="my-16  space-y-3">
          <p className="text-lg text-teal-50">Social Media</p>
          <div className="flex justify-center gap-4 mb-4">
            {[
              { icon: FaFacebookF, link: "#", color: "#1877F2" },
              { icon: IoLogoTwitter, link: "#", color: "#1DA1F2" },
              { icon: BsInstagram, link: "#", color: "#E4405F" },
              { icon: FaLinkedinIn, link: "#", color: "#0077B5" },
            ].map(({ icon: Icon, link, color }, index) => (
              <a key={index} href={link} className="text-xl" style={{ color }}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

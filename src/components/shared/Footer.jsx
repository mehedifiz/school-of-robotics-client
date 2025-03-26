import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-robotics-blue text-white">
      <div className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="SRS Logo" className="h-14 w-auto" />
            </div>
            <p className="text-gray-300 mb-6">
              Explore and learn more about everything from machine learning and global networking to scaling your team.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Our Programs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Packages</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Programs</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Basic Computing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Robotics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Programming</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Freelancing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Certification</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Workshop</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-primary" />
                <span className="text-gray-300">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span className="text-gray-300">+880 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span className="text-gray-300">contact@srs.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} School of Robotics. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
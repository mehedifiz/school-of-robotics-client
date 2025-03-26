import { useEffect } from "react";
import Banner from "./Banner";
import OurProgram from "./OurProgram";
import OnlineProgramSection from "./OnlineProgramSection";
import StayConnected from "./StayConnected";
import Pricing from "../Pricing/Pricing";
import Management from "../management/Management";
import ContactUs from "../contactUs/ContactUs";
import ScrollToTop from "@/components/utility/ScrollToTop";
import Development from "./Development";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    const revealElements = () => {
      const reveals = document.querySelectorAll(".reveal");

      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };

    window.addEventListener("scroll", revealElements);
    revealElements(); // Call once on initial load

    return () => window.removeEventListener("scroll", revealElements);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Banner />
        <OurProgram />
        <Development />
        <OnlineProgramSection />
        <StayConnected />
        <Pricing />
        <Management />
        <ContactUs />
      </main>

      <ScrollToTop />
    </div>
  );
};

export default Home;

import OnlineProgramSection from "@/pages/home/OnlineProgramSection";
import OurProgram from "@/pages/home/OurProgram";
import PricingSection from "@/pages/home/PricingSection";
import StayConnected from "@/pages/home/StayConnected";
import FeatureSection from "@/components/utility/FeatureSection";
import ContactUs from "../contactUs/ContactUs";
import Management from "../management/Management";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <OurProgram />
      <OnlineProgramSection />
      <FeatureSection />
      <StayConnected />
      <PricingSection />
      <Management />
      <ContactUs />
    </div>
  );
};

export default Home;

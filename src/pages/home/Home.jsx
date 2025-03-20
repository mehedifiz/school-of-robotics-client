import OnlineProgramSection from "@/components/OnlineProgramSection";
import OurProgram from "@/components/OurProgram";
import PricingSection from "@/components/PricingSection";
import StayConnected from "@/components/StayConnected";
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

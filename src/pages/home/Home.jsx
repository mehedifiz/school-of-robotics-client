import OurProgram from "@/components/OurProgram";
import Banner from "./Banner";
import OnlineProgramSection from "@/components/OnlineProgramSection";
import FeatureSection from "@/components/utility/FeatureSection";
import StayConnected from "@/components/StayConnected";
import PricingSection from "@/components/PricingSection";

const Home = () => {
   return (
      <div>
         <Banner />
         <OurProgram/>
         <OnlineProgramSection/>
         <FeatureSection/>
         <StayConnected/>
         <PricingSection/>

      </div>
   );
};

export default Home;
import OurProgram from "@/components/OurProgram";
import Banner from "./Banner";
import OnlineProgramSection from "@/components/OnlineProgramSection";
import FeatureSection from "@/components/FeatureSection";
import StayConnected from "@/components/StayConnected";
import PricingSection from "@/components/PricingSection";

const Home = () => {
   return (
      <div>
         <Banner />
         <OurProgram/>
         <OnlineProgramSection/>
       

      </div>
   );
};

export default Home;
import OurProgram from "@/components/OurProgram";
import Banner from "./Banner";
import OnlineProgramSection from "@/components/OnlineProgramSection";
import FeatureSection from "@/components/FeatureSection";
 

const Home = () => {
   return (
      <div>
         <Banner />
         <OurProgram/>
         <OnlineProgramSection/>
         <FeatureSection/>
      

      </div>
   );
};

export default Home;
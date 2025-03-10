import Card from "../../components/Card";
import Banner from "./Banner";

const Home = () => {
   return (
      <div>
         <Banner />
         <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
            <Card />
            <Card />
            <Card />
         </div>

      </div>
   );
};

export default Home;
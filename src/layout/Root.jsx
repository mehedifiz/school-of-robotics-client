import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Nav from "@/components/shared/Nav";

const Root = () => {
   return (
      <div>
         <Nav />
         <Outlet />
         <Footer></Footer>
      </div>
   );
};

export default Root;
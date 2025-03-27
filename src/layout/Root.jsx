import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Nav from "@/components/shared/Nav";
import ScrollFromTopPerPage from "@/components/utility/ScrollFromTopPerPage";

const Root = () => {
   return (
      <div>
         <Nav />
         <ScrollFromTopPerPage />
         <Outlet />
         <Footer></Footer>
      </div>
   );
};

export default Root;
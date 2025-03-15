import { AuthContext } from "@/context/Authprovider";
import { useContext } from "react";

const useAuth = () => {
    const auth = useContext(AuthContext);
    
    return auth;
};

export default useAuth;

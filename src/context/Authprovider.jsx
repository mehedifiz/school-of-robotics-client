import useAxios from "@/Hooks/useAxios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axios = useAxios();

  const initialState = {
    userId: null,
    token: null,
    isLoggedIn: false,
  };

  const [auth, setAuth] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const loginUser = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/login", formData);

      if (response.data.token) {
        const {data} = await axios.get(`/user/get-user/${response.data.user._id}`)
        const authData = {
        user: data.data ,
          userId: response.data.user._id, // Only storing userId
          token: response.data.token,
          isLoggedIn: true,
        };

        setAuth(authData);
        localStorage.setItem("auth", JSON.stringify(authData));
        toast.success("Login successful!");
        return response;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setAuth(initialState);
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      setAuth(JSON.parse(authData));
      axios
        .get(`/user/get-user/${JSON.parse(authData).userId}`)
        .then((response) => {
          setAuth((prev) => ({
            ...prev,
            user: response.data.data,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLoading(false);
  }, []);

  const authInfo = {
    ...auth,
    loginUser,
    logoutUser,
    loading,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

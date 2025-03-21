import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxios from "@/Hooks/useAxios";
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
                const authData = {
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
        }
        setLoading(false);
    }, []);

    const authInfo = {
        ...auth,
        loginUser,
        logoutUser,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;
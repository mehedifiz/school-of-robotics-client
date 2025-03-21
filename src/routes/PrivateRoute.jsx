import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { userId, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (!userId) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { userId, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
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
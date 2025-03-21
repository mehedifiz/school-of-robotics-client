import Loader from "@/components/shared/Loader";
import useAuth from "@/Hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { userId, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <Loader />
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
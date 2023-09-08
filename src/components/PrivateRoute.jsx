import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { auth } = useAuth();
    return (auth ? children : <Navigate to="/login"/>);
}

export default PrivateRoute;

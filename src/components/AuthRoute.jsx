import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
    const auth = useAuth()
    return (auth === null ? children : <Navigate to={'/'}/>)
}

export default AuthRoute;
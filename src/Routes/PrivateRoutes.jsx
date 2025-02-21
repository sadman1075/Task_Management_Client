import { Navigate } from "react-router-dom";
import Loader from "../Pages/Loader/Loader";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    
    if (loading) {
        return <Loader></Loader>
    }
    if (user) {
        return children
    }
    return <Navigate to={"/login"}></Navigate>
};

export default PrivateRoutes;
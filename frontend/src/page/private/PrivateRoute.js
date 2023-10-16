import {useAuthenticate} from "../../hooks/useAuthenticate";
import {Navigate, Outlet} from "react-router-dom";



export const PrivateRoute = () => {
    return useAuthenticate() ? <Outlet/> : <Navigate to="/"/>;
}
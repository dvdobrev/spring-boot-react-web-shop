import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { Navigate, Outlet } from "react-router-dom";


export const RouteGuard = () => {

    const { userData } = useContext(UserContext);

    if (!userData.email) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />

};

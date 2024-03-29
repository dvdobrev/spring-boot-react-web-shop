import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { Navigate, Outlet } from "react-router-dom";


export const AdminGuard = () => {

    const { userData } = useContext(UserContext);

    if (userData.userRole !== "ADMIN") {
        return <Navigate to="/pageNotFound" replace />
    }

    return <Outlet />

};

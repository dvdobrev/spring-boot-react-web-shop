import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { Navigate, Outlet } from "react-router-dom";


export const LoginGuard = () => {

    const { userData } = useContext(UserContext);

    if (Object.keys(userData).length > 0) {
        return <Navigate to="/" replace />
    }

    return <Outlet />

};

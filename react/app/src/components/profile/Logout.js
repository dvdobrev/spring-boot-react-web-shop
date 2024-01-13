import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { AddressContext } from "../../context/AddressContext";

export const Logout = () => {
    const navigate = useNavigate();
    const { logoutHandler } = useContext(UserContext);
    const {clearAddresses, } = useContext(AddressContext);



    useEffect(() => {
        // localStorage.clear()
        logoutHandler()
        clearAddresses()
        navigate('/')
    });

    return null;
};
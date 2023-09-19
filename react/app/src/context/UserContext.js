import { createContext } from "react";

import { useLocalStorage } from '../hooks/useLocalStorage';


export const UserContext = createContext();

export const UserProvider = ({
    children,
}) => {

    const [userData, setUserData] = useLocalStorage('userData', {});

    const userDataHandler = (userData) => {
        setUserData(userData);
    };

    const logoutHandler = () => {
        setUserData({});
    };

    return (

        <UserContext.Provider value={{
            // userData,
            // userDataHandler,
            // logoutHandler,
        }}>

            {children}
        </UserContext.Provider>
    );
};


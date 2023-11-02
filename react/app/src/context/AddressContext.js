import { createContext, useContext, useEffect, useState } from "react";
import springUrl from "../components/springUrl";
import axios from "axios";
import { UserContext } from "./UserContext";


export const AddressContext = createContext();

export const AddressProvider = ({
    children,
}) => {

    const { userData } = useContext(UserContext);

    const [allAddresses, setAllAddresses] = useState([]);

    //I Send the customer ID as header because is more secure than as URL Parameter
    const headers = {
        'X-Customer-Id': userData.customerId,
    };

    const clearAddresses = () => {
        setAllAddresses([]);
    }


    const getAddresses = () => {
        axios.get(springUrl + '/profile', { headers })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                return response.data;
            })
            .then((data) => {
                setAllAddresses(data);
            })
        // .catch((error) => {
        //     // Handle the error, e.g., setError(error);
    };


    return (

        <AddressContext.Provider value={{
            allAddresses: allAddresses,
            getAddresses: getAddresses,
            clearAddresses: clearAddresses,
        }}>

            {children}
        </AddressContext.Provider>
    );
};
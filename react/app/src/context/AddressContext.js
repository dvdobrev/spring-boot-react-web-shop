import { createContext, useContext, useEffect, useState } from "react";
import springUrl from "../components/springUrl";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";


export const AddressContext = createContext();

export const AddressProvider = ({
    children,
}) => {

    const { userData } = useContext(UserContext);


    const navigate = useNavigate();

    const [allAddresses, setAllAddresses] = useState([]);
    const [addressesCalled, setAddressesCalled] = useState(false);

    const clearAddresses = () => {
        setAllAddresses([]);
        setAddressesCalled(false);
    }

    const getAddresses = () => {

            //I Send the customer ID as header because is more secure than as URL Parameter
        const headers = {
            "X-Customer-Id": userData.customerId,
        };

        axios.get(springUrl + '/profile', { headers })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                return response.data;
            })
            .then((data) => {
                setAllAddresses(data);
                setAddressesCalled(true); 
            })
        .catch((error) => {
            console.log("Error: " + error);
        });
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            await deleteAddress(id);
        };
    };


    const deleteAddress = async (id) => {
        try {
            const response = await axios.delete(`${springUrl}/profile/address/delete/${id}`);

            if (response.status === 200) {
                // Delete was successful, you can update your UI accordingly
                getAddresses();
                navigate(`/profile`);
            } else {
                console.error(`Failed to delete address with ID ${id}`);
            }
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    }


    return (

        <AddressContext.Provider value={{
            allAddresses: allAddresses,
            getAddresses: getAddresses,
            clearAddresses: clearAddresses,
            deleteHandler: deleteHandler,
            addressesCalled: addressesCalled,
        }}>

            {children}
        </AddressContext.Provider>
    );
};
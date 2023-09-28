import { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";
import baseUrl from "../components/baseUrl";

export const ClothesContext = createContext();


export const ClothesProvider = ({
    children,
}) => {

    const [clothes, setClothes] = useState([]);
    const [error, setError] = useState(null);


    let fetchURL = "/clothes";

    useEffect(() => {

        getItems();
    }, []);


    const getItems = () => {
        fetch(baseUrl + fetchURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setClothes(data);
            })
            .catch((error) => {
                setError(error);
            });
    }

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteClothes(id);
        };
    };


    const deleteClothes = async (id) => {
        try {
            // Send a DELETE request using an API library like Axios or Fetch
            // Replace the API endpoint with your actual endpoint
            const response = await axios.delete(`${baseUrl}/clothes/${id}`, {
            });
    
            if (response.status === 200) {
                // Delete was successful, you can update your UI accordingly
                console.log(`Clothe with ID ${id} deleted.`);
                getItems();
    
            } else {
                console.error(`Failed to delete clothe with ID ${id}`);
            }
        } catch (error) {
            console.error('Error deleting clothe:', error);
        }
    }

    return (
        <ClothesContext.Provider value={{
            clothes,
            getItems,
            deleteHandler,
            deleteClothes

        }}>
            {children}
        </ClothesContext.Provider>
    );
};

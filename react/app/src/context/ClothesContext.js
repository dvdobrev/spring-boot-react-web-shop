import { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";
import springUrl from "../components/springUrl";

export const ClothesContext = createContext();


export const ClothesProvider = ({
    children,
}) => {

    const [clothes, setClothes] = useState([]);
    const [error, setError] = useState(null);

    const updateClothes = (newItem) => {
        setClothes( prevClothes => [...prevClothes, newItem,]);
    };


    useEffect(() => {

        getItems();
    }, []);


    const getItems = () => {
        fetch(springUrl + "/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
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
            const response = await axios.delete(`${springUrl}/clothes/${id}`, {
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
            deleteClothes,
            updateClothes,

        }}>
            {children}
        </ClothesContext.Provider>
    );
};

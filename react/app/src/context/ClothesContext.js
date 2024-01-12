import { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";
import springUrl from "../components/springUrl";

export const ClothesContext = createContext();


export const ClothesProvider = ({
    children,
}) => {

    const [clothes, setClothes] = useState([]);
    const [error, setError] = useState(null);
    const [filteredItems, setFilteredItems] = useState('');
    const [addedToCart, setAddedToCart] = useState(false);


    const updateClothes = (newItem) => {
        setClothes(prevClothes => [...prevClothes, newItem,]);
    };

    const clothesFilter = (query) => {
        const filtered = clothes.filter((item) => item.type.toLowerCase().includes(query));
        setFilteredItems(filtered);
    }

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
                setClothes(data);
            })
            .catch((error) => {
                setError(error);
            });
    };


    const getItemById = async (itemId) => {
        try {
            const response = await axios.get(`${springUrl}/clothes/details/${itemId}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (error) {
            setError(error);
        }
    };


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

    const addToShoppingCart = async (springUrl, url, userItemData) => {
        try {

            const response = await axios.post(springUrl + url, userItemData);

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            setAddedToCart(true);

            // navigate(`/`);

        } catch (error) {
            console.error('Error adding clothes:', error);
        }
    };


    return (
        <ClothesContext.Provider value={{
            clothes,
            getItems,
            getItemById,
            deleteHandler,
            deleteClothes,
            updateClothes,
            addToShoppingCart,
            clothesFilter,
            filteredItems,
            setFilteredItems,
            addedToCart,
            setAddedToCart,
            
        }}>
            {children}
        </ClothesContext.Provider>
    );
};

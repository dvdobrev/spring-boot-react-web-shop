import axios from "axios";
import { useContext, useEffect, useState } from "react";
import springUrl from "../components/springUrl";
import { ClothesContext } from "../context/ClothesContext";

export const useUserItemData = (itemId, userData) => {

    const { getItemById } = useContext(ClothesContext);

    const [userItemData, setUserItemData] = useState({
        user: {},
        item: {},
    });

    useEffect(() => {

        const fetchData = async () => {
            try {
                const itemData = await getItemById(itemId);

                setUserItemData(() => ({
                    user: userData,
                    item: itemData,
                }));
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        fetchData();
    }, [itemId, userData, getItemById]);

    return userItemData;
};

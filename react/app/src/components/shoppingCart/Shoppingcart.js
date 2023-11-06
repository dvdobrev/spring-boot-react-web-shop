import { useParams } from "react-router-dom";
import cardsCSS from "../../components/cards.module.css";
import axios from "axios";
import springUrl from "../springUrl";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";



export const Shoppingcart = () => {

    const { userData } = useContext(UserContext);

    
    const [items, setItems] = useState([]);

    const headers = {
        "X-Customer-Id": userData.customerId,
    };

    const getShoppingCartItems = async () => {

        axios.get(springUrl + "/shoppingCart", { headers })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                return response.data;
            })
            .then((data) => {       
                setItems(data);
            }).then(console.log(items));
    }

    useEffect(() => {
        getShoppingCartItems()
    }, []);

return (
<h1>From shooppingcart Dobri!!!!!!!!!</h1>

    );
    };

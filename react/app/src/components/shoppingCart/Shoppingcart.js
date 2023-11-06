import axios from "axios";
import springUrl from "../springUrl";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import cardsCSS from "../../components/cards.module.css";

export const Shoppingcart = () => {
    const { userData } = useContext(UserContext);
    const [items, setItems] = useState([]);
    const headers = {
        "X-Customer-Id": userData.customerId,
    };

    const getShoppingCartItems = async () => {
        try {
            const response = await axios.get(springUrl + "/shoppingCart", { headers });

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            setItems(data);
            console.log(items[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getShoppingCartItems();
    }, []);

    // Render all items in the shopping cart
    const renderItems = () => {
        return items.map((item, index) => (
            <div key={item.item.itemId} className={`card ${cardsCSS["cards"]}`}>
                <img
                    className={`card-img-top ${cardsCSS["card-img"]}`}
                    src={item.item.img_link}
                    alt="Card"
                />
                <div className="card-body">
                    <h5 className="card-title">Name: {item.item.type}</h5>
                    <p className="card-text">Price: {item.item.price}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <p className="card-text">Item ID: {item.item.itemId}</p>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            {items.length > 0 ? (
                renderItems()
            ) : (
                <p>Your shopping cart is empty.</p>
            )}
        </div>
    );
};
import axios from "axios";
import springUrl from "../springUrl";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import cardsCSS from "../../components/cards.module.css";
import { useNavigate } from "react-router-dom";

export const Shoppingcart = () => {

    const { userData } = useContext(UserContext);

    const [items, setItems] = useState([]);

    const navigate = useNavigate();


    const headers = {
        "X-Customer-Id": userData.customerId,
    };

    const url = "/shoppingCart";

    const getShoppingCartItems = async () => {
        try {
            const response = await axios.get(springUrl + url, { headers });

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            setItems(data);
            console.log('Items: ', data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
                    <p className="card-text">Total Price: {item.quantity * item.item.price} €</p>
                </div>
            </div>
        ));
    };

    useEffect(() => {
        getShoppingCartItems();
    }, []);

    const buyHandler = async (e) => {
        e.preventDefault();


        const confirmed = window.confirm("Are you sure you want to buy the items?");
    
        if (confirmed) {

        const response = await axios.post(springUrl + url + "/delete", items);

            if (response.status === 200) {

                setItems([])

                navigate(`/shoppingCart`);
            }

        //     console.log("You bought it");



        //     //Show invoice

        }
    };



    return (
        <div>
            <button onClick={buyHandler} className="btn btn-primary">Buy Item(s)</button>

            <h2>Your Shopping Cart</h2>
            {items.length > 0 ? (
                renderItems()
            ) : (
                <p>Your shopping cart is empty.</p>
            )}
        </div>
    );
};
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import springUrl from "../springUrl";
import { UserContext } from "../../context/UserContext";
import cardsCSS from "../../components/cards.module.css";
import shopingcartCSS from "../../components/shoppingCart/shopincart.module.css";
import { useNavigate } from "react-router-dom";
import { AddressContext } from "../../context/AddressContext";

export const Shoppingcart = () => {
    const { userData } = useContext(UserContext);
    const { getAddresses, allAddresses, addressesCalled } = useContext(AddressContext);

    const [items, setItems] = useState([]);
    const [invoice, setInvoice] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    const headers = {
        "X-Customer-Id": userData.customerId,
    };

    useEffect(() => {
        if(allAddresses.length === 0 && !addressesCalled) {
            getAddresses()
        }

    }, [allAddresses]);

    const addresses = allAddresses;

    const shoppingUrl = "/shoppingCart";
    const buyUrl = "/invoice";
    const invoiceUrl = "/invoice";

    useEffect(() => {
        getShoppingCartItems();
    }, []);

    const getShoppingCartItems = async () => {
        try {
            const response = await axios.get(springUrl + shoppingUrl, { headers });

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;

            setItems(data);

            let price = 0
            data.forEach(item => {
                price += item.item.price * item.quantity;
            });
            setTotalPrice(price);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteItem = async (customerId, itemId) => {
        try {
            const response = await axios.delete(`${springUrl}${buyUrl}/${customerId}/${itemId}`, {});

            if (response.status === 200) {
                getShoppingCartItems();
            } else {
                console.error(`Failed to delete clothe with ID ${itemId}`);
            }
        } catch (error) {
            console.error('Error deleting clothe:', error);
        }
    };

    const renderItems = () => {
        if (items.length > 0) {
            return (
                <div>
                    <div className={`${shopingcartCSS["cards-section"]}`}>
                        {items.map((item, index) => (
                            <div key={item.item.itemId} className={`${shopingcartCSS["normal-cards"]}`}>
                                <img
                                    className={`card-img-top ${cardsCSS["card-img"]}`}
                                    src={item.item.img_link}
                                    alt="Card"
                                />
                                <div className={`${cardsCSS["card-body"]}`}>
                                    <span className={`${cardsCSS["card-text"]}`}>Type: {item.item.type}</span>
                                    <span className={`${cardsCSS["card-text"]}`}>Size: {item.item.size} </span>
                                    <span className={`${cardsCSS["card-text"]}`}>Quantity: {item.quantity}</span>
                                    <span className={`${cardsCSS["card-text"]}`}>Price: {item.item.price} €</span>
                                    <span className={`${cardsCSS["card-text"]}`}>Total Price: {item.quantity * item.item.price} €</span>
                                    <button onClick={() => deleteItem(userData.customerId, item.item.itemId)} className="btn btn-danger">Delete Item</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!invoice && (
                        <button onClick={buyHandler} className={`btn btn-lg btn-primary ${shopingcartCSS["shp-button"]}`}>Buy Item(s)</button>
                    )}

                </div>
            );
        } else {
            return (
                <div>
                    {invoice ? (
                        <h1 className={`${shopingcartCSS["text"]}`}>Thank you for your Order. You can download your invoice.</h1>
                    ) : (
                        <h1 className={`${shopingcartCSS["text"]}`}>Your shopping cart is empty.</h1>
                    )}
                </div>
            );
        }
    };

    const buyHandler = async (e) => {
        e.preventDefault();

        if (addresses.length === 0 || userData.firstName === null || userData.lastName == null) {
            // const confirmed = window.alert("You have to complete your profile data(go to profile and add Name and address) to buy some product!");
            alert({
                title: 'Cellular Data is Turned Off for "Safari"',
                message: 'You can turn on cellular data for this app in Settings.'
            });
            return
        }

        const confirmed = window.confirm("Are you sure you want to buy the items?");

        if (confirmed) {
            const response = await axios.post(springUrl + buyUrl, items);

            if (response.status === 200) {
                setInvoice(true);
                setItems([]);
                setTotalPrice(0);
                navigate(`/shoppingCart`);
            }
        }
    };

    const downloadPDF = async (e) => {
        e.preventDefault();

        // const createInvoice = await axios.get(springUrl + invoiceUrl, items);

        try {
            const response = await axios.get('http://localhost:8080/download/file');
            const fileName = response.data;

            if (fileName) {
                const pdfResponse = await axios.get(`http://localhost:8080/download/${fileName}`, {
                    responseType: 'arraybuffer',
                });

                const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);

                window.open(url, '_blank');
            } else {
                console.error('Keine PDF-Datei vorhanden.');
            }
        } catch (error) {
            console.error('Fehler beim Herunterladen des PDFs:', error);
        }
    };

    return (
        <div>
            <h1 className={`${shopingcartCSS["text"]}`}>Your Shopping Cart</h1>
            {totalPrice !== 0 && <section className={`${shopingcartCSS["total-price-section"]}`}>Total Price: {totalPrice} €</section>}
            <div className={`${shopingcartCSS["shoppingcart"]}`}>
                {renderItems()}
                {invoice && (
                    <button onClick={downloadPDF} className="btn btn-primary">Download Invoice</button>
                )}
            </div>
        </div>
    );
};

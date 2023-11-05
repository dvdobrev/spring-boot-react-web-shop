import { useContext, useEffect, useState } from "react";
import cardsCSS from "../../components/cards.module.css";
import { ClothesContext } from "../../context/ClothesContext";
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import springUrl from "../springUrl";
import { useUserItemData } from "../../hooks/UseUserItemData";



export const ClothesItem = ({ cloth }) => {

    const url = '/addToShoppingCart';

    const itemId = cloth.itemId;


    const { deleteHandler, addToShoppingCart } = useContext(ClothesContext)
    const { userData } = useContext(UserContext);

    const userItemData = useUserItemData(itemId, userData);

    return (
        <div className={`card ${cardsCSS["cards"]}`}>
            <img
                className={`card-img-top ${cardsCSS["card-img"]}`}
                src={cloth.img_link}
                alt="Card"
            />
            <div className="card-body">
                <h5 className="card-title">Name: {cloth.type}</h5>
                {/* <p className="card-text">Type: {clothes.type}</p> */}
                <p className="card-text">Price: {cloth.price}</p>
                <p className="card-text">Description (ID): {itemId}</p>
                <button onClick={
                    () => addToShoppingCart(springUrl, url, userItemData)}
                    className="btn btn-primary">
                    Add to Cart
                </button>

                {userData.userRole === "ADMIN" &&
                    <button onClick={() => deleteHandler(cloth.itemId)} className="btn btn-primary">Delete Item</button>
                }

                <Link to={`/clothes/details/${cloth.itemId}`} className="btn btn-primary">Details
                </Link>

            </div>
        </div>
    );
};

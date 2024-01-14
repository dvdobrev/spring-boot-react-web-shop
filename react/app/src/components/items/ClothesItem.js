import { useContext, useEffect, useState } from "react";
import cardsCSS from "../../components/home/cards.module.css";
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
            <div className={`${cardsCSS["card-body"]}`}>
                {/* <h5 className="card-title">Type: {cloth.type}</h5> */}
                <span className={`${cardsCSS["card-text"]}`}>Type: {cloth.type}</span>
                {/* <span className={`${cardsCSS["card-text"]}`}>Description: {cloth.description}</span> */}
                <span className={`${cardsCSS["card-text"]}`}>Size: {cloth.size} </span>
                <span className={`${cardsCSS["card-text"]}`}>Price: {cloth.price} €</span>
                <div className={`${cardsCSS["card-buttons-div"]}`}>
                    {userData.customerId > 0 &&
                        <button onClick={
                            () => addToShoppingCart(springUrl, url, userItemData)}
                            className="btn btn-primary">
                            Add to Cart
                        </button>
                    }

                    {userData.userRole === "ADMIN" &&
                        <button onClick={() => deleteHandler(cloth.itemId)} className="btn btn-danger">Delete Item</button>
                    }

                    <Link to={`/clothes/details/${cloth.itemId}`} className="btn btn-primary">Details
                    </Link>
                </div>

            </div>
        </div>
    );
};

import { useContext, useEffect, useState } from "react";
import { ClothesContext } from "../../context/ClothesContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import cardsCSS from "../../components/home/cards.module.css";

import springUrl from "../springUrl";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useUserItemData } from "../../hooks/UseUserItemData";

export const Itemdetails = () => {

    const url = '/addToShoppingCart';

    const { itemId } = useParams();
    const { deleteHandler, addToShoppingCart } = useContext(ClothesContext);
    const { userData } = useContext(UserContext);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const userItemData = useUserItemData(itemId, userData);

    return (
        <div className={`card ${cardsCSS["cards"]}`}>
            <img
                className={`card-img-top ${cardsCSS["card-img"]}`}
                src={userItemData.item.img_link}
                alt="Card"
            />
            <div className="card-body">
                <h5 className="card-title">Name: {userItemData.item.type}</h5>
                <p className="card-text">Price: {userItemData.item.price}</p>
                <p className="card-text">Description (ID): {userItemData.item.itemId}</p>
                <button onClick={
                    () => addToShoppingCart(springUrl, url, userItemData)}
                    className="btn btn-primary">
                    Add to Cart
                </button>

                {userData.userRole === "ADMIN" &&
                    <>
                        <button onClick={() => deleteHandler(userItemData.item.itemId)} className="btn btn-primary">Delete Item</button>

                        <Link to={`/clothes/edit/${userItemData.item.itemId}`} className="btn btn-primary">Edit
                        </Link>
                    </>
                }
            </div>
        </div>

    );
};

import { useContext } from "react";
import { ClothesContext } from "../../context/ClothesContext";
import { Link, useParams } from "react-router-dom";
import itemDetailsCSS from "../../components/items/itemDetails.module.css";

import springUrl from "../springUrl";
import { UserContext } from "../../context/UserContext";
import { useUserItemData } from "../../hooks/UseUserItemData";

export const Itemdetails = () => {

    const url = '/addToShoppingCart';

    const { itemId } = useParams();
    const { deleteHandler, addToShoppingCart } = useContext(ClothesContext);
    const { userData } = useContext(UserContext);

    const userItemData = useUserItemData(itemId, userData);
    console.log("Price is: " + userItemData.item.price);
    const price = userItemData.item.price;
    console.log('price: ', price);

    return (
        <div className={`card ${itemDetailsCSS["cards"]}`}>
            <img
                className={`card-img-top ${itemDetailsCSS["card-img"]}`}
                src={userItemData.item.img_link}
                alt="Card"
            />
            <div className="card-body">
                <h5 className="card-title">Name: {userItemData.item.type}</h5>
                {userItemData.item.price !== undefined &&
                    <p className="card-text">Price: {userItemData.item.price.toFixed(2)}</p>
                }                <p className="card-text">Description (ID): {userItemData.item.itemId}</p>
                {userData.email &&
                    <button onClick={
                        () => addToShoppingCart(springUrl, url, userItemData)}
                        className="btn btn-primary">
                        Add to Cart
                    </button>
                }

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

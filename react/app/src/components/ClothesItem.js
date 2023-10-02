import { useContext } from "react";
import cardsCSS from "../components/cards.module.css";
import { ClothesContext } from "../context/ClothesContext";
import { Link } from 'react-router-dom';



export const ClothesItem = ({ cloth }) => {

    const { deleteHandler } = useContext(ClothesContext)

    return (
        <div className={`card ${cardsCSS["cards"]}`}>
            <img
                className={`card-img-top ${cardsCSS["card-img"]}`}
                src={cloth.img_link}
                alt="Card Image"
            />
            <div className="card-body">
                <h5 className="card-title">Name: {cloth.type}</h5>
                {/* <p className="card-text">Type: {clothes.type}</p> */}
                <p className="card-text">Price: {cloth.price}</p>
                <p className="card-text">Description (ID): {cloth.item_id}</p>
                <button className="btn btn-primary">Add to Cart</button>
                <button onClick={() => deleteHandler(cloth.item_id)} className="btn btn-primary">Delete Item</button>

                <Link to={`/clothes/details/${cloth.item_id}`} className="btn btn-primary">Details
                </Link>

            </div>
        </div>
    );
};

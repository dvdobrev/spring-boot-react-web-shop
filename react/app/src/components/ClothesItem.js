import { useContext } from "react";
import cardsCSS from "../components/cards.module.css";
import { ClothesContext } from "../context/ClothesContext";


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
                <p className="card-text">Description (ID): {cloth.id}</p>
                <button className="btn btn-primary">Add to Cart</button>
                <button onClick={() => deleteHandler(cloth.id)} className="btn btn-primary">Delete Item</button>

                <button onClick={() => deleteHandler(cloth.id)} className="btn btn-primary">Details</button>

            </div>
        </div>
    );
};

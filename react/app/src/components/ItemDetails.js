import { useContext, useEffect, useState } from "react";
import { ClothesContext } from "../context/ClothesContext";
import { Link, useParams } from "react-router-dom";
import cardsCSS from "../components/cards.module.css";

import baseUrl from "./baseUrl";

//TODO: Make the delete button to be hide if its not admin

export const Itemdetails = () => {

    const { itemId } = useParams();
    const { deleteHandler } = useContext(ClothesContext);
    const [item, setItem] = useState({});
    const [error, setError] = useState(null);


    useEffect(() => {

        const getItemById = () => {
            fetch(`${baseUrl}/clothes/details/${itemId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setItem(data);
                })
                .catch((error) => {
                    setError(error);
                });
        }

        getItemById();
    }, [itemId]);


    return (
        <div className={`card ${cardsCSS["cards"]}`}>
        <img
            className={`card-img-top ${cardsCSS["card-img"]}`}
            src={item.img_link}
            alt="Card Image"
        />
        <div className="card-body">
            <h5 className="card-title">Name: {item.type}</h5>
            {/* <p className="card-text">Type: {itemes.type}</p> */}
            <p className="card-text">Price: {item.price}</p>
            <p className="card-text">Description (ID): {item.id}</p>
            <button className="btn btn-primary">Add to Cart</button>
            <button onClick={() => deleteHandler(item.id)} className="btn btn-primary">Delete Item</button>

            <Link to={`/clothes/details/${item.id}`} className="btn btn-primary">Details
            </Link>

            <Link to={`/clothes/edit/${item.id}`} className="btn btn-primary">Edit
            </Link>

        </div>
    </div>

    );
};

import { useContext, useEffect, useState } from "react";
import { ClothesContext } from "../../context/ClothesContext";
import { Link, useParams } from "react-router-dom";
import cardsCSS from "../../components/cards.module.css";

import springUrl from "../springUrl";
import { UserContext } from "../../context/UserContext";

export const Itemdetails = () => {

    const { itemId } = useParams();
    const { deleteHandler } = useContext(ClothesContext);
    const { userData } = useContext(UserContext);
    const [item, setItem] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {

        const getItemById = () => {
            fetch(`${springUrl}/clothes/details/${itemId}`)
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
                <p className="card-text">Description (ID): {item.item_id}</p>
                <button className="btn btn-primary">Add to Cart</button>

                {userData.userRole === "ADMIN" &&
                    <>
                        <button onClick={() => deleteHandler(item.item_id)} className="btn btn-primary">Delete Item</button>

                        <Link to={`/clothes/edit/${item.item_id}`} className="btn btn-primary">Edit
                        </Link>
                    </>
                }

            </div>
        </div>

    );
};

import { useContext } from "react";
import cardsCSS from "../../components/home/cards.module.css";
import { AddressContext } from "../../context/AddressContext";
import { Link } from "react-router-dom";


export const AddressItem = ({ address }) => {

    const { deleteHandler } = useContext(AddressContext);

    return (
        <div className={`card ${cardsCSS["cards"]}`}>
            <div className="card-body">
                <p className="card-text">Country: {address.country}</p>
                <p className="card-text">City: {address.city}</p>
                <p className="card-text">Streeet: {address.street}</p>
                <p className="card-text">Street number: {address.streetNumber}</p>
                <p className="card-text">Post code: {address.postCode}</p>

                <button onClick={() => deleteHandler(address.addressId)} className="btn btn-primary">Delete Address</button>

                    <Link to={`/address/edit/${address.addressId}`} className="btn btn-primary">Edit Address
                    </Link>

            </div>
        </div>
    )

};

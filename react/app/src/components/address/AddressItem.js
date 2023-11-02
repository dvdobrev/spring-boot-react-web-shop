import cardsCSS from "../../components/cards.module.css";


export const AddressItem = ({ address }) => {
    return (
        <div className={`card ${cardsCSS["cards"]}`}>
            <div className="card-body">
                <p className="card-text">Country: {address.country}</p>
                <p className="card-text">City: {address.city}</p>
                <p className="card-text">Streeet: {address.street}</p>
                <p className="card-text">Street number: {address.streetNumber}</p>
                <p className="card-text">Post code: {address.postCode}</p>

                {/* <button onClick={() => deleteHandler(item.item_id)} className="btn btn-primary">Delete Address</button>

                    <Link to={`/clothes/edit/${item.item_id}`} className="btn btn-primary">Edit Address
                    </Link> */}

            </div>
        </div>
    )

};

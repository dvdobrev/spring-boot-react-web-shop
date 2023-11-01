import { Link } from "react-router-dom";
import cardsCSS from "../../components/cards.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


export const Profile = () => {

    const { userData } = useContext(UserContext);




    return (
        <div className={`card ${cardsCSS["cards"]}`}>
            {/* <img
            className={`card-img-top ${cardsCSS["card-img"]}`}
            src={item.img_link}
            alt="Card Image"
        /> */}
            <div className="card-body">
                {/* <p className="card-text">Gender: </p> */}
                <p className="card-title">First Name: {userData.firstName}</p>
                {/* <p className="card-text">Type: {itemes.type}</p> */}
                <p className="card-text">Last Name: {userData.lastName}</p>
                <p className="card-text">Email: {userData.email}</p>

                <Link to={`/profile/edit`} className="btn btn-primary">Edit Profile
                </Link>
                <Link to={`/addAddress`} className="btn btn-primary">Add Address
                </Link>



            </div>
        </div>
    );
};

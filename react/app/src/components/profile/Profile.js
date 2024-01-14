import { Link, useNavigate } from "react-router-dom";
import cardsCSS from "../../components/cards.module.css";
import profileCSS from "../profile/profile.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { AddressContext } from "../../context/AddressContext";
import { AddressItem } from "../address/AddressItem";
import axios, { formToJSON } from 'axios';
import springUrl from "../springUrl";



export const Profile = () => {

    const { userData, logoutHandler } = useContext(UserContext);

    const { allAddresses, getAddresses, addressesCalled } = useContext(AddressContext);

    const url = '/profile/delete';
    const navigate = useNavigate();


    useEffect(() => {
        getAddresses();
    }, []);

    const deleteHandler = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");

        // Überprüfe, ob der Benutzer die Aktion bestätigt hat
        if (confirmed) {
            try {
                // Sende die DELETE-Anfrage an den Server
                const response = await axios.delete(springUrl + url + `/${userData.customerId}`);

                if (response.status === 200) {
                    logoutHandler();
                    navigate(`/`);
                } else {
                    console.error('Error deleting user:', response.data);
                }

            } catch (error) {
                console.log("Error: ", error);
            }
        }
    }

    return (
        <div className={`${profileCSS["profile-section"]}`}>
            <h1 style={{color: "white"}}> Your Profile</h1>
            <div className={`card ${cardsCSS["cards"]}`}>
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

                    <button
                        className="btn btn-primary"
                        onClick={deleteHandler}
                    >
                        Delete Profile
                    </button>

                </div>
            </div>

            <div>
                {allAddresses.map(address => <AddressItem key={address.addressId} address={address} />
                )}
            </div>

        </div>
    );
};

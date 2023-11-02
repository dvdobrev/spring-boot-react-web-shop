import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import springUrl from "../springUrl";
import { UserContext } from "../../context/UserContext";


export const AddAddress = () => {

    const url = '/addAddress';
    const navigate = useNavigate();

    const { userData } = useContext(UserContext);

    const user = {
        customerId: userData.customerId,
        email: userData.email,
    };


    console.log("Customer id: " + userData.customerId);
    console.log("Email: " + userData.email);

    const [formData, setFormData] = useState({
        country: '',
        city: '',
        street: '',
        streetNumber: '',
        postCode: '',
        user: {},
    });


    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(springUrl + url, formData);

            // Clear the form after successful submission
            setFormData({
                country: '',
                city: '',
                street: '',
                streetNumber: '',
                postCode: '',
                user: {},
            });

            // if (response.status === 201) {
            //     updateClothes(response.data);
            // }

            // navigate(`/profile`);

        } catch (error) {
            console.error('Error adding clothes:', error);
        }
    };

    useEffect(() => {
        setFormData({ ...formData, user: user });
    }, []);

    return (
        <div>
            <h2>Add Address</h2>
            <form onSubmit={onSubmit}>

                <div>
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={onChange}
                        placeholder="country"
                        required
                    />
                </div>

                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={onChange}
                        placeholder="city"
                        required
                    />
                </div>

                <div>
                    <label>Street:</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={onChange}
                        placeholder="street"
                        required
                    />
                </div>

                <div>
                    <label>Street number:</label>
                    <input
                        type="text"
                        name="streetNumber"
                        value={formData.streetNumber}
                        onChange={onChange}
                        placeholder="street number"
                        required
                    />
                </div>

                <div>
                    <label>Post code:</label>
                    <input
                        type="text"
                        name="postCode"
                        value={formData.postCode}
                        onChange={onChange}
                        placeholder="post code"
                        required
                    />
                </div>

                <button type="submit">Add Address</button>
            </form>
        </div>
    );
};

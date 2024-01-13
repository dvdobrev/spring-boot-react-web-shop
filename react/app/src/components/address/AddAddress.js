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

            navigate(`/profile`);

        } catch (error) {
            console.error('Error adding clothes:', error);
        }
    };

    useEffect(() => {
        setFormData({ ...formData, user: user });
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="p-4 bg-light rounded shadow col-md-4">
                <h2>Add Address</h2>

                <div className="form-group col-md-12">
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={onChange}
                        placeholder="country"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group col-md-12">
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={onChange}
                        placeholder="city"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group col-md-12">
                    <label>Street:</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={onChange}
                        placeholder="street"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group col-md-12">
                    <label>Street number:</label>
                    <input
                        type="text"
                        name="streetNumber"
                        value={formData.streetNumber}
                        onChange={onChange}
                        placeholder="street number"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group col-md-12">
                    <label>Post code:</label>
                    <input
                        type="text"
                        name="postCode"
                        value={formData.postCode}
                        onChange={onChange}
                        placeholder="post code"
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Address
                </button>
            </form>
        </div>
    );
};

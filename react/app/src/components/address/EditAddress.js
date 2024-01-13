import axios from "axios";
import { useContext, useEffect, useState } from "react";
import springUrl from "../springUrl";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

export const EditAddress = () => {

    const navigate = useNavigate();

    const { addressId } = useParams();
    const { userData } = useContext(UserContext);

    const [address, setAddress] = useState({});
    const [error, setError] = useState('');

    const url = `/address/edit/${addressId}`;

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
            // Send a PUT request to your Spring Boot backend
            const response = await axios.put(springUrl + url, formData);

            if (response.status === 200) {
                // Successfully updated the item, navigate to the item details page
                navigate(`/profile`);
            } else {
                console.error('Error updating address:', response.data);
            }

        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const getAddressById = () => {
        fetch(`${springUrl}/address/edit/${addressId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setAddress(data);

                setFormData({
                    country: data.country || '',
                    city: data.city || '',
                    street: data.street || '',
                    streetNumber: data.streetNumber || '',
                    postCode: data.postCode || '',
                    user: userData || {},
                });
            })
            .catch((error) => {
                setError(error);
            });
    }

    useEffect(() => {
        setFormData({ ...formData, user: userData });
    }, []);

    useEffect(() => {

        getAddressById();
    }, [addressId]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="p-4 bg-light rounded shadow col-md-4">
                <h2>Edit Address</h2>

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
                    Edit Address
                </button>
            </form>
        </div>
    );
};

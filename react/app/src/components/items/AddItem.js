import { useContext, useState } from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ClothesContext } from "../../context/ClothesContext";
import springUrl from "../springUrl";


export const AddItem = () => {

    const { updateClothes } = useContext(ClothesContext);

    const url = '/addClothes';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        gender: '',
        color: '',
        description: '',
        img_link: '',
        price: '',
        quantity: '',
        size: '',
        type: '',

    });

    const [isPriceValid, setIsPriceValid] = useState(false)
    const [priceError, setPriceError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isPriceValid) {
            return
        }

        try {

            const response = await axios.post(springUrl + url, formData);

            if (response.status === 201) {
                updateClothes(response.data);
            }

            navigate(`/`);

        } catch (error) {
            console.error('Error adding clothes:', error);
        }
    };

    const priceValidation = (e) => {
        const value = e.target.value;

        // Check if the value is a valid positive floating-point number with two decimal places
        const isValid = /^\d+\.\d{2}$/.test(value);

        if (isValid) {
            setIsPriceValid(true);
            setPriceError(""); // Clear the price error message
        } else {
            setIsPriceValid(false);
            setPriceError(
                "Price must be a valid positive floating-point number with exactly two decimal places."
            );
        };
    };


    return (
        <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={onSubmit} className="p-4 bg-light rounded shadow col-md-4">
                <h2>Add Clothes</h2>

                {/* <div className="form-group">
                    <label>Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={onChange}
                        className="form-control"
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div> */}

                <div className="form-group">
                    <label>Color:</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={onChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        type="textarea"
                        name="description"
                        value={formData.description}
                        onChange={onChange}
                        rows="4"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Img Link:</label>
                    <input
                        type="text"
                        name="img_link"
                        value={formData.img_link}
                        onChange={onChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={onChange}
                        onBlur={(e) => priceValidation(e)}
                        className="form-control"
                        required
                    />
                    {priceError && (
                        <div style={{ color: "red" }}>{priceError}</div>
                    )}
                </div>

                {/* <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={onChange}
                        className="form-control"
                        required
                    />
                </div> */}

                <div className="form-group">
                    <label>Size:</label>
                    <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={onChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={onChange}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>
        </div>
    );
};
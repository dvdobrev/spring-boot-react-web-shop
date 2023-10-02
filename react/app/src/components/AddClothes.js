import { useState } from "react";

import axios from 'axios';
import baseUrl from "./baseUrl";
import { useNavigate } from "react-router-dom";


export const AddClothes = () => {

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to your Spring Boot backend
            const response = await axios.post(baseUrl + url, formData);

            // Clear the form after successful submission
            setFormData({
                gender: '',
                color: '',
                description: '',
                img_link: '',
                price: '',
                quantity: '',
                size: '',
                type: '',
            });
            navigate(`/`);

        } catch (error) {
            console.error('Error adding clothes:', error);
        }
    };


    return (
        <div>
            <h2>Add Clothes</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label>Color:</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        type="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div>
                    <label>Img Link:</label>
                    <input
                        type="text"
                        name="img_link"
                        value={formData.img_link}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Quantity:</label>
                    <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Size:</label>
                    <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Add</button>
            </form>
        </div>
    );
};
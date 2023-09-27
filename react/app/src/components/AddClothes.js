import { useState } from "react";

import axios from 'axios';
import baseUrl from "./baseUrl";


export const AddClothes = () => {

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
        e.preventDefault(); console.log();

        try {
            // Send a POST request to your Spring Boot backend
            const response = await axios.post(baseUrl, formData);

            // Handle the response as needed
            console.log('Country added:', response.data);

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
        } catch (error) {
            console.error('Error adding country:', error);
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
                    <input
                        type="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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
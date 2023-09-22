import { useState } from "react";

import axios from 'axios';


export const AddContry = () => {

    const [formData, setFormData] = useState({
        name: '',
        plz: '',
        city: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); console.log();

        try {
            // Send a POST request to your Spring Boot backend
            const response = await axios.post('http://localhost:8080/countries', formData);

            // Handle the response as needed
            console.log('Country added:', response.data);

            // Clear the form after successful submission
            setFormData({
                name: '',
                plz: '',
                city: '',
            });
        } catch (error) {
            console.error('Error adding country:', error);
        }
    };


    return (
        <div>
            <h2>Add Country</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>PLZ:</label>
                    <input
                        type="text"
                        name="plz"
                        value={formData.plz}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};
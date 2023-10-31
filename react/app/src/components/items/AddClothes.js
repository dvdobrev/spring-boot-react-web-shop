import { useContext, useState } from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ClothesContext } from "../../context/ClothesContext";
import springUrl from "../springUrl";


export const AddClothes = () => {

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

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(springUrl + url, formData);

            // Clear the form after successful submission
            // setFormData({
            //     gender: '',
            //     color: '',
            //     description: '',
            //     img_link: '',
            //     price: '',
            //     quantity: '',
            //     size: '',
            //     type: '',
            // });

            if (response.status === 201) {
                updateClothes(response.data);
            }

            navigate(`/`);

        } catch (error) {
            console.error('Error adding clothes:', error);
        }
    };


    return (
        <div>
            <h2>Add Clothes</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={onChange}
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
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        type="textarea"
                        name="description"
                        value={formData.description}
                        onChange={onChange}
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
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <label>Quantity:</label>
                    <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <label>Size:</label>
                    <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={onChange}
                        required
                    />
                </div>

                <button type="submit">Add</button>
            </form>
        </div>
    );
};
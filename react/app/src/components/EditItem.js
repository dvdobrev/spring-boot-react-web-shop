import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "./baseUrl";
import axios from "axios";


export const EditItem = () => {

    const { itemId } = useParams();

    const [item, setItem] = useState({});
    const [error, setError] = useState('');

    const navigate = useNavigate();

    let url = `/clothes/edit/${itemId}`;

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

    const getItemById = () => {
        fetch(`${baseUrl}/clothes/edit/${itemId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setItem(data);

                setFormData({
                    gender: data.gender || '',
                    color: data.color || '',
                    description: data.description || '',
                    img_link: data.img_link || '',
                    price: data.price || '',
                    quantity: data.quantity || '',
                    size: data.size || '',
                    type: data.type || '',
                });
            })
            .catch((error) => {
                setError(error);
            });
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a PUT request to your Spring Boot backend
            const response = await axios.put(baseUrl + url, formData);

            if (response.status === 200) {
                // Successfully updated the item, navigate to the item details page
                navigate(`/clothes/details/${itemId}`);
            } else {
                console.error('Error updating item:', response.data);
            }

        } catch (error) {
            console.error('Error adding clothes:', error);
        }
    };

    useEffect(() => {

        getItemById();
    }, [itemId]);

    return (
        <div>
            <h1>Edit Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        defaultValue={item.gender}
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
                        defaultValue={item.color}
                        onChange={handleChange}

                        required
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        type="text"
                        name="description"
                        defaultValue={item.description}
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
                        defaultValue={item.img_link}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="text"
                        name="price"
                        defaultValue={item.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Quantity:</label>
                    <input
                        type="text"
                        name="quantity"
                        defaultValue={item.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Size:</label>
                    <input
                        type="text"
                        name="size"
                        defaultValue={item.size}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        defaultValue={item.type}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Edit</button>
            </form>
        </div>
    );
};

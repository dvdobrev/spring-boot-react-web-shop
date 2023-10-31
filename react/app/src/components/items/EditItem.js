import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import springUrl from "../springUrl";


export const EditItem = () => {

    const { itemId } = useParams();

    const [item, setItem] = useState({});
    const [error, setError] = useState('');
    const [validPrice, setValidPrice] = useState('false')
    const [priceError, setPriceError] = useState("");

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
        fetch(`${springUrl}/clothes/edit/${itemId}`)
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


    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price') {
            priceValidation(value)
        }

        setFormData({ ...formData, [name]: value });

    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validPrice === 'false') {
            return;
        }

        try {
            // Send a PUT request to your Spring Boot backend
            const response = await axios.put(springUrl + url, formData);

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

    const priceValidation = (value) => {
        const isValid = /^\d+(\.\d{2})$/.test(value);

        if (isValid) {
            setValidPrice("true");
            setPriceError(""); // Clear the price error message
        } else {
            setValidPrice("false");
            setPriceError(
                "Price must be a valid positive floating-point number with two decimal places."
            );
        };
    };

        useEffect(() => {

            getItemById();
        }, [itemId]);

        return (
            <div>
                <h1>Edit Item</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            defaultValue={item.gender}
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
                            defaultValue={item.color}
                            onChange={onChange}

                            required
                        />
                    </div>

                    <div>
                        <label>Description:</label>
                        <textarea
                            type="text"
                            name="description"
                            defaultValue={item.description}
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
                            defaultValue={item.img_link}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            defaultValue={item.price}
                            onChange={onChange}
                            required
                        />
                        {priceError && (
                            <div style={{ color: "red" }}>{priceError}</div>
                        )}
                    </div>

                    <div>
                        <label>Quantity:</label>
                        <input
                            type="text"
                            name="quantity"
                            defaultValue={item.quantity}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Size:</label>
                        <input
                            type="text"
                            name="size"
                            defaultValue={item.size}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Type:</label>
                        <input
                            type="text"
                            name="type"
                            defaultValue={item.type}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <button type="submit">Edit</button>
                </form>
            </div>
        );
    };

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import springUrl from "../springUrl";
import { ClothesContext } from "../../context/ClothesContext";


export const EditItem = () => {

    const { itemId } = useParams();

    const [item, setItem] = useState({});
    const [error, setError] = useState('');
    const [isPriceValid, setIsPriceValid] = useState(false)
    const [priceError, setPriceError] = useState("");

    const navigate = useNavigate();
    const url = `/clothes/edit/${itemId}`;

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

        // if (name === 'price') {
        //     priceValidation(value)
        // }

        setFormData({ ...formData, [name]: value });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('isPriceValid: ', isPriceValid);

        if (!isPriceValid) {
            return
        }

        try {

            // Send a PUT request to your Spring Boot backend
            const response = await axios.put(springUrl + url, formData);

            if (response.status === 200) {
                // navigate(`/clothes/details/${itemId}`);
                window.location.href = `/clothes/details/${itemId}`;
            } else {
                console.error('Error updating item:', response.data);
            }

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
            setPriceError("");
        } else {
            setIsPriceValid(false);
            setPriceError(
                "Price must be a valid positive floating-point number with exactly two decimal places."
            );
        };
    };

        useEffect(() => {

            getItemById();
        }, [itemId]);

        return (
            <div className="d-flex justify-content-center align-items-center">
                <h1>Edit Item</h1>
                <form onSubmit={onSubmit} className="p-4 bg-light rounded shadow col-md-4">
                    {/* <div>
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
                    </div> */}

                    <div className="form-group">
                        <label>Color:</label>
                        <input
                            type="text"
                            name="color"
                            defaultValue={item.color}
                            onChange={onChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            type="text"
                            name="description"
                            defaultValue={item.description}
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
                            defaultValue={item.img_link}
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
                            defaultValue={item.price}
                            onChange={onChange}
                            required
                            onBlur={(e) => priceValidation(e)}
                            className="form-control"
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
                            defaultValue={item.quantity}
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
                            defaultValue={item.size}
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
                            defaultValue={item.type}
                            onChange={onChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <button type="submit">Edit</button>
                </form>
            </div>
        );
    };

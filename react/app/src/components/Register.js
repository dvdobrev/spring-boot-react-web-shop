import axios, { formToJSON } from 'axios';
import baseUrl from "./baseUrl";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import DOMPurify from 'dompurify';
import { UserContext } from '../context/UserContext';


export const Register = () => {

    const { userDataHandler } = useContext(UserContext);


    const url = '/register';
    const navigate = useNavigate();
    const reapeatPasswordErrorMessage = " Passwords do not match!"

    const [errorMessage, setErrorMessage] = useState({
        passwordsMatchMsg: '',
        error: '',
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        city: '',
        address: '',
        houseNumber: '',
        post_code: '',
    });

    // Sanitize user input to prevent script injection
    const sanitizeInput = (input) => {
        const sanitizedInput = DOMPurify.sanitize(input);
        return sanitizedInput;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Sanitize user inputs to prevent script injection
        const sanitizedValue = sanitizeInput(value);
        setFormData({ ...formData, [name]: sanitizedValue });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const passwordMatch = confirmPassword(formData.password, formData.confirmPassword)

        console.log("Password: " + formData.password);
        console.log("Confirm Password: " + formData.confirmPassword);

        if (!passwordMatch) {
            return;
        }

        try {
            // Send a POST request to the Spring Boot backend
            const response = await axios.post(baseUrl + url, formData);

            console.log("Emai: " + formData.email);
            console.log("Password: " + formData.password);

            if (response.status === 201) {
                await userDataHandler({ email: formData.email });
            }

            // Clear the form after successful submission
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                country: '',
                city: '',
                address: '',
                houseNumber: '',
                post_code: '',
            });
            navigate(`/`);

        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const confirmPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setErrorMessage({ ...errorMessage, "passwordsMatchMsg": reapeatPasswordErrorMessage })
            return false
        }

        setErrorMessage({ ...errorMessage, "passwordsMatchMsg": '' })
        return true;
    };

    const hasError = Object.values(errorMessage).find((message) => message !== "");


    return (
        <div>
            <form onSubmit={submitHandler}>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required />
                    </div>

                </div>

                {/* <div className="form-row">

                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Country</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            name="country"
                            placeholder="Country"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            name="city"
                            placeholder="City"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            name="addres"
                            placeholder="Main Street"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">House Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="houseNumber"
                            placeholder="1234"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputZip">Post code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                            name="postcode"
                            placeholder="Post Code"
                            onChange={handleChange}
                        />
                    </div>
                </div> */}
                <button type="submit" className="btn btn-primary">Sign in</button>

                {hasError && (
                    <p>{hasError}</p>
                )}
            </form>
        </div>
    );
};

import axios, { formToJSON } from 'axios';
import baseUrl from "./baseUrl";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DOMPurify from 'dompurify';


export const Login = () => {

    const url = '/login';
    const navigate = useNavigate();
    const inputErrorMessage = "The username or password are incorrect!"

    const [errorMessage, setErrorMessage] = useState({
        inputMessage: '',
        error: '',
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        console.log("Email: " + formData.email);
        console.log("Password: " + formData.password);

        try {
            // Send a POST request to the Spring Boot backend
            const response = await axios.post(baseUrl + url, formData);

            // Clear the form after successful submission
            setFormData({
                email: '',
                password: '',
            });
            navigate(`/`);

        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const confirmPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setErrorMessage({ ...errorMessage, "inputMessage": inputErrorMessage })
            return false
        }

        setErrorMessage({ ...errorMessage, "inputMessage": '' })
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

                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>

                {hasError && (
                    <p>{hasError}</p>
                )}
            </form>
        </div>
    );
};

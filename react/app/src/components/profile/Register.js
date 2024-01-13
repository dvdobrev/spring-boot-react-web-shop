import axios, { formToJSON } from 'axios';
import springUrl from "../springUrl";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import DOMPurify from 'dompurify';
import { UserContext } from '../../context/UserContext';


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
            const response = await axios.post(springUrl + url, formData);

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
            navigate(`/login`);

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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={submitHandler} className="p-4 bg-light rounded shadow col-md-4">
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="inputPassword4">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="inputPassword4">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    Sign in
                </button>

                {hasError && <p>{hasError}</p>}
            </form>
        </div>
    );
};

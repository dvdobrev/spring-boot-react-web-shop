import axios, { formToJSON } from 'axios';
import springUrl from "../springUrl";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import DOMPurify from 'dompurify';
import { UserContext } from '../../context/UserContext';


export const Login = () => {

    const url = '/login';
    const navigate = useNavigate();
    const inputErrorMessage = "The username or password are incorrect!"

    const { userDataHandler } = useContext(UserContext);


    const [errorMessage, setErrorMessage] = useState({
        inputMessage: '',
        error: '',
    });

    const [userData, setUserData] = useState({});

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

        try {
            // Send a POST request to the Spring Boot backend
            const response = await axios.post(springUrl + url, formData);

            const userObject = response.data[0];

            if (typeof userObject === 'object') {
                const user = userObject;
                userDataHandler(user);

                // Clear the form after successful submission
                setFormData({
                    email: '',
                    password: '',
                });
                navigate(`/`);

            } else {
                setErrorMessage(response);
                return false;
            }

        } catch (error) {
            setErrorMessage({ "inputMessage": 'The email is not valid' })
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
                </div>

                <button type="submit" className="btn btn-primary">
                    Sign in
                </button>

                {hasError && <p>{hasError}</p>}
            </form>
        </div>
    );
};

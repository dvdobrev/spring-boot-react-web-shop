import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import springUrl from "../springUrl";
import { useNavigate } from "react-router-dom";



export const EditProfile = () => {

    const { userData, userDataHandler } = useContext(UserContext);

    const url = `/profile/edit`;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerId: userData.customerId,
        isEnabled: userData.isEnabled,
        userRole: userData.userRole,
        // gender: '',
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
    });



    const onBlur = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a PUT request to your Spring Boot backend
            const response = await axios.put(springUrl + url, formData);

            if (response.status === 200) {
                // Successfully updated the item, navigate to the item details page
                userDataHandler(formData)
                navigate(`/profile`);
            } else {
                console.error('Error updating item:', response.data);
            }

        } catch (error) {
            console.error('Error adding clothes:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="p-4 bg-light rounded shadow col-md-4">
                <h1>Edit Your Profile</h1>

                <div className="form-group">
                    <label>Firstname:</label>
                    <input
                        type="text"
                        name="firstName"
                        defaultValue={userData.firstName}
                        onBlur={onBlur}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Lastname:</label>
                    <input
                        type="text"
                        name="lastName"
                        defaultValue={userData.lastName}
                        onBlur={onBlur}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={userData.email}
                        onBlur={onBlur}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Edit
                </button>
            </form>
        </div>
    );
};

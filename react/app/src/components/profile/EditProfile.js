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
        customer_id: userData.customer_id,
        isEnabled: userData.isEnabled,
        userRoles: userData.userRole,
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
        <div>
            <h1>Your Profile</h1>
            <form onSubmit={onSubmit}>
                {/* <div>
                    <label>gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        // defaultValue=""
                        onBlur={onBlur}
                        required
                    >
                        <option value="" hidden>
                            Choose gender
                        </option>
                        <optgroup label="Choose gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </optgroup>
                    </select>
                </div> */}

                <div>
                    <label>Firstname:</label>
                    <input
                        type="text"
                        name="firstName"
                        defaultValue={userData.firstName}
                        onBlur={onBlur}

                        required
                    />
                </div>

                <div>
                    <label>Lastname:</label>
                    <input
                        type="text"
                        name="lastName"
                        defaultValue={userData.lastName}
                        onBlur={onBlur}

                        required
                    />
                </div>

                <div>
                    <label>EmaiL:</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={userData.email}
                        onBlur={onBlur}
                        required
                    />
                </div>

                <button type="submit">Edit</button>
            </form>
        </div>

    );
};

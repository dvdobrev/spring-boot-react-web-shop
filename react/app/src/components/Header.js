import { useContext, useEffect, useState } from 'react';
import headerCSS from '../components/header.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ClothesContext } from '../context/ClothesContext';


//TODO: Make login with google account

//TODO: Make the spring security configuration

//TODO: The buttons for the card carousel

//TODO: Make the css for cards 

//TODO: Make Footer

//TODO: Delete all console.log

//TODO: Make the price validation when the project is done (seen the commented code in EditItem)

//TODO: Delete all <h1> Tags auf de seite like (Home, Filter Page ....)

// Keep it for the project description. You can describe what you did in yor project
//TODO: ERLEDIGT Get the token, in the intellij and check if it expiered, if it is, delete the user and the token
//TODO: ERLEDIGT make delete customer if its not validated


export const Header = () => {

    const { userData } = useContext(UserContext);
    console.log('userData: ', userData);

    const { clothesFilter } = useContext(ClothesContext);

    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();


    const searchHandler = (e) => {
        e.preventDefault();
        clothesFilter(searchQuery);
        navigate(`/filter`);
    };

    return (
        <nav id={headerCSS["navbar"]} className="navbar navbar-expand-lg navbar-light container-fluid">
            <NavLink className="nav-link" to="/">
                Logo
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id={headerCSS["navbar-nav"]}>

                {userData?.email && <span id={headerCSS["welcomeSpan"]} >Hello {userData.email}</span>}

                <ul className="navbar-nav ml-auto">

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                    </li>

                    {userData.userRole === "ADMIN" &&
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/addClothes">
                                Add Clothes
                            </NavLink>
                        </li>}

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/offers">
                            Offers
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">
                            About Us
                        </NavLink>
                    </li>

                    {!userData.email ?
                        <div className="navbar-nav ml-auto">
                            <li>
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">
                                    Register
                                </NavLink>
                            </li>
                        </div>
                        :
                        <div className="navbar-nav ml-auto">

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">
                                    Profile
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/shoppingCart">
                                    Shoppingcart
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">
                                    Logout
                                </NavLink>
                            </li>
                        </div>
                    }

                </ul>
                <input
                    className="mr-2 col-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                />
                <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="button"
                    onClick={searchHandler}
                >
                    Search
                </button>
            </div>
        </nav>
    );
};

import { useContext } from 'react';
import headerCSS from '../components/header.module.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';



//TODO: Make the delete button to be hide if its not admin in Item details

//TODO: Make input validation in the items, for example string instead of int

//TODO: Make profile page with CRUD

//TODO: make form to add address

//TODO: The buttons for the card carousel

//TODO: Make shopping cart page

//TODO: Make add product to shopping cart

//TODO: Make buy product

//TODO: Make pdf invoice

//TODO: Make the css for cards 

//TODO: Make the search bar in the nav

//TODO: Make Footer

//TODO: Make the spring security configuration

//TODO: Delete all console.log


export const Header = () => {

    const { userData } = useContext(UserContext);
    console.log('userData: ', userData);
    console.log("UserRole: " + userData.userRole);



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

                {userData?.email && <span id={headerCSS["welcomeSpan"]} >Hello {userData.firstName}  {userData.lastName}!</span>}

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
                                <NavLink className="nav-link" to="/shopping-cart">
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
                <form className={`form-inline my-2 my-lg-0 ${headerCSS["header-form"]}`}>
                    <input
                        className="form-control mr-2" // Add the mr-2 class here
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </nav>
    );
};

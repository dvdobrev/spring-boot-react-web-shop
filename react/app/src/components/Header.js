import headerCSS from '../components/header.module.css';
import { NavLink } from 'react-router-dom';

//TODO: Make RouterGuard and page not found

//TODO: Make Footer

// TODO: Make login, register (with address), logout 

//TODO: Make the home page

//TODO: Make profile page with CRUD

//TODO: Make shopping cart page

//TODO: Make add product to shopping cart

//TODO: Make buy product

//TODO: Make pdf invoice

// TODO: Make 


export const Header = () => {
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
                <ul className="navbar-nav ml-auto">

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                    </li>

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

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">
                            Profile
                        </NavLink>
                    </li>

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

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/shopping-cart">
                            Shoppingcart
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            Logout
                        </NavLink>
                    </li>

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

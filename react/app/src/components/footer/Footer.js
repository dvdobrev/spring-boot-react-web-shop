import '@fortawesome/fontawesome-free/css/all.min.css';


import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container text-center">
                <div className="row">
                    {/* About Us */}
                    <div className="col-md-4">
                        <h4>About Us</h4>
                        <ul className="list-unstyled">
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div className="col-md-4">
                        <h4>Help</h4>
                        <ul className="list-unstyled">
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Find Us */}
                    <div className="col-md-4">
                        <h4>Find Us</h4>
                        <div className="social-icons d-flex justify-content-evenly align-items-center">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white mr-3">
                                <i className="fab fa-facebook-f fa-lg"></i>
                            </a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white mr-3">
                                <i className="fab fa-linkedin-in fa-lg"></i>
                            </a>
                            <a href="https://www.xing.com/" target="_blank" rel="noopener noreferrer" className="text-white mr-3">
                                <i className="fab fa-xing fa-lg"></i>
                            </a>
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-white">
                                <i className="fab fa-github fa-lg"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

import { useState, useEffect } from "react";
import axios from "axios";

//TODO: Make the delete request

export const Home = () => {


    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/countries')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the data received from the API
                setCountries(data);
            })
            .catch(error => {
                // Handle any errors that occur
                setError(error);
            });
    }, []); // The empty dependency array means this effect runs once after initial render

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>List of Countries</h1>
            <ul>
                {countries.map(country => (
                    <div>
                        <li key={country.id}>Name: {country.name}</li>
                        <li key={country.id}>ID: {country.id}</li>
                    </div>

                ))}
            </ul>
        </div>
    );
};

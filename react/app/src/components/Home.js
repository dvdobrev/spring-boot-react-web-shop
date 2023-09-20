import { useState, useEffect } from "react";
import axios from "axios";

//TODO: Make the delete request

export const Home = () => {
    const [name, setName] = useState('');
    const [allColors, setAllColors] = useState([]);
    const [color, setColor] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (e) => {
        axios
            .get("http://localhost:8080/data")
            .then((response) => {
                setName(response.data.name.name);
                setAllColors(response.data.data.colors);
                console.log("Response: " + response.data.data.colors);
                console.log('color: ', allColors);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const updateName = async (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:8080/data", { name: name })
            .then(() => {
                console.log("Name updated successfully.");
            })
            .catch((error) => {
                console.error("Failed to update name:", error);
            });
    };

    const addColor = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/data", { colors: color })
            .then(() => {
                console.log("Color added successfully.");
                fetchData();
                setColor("");
            })
            .catch((error) => {
                console.error("Failed to add color:", error);
            });
    };

    return (
        <>
            <h1>Hello from Home</h1>
            <h1>Name: {name}</h1>
            {allColors.map((color, index) =>
                <h1 key={index}>Color: {color} </h1>)}

            <form onSubmit={updateName}>
                <label htmlFor="name">Add Name
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button type="submit">Change name</button>
            </form>

            <form onSubmit={addColor}>
                <label htmlFor="color">Color
                    <input
                        type="text"
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </label>
                <button type="submit">Set Color</button>
            </form>
        </>
    );
};

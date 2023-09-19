import { useState, useEffect } from "react";

export const Home = () => {

    const [name, setName] = useState('default name');
    console.log('name: ', name);

    useEffect(() => {
        fetch("http://localhost:8080/name")
            .then(response => response.json())
            .then((result) => { setName(result.name);              
            })
    }, []);

    return (
        <h1>Hello from {name}</h1>
    );
};

import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import baseUrl from "./baseUrl";

import axios from "axios";

import cardsCSS from "../components/cards.module.css";

export const Home = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
            slidesToSlide: 1

        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    let fetchURL = "/clothes";

    const [clothes, setClothes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        fetch(baseUrl + fetchURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setClothes(data);
            })
            .catch((error) => {
                setError(error);
            });
    }


    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteClothe(id);
        };
    };


    const deleteClothe = async (id) => {
        try {
            // Send a DELETE request using an API library like Axios or Fetch
            // Replace the API endpoint with your actual endpoint
            const response = await axios.delete(`${baseUrl}/clothes/${id}`, {
            });

            if (response.status === 200) {
                // Delete was successful, you can update your UI accordingly
                console.log(`Clothe with ID ${id} deleted.`);
                getItems();

            } else {
                console.error(`Failed to delete clothe with ID ${id}`);
            }
        } catch (error) {
            console.error('Error deleting clothe:', error);
        }
    };


    return (

        <div>
            <Carousel
                responsive={responsive}
                showDots={true}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all 2.5"
                transitionDuration={2000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"

            >
                {clothes.map(clothe => {

                    return (
                        <div key={clothe.id} className={`card ${cardsCSS["cards"]}`}>
                            <img
                                className={`card-img-top ${cardsCSS["card-img"]}`}
                                src={clothe.img_link}
                                alt="Card Image"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Name: {clothe.type}</h5>
                                {/* <p className="card-text">Type: {clothes.type}</p> */}
                                <p className="card-text">Price: {clothe.price}</p>
                                <p className="card-text">Description (ID): {clothe.id}</p>
                                <button className="btn btn-primary">Add to Cart</button>d
                                <button onClick={() => deleteHandler(clothe.id)} className="btn btn-primary">Delete Item</button>d
                            </div>
                        </div>
                    )
                })}

            </Carousel>
        </div>
    );
};

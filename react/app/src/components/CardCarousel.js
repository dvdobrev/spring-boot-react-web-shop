import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import baseUrl from "./baseUrl";

import cardsCSS from "../components/cards.module.css";

export const CardCarousel = () => {
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

    const [clothes, setClothes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the API and set the clothes state
        fetch(baseUrl)
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
    }, []);




    const sliderImageUrl = [
        //First image url
        {
            url:
                "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1"
        },
        {
            url:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*"
        },
        //Second image url
        {
            url:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*"
        },
        //Third image url
        {
            url:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU"
        },

        //Fourth image url

        {
            url:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU"
        }
    ];

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
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                )})}

            </Carousel>
        </div>
    );
};

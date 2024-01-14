import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useContext, useEffect, useState } from "react";


import cardsCSS from "../components/cards.module.css";
import { ClothesContext } from "../context/ClothesContext";
import { ClothesItem } from "./items/ClothesItem";

export const Home = () => {

    const { clothes, addedToCart, setAddedToCart } = useContext(ClothesContext);


    const responsive = {
        superLargeDesktop: {
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

    useEffect(() => {
        if (addedToCart) {
            const timeoutId = setTimeout(() => {
                setAddedToCart(false);
            }, 4000);

            return () => clearTimeout(timeoutId); // Cleanup the timeout when the component unmounts
        }
    }, [addedToCart]);


    return (

        <div>
            {addedToCart && <span style={{
                color: 'yellow',
                backgroundColor: 'grey',
                fontSize: '4vh'
            }}>
                Item added in the shoppingcart
            </span>}

            <Carousel
                responsive={responsive}
                showDots={true}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all 2.5"
                // transitionDuration={2000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
            >
                {clothes.map((cloth) => (
                    <ClothesItem key={cloth.itemId} cloth={cloth} />
                ))}
            </Carousel>
        </div>

    );
};

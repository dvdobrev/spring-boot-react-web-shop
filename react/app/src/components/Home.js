import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useContext, useEffect, useState } from "react";
import baseUrl from "./baseUrl";

import axios from "axios";

import cardsCSS from "../components/cards.module.css";
import { ClothesContext } from "../context/ClothesContext";
import { ClothesItem } from "./ClothesItem";

export const Home = () => {

    const { clothes } = useContext(ClothesContext);

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


    return (

        <div>
            <h1>Home</h1>
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
                {clothes.map(cloth => <ClothesItem key={cloth.id} cloth={cloth} />

                )}

            </Carousel>
        </div>
    );
};

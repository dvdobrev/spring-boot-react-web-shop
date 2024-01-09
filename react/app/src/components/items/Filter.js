import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useContext } from "react";


import cardsCSS from "../../components/cards.module.css";
import { ClothesContext } from "../../context/ClothesContext";
import { ClothesItem } from "./ClothesItem";
import { useNavigate } from "react-router-dom";

export const Filter = () => {

    const { filteredItems } = useContext(ClothesContext);
    const navigate = useNavigate();


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

    const backToHomeHandler = () => {
        navigate(`/`);
    };


    return (

        <div>
            <h1>Filter Page</h1>
            {filteredItems.length > 0 ? (
                <Carousel
                    responsive={responsive}
                    showDots={true}
                    ssr={true}
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
                    {filteredItems.map((cloth) => (
                        <ClothesItem key={cloth.itemId} cloth={cloth} />
                    ))}
                </Carousel>

            ) : (
                <h3>No items found for your search!!!</h3>
            )}

            <button onClick={backToHomeHandler}>
                Alle Artikel anzeigen
            </button>
        </div>

    );
};

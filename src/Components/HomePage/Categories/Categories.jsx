//importing necessary libraries and styles
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import image1 from "../../../assets/images/manure.jpg";
import image2 from "../../../assets/images/compost.jpg";
import image3 from "../../../assets/images/herbicide.jpg";
import image4 from "../../../assets/images/gypsum.jpg";
import image5 from "../../../assets/images/herbicide.jpg";
import image6 from "../../../assets/images/fungiside.jpg";
import image7 from "../../../assets/images/biochar.jpg";

// This component displays a slider of categories with images and names. Clicking on a category navigates to the product listing page for that category.
const categories = [
    { name: "Manure", image: image1 },
    { name: "Compost", image: image2 },
    { name: "Insecticides", image: image3 },
    { name: "Gypsum", image: image4 },
    { name: "Herbicides", image: image5 },
    { name: "Fungicides", image: image6 },
    // { name: "Biochar ", image: image7 },

];

// This component handles the slider functionality and navigation to product listings based on selected categories.
const CategoriesSlider = () => {
    const navigate = useNavigate();
    const swiperRef = useRef(null);

    // Function to handle category click and navigate to product listing
    const handleCategoryClick = (categoryName) => {
        navigate(`/Listing?category=${categoryName}`);
    };

    // Functions to navigate to the next and previous slides
    const goNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    const goPrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    return (
        //main container for the categories slider
        <div className={styles.container}>

            {/* Header with title and navigation buttons */}
            <div className={styles.headerContainer}>
                <h1 className={styles.hd}>Categories</h1>

                {/* // Navigation buttons for previous and next slides */}
                <div className={styles.navigationButtons}>
                    {/* //previous button */}
                    <button className={styles.navButton} onClick={goPrev}>
                        <span>&#8592;</span>
                    </button>
                    {/* //next button */}
                    <button className={styles.navButton} onClick={goNext}>
                        <span>&#8594;</span>
                    </button>
                </div>
            </div>
            {/* // Swiper component for the slider functionality */}
            <Swiper
                ref={swiperRef}
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={5} // Adjust as needed
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                className={styles.swiper}
            >

                {/* // Mapping through categories to create slides */}
                {categories.map((category, index) => (
                    <SwiperSlide
                        key={index}
                        className={styles.slide}
                        onClick={() => handleCategoryClick(category.name)}
                        style={{ cursor: 'pointer' }}
                    >
                        {/* // Each slide contains an image and category name */}
                        <img
                            src={category.image}
                            alt={category.name}
                            className={styles.category_image}
                        />
                        <p className={styles.category_name}>{category.name}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoriesSlider;


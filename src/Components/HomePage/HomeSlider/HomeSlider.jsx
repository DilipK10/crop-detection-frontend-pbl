//importing necessary libraries and styles
import React, { useRef, useState, useEffect } from "react";
import styles from "./HomeSlider.module.css"; // Custom CSS file
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
    Pagination,
    EffectCoverflow,
    Autoplay,
    Navigation,
} from "swiper/modules";
import { API_URL } from "../../../../config";

// This component displays a slider of images fetched from an API. The slider uses Swiper.js for smooth transitions and autoplay functionality.
const HomeSlider = () => {
    const swiperRef = useRef(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/hero/random-hero-images/`
                );
                const data = await res.json();
                console.log(data);
                if (data.images) {
                    setImages(data.images);
                }
            } catch (error) {
                console.error("Failed to fetch images:", error);
            }
        };

        fetchImages();
    }, []);
    return (
        // Main container for the slider
        <div className={styles.container}>

            <Swiper
                ref={swiperRef}
                modules={[Pagination, EffectCoverflow, Autoplay, Navigation]}
                effect={"coverflow"}
                // grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className={styles.swiper_container}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
            >
               {/* // Mapping through the images array to create slides */}
                {images.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                        {/* // Each slide contains an image */}
                        <img
                            src={imageUrl}
                            className={styles.slideImage}
                            alt={`slider-img-${index}`}
                        />
                    </SwiperSlide>
                ))}
                {/* // Custom navigation buttons for the slider */}
                <div className={`swiper-button-prev ${styles.swiperButtonPrev}`}></div>
                <div className={`swiper-button-next ${styles.swiperButtonNext}`}></div>
            </Swiper>
        </div>
    );
};

export default HomeSlider;

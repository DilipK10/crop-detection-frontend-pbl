import React, { useRef } from "react";
import styles from './HomeSlider.module.css';
 // Custom CSS file
import Slider from "react-slick";
import slide1 from '../../../assets/images/slider-1.png';
import slide2 from '../../../assets/images/slider-2.png';




const HomeSlider = () => {
    var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            fade: true,
            autoplaySpeed: 3000,
            arrows: true,
            accessibility: true, // Enable accessibility
            adaptiveHeight: true, // Ensure height is adjuste 
        
    };
    return (
        <section className={styles.homeSlider}>
            <div className="container-fluid">
                <Slider {...settings} className={styles.home_slider_Main}>
                    <div className={styles.item}>
                    <img src={slide1} alt="slide1" className="w-100" focusable="false" />


                    </div>
                    <div className={styles.item}>
                    <img src={slide2} alt="slide2" className="w-100" focusable="false" />
                    </div>
                </Slider>

            </div>
        </section>
    )
}

export default HomeSlider;

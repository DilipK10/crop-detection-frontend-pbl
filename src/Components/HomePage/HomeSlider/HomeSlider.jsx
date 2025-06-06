import React, { useRef } from "react";
import styles from "./HomeSlider.module.css"; // Custom CSS file
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination, EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import slide1 from "../../../assets/images/slider-1.png";
import slide2 from "../../../assets/images/slider-2.png";

const HomeSlider = () => {
  const swiperRef = useRef(null);

  return (
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
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        <SwiperSlide>
          <img src={slide1} className={styles.slideImage} alt="img_1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} className={styles.slideImage} alt="img_2" />
        </SwiperSlide>
        
        <div className={`swiper-button-prev ${styles.swiperButtonPrev}`}></div>
        <div className={`swiper-button-next ${styles.swiperButtonNext}`}></div>
      </Swiper>
    </div>
  );
};

export default HomeSlider;

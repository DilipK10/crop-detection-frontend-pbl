import React from "react";
import styles from "./Categories.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation ,Autoplay} from "swiper/modules";

import image1 from "../../../assets/images/image1.jpg";
import image2 from "../../../assets/images/img_2.jpg"; 
import image3 from "../../../assets/images/img_3.jpg";
import image4 from "../../../assets/images/img_4.jpg";
import image5 from "../../../assets/images/img_5.jpg";

const categories = [
  { name: "Electronics", image: image1 },
  { name: "Fashion", image: image1 },
  { name: "HomeDecor", image: image1 },
  { name: "Sports", image: image1 },
  { name: "Toys", image: image1 },
  { name: "Electronics", image: image2 },
  { name: "Fashion", image: image1 },
  { name: "HomeDecor", image: image1 },
  { name: "Sports", image: image1 },
  { name: "Toys", image: image1 },
];

const CategoriesSlider = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.hd}>Categories</h1>
        {/* <div className="underLine"></div> */}
      <Swiper
        modules={[Pagination, Navigation,Autoplay]}
        spaceBetween={20}
        slidesPerView={5} // Adjust as needed
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className={styles.swiper}
      
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} className={styles.slide}>
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

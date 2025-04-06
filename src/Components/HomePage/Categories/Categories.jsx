import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import image1 from "../../../assets/images/image1.jpg";
import image2 from "../../../assets/images/img_2.jpg"; 
import image3 from "../../../assets/images/img_3.jpg";
import image4 from "../../../assets/images/img_4.jpg";
import image5 from "../../../assets/images/img_5.jpg";

const categories = [
  { name: "Beverages", image: image1 },
  { name: "Dairy", image: image2 },
  { name: "Grains", image: image3 },
  { name: "Frozen", image: image4 },
  { name: "Electronics", image: image5 },
  { name: "Fashion", image: image1 },
  { name: "HomeDecor", image: image2 },
  { name: "Sports", image: image3 },
  { name: "Toys", image: image4 },
  { name: "Books", image: image5 },
];

const CategoriesSlider = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const handleCategoryClick = (categoryName) => {
    // Navigate to product listing with category parameter
    navigate(`/Listing?category=${categoryName}`);
  };

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
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.hd}>Categories</h1>
        <div className={styles.navigationButtons}>
          <button className={styles.navButton} onClick={goPrev}>
            <span>&#8592;</span>
          </button>
          <button className={styles.navButton} onClick={goNext}>
            <span>&#8594;</span>
          </button>
        </div>
      </div>
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
        {categories.map((category, index) => (
          <SwiperSlide 
            key={index} 
            className={styles.slide}
            onClick={() => handleCategoryClick(category.name)}
            style={{ cursor: 'pointer' }}
          >
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
// import React, { useRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Categories.module.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import { API_URL } from "../../../../config"; // Adjust the import path as necessary

// // Fetching categories dynamically from backend
// const CategoriesSlider = () => {
//   const navigate = useNavigate();
//   const swiperRef = useRef(null);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch categories from backend
//     fetch(`${API_URL}/products/listproducts/`) // Endpoint to fetch categories
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []);

//   const handleCategoryClick = (categoryName) => {
//     navigate(`/products/category/${categoryName}`);
//   };
  

//   const goNext = () => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       swiperRef.current.swiper.slideNext();
//     }
//   };

//   const goPrev = () => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       swiperRef.current.swiper.slidePrev();
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.headerContainer}>
//         <h1 className={styles.hd}>Categories</h1>
//         <div className={styles.navigationButtons}>
//           <button className={styles.navButton} onClick={goPrev}>
//             <span>&#8592;</span>
//           </button>
//           <button className={styles.navButton} onClick={goNext}>
//             <span>&#8594;</span>
//           </button>
//         </div>
//       </div>
//       <Swiper
//         ref={swiperRef}
//         modules={[Pagination, Navigation, Autoplay]}
//         spaceBetween={20}
//         slidesPerView={5}
//         loop={true}
//         autoplay={{
//           delay: 3500,
//           disableOnInteraction: false,
//         }}
//         className={styles.swiper}
//       >
//         {categories.map((category, index) => (
//           <SwiperSlide
//             key={index}
//             className={styles.slide}
//             onClick={() => handleCategoryClick(category.name)}
//             style={{ cursor: "pointer" }}
//           >
//             <img
//               src={category.image} // Assume the category has an image property
//               alt={category.name}
//               className={styles.category_image}
//             />
//             <p className={styles.category_name}>{category.name}</p>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default CategoriesSlider;

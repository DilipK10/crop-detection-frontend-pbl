import React from "react";
import styles from "./TopProduct.module.css"; // Import CSS
import image1 from "../../../../assets/images/image1.jpg";
import image2 from "../../../../assets/images/img_2.jpg";
import image3 from "../../../../assets/images/img_3.jpg";
import image4 from "../../../../assets/images/img_4.jpg";
import image5 from "../../../../assets/images/img_5.jpg";

const TopProduct = ({ title = "Top Products" }) => {
  const products = [
    {
      id: 1,
      name: "Nestle Original Coffee-Mate Coffee Creamer",
      image: image1,
      rating: "⭐⭐⭐⭐ (4.0)",
      price: "$32.85",
      oldPrice: "$33.8",
    },
    {
      id: 2,
      name: "Organic Cage-Free Grade A Large Brown Eggs",
      image: image2,
      rating: "⭐⭐⭐⭐ (4.0)",
      price: "$32.85",
      oldPrice: "$33.8",
    },
    {
      id: 3,
      name: "Seeds of Change Organic Quinoa",
      image: image3,
      rating: "⭐⭐⭐⭐ (4.0)",
      price: "$32.85",
      oldPrice: "$33.8",
    },
    {
      id: 4,
      name: "Naturally Flavored Cinnamon Vanilla Light Roast Coffee",
      image: image4,
      rating: "⭐⭐⭐⭐ (4.0)",
      price: "$32.85",
      oldPrice: "$33.8",
    },
    {
      id: 5,
      name: "Foster Farms Takeout Crispy Classic Buffalo Wings",
      image: image5,
      rating: "⭐⭐⭐⭐ (4.0)",
      price: "$32.85",
      oldPrice: "$33.8",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Title with Underline */}
      <h3 className={styles.heading}>{title}</h3>
      <div className={styles.underline}></div>

      {/* Products List */}
      <div className={styles.products}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productDetails}>
              <h4 className={styles.productName}>{product.name}</h4>
              <p className={styles.rating}>{product.rating}</p>
              <div className={styles.priceContainer}>
                <p className={styles.price}>{product.price}</p>
                <p className={styles.oldPrice}>{product.oldPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProduct;

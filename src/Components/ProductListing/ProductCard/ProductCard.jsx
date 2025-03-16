import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productDetails}>
        <a href="#" className={styles.productName}>{product.name}</a>
        <p className={styles.rating}>{product.rating}</p>
        <div className={styles.priceContainer}>
          <p className={styles.price}>{product.price}</p>
          <p className={styles.oldPrice}>{product.oldPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

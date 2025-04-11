// // TopProduct.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./TopProduct.module.css";

const TopProduct = ({ title = "Top Products", products = [] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <Link to={`/product/${product.id}`} className={styles.productLink}>
                <img src={product.image || "https://via.placeholder.com/200"} alt={product.title} className={styles.productImage} />
                <div className={styles.productDetails}>
                  <p className={styles.productName}>{product.title}</p>
                  <p className={styles.rating}>{product.rating || "⭐⭐⭐⭐ (4.0)"}</p>
                  <div className={styles.priceContainer}>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                    <p className={styles.oldPrice}>${(product.price + 5).toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No top products found.</p>
        )}
      </div>
    </div>
  );
};

export default TopProduct;

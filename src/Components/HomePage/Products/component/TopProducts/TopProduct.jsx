import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TopProduct.module.css";
import {API_URL} from '../../../../../../config'

const TopProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the provided URL
    fetch(`${API_URL}/checkout/TopSellingProductsView/`)
      .then((res) => res.json())
      .then((data) => {
        // Format the data as needed for display
        const formattedData = data.slice(0, 3).map((item) => ({
          id: item.product_id,
          title: item.title,
          image: item.first_image,
          selling_price: item.selling_price,
          mrp: item.cost_price,
          rating: "⭐⭐⭐⭐⭐ (4.8)", // Example rating (can be changed)
        }));
        setProducts(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <Link to={`/product/${product.id}`} className={styles.productLink}>
              <img
                src={product.image || "https://via.placeholder.com/200"}
                alt={product.title}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <p className={styles.productName}>{product.title}</p>
                <p className={styles.rating}>{product.rating}</p>
                <div className={styles.priceContainer}>
                  <p className={styles.price}>₹{product.selling_price.toFixed(2)}</p>
                  <p className={styles.oldPrice}>₹{product.mrp.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProduct;





import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewArrival.module.css'; // This is your provided CSS
import {API_URL} from '../../../../../../config'

const NewArrival = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/recent_products/`);
        const data = await response.json();
        const formattedProducts = data.map((item) => ({
          id: item.product_id,
          title: item.title,
          image: item.first_image,
          selling_price: item.selling_price,
          mrp: item.cost_price,
        }));
        setNewArrivals(formattedProducts);
      } catch (error) {
        console.error('Failed to fetch recent products:', error);
      }
    };

    fetchRecentProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.products}>
      {newArrivals.slice(0, 3).map((product) => (
          <div key={product.id} className={styles.productItem}>
            <Link to={`/product/${product.id}`} className={styles.productLink}>
              <img
                src={product.image || "https://via.placeholder.com/200"}
                alt={product.title}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <p className={styles.productName}>{product.title}</p>
                <div className={styles.rating}>⭐⭐⭐⭐☆</div>
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

export default NewArrival;

import React from "react";
import styles from "./ProductDescription.module.css";
import { useState } from "react";
import i1 from '../../assets/images/img_2.jpg';

const ProductDescription = () =>{
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("60g");
  
    const addToCart = () => {
      alert(`Added ${quantity} item(s) of ${selectedSize} to cart!`);
    };
  
    return (
        <div className={styles.container}>
        <div className={styles.productCard}>
          {/* Product Image */}
          <div className={styles.imageSection}>
            <img
              src={i1}
              alt="Seeds of Change Organic Quinoa, Brown"
              className={styles.productImage}
            />
          </div>
  
          {/* Product Details */}
          <div className={styles.detailsSection}>
            <span className={styles.saleBadge}>Sale Off</span>
            <h2 className={styles.productTitle}>Seeds of Change Organic Quinoa, Brown</h2>
            <p className={styles.reviews}>⭐  ⭐  ⭐  ⭐  ⭐ (32 reviews)</p>
            
            <p className={styles.price}>$38 <span className={styles.oldPrice}>$52</span> <span className={styles.discount}>26% Off</span></p>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rem officia.
            </p>
            
            {/* Size Selection */}
            <div className={styles.sizeSelector}>
              <span>Size / Weight:</span>
              {["50g", "60g", "80g", "100g", "150g"].map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? styles.selectedSize : styles.sizeButton}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            
            {/* Quantity Selector & Add to Cart */}
            <div className={styles.cartActions}>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={styles.quantitySelect}
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
              <button className={styles.addToCart} onClick={addToCart}>🛒 Add to Cart</button>
              <button className={styles.iconButton}>♡</button>
              <button className={styles.iconButton}>⇄</button>
            </div>
            
            {/* Product Info */}
            <div className={styles.productInfo}>
              <p><strong>Type:</strong> Organic</p>
              <p><strong>SKU:</strong> FWM15VKT</p>
              <p><strong>MFG:</strong> Jun 4, 2024</p>
              <p><strong>LIFE:</strong> 70 days</p>
              <p><strong>Tags:</strong> Snack, Organic, Brown</p>
              <p><strong>Stock:</strong> 8 Items In Stock</p>
            </div>
          </div>
        </div>
      </div>
    );
    

}
export default ProductDescription;
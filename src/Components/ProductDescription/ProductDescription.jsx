import React, { useState } from "react";
import styles from "./ProductDescription.module.css";
import i1 from "../../assets/images/img_2.jpg";
import i2 from "../../assets/images/img_3.jpg";
import i3 from "../../assets/images/img_4.jpg";

const ProductDescription = () => {
  const images = [i1, i2, i3];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("60g");
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const addToCart = () => {
    alert(`Added ${quantity} item(s) of ${selectedSize} to cart!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.productCard}>
        {/* Product Image Section */}
        <div className={styles.imageSection}>
          <img src={selectedImage} alt="Product" className={styles.productImage} />
          <div className={styles.thumbnailContainer}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className={selectedImage === img ? styles.activeThumbnail : styles.thumbnail}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className={styles.detailsSection}>
          <span className={styles.saleBadge}>Sale Off</span>
          <h2 className={styles.productTitle}>Seeds of Change Organic Quinoa, Brown</h2>
          <p className={styles.reviews}>⭐ ⭐ ⭐ ⭐ ⭐ (32 reviews)</p>
          <p className={styles.price}>$38 <span className={styles.oldPrice}>$52</span> <span className={styles.discount}>26% Off</span></p>
          <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rem officia.</p>

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

      {/* Detailed Description */}
      <div className={styles.descriptionSection}>
        <h3>Detailed Description</h3>
        <p>
          This organic quinoa is grown using sustainable farming practices and is packed with essential nutrients.
          It is perfect for a healthy diet, easy to cook, and comes with a delightful nutty flavor.
        </p>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviewSection}>
        <h3>Customer Reviews</h3>
        <div className={styles.review}>
          <p><strong>John Doe:</strong> ⭐⭐⭐⭐⭐ "Great quality and taste! Highly recommend."</p>
        </div>
        <div className={styles.review}>
          <p><strong>Jane Smith:</strong> ⭐⭐⭐⭐ "Very good product, but the packaging could be better."</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../CartContext";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event

    // Convert price string to number (remove $ sign)
    const priceValue = parseFloat(product.price.replace('$', ''));
    
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: priceValue,
      quantity: 1
    };
    
    addToCart(cartItem);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className={styles.card} onClick={handleProductClick} style={{ cursor: 'pointer' }}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productDetails}>
        <div className={styles.productName}>{product.name}</div>
        <p className={styles.rating}>{product.rating}</p>
        <div className={styles.priceContainer}>
          <p className={styles.price}>{product.price}</p>
          <p className={styles.oldPrice}>{product.oldPrice}</p>
        </div>
        <button 
          className={styles.addToCartButton} 
          onClick={handleAddToCart}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

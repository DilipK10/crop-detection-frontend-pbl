// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../../CartContext";
// import styles from "./ProductCard.module.css";

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);

//   const handleProductClick = () => {
//     navigate(`/product/${product.id}`);
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation(); // Prevent triggering the card click event

//     // Convert price string to number (remove $ sign)
//     const priceValue = parseFloat(product.price.replace('$', ''));
    
//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       image: product.image,
//       price: priceValue,
//       quantity: 1
//     };
    
//     addToCart(cartItem);
//     alert(`${product.name} added to cart!`);
//   };

//   return (
//     <div className={styles.card} onClick={handleProductClick} style={{ cursor: 'pointer' }}>
//       <img src={product.image} alt={product.name} className={styles.productImage} />
//       <div className={styles.productDetails}>
//         <div className={styles.productName}>{product.name}</div>
//         <p className={styles.rating}>{product.rating}</p>
//         <div className={styles.priceContainer}>
//           <p className={styles.price}>{product.price}</p>
//           <p className={styles.oldPrice}>{product.oldPrice}</p>
//         </div>  
//         <button 
//           className={styles.addToCartButton} 
//           onClick={handleAddToCart}
//         >
//           🛒 Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
      const response = await fetch('http://127.0.0.1:8000/cart/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}` // assuming JWT auth
        },
        body: JSON.stringify({
          productID: product.id,
          quantity: 1
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to add to cart');
      }

      alert(`${product.title} added to cart!`);
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Failed to add product to cart');
    }
  };

  return (
    <>
    
    <div className={styles.card} onClick={handleProductClick} style={{ cursor: 'pointer' }}>
      <img src={product.image_paths} alt={product.title} className={styles.productImage} />
      <div className={styles.productDetails}>
        <div className={styles.productName}>{product.title}</div>
        <p className={styles.brandName}>{product.brand_name}</p>
        <div className={styles.priceContainer}>
          <p className={styles.price}>₹{product.selling_price}</p>
        </div>
        <button 
          className={styles.addToCartButton} 
          onClick={handleAddToCart}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
    </>
  );
};

export default ProductCard;

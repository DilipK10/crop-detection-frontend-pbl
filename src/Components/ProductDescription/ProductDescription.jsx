import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";
import styles from "./ProductDescription.module.css";
import i1 from "../../assets/images/image1.jpg";
import i2 from "../../assets/images/img_2.jpg";
import i3 from "../../assets/images/img_3.jpg";
import i4 from "../../assets/images/img_4.jpg";
import i5 from "../../assets/images/img_5.jpg";

const products = [
  { 
    id: 1, 
    name: "Nestle Original Coffee-Mate Coffee Creamer", 
    images: [i1, i2, i3], 
    price: "$32.85", 
    oldPrice: "$33.8", 
    description: "A rich, smooth, and creamy coffee creamer that enhances your coffee experience. Perfect for every coffee lover!" 
  },
  { 
    id: 2, 
    name: "Organic Cage-Free Grade A Large Brown Eggs", 
    images: [i2, i3, i4], 
    price: "$32.85", 
    oldPrice: "$33.8", 
    description: "Fresh, organic, cage-free brown eggs packed with protein and nutrients. Perfect for a healthy breakfast." 
  },
  { 
    id: 3, 
    name: "Seeds of Change Organic Quinoa", 
    images: [i3, i4, i5], 
    price: "$32.85", 
    oldPrice: "$33.8", 
    description: "A nutritious and delicious organic quinoa packed with essential amino acids and fibers. A great addition to your diet." 
  },
  { 
    id: 4, 
    name: "Seeds of Change Organic Quinoa", 
    images: [i1, i4, i5], 
    price: "$32.85", 
    oldPrice: "$33.8", 
    description: "A nutritious and delicious organic quinoa packed with essential amino acids and fibers. A great addition to your diet." 
  },
  { 
    id: 5, 
    name: "Seeds of Change Organic Quinoa", 
    images: [i2, i4, i5], 
    price: "$32.85", 
    oldPrice: "$33.8", 
    description: "A nutritious and delicious organic quinoa packed with essential amino acids and fibers. A great addition to your diet." 
  }
];


const ProductDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  const images = [product.image];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("60g");
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [reviews, setReviews] = useState([
    { name: "Alice", rating: "⭐⭐⭐⭐⭐", comment: "Excellent quality! Will buy again." },
    { name: "Bob", rating: "⭐⭐⭐⭐", comment: "Good product but slightly expensive." },
  ]);

  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const addToCart = () => {
    alert(`Added ${quantity} item(s) of ${selectedSize} to cart!`);
    navigate("/cart");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewName && reviewComment) {
      setReviews([...reviews, { name: reviewName, rating: "⭐⭐⭐⭐⭐", comment: reviewComment }]);
      setReviewName("");
      setReviewComment("");
    } else {
      alert("Please enter your name and review.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productCard}>
      <div className={styles.imageSection}>
          <img src={selectedImage} alt="Product" className={styles.productImage} />
          <div className={styles.thumbnailContainer}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={selectedImage === img ? styles.activeThumbnail : styles.thumbnail}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className={styles.detailsSection}>
          <span className={styles.saleBadge}>Sale Off</span>
          <h2 className={styles.productTitle}>{product.name}</h2>
          <p className={styles.reviews}>⭐ ⭐ ⭐ ⭐ ⭐ (32 reviews)</p>
          <p className={styles.price}>{product.price} <span className={styles.oldPrice}>{product.oldPrice}</span> <span className={styles.discount}>10% Off</span></p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.sizeSelector}>
            <span>Size / Weight:</span>
            {["50g", "60g", "80g", "100g", "150g"].map((size) => (
              <button key={size} className={selectedSize === size ? styles.selectedSize : styles.sizeButton} onClick={() => setSelectedSize(size)}>
                {size}
              </button>
            ))}
          </div>

          <div className={styles.cartActions}>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className={styles.quantitySelect}>
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
            <button className={styles.addToCart} onClick={addToCart}>🛒 Add to Cart</button>
            <button className={styles.iconButton}>♡</button>
            <button className={styles.iconButton}>⇄</button>
          </div>
        </div>
      </div>

      {/* Detailed Description Section */}
      <div className={styles.descriptionSection}>
        <h3>Product Details</h3>
        <p>{product.description}</p>
      </div>

      {/* Review Section */}
      <div className={styles.reviewSection}>
        <h3>Customer Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className={styles.review}>
              <p><strong>{review.name}</strong> {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        {/* Review Form */}
        <h3>Write a Review</h3>
        <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
          <input
            type="text"
            placeholder="Your Name"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            className={styles.reviewInput}
          />
          <textarea
            placeholder="Write your review..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className={styles.reviewTextarea}
          ></textarea>
          <button type="submit" className={styles.submitReviewButton}>Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDescription;

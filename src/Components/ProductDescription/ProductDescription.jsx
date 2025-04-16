// import React, { useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../CartContext";
// import styles from "./ProductDescription.module.css";
// import i1 from "../../assets/images/image1.jpg";
// import i2 from "../../assets/images/img_2.jpg";
// import i3 from "../../assets/images/img_3.jpg";
// import i4 from "../../assets/images/img_4.jpg";
// import i5 from "../../assets/images/img_5.jpg";

// const products = [
//   { 
//     id: 1, 
//     name: "Nestle Original Coffee-Mate Coffee Creamer", 
//     images: [i1, i2, i3], 
//     price: "$32.85", 
//     oldPrice: "$33.8", 
//     description: "A rich, smooth, and creamy coffee creamer that enhances your coffee experience. Perfect for every coffee lover!" 
//   },
//   { 
//     id: 2, 
//     name: "Organic Cage-Free Grade A Large Brown Eggs", 
//     images: [i2, i3, i4], 
//     price: "$32.85", 
//     oldPrice: "$33.8", 
//     description: "Fresh, organic, cage-free brown eggs packed with protein and nutrients. Perfect for a healthy breakfast." 
//   },
//   { 
//     id: 3, 
//     name: "Seeds of Change Organic Quinoa", 
//     images: [i3, i4, i5], 
//     price: "$32.85", 
//     oldPrice: "$33.8", 
//     description: "A nutritious and delicious organic quinoa packed with essential amino acids and fibers. A great addition to your diet." 
//   },
//   { 
//     id: 4, 
//     name: "Seeds of Change Organic Quinoa", 
//     images: [i1, i4, i5], 
//     price: "$32.85", 
//     oldPrice: "$33.8", 
//     description: "A nutritious and delicious organic quinoa packed with essential amino acids and fibers. A great addition to your diet." 
//   },
//   { 
//     id: 5, 
//     name: "Seeds of Change Organic Quinoa", 
//     images: [i2, i4, i5], 
//     price: "$32.85", 
//     oldPrice: "$33.8", 
//     description: "A nutritious and delicious organic quinoa packed with essential amino acids and fibers. A great addition to your diet." 
//   }
// ];


// const ProductDescription = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const product = products.find((p) => p.id === Number(id));
//   const { addToCart } = useContext(CartContext);
  

//   if (!product) {
//     return <h2>Product not found!</h2>;
//   }

//   const images = [product.image];
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState("60g");
//   const [selectedImage, setSelectedImage] = useState(product.images[0]);
//   const [reviews, setReviews] = useState([
//     { name: "Alice", rating: "⭐⭐⭐⭐⭐", comment: "Excellent quality! Will buy again." },
//     { name: "Bob", rating: "⭐⭐⭐⭐", comment: "Good product but slightly expensive." },
//   ]);

//   const [reviewName, setReviewName] = useState("");
//   const [reviewComment, setReviewComment] = useState("");

//   const handleAddToCart = () => {
//     // Convert price string to number (remove $ sign)
//     const priceValue = parseFloat(product.price.replace('$', ''));
    
//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       image: selectedImage,
//       price: priceValue,
//       quantity: quantity,
//       size: selectedSize
//     };
    
//     addToCart(cartItem);
//     alert(`Added ${quantity} item(s) of ${selectedSize} to cart!`);
//     navigate("/cart");
//   };

//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     if (reviewName && reviewComment) {
//       setReviews([...reviews, { name: reviewName, rating: "⭐⭐⭐⭐⭐", comment: reviewComment }]);
//       setReviewName("");
//       setReviewComment("");
//     } else {
//       alert("Please enter your name and review.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.productCard}>
//       <div className={styles.imageSection}>
//           <img src={selectedImage} alt="Product" className={styles.productImage} />
//           <div className={styles.thumbnailContainer}>
//             {product.images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Thumbnail ${index + 1}`}
//                 className={selectedImage === img ? styles.activeThumbnail : styles.thumbnail}
//                 onClick={() => setSelectedImage(img)}
//               />
//             ))}
//           </div>
//         </div>

//         <div className={styles.detailsSection}>
//           <span className={styles.saleBadge}>Sale Off</span>
//           <h2 className={styles.productTitle}>{product.name}</h2>
//           <p className={styles.reviews}>⭐ ⭐ ⭐ ⭐ ⭐ (32 reviews)</p>
//           <p className={styles.price}>{product.price} <span className={styles.oldPrice}>{product.oldPrice}</span> <span className={styles.discount}>10% Off</span></p>
//           <p className={styles.description}>{product.description}</p>

//           <div className={styles.sizeSelector}>
//             <span>Size / Weight:</span>
//             {["50g", "60g", "80g", "100g", "150g"].map((size) => (
//               <button key={size} className={selectedSize === size ? styles.selectedSize : styles.sizeButton} onClick={() => setSelectedSize(size)}>
//                 {size}
//               </button>
//             ))}
//           </div>

//           <div className={styles.cartActions}>
//             <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className={styles.quantitySelect}>
//               {[...Array(10).keys()].map((num) => (
//                 <option key={num + 1} value={num + 1}>{num + 1}</option>
//               ))}
//             </select>
//             <button className={styles.addToCart} onClick={handleAddToCart}>🛒 Add to Cart</button>
//             <button className={styles.iconButton}>♡</button>
//             <button className={styles.iconButton}>⇄</button>
//           </div>
//         </div>
//       </div>

//       {/* Detailed Description Section */}
//       <div className={styles.descriptionSection}>
//         <h3>Product Details</h3>
//         <p>{product.description}</p>
        
//         <h3>About Product</h3>
//         <p>
//           This premium quality product is crafted with the finest ingredients 
//           to ensure maximum satisfaction. Made using sustainable practices and 
//           ethically sourced materials. Our rigorous quality control ensures 
//           that you receive only the best products that meet the highest industry standards.
//         </p>
        
//         <h3>About Company</h3>
//         <p>
//           Our company has been in business since 1995, dedicated to providing 
//           high-quality organic products to our customers. We believe in sustainable 
//           farming practices and work directly with farmers to ensure fair trade. 
//           Our mission is to make organic products accessible to everyone while 
//           protecting the environment for future generations.
//         </p>
//       </div>

//       {/* Review Section */}
//       <div className={styles.reviewSection}>
//         <h3>Customer Reviews</h3>
//         {reviews.length > 0 ? (
//           reviews.map((review, index) => (
//             <div key={index} className={styles.review}>
//               <p><strong>{review.name}</strong> {review.rating}</p>
//               <p>{review.comment}</p>
//             </div>
//           ))
//         ) : (
//           <p>No reviews yet. Be the first to review!</p>
//         )}

//         {/* Review Form */}
//         <h3>Write a Review</h3>
//         <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={reviewName}
//             onChange={(e) => setReviewName(e.target.value)}
//             className={styles.reviewInput}
//           />
//           <textarea
//             placeholder="Write your review..."
//             value={reviewComment}
//             onChange={(e) => setReviewComment(e.target.value)}
//             className={styles.reviewTextarea}
//           ></textarea>
//           <button type="submit" className={styles.submitReviewButton}>Submit Review</button>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";
import styles from "./ProductDescription.module.css";
import { API_URL } from "../../../config";

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/product/${id}`);
        const data = await res.json();
        setProduct(data);
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading product...</h2>;
  }

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${API_URL}/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productID: product.id,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to add item to cart.");
      }

      const priceValue = parseFloat(product.selling_price);

      const cartItem = {
        id: product.id,
        name: product.title,
        image: images[0]?.image ? `${API_URL}${images[0].image}` : "",
        price: priceValue,
        quantity: quantity,
      };

      addToCart(cartItem);
      alert(`Added ${quantity} item(s) to cart!`);
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Could not add item to cart. Please try again.");
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.ratingValue, 0);
    return total / reviews.length;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewName && reviewComment && reviewRating) {
      const stars = "⭐".repeat(reviewRating);
      setReviews([
        ...reviews,
        {
          name: reviewName,
          rating: stars,
          ratingValue: reviewRating,
          comment: reviewComment,
        },
      ]);
      setReviewName("");
      setReviewComment("");
      setReviewRating(5);
    } else {
      alert("Please fill all review fields.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productCard}>
        <div className={styles.imageSection}>
          {images.length > 0 && (
            <img
              src={`${API_URL}${images[selectedImageIndex].image}`}
              alt="Main product"
              className={styles.productImage}
            />
          )}
          <div className={styles.thumbnailContainer}>
            {images.slice(1).map((img, idx) => (
              <img
                key={idx + 1}
                src={`${API_URL}${img.image}`}
                alt={`Thumbnail ${idx + 1}`}
                className={`${styles.thumbnail} ${
                  selectedImageIndex === idx + 1 ? styles.activeThumbnail : ""
                }`}
                onClick={() => setSelectedImageIndex(idx + 1)}
              />
            ))}
          </div>
        </div>

        <div className={styles.detailsSection}>
          <span className={styles.saleBadge}>Sale Off</span>
          <h2 className={styles.productTitle}>{product.title}</h2>
          <p className={styles.brandName}>
            <strong>Brand:</strong> {product.brand_name}
          </p>
          <p className={styles.reviews}>
            {reviews.length > 0 ? (
              <>
                {Array(Math.round(getAverageRating()))
                  .fill("⭐")
                  .join("")}{" "}
                ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
              </>
            ) : (
              "No ratings yet"
            )}
          </p>

          <p className={styles.price}>
            ₹{product.cost_price}
            <span className={styles.oldPrice}>₹{product.selling_price}</span>
            <span className={styles.discount}>10% Off</span>
          </p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.cartActions}>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={styles.quantitySelect}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <button className={styles.addToCart} onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className={styles.iconButton}>♡</button>
            <button className={styles.iconButton}>⇄</button>
          </div>
        </div>
      </div>

      <div className={styles.descriptionSection}>
        <h3>Product Details</h3>
        <p>{product.description}</p>

        <h3>About Product</h3>
        <ul>
          {Object.entries(product)
            .filter(([key]) => key.startsWith("about_product_line"))
            .map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
        </ul>

        <h3>About Company</h3>
        <ul>
          {Object.entries(product)
            .filter(([key]) => key.startsWith("about_company_line"))
            .map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
        </ul>
      </div>

      <div className={styles.reviewSection}>
        <h3>Customer Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className={styles.review}>
              <p>
                <strong>{review.name}</strong> {review.rating}
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

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
          <label>
            Rating:
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star !== 1 && "s"}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className={styles.submitReviewButton}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDescription;

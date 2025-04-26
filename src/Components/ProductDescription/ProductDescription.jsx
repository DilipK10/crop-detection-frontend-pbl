// Importing necessary libraries and hooks
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext"; // Accessing cart context
import styles from "./ProductDescription.module.css"; // Importing CSS module for styling
import { API_URL } from "../../../config"; // Importing base API URL

const ProductDescription = () => {
    // Extracting product ID from the URL parameters
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext); // Getting addToCart function from CartContext

    // Declaring local state variables
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [reviewName, setReviewName] = useState("");
    const [reviewComment, setReviewComment] = useState("");
    const [reviewRating, setReviewRating] = useState(5);

    // Fetch product details when component mounts or when product ID changes
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_URL}/products/product/${id}`);
                const data = await res.json();
                setProduct(data); // Store product data
                setImages(data.images || []); // Store product images
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    // Show loading text while product data is being fetched
    if (!product) {
        return <h2>Loading product...</h2>;
    }

    // Function to handle adding product to cart
    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem("access"); // Get user's auth token

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

            // Creating cart item to add locally as well
            const cartItem = {
                id: product.id,
                name: product.title,
                image: images[0]?.image ? `${API_URL}${images[0].image}` : "",
                price: priceValue,
                quantity: quantity,
            };

            addToCart(cartItem); // Add item to cart context
            alert(`Added ${quantity} item(s) to cart!`);
            navigate("/cart"); // Redirect to cart page
        } catch (err) {
            console.error("Add to cart error:", err);
            alert("Could not add item to cart. Please try again.");
        }
    };

    // Function to calculate average rating from reviews
    const getAverageRating = () => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, r) => sum + r.ratingValue, 0);
        return total / reviews.length;
    };

    // Function to handle review form submission
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (reviewName && reviewComment && reviewRating) {
            const stars = "⭐".repeat(reviewRating); // Display star symbols according to rating
            setReviews([
                ...reviews,
                {
                    name: reviewName,
                    rating: stars,
                    ratingValue: reviewRating,
                    comment: reviewComment,
                },
            ]);
            // Reset review form fields
            setReviewName("");
            setReviewComment("");
            setReviewRating(5);
        } else {
            alert("Please fill all review fields.");
        }
    };

    return (
        <div className={styles.container}>
            {/* Product Card Section */}
            <div className={styles.productCard}>
                {/* Image Section */}
                <div className={styles.imageSection}>
                    {/* Main Product Image */}
                    {images.length > 0 && (
                        <img
                            src={`${API_URL}${images[selectedImageIndex].image}`}
                            alt="Main product"
                            className={styles.productImage}
                        />
                    )}
                    {/* Thumbnail Images */}
                    <div className={styles.thumbnailContainer}>
                        {images.slice(1).map((img, idx) => (
                            <img
                                key={idx + 1}
                                src={`${API_URL}${img.image}`}
                                alt={`Thumbnail ${idx + 1}`}
                                className={`${styles.thumbnail} ${selectedImageIndex === idx + 1 ? styles.activeThumbnail : ""}`}
                                onClick={() => setSelectedImageIndex(idx + 1)}
                            />
                        ))}
                    </div>
                </div>

                {/* Details Section */}
                <div className={styles.detailsSection}>
                    <span className={styles.saleBadge}>Sale Off</span>
                    <h2 className={styles.productTitle}>{product.title}</h2>
                    <p className={styles.brandName}>
                        <strong>Brand:</strong> {product.brand_name}
                    </p>
                    {/* Display average reviews */}
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

                    {/* Price Section */}
                    <p className={styles.price}>
                        ₹{product.cost_price}
                        <span className={styles.oldPrice}>₹{product.selling_price}</span>
                        <span className={styles.discount}>10% Off</span>
                    </p>
                    <p className={styles.description}>{product.description}</p>

                    {/* Cart Action Buttons */}
                    <div className={styles.cartActions}>
                        {/* Quantity Selector */}
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
                        {/* Add to Cart Button */}
                        <button className={styles.addToCart} onClick={handleAddToCart}>
                            🛒 Add to Cart
                        </button>
                        {/* Icons for future features */}
                        <button className={styles.iconButton}>♡</button>
                        <button className={styles.iconButton}>⇄</button>
                    </div>
                </div>
            </div>

            {/* Product Description Section */}
            <div className={styles.descriptionSection}>
                <h3>Product Details</h3>
                <p>{product.description}</p>

                {/* About Product Lines */}
                <h3>About Product</h3>
                <ul>
                    {Object.entries(product)
                        .filter(([key]) => key.startsWith("about_product_line"))
                        .map(([key, value]) => (
                            <li key={key}>{value}</li>
                        ))}
                </ul>

                {/* About Company Lines */}
                <h3>About Company</h3>
                <ul>
                    {Object.entries(product)
                        .filter(([key]) => key.startsWith("about_company_line"))
                        .map(([key, value]) => (
                            <li key={key}>{value}</li>
                        ))}
                </ul>
            </div>

            {/* Reviews Section */}
            <div className={styles.reviewSection}>
                <h3>Customer Reviews</h3>
                {/* Display existing reviews */}
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

                {/* Review Submission Form */}
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
                    {/* Submit Button */}
                    <button type="submit" className={styles.submitReviewButton}>
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductDescription;

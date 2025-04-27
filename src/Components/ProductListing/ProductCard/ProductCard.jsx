// Importing necessary React hooks and router function
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { API_URL } from "../../../../config";

// ProductCard component definition
const ProductCard = ({ product }) => {
    const navigate = useNavigate(); // Hook to programmatically navigate between routes
    const [imageUrl, setImageUrl] = useState("/static/default.jpg"); // State to store the product image URL (with default fallback)

    // useEffect to set the product image when component mounts or product changes
    useEffect(() => {
        if (product.images && product.images.length > 0) {
            const rawImage = product.images[0].image; // Get the first image from the product's images array
            const fullImage = rawImage.startsWith("http") 
                ? rawImage                   // If the image URL is already absolute, use it directly
                : `${API_URL}${rawImage}`;    // Else, prefix the API_URL to create the full path
            setImageUrl(fullImage);            // Set the image URL in state
        }
    }, [product]); // Dependency array: triggers when 'product' prop changes

    // Function to handle clicking on the product card - navigates to product details page
    const handleProductClick = () => {
        navigate(`/product/${product.id}`); // Navigate to the route with product ID
    };

    // Function to handle "Add to Cart" button click
    const handleAddToCart = async (e) => {
        e.stopPropagation(); // Prevent card click event from firing (only button click should happen)

        try {
            const response = await fetch(`${API_URL}/cart/add/`, {
                method: 'POST', // HTTP method
                headers: {
                    'Content-Type': 'application/json', // Telling server we are sending JSON
                    'Authorization': `Bearer ${localStorage.getItem('access')}` // Passing JWT access token for authentication
                },
                body: JSON.stringify({
                    productID: product.id, // Product ID to add
                    quantity: 1            // Default quantity is 1
                })
            });

            // If response is not OK (status code outside 200–299), throw error
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Failed to add to cart');
            }

            // On success, show success message
            alert(`${product.title} added to cart!`);
        } catch (err) {
            console.error('Add to cart error:', err); // Log the error in console
            alert('Failed to add product to cart. Please Login ');   // Show error to user
        }
    };

    return (
        <div 
            className={styles.card} // Card container with styles
            onClick={handleProductClick} // On card click, navigate to product detail
            style={{ cursor: 'pointer' }} 
        >
            {/* Product Image */}
            <img 
                src={imageUrl} 
                alt={product.title} 
                className={styles.productImage} 
            />

            {/* Product Details Section */}
            <div className={styles.productDetails}>
                {/* Product Name */}
                <div className={styles.productName}>
                    {product.title}
                </div>

                {/* Brand Name */}
                <p className={styles.brandName}>
                    {product.brand_name}
                </p>

                {/* Pricing */}
                <div className={styles.priceContainer}>
                    <p className={styles.price}>
                        ₹{product.selling_price}
                    </p>
                </div>

                {/* Add to Cart Button */}
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

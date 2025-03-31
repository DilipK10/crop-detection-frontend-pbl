import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../../CartContext"; // Import CartContext
import "./ProductData.css";
import i1 from "../../../../assets/images/image1.jpg";
import i2 from "../../../../assets/images/img_2.jpg";
import i3 from "../../../../assets/images/img_3.jpg";
import i4 from "../../../../assets/images/img_4.jpg";
import i5 from "../../../../assets/images/img_5.jpg";

const products = [
    {
        id: 1, 
        name: "Nestle Original Coffee-Mate",
        price: 32.85,
        brand: "Nestle",
        images: [i1],
        quantity: 1,
    },
    {
        id: 2, 
        name: "Organic Cage-Free Brown Eggs",
        price: 28.50,
        brand: "Organic Farms",
        images: [i2],
        quantity: 1,
    },
    {
        id: 3, 
        name: "Seeds of Change Organic Quinoa",
        price: 18.99,
        brand: "Seeds of Change",
        images: [i3],
        quantity: 1,
    },
    {
        id: 4, 
        name: "Cinnamon Vanilla Light Roast Coffee",
        price: 22.50,
        brand: "Morning Brew",
        images: [i4],
        quantity: 1,
    }
];

// Randomly select one product to display
const getRandomProduct = () => {
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
};

const ProductData = () => {
    const navigate = useNavigate();
    const cartContext = useContext(CartContext); // Ensure useContext is not undefined
    const displayProduct = getRandomProduct();

    if (!cartContext) {
        console.error("CartContext is undefined. Ensure that CartProvider wraps the app.");
        return null; // Prevent rendering if context is not available
    }

    const { addToCart } = cartContext;

    const handleViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="productThumb">
            <div className="imgWrapper">
                <img src={displayProduct.images[0]} className="productImage" alt={displayProduct.name} />
            </div>
            <div className="Information">
                <h5 className="brand">{displayProduct.brand}</h5>
                <h4 className="title">{displayProduct.name}</h4>
                <h6 className="price">${displayProduct.price.toFixed(2)}</h6>

                <div className="buttonGroup">
                    <button className="viewDetails" onClick={() => handleViewDetails(displayProduct.id)}>View</button>
                    <button className="addToCart" onClick={() => handleAddToCart(displayProduct)}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductData;

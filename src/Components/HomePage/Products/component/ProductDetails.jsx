// ProductData.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../../CartContext";
import "./ProductData.css";

const ProductData = ({ product }) => {
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        console.error("CartContext is undefined. Ensure that CartProvider wraps the app.");
        return null;
    }

    const { addToCart } = cartContext;

    const handleViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.title} added to cart!`);
    };

    return (
        <div className="productThumb">
            <div className="imgWrapper">
                <img src={product.image || "https://via.placeholder.com/200"} className="productImage" alt={product.title} />
            </div>
            <div className="Information">
                <h5 className="brand">{product.brand}</h5>
                <h4 className="title">{product.title}</h4>
                <h6 className="price">${product.price.toFixed(2)}</h6>
                <div className="buttonGroup">
                    <button className="viewDetails" onClick={() => handleViewDetails(product.id)}>View</button>
                    <button className="addToCart" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductData;

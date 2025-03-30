import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../../CartContext"; // Import CartContext
import "./ProductData.css";
import i1 from "../../../../assets/images/image1.jpg";
import i2 from "../../../../assets/images/img_3.jpg";

const ProductData = () => {
    const navigate = useNavigate();
    const cartContext = useContext(CartContext); // Ensure useContext is not undefined

    if (!cartContext) {
        console.error("CartContext is undefined. Ensure that CartProvider wraps the app.");
        return null; // Prevent rendering if context is not available
    }

    const { addToCart } = cartContext;

    const products = [
        {
            id: 1, 
            name: "Organic Snack",
            price: 100,
            images: [i1],
            quantity: 1,
        }
    ];

    const handleViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`${product.name} added to cart!`);
        navigate("/cart");
    };

    return (
        <div className="productsContainer">
            {products.map((product) => (
                <div key={product.id} className="productThumb">
                    <div className="imgWrapper">
                        <img src={product.images[0]} className="productImage" alt={product.name} />
                    </div>
                    <div className="Information">
                        <h5 className="brand">Snack</h5>
                        <h4 className="title">{product.name}</h4>
                        <h6 className="price">${product.price.toFixed(2)}</h6>

                        <div className="buttonGroup">
                            <button className="viewDetails" onClick={() => handleViewDetails(product.id)}>View Details</button>
                            <button className="addToCart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductData;

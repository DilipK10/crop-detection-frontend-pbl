import React, { useEffect, useState } from "react";
import "./ProductData.css";
import {API_URL} from '../../../../../../config'

const PopularProducts = () => {
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/checkout/TopSellingProductsView/`);
                const data = await response.json();
                
                // Limit only 5 products
                const slicedData = data.slice(0, 5).map(item => ({
                    id: item.product_id,
                    title: item.title,
                    image: item.first_image,
                    brand: item.brand || "Unknown Brand",
                    selling_price: item.selling_price,
                }));

                setPopularProducts(slicedData);
            } catch (error) {
                console.error("Failed to fetch top selling products:", error);
            }
        };

        fetchPopularProducts();
    }, []);

    const handleViewDetails = (id) => {
        window.location.href = `/product/${id}`;
    };

    const handleAddToCart = async (product) => {
        try {
            const response = await fetch(`${API_URL}/cart/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
                body: JSON.stringify({
                    productID: product.id,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add to cart");
            }

            alert(`${product.title} added to cart!`);
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please Login.");
        }
    };

    return (
        <div className="productGrid">
            {popularProducts.map((product) => (
                <div key={product.id} className="productThumb">
                    <div className="imgWrapper">
                        <img
                            src={product.image || "https://via.placeholder.com/200"}
                            className="productImage"
                            alt={product.title}
                        />
                    </div>
                    <div className="Information">
                        <h5 className="brand">{product.brand}</h5>
                        <h4 className="title">{product.title}</h4>
                        <h6 className="price">
                            <span className="sellingPrice">₹{product.selling_price.toFixed(2)}</span>
                        </h6>
                        <div className="buttonGroup">
                            <button className="viewDetails" onClick={() => handleViewDetails(product.id)}>
                                View
                            </button>
                            <button className="addToCart" onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PopularProducts;

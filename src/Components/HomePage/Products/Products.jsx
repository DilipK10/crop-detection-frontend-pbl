//importing necessary libraries and styles
import React from "react";
import './Products.css';
import TopProduct from "./component/TopProduct";
import i1 from "../../../assets/images/Picture36.jpg";
import i2 from "../../../assets/images/Picture22.jpg";
import i3 from "../../../assets/images/Picture39.jpg";
import i4 from "../../../assets/images/Picture1.jpg";
import i5 from "../../../assets/images/Picture12.png";
import i6 from "../../../assets/images/Picture39.jpg";
import PopularProducts from "./component/PopularProducts";

// This component displays a list of products, including top sellers and new arrivals. It uses static images for product representation.
const Products = () => {
    // Static data for top sellers
    const topSellers = [
        {
            id: "23a7fd81-8aa1-4a5d-b8b0-bbf169bee43e",
            title: "IFFCO Urban Gardens - Gypsum Meal - 900gm",
            image: i1,
            rating: "⭐⭐⭐⭐ (4.2)",
            selling_price: 425,
            mrp: 600,
        },
        {
            id: "4604d1e0-50d9-408e-b1db-5e6b4cf3b7b3",
            title: "Pai's Organic Plant Pesticide/Organic Garden Pest Control 250 Grams",
            image: i2,
            rating: "⭐⭐⭐½ (3.8)",
            selling_price: 288,
            mrp: 500,
        },
        {
            id: "a986727e-1c34-4495-aa4d-cca9d4b211f3",
            title: "IFFCO Urban Gardens - Bokashi Bran Powder 1Kg",
            image: i3,
            rating: "⭐⭐⭐⭐⭐ (4.9)",
            selling_price: 240,
            mrp: 350,
        },
    ];

    // Static data for new arrivals
    const newArrivals = [
        {
            id: "ae9c5ecb-6e44-4f88-ab9e-3237e5963033",
            title: "TrustBasket Cow Manure 5kg",
            image: i4,
            rating: "⭐⭐⭐⭐⭐ (4.9)",
            selling_price: 342,
            mrp: 789,
        },
        {
            id: "f58e4caa-fb77-4a45-9f82-babdd7314bf7",
            title: "Ugaoo Cow Dung Manure Fertilizers - 10kg",
            image: i5,
            rating: "⭐⭐⭐⭐⭐ (4.9)",
            selling_price: 649,
            mrp: 998,
        },
        {
            id: "a986727e-1c34-4495-aa4d-cca9d4b211f3",
            title: "IFFCO Urban Gardens - Bokashi Bran Powder 1Kg",
            image: i6,
            rating: "⭐⭐⭐⭐⭐ (4.9)",
            selling_price: 240,
            mrp: 350,
        },
    ];

    return (
        <>
            {/* // Main container for the products section */}
            <PopularProducts />

            {/* // Section for displaying top sellers and new arrivals */}
            <section className="topProductSection">

                {/* // Header for the top products section */}
                <div className="container-fluid">

                    {/* // Header for the top products section */}
                    <div className="topProductsContainer">
                        <div className="topProductColumn">

                            {/* // Header for the top seller column */}
                            <div className="columnHeader">
                                <h2 className="columnTitle">Top Seller</h2>
                            </div>
                            {/* // Displaying top seller products */}
                            <TopProduct  products={topSellers} />
                        </div>

                        {/* // Column for new arrivals */}
                        <div className="topProductColumn">
                            {/* // Header for the new arrival column */}
                            <div className="columnHeader">
                                <h2 className="columnTitle">New Arrival</h2>
                            </div>
                            {/* // Displaying new arrival products */}
                            <TopProduct  products={newArrivals} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Products;


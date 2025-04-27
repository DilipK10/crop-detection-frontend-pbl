//importing necessary libraries and styles
import React from "react";
import './Products.css';
import TopProduct from "./component/TopProducts/TopProduct";
import PopularProducts from "./component/PopularProducts/ProductDetails";
import NewArrival from "./component/NewArrival/NewArrival"

const Products = () => {

    return (
        <>
            {/* ================= Popular Products Section ================= */}
            <section className="popularProductSection">
                <div className="container-fluid">
                    {/* Section header */}
                    <div className="sectionHeader">
                        <div className="headerTitle">
                            <h2 className="hd">Popular Products</h2>
                        </div>
                    </div>

                    {/* Popular products component */}
                    <PopularProducts />
                </div>
            </section>

            {/* ================= Top Seller & New Arrival Section ================= */}
            <section className="topProductSection">
                <div className="container-fluid">
                    {/* Section Header */}
                    <div className="sectionHeader">
                        <div className="headerTitle">
                            <h2 className="hd">Explore More</h2>
                        </div>
                    </div>

                    {/* Grid for Top Seller and New Arrival */}
                    <div className="topProductsContainer">
                        {/* Top Seller Column */}
                        <div className="topProductColumn">
                            <div className="columnHeader">
                                <h2 className="columnTitle">Top Seller</h2>
                            </div>
                            <TopProduct />
                        </div>

                        {/* New Arrival Column */}
                        <div className="topProductColumn">
                            <div className="columnHeader">
                                <h2 className="columnTitle">New Arrival</h2>
                            </div>
                            <NewArrival />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Products;


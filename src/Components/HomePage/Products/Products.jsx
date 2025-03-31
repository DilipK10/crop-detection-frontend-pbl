import React from "react";
import './Products.css';
import ProductData from "./component/ProductDetails";
import TopProduct from "./component/TopProduct";

const Products = () => {
    return (
        <>
            <section className='mainContainer'>
                <div className="container-fluid">
                    <div className="sectionHeader">
                        <div className="headerTitle">
                            <h2 className='hd'>Products Popular</h2>
                        </div>
                    </div>

                    <div className="productGrid">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="productGridItem">
                                <ProductData />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="topProductSection">
                <div className="container-fluid">
                    <div className="topProductsContainer">
                        <div className="topProductColumn">
                            <div className="columnHeader">
                                <h2 className="columnTitle">Top Seller</h2>
                            </div>
                            <TopProduct title="Top Seller" />
                        </div>

                        <div className="topProductColumn">
                            <div className="columnHeader">
                                <h2 className="columnTitle">New Arrival</h2>
                            </div>
                            <TopProduct title="New Arrival" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products;

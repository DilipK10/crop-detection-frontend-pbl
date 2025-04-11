// Products.jsx
import React from "react";
import './Products.css';
import ProductData from "./component/ProductDetails";
import TopProduct from "./component/TopProduct";

const productsList = [
    {
        id: 101,
        title: "Natural Fertilizer",
        price: 25.0,
        category: "Fertilizers",
        brand: "AgroPro",
        image: "https://via.placeholder.com/200?text=Fertilizer"
    },
    {
        id: 109,
        title: "Crop Protection Spray",
        price: 30.0,
        category: "Protection",
        brand: "SafeCrop",
        image: "https://via.placeholder.com/200?text=Spray"
    },
    {
        id: 110,
        title: "Rain Sensor",
        price: 70.0,
        category: "Sensors",
        brand: "SmartFarm",
        image: "https://via.placeholder.com/200?text=Sensor"
    },
    {
        id: 108,
        title: "Organic Manure",
        price: 15.0,
        category: "Fertilizers",
        brand: "NatureRich",
        image: "https://via.placeholder.com/200?text=Manure"
    },
    {
        id: 104,
        title: "Irrigation Pipe",
        price: 55.0,
        category: "Irrigation",
        brand: "WaterTech",
        image: "https://via.placeholder.com/200?text=Pipe"
    },
    {
        id: 106,
        title: "Tractor Lubricant",
        price: 65.0,
        category: "Machinery",
        brand: "MechaPro",
        image: "https://via.placeholder.com/200?text=Lubricant"
    }
];

const topSellers = productsList.slice(0, 3);
const newArrivals = productsList.slice(3, 6);

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
                        {productsList.map((product) => (
                            <div key={product.id} className="productGridItem">
                                <ProductData product={product} />
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
                            <TopProduct title="Top Seller" products={topSellers} />
                        </div>

                        <div className="topProductColumn">
                            <div className="columnHeader">
                                <h2 className="columnTitle">New Arrival</h2>
                            </div>
                            <TopProduct title="New Arrival" products={newArrivals} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Products;

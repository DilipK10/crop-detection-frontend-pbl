import React from 'react'
import ProductData from './ProductDetails'

import i1 from "../../../../assets/images/Picture36.jpg";
import i2 from "../../../../assets/images/Picture22.jpg";
import i3 from "../../../../assets/images/Picture39.jpg";
import i4 from "../../../../assets/images/Picture1.jpg";
import i5 from "../../../../assets/images/Picture12.png";
import i6 from "../../../../assets/images/Picture39.jpg";

const PopularProducts = () => {
    // Static data for popular products
    const productPopular = [
        {
            id: "23a7fd81-8aa1-4a5d-b8b0-bbf169bee43e",
            title: "IFFCO Urban Gardens - Gypsum Meal - 900gm",
            image: i1, // Static image
            rating: "⭐⭐⭐⭐ (4.2)",
            selling_price: 425,
            mrp: 600,
        },
        {
            id: "4604d1e0-50d9-408e-b1db-5e6b4cf3b7b3",
            title: "Pai's Organic Plant Pesticide/Organic Garden Pest Control 250 Grams",
            image: i2, // Static image URL
            rating: "⭐⭐⭐½ (3.8)",
            selling_price: 288,
            mrp: 500,
        },
        {
            id: "a986727e-1c34-4495-aa4d-cca9d4b211f3",
            title: "IFFCO Urban Gardens - Bokashi Bran Powder 1Kg",
            image: i3, // Static image URL
            rating: "⭐⭐⭐⭐⭐ (4.9)",
            selling_price: 240,
            mrp: 350,
        },
        {
            id: "ae9c5ecb-6e44-4f88-ab9e-3237e5963033",
            title: "TrustBasket Cow Manure 5kg",
            image: i4, // Static image URL
            rating: "⭐⭐⭐⭐⭐ (4.9)",
            selling_price: 342,
            mrp: 789,
        },
        {
            id: "f58e4caa-fb77-4a45-9f82-babdd7314bf7",
            title: "Ugaoo Cow Dung Manure Fertilizers - 10kg",
            image: i5, // Static image URL
            rating: "⭐⭐⭐⭐⭐ (4.9)",
            selling_price: 649,
            mrp: 998,
        },
        // {
        //     id: "a986727e-1c34-4495-aa4d-cca9d4b211f3",
        //     title: "IFFCO Urban Gardens - Bokashi Bran Powder 1Kg",
        //     image: i6, // Static image URL
        //     rating: "⭐⭐⭐⭐⭐ (4.9)",
        //     selling_price: 240,
        //     mrp: 350,
        // },
    ]

    return (
        <>
            {/* // Main container for the products section */}
            <section className='mainContainer'>

                {/* // Header for the products section */}
                <div className="container-fluid">

                    {/* // Header for the popular products section */} 
                    <div className="sectionHeader">
                        <div className="headerTitle">
                            <h2 className='hd'>Products Popular</h2>
                        </div>
                    </div>

                    {/* // Grid layout for displaying popular products */}
                    <div className="productGrid">
                        <ProductData products={productPopular} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default PopularProducts
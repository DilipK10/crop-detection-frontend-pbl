import React from "react";
import "./ProductData.css";


const ProductData = () =>{
    return(
        <div className="productThumb">
            <div className="imgWrapper">
                <img src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-1-2.jpg" className="i-1"></img>
            </div>
            <div className="Information">
                <h5 className="brand">snack</h5>
                <h4 className="title">organic </h4>
                <h6 className="price">$100</h6>
                <button className="Buy-1">Buy</button>
            </div>
           
           
        </div>
    );
};

export default ProductData; 
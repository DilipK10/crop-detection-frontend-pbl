import React from "react";
import "./ProductData.css";
import i1 from '../../../../assets/images/img_3.jpg'


const ProductData = () =>{
    return(
        <div className="productThumb">
            <div className="imgWrapper">
                <img src= {i1} className="i-1"></img>
            </div>
            <div className="Information">
                <h5 className="brand">snack</h5>
                <h4 className="title">organic </h4>
                <h6 className="price">$100</h6>
                <button className="Buy-1" onClick="#">Buy</button>
            </div>
           
           
        </div>
    );
};

export default ProductData; 
import React from "react";
import  './Products.css';
import ProductData from "./component/ProductDetails";
import TopProduct from "./component/TopProduct";


const Products = () =>{
    return (
        <>
        <section className='mainContainer'>
           <div className="conitainer-fluid">
            <div className="info">
            <h2 className='hd'>Products Popular</h2>
            <ul className="filterTab ">
                <li className="list-inline-item">
                    <a className="cursor" href="#">All</a>
                </li>
                <li className="list-inline-item">
                    <a className="cursor" href="#">Milk</a>
                </li>
                <li className="list-inline-item">
                    <a className="cursor" href="#">Coffes</a>
                </li>
                <li className="list-inline-item">
                    <a className="cursor" href="#">Foods</a>
                </li>
            </ul>
            
            </div>

                <div className="productRow">
                    <div className="item">
                        <ProductData/>
                    </div>
                    <div className="item">
                        <ProductData/>
                    </div>
                    <div className="item">
                        <ProductData/>
                    </div>
                    <div className="item">
                        <ProductData/>
                    </div>
                    <div className="item">
                        <ProductData/>
                    </div>
                    <div className="item">
                        <ProductData/>
                    </div>
                    <div className="item">
                        <ProductData/>
                    </div>
                    <div className="item">
                        <ProductData/>
                    </div>
                    
                </div>
           </div>
        </section>
        <section className="topProductSection">
            <div className="cointainerFluid">
                <div className="row">
                    <div className="col">
                        <TopProduct title="Top Seller"/>
                    </div>

                    <div className="col">
                        <TopProduct  title="New Arrival"/>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Products;

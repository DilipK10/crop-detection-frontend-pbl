import React from "react";
import  './Products.css';


const Products = () =>{
    return (
        <section className='mainContainer'>
           <div className="conitainer-fluid">
            <div className="info">
            <h2 className='hd'>Products</h2>
            <ul className="filterTab ">
                <li className="list-inline-item">
                    <a className="cursor" href="#">All</a>
                </li>
                <li className="list-inline-item">
                    <a className="cursor" href="#">Milks & Dairies</a>
                </li>
                <li className="list-inline-item">
                    <a className="cursor" href="#">Coffes & Teas</a>
                </li>
                <li className="list-inline-item">
                    <a className="cursor" href="#">Pet Foods</a>
                </li>
            </ul>
            </div>
           </div>
        </section>
    )
}

export default Products;

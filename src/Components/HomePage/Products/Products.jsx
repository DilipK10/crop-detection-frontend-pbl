// Products.jsx
// import React from "react";
// import './Products.css';
// import ProductData from "./component/ProductDetails";
// import TopProduct from "./component/TopProduct";


// const productsList = [
//     {
//         id: 101,
//         title: "Natural Fertilizer",
//         price: 25.0,
//         category: "Fertilizers",
//         brand: "AgroPro",
//         image: "https://via.placeholder.com/200?text=Fertilizer"
//     },
//     {
//         id: 109,
//         title: "Crop Protection Spray",
//         price: 30.0,
//         category: "Protection",
//         brand: "SafeCrop",
//         image: "https://via.placeholder.com/200?text=Spray"
//     },
//     {
//         id: 110,
//         title: "Rain Sensor",
//         price: 70.0,
//         category: "Sensors",
//         brand: "SmartFarm",
//         image: "https://via.placeholder.com/200?text=Sensor"
//     },
//     {
//         id: 108,
//         title: "Organic Manure",
//         price: 15.0,
//         category: "Fertilizers",
//         brand: "NatureRich",
//         image: "https://via.placeholder.com/200?text=Manure"
//     },
//     {
//         id: 104,
//         title: "Irrigation Pipe",
//         price: 55.0,
//         category: "Irrigation",
//         brand: "WaterTech",
//         image: "https://via.placeholder.com/200?text=Pipe"
//     },
//     {
//         id: 106,
//         title: "Tractor Lubricant",
//         price: 65.0,
//         category: "Machinery",
//         brand: "MechaPro",
//         image: "https://via.placeholder.com/200?text=Lubricant"
//     }
// ];

// const topSellers = productsList.slice(0, 3);
// const newArrivals = productsList.slice(3, 6);

// const Products = () => {
//     return (
//         <>
//             <section className='mainContainer'>
//                 <div className="container-fluid">
//                     <div className="sectionHeader">
//                         <div className="headerTitle">
//                             <h2 className='hd'>Products Popular</h2>
//                         </div>
//                     </div>

//                     <div className="productGrid">
//                         {productsList.map((product) => (
//                             <div key={product.id} className="productGridItem">
//                                 <ProductData product={product} />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             <section className="topProductSection">
//                 <div className="container-fluid">
//                     <div className="topProductsContainer">
//                         <div className="topProductColumn">
//                             <div className="columnHeader">
//                                 <h2 className="columnTitle">Top Seller</h2>
//                             </div>
//                             <TopProduct title="Top Seller" products={topSellers} />
//                         </div>

//                         <div className="topProductColumn">
//                             <div className="columnHeader">
//                                 <h2 className="columnTitle">New Arrival</h2>
//                             </div>
//                             <TopProduct title="New Arrival" products={newArrivals} />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Products;
import React from "react";
import './Products.css';
import ProductData from "./component/ProductDetails";
import TopProduct from "./component/TopProduct";

import i1 from "../../../assets/images/Picture36.jpg";
import i2 from "../../../assets/images/Picture22.jpg";
import i3 from "../../../assets/images/Picture39.jpg";
import i4 from "../../../assets/images/Picture1.jpg";
import i5 from "../../../assets/images/Picture12.png";
import i6 from "../../../assets/images/Picture39.jpg";

const Products = () => {
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
      {
        id: "a986727e-1c34-4495-aa4d-cca9d4b211f3",
        title: "IFFCO Urban Gardens - Bokashi Bran Powder 1Kg",
        image: i6, // Static image URL
        rating: "⭐⭐⭐⭐⭐ (4.9)",
        selling_price: 240,
        mrp: 350,
      },
  ]

  return (
    <>
      <section className='mainContainer'>
        <div className="container-fluid">
          <div className="sectionHeader">
            <div className="headerTitle">
              <h2 className='hd'>Products Popular</h2>
            </div>
          </div>

          {/* You can fill this later with fetched dynamic products */}
          <div className="productGrid">
          <ProductData products={productPopular} />
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


// // // TopProduct.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./TopProduct.module.css";

// const TopProduct = ({ title = "Top Products", products = [] }) => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.products}>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product.id} className={styles.productItem}>
//               <Link to={`/product/${product.id}`} className={styles.productLink}>
//                 <img src={product.image || "https://via.placeholder.com/200"} alt={product.title} className={styles.productImage} />
//                 <div className={styles.productDetails}>
//                   <p className={styles.productName}>{product.title}</p>
//                   <p className={styles.rating}>{product.rating || "⭐⭐⭐⭐ (4.0)"}</p>
//                   <div className={styles.priceContainer}>
//                   <p className={styles.price}>
//                         ${typeof product.selling_price === "number" ? product.selling_price.toFixed(2) : "N/A"}
//                       </p>
//                       <p className={styles.oldPrice}>
//                         ${typeof product.mrp === "number" ? product.mrp.toFixed(2) : "N/A"}
//                       </p>

//                     </div>

//                 </div>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p className={styles.noResults}>No top products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopProduct;
import React from "react";
import { Link } from "react-router-dom";
import styles from "./TopProduct.module.css";

const TopProduct = ({ title, products }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.products}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <Link to={`/product/${product.id}`} className={styles.productLink}>
              <img
                src={product.image || "https://via.placeholder.com/200"}
                alt={product.title}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <p className={styles.productName}>{product.title}</p>
                <p className={styles.rating}>{product.rating}</p>
                <div className={styles.priceContainer}>
                  <p className={styles.price}>₹{product.selling_price.toFixed(2)}</p>
                  <p className={styles.oldPrice}>₹{product.mrp.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProduct;




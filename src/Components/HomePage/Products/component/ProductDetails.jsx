// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../../../CartContext";

// import "./ProductData.css";

// const ProductData = ({ product }) => {
//   const navigate = useNavigate();
//   const cartContext = useContext(CartContext);

//   if (!cartContext) {
//     console.error("CartContext is undefined. Ensure that CartProvider wraps the app.");
//     return null;
//   }

//   const { addToCart } = cartContext;

//   const handleViewDetails = () => {
//     navigate(`/product/${product.id}`);
//   };

//   const handleAddToCart = () => {
//     addToCart(product);
//     alert(`${product.title} added to cart!`);
//   };

//   return (
//     <div className="productThumb">
//       <div className="imgWrapper">
//         <img
//           src={
//             product.image?.startsWith("http")
//               ? product.image
//               : "https://via.placeholder.com/200"
//           }
//           className="productImage"
//           alt={product.title}
//         />
//       </div>
//       <div className="Information">
//         <h5 className="brand">{product.brand}</h5>
//         <h4 className="title">{product.title}</h4>
//         <h6 className="price">
//           ${typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}
//         </h6>
//         <div className="buttonGroup">
//           <button className="viewDetails" onClick={handleViewDetails}>View</button>
//           <button className="addToCart" onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductData;
import React from "react";
import "./ProductData.css";
import { API_URL } from "../../../../../config";

const ProductData = ({ products }) => {
  const handleViewDetails = (id) => {
    window.location.href = `/product/${id}`;
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await fetch(`${API_URL}/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`, // if using JWT
        },
        body: JSON.stringify({
          productID: product.id,
          quantity: 1,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
  
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="productGrid">
      {products.map((product) => (
        <div key={product.id} className="productThumb">
          <div className="imgWrapper">
            <img
              src={product.image}
              className="productImage"
              alt={product.title}
            />
          </div>
          <div className="Information">
            <h5 className="brand">{product.brand}</h5>
            <h4 className="title">{product.title}</h4>
            <h6 className="price">
              <span className="sellingPrice">₹{product.selling_price.toFixed(2)}</span>
            </h6>
            <div className="buttonGroup">
              <button className="viewDetails" onClick={() => handleViewDetails(product.id)}>
                View
              </button>
              <button className="addToCart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductData;


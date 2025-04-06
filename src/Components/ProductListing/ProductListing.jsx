// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import styles from "./ProductListing.module.css";
// import ProductCard from "./ProductCard/ProductCard"; // Reusable component
// import image1 from "../../assets/images/image1.jpg";
// import image2 from "../../assets/images/img_2.jpg";
// import image3 from "../../assets/images/img_3.jpg";
// import image4 from "../../assets/images/img_4.jpg";
// import image5 from "../../assets/images/img_5.jpg";

// const productsData = [
//   { id: 1, name: "Nestle Original Coffee-Mate", image: image1, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Beverages" },
//   { id: 2, name: "Organic Cage-Free Brown Eggs", image: image2, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Dairy" },
//   { id: 3, name: "Seeds of Change Organic Quinoa", image: image3, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Grains" },
//   { id: 4, name: "Naturally Flavored Cinnamon Coffee", image: image4, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Beverages" },
//   { id: 5, name: "Foster Farms Crispy Buffalo Wings", image: image5, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Frozen" },
//   { id: 6, name: "Nestle Original Coffee-Mate", image: image1, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Beverages" },
//   { id: 7, name: "Organic Cage-Free Brown Eggs", image: image2, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Dairy" },
//   { id: 8, name: "Seeds of Change Organic Quinoa", image: image3, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Grains" },
//   { id: 9, name: "Naturally Flavored Cinnamon Coffee", image: image4, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Beverages" },
//   { id: 10, name: "Foster Farms Crispy Buffalo Wings", image: image5, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Frozen" },
//   { id: 11, name: "Nestle Original Coffee-Mate", image: image1, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Beverages" },
//   { id: 12, name: "Organic Cage-Free Brown Eggs", image: image2, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Dairy" },
//   { id: 13, name: "Seeds of Change Organic Quinoa", image: image3, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Grains" },
//   { id: 14, name: "Naturally Flavored Cinnamon Coffee", image: image4, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Beverages" },
//   { id: 15, name: "Foster Farms Crispy Buffalo Wings", image: image5, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Frozen" },
//   { id: 16, name: "Nestle Original Coffee-Mate", image: image1, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Beverages" },
//   { id: 17, name: "Organic Cage-Free Brown Eggs", image: image2, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Dairy" },
//   { id: 18, name: "Seeds of Change Organic Quinoa", image: image3, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Grains" },
//   { id: 19, name: "Naturally Flavored Cinnamon Coffee", image: image4, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Beverages" },
//   { id: 20, name: "Foster Farms Crispy Buffalo Wings", image: image5, rating: "⭐⭐⭐⭐ (4.0)", price: "$32.85", oldPrice: "$33.8", category: "Frozen" },
// ];

// // Get unique categories from products
// const getUniqueCategories = () => {
//   const categories = productsData.map(product => product.category);
//   return [...new Set(categories)];
// };

// const ProductListing = ({ title = "Product Listing" }) => {
//   const location = useLocation();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const uniqueCategories = getUniqueCategories();

//   // Parse URL parameters for category
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const categoryParam = params.get('category');
    
//     if (categoryParam && uniqueCategories.includes(categoryParam)) {
//       setSelectedCategory(categoryParam);
//     }
//   }, [location.search, uniqueCategories]);

//   const filteredProducts = productsData.filter((product) => 
//     product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//     (selectedCategory === "All" || product.category === selectedCategory)
//   );

//   return (
//     <div className={styles.container}>
//       {/* Page Title */}
//       <h3 className={styles.heading}>{title}</h3>
//       <div className={styles.underline}></div>

//       {/* Search and Filter */}
//       <div className={styles.filterSection}>
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className={styles.searchInput}
//         />
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className={styles.categoryFilter}
//         >
//           <option value="All">All Categories</option>
//           {uniqueCategories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Product Grid */}
//       <div className={styles.productGrid}>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           <p className={styles.noResults}>No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductListing;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProductListing.module.css";
import ProductCard from "./ProductCard/ProductCard";
import { API_URL } from "../../../config"; // your config file

const ProductListing = ({ title = "Product Listing" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");

    const fetchProducts = async () => {
      try {
        let response;
        if (categoryParam && categoryParam !== "All") {
          setSelectedCategory(categoryParam);
          response = await fetch(`${API_URL}/products/category/${categoryParam}`);
        } else {
          response = await fetch(`${API_URL}/products/listproducts/`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [location.search]);

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    navigate(selected === "All" ? "/Listing" : `/Listing?category=${selected}`);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{title}</h3>
      <div className={styles.underline}></div>

      <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.categoryFilter}
        >
          <option value="All">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className={styles.noResults}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;

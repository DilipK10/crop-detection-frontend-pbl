// Importing React hooks
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProductListing.module.css";
import ProductCard from "./ProductCard/ProductCard";
import { API_URL } from "../../../config";

// ProductListing component definition
const ProductListing = ({ title = "Product Listing" }) => {
    const location = useLocation(); // Get current URL location (useful for query params)
    const navigate = useNavigate(); // Hook to programmatically navigate between pages

    // State variables
    const [searchQuery, setSearchQuery] = useState(""); // User's search input
    const [products, setProducts] = useState([]);       // All fetched products
    const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category for filter

    // Fetch products when the component mounts or URL search params change
    useEffect(() => {
        const params = new URLSearchParams(location.search); // Parse URL query params
        const categoryParam = params.get("category");        // Get 'category' from URL

        const fetchProducts = async () => {
            try {
                let response;

                // If a specific category is selected, fetch products from that category
                if (categoryParam && categoryParam !== "All") {
                    setSelectedCategory(categoryParam);
                    response = await fetch(`${API_URL}/products/category/${categoryParam}`);
                } 
                // Otherwise, fetch all products
                else {
                    response = await fetch(`${API_URL}/products/listproducts/`);
                }

                const data = await response.json(); // Parse JSON response
                setProducts(data);                  // Update products state
            } catch (error) {
                console.error("Error fetching products:", error); // Handle errors
            }
        };

        fetchProducts(); // Call fetch function
    }, [location.search]); // Dependency array: triggers if the search URL changes

    // Filtered list of products based on search query
    const filteredProducts = products.filter((product) =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get unique list of categories from products (for category filter dropdown)
    const uniqueCategories = [...new Set(products.map((p) => p.category))];

    // Handle change in category dropdown
    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setSelectedCategory(selected);

        // Navigate to the updated URL with selected category (or reset to all)
        navigate(selected === "All" ? "/Listing" : `/Listing?category=${selected}`);
    };

    // JSX that renders the entire Product Listing page
    return (
        <div className={styles.container}>
            {/* Page Title */}
            <h3 className={styles.heading}>{title}</h3>
            <div className={styles.underline}></div>

            {/* Search and Category Filter Section */}
            <div className={styles.filterSection}>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />

                {/* Category Dropdown */}
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

            {/* Product Grid */}
            <div className={styles.productGrid}>
                {filteredProducts.length > 0 ? (
                    // If there are matching products, render them
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    // If no products match search, show a "no results" message
                    <p className={styles.noResults}>No products found.</p>
                )}
            </div>
        </div>
    );
};

// Export the component so it can be imported elsewhere
export default ProductListing;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SearchResults.module.css';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                // Get query parameters from URL
                const searchParams = new URLSearchParams(location.search);
                const query = searchParams.get('query');
                const category = searchParams.get('category');
                
                // Build the appropriate URL based on available parameters
                let url;
                
                if (category) {
                    // If category is provided, use the category endpoint
                    url = `http://127.0.0.1:8000/products/category/${encodeURIComponent(category)}`;
                    
                    // Log category search to history
                    saveSearchToHistory(category);
                } else if (query) {
                    // If query is provided, use the search endpoint
                    url = `http://127.0.0.1:8000/search/add/?query=${encodeURIComponent(query)}`;
                    
                    // Log query search to history
                    saveSearchToHistory(query);
                } else {
                    // If no parameters, default to all products
                    url = 'http://127.0.0.1:8000/products/';
                }
                
                console.log('Fetching from URL:', url);
                
                // Set timeout to prevent hanging requests
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);
                
                const response = await fetch(url, { 
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                setProducts(Array.isArray(data) ? data : data.results || []);
            } catch (err) {
                console.error('Error fetching search results:', err);
                if (err.name === 'AbortError') {
                    setError('Request timed out. Please try again or check if the server is running.');
                } else if (err.message.includes('Failed to fetch')) {
                    setError('Unable to connect to the server. Please check if the server is running at http://127.0.0.1:8000');
                } else {
                    setError(err.message || 'Failed to fetch search results');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [location.search]);

    // Function to save search to history
    const saveSearchToHistory = async (searchTerm) => {
        if (!searchTerm) return;
        
        try {
            const response = await fetch('http://127.0.0.1:8000/search/history/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: searchTerm }),
            });
            
            if (!response.ok) {
                console.warn('Failed to save search history:', response.status);
            }
        } catch (err) {
            console.error('Error saving search to history:', err);
            // Don't fail the whole search if this doesn't work
        }
    };

    if (loading) return <div className={styles.loading}>Loading search results...</div>;
    
    if (error) return (
        <div className={styles.errorContainer}>
            <div className={styles.error}>
                <h3>Error</h3>
                <p>{error}</p>
                <div className={styles.troubleshooting}>
                    <h4>Troubleshooting tips:</h4>
                    <ul>
                        <li>Check if the backend server is running at http://127.0.0.1:8000</li>
                        <li>Ensure your internet connection is working</li>
                        <li>Verify the API endpoints are correct</li>
                        <li>Try refreshing the page</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.searchResultsContainer}>
            <h2>Search Results</h2>
            
            {products.length === 0 ? (
                <div className={styles.noResults}>
                    <p>No products found matching your search criteria.</p>
                </div>
            ) : (
                <div className={styles.productGrid}>
                    {products.map((product, index) => (
                        <div key={product.id || `product-${index}`} className={styles.productCard}>
                            <Link to={`/product/${product.id}`}>
                                <div className={styles.imageContainer}>
                                    <img 
                                        src={product.image || 'https://via.placeholder.com/150'} 
                                        alt={product.title || product.name} 
                                        className={styles.productImage} 
                                    />
                                </div>
                                <div className={styles.productInfo}>
                                    <h3>{product.title || product.name}</h3>
                                    <p className={styles.price}>₹{product.price}</p>
                                    {product.category && (
                                        <span className={styles.category}>{product.category}</span>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults; 
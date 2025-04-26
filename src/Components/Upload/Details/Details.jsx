import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import style from './Details.module.css';
import { API_URL } from '../../../../config'; // Adjust this path if needed

const DiseaseDetails = () => {
    const { state } = useLocation(); // Get prediction details from navigation state
    const [products, setProducts] = useState([]); // Store fetched product details
    const [consultants, setConsultants] = useState([]); // Store fetched consultant details

    // Destructure the prediction data from state
    const {
        prediction,
        confidence,
        cure,
        precaution,
        causes,
        products: productRefs,
        consultants: consultantRefs
    } = state || {};

    // Fetch additional details (products and consultants) when page loads
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Fetch product details
                const fetchedProducts = await Promise.all(
                    productRefs.map(async (p) => {
                        const res = await fetch(`${API_URL}/products/product/${p.id}`);
                        return await res.json();
                    })
                );
                setProducts(fetchedProducts);

                // Fetch consultant details
                const fetchedConsultants = await Promise.all(
                    consultantRefs.map(async (c) => {
                        const res = await fetch(`${API_URL}/consultant/profile/${c.id}`);
                        return await res.json();
                    })
                );
                setConsultants(fetchedConsultants);

            } catch (err) {
                console.error("Fetching product/consultant failed", err);
            }
        };

        if (productRefs?.length || consultantRefs?.length) {
            fetchDetails();
        }
    }, [productRefs, consultantRefs]);

    return (
        <div className={style.detailsContainer}>
            {/* Main Heading */}
            <h2 className={style.heading}>Disease Prediction Details</h2>

            {/* Disease Details */}
            <p className={style.detailItem}><strong>Disease Name:</strong> {prediction}</p>
            <p className={style.detailItem}><strong>Confidence:</strong> {confidence?.toFixed(2)}%</p>
            <p className={style.detailItem}><strong>Cure:</strong> {cure}</p>
            <p className={style.detailItem}><strong>Precaution:</strong> {precaution}</p>
            <p className={style.detailItem}><strong>Causes:</strong> {causes}</p>

            {/* Referred Products Section */}
            <h3 className={style.subheading}>Referred Products</h3>
            <div className={style.cardGrid}>
                {products.map(product => (
                    <div key={product.id} className={style.card}>
                        {/* Product Image */}
                        {product.images?.length > 0 && (
                            <img
                                src={`${API_URL}${product.images[0].image}`}
                                alt={product.title}
                                className={style.image}
                            />
                        )}
                        {/* Product Details */}
                        <h4>{product.title}</h4>
                        <p><strong>Brand:</strong> {product.brand_name}</p>
                        <p>
                            {product.description.length > 50
                                ? `${product.description.slice(0, 50)}...`
                                : product.description
                            }
                        </p>
                        <p><strong>Price:</strong> ₹{product.selling_price}</p>

                        {/* Link to Product Details Page */}
                        <Link to={`/product/${product.id}`} className={style.cardLink}>View Details</Link>
                    </div>
                ))}
            </div>

            {/* Referred Consultants Section */}
            <h3 className={style.subheading}>Referred Consultants</h3>
            <div className={style.cardGrid}>
                {consultants.map(consultant => (
                    <div key={consultant.id} className={style.card}>
                        {/* Consultant Image */}
                        <img
                            src={`${API_URL}${consultant.profile}`}
                            alt={consultant.first_name}
                            className={style.image}
                        />
                        {/* Consultant Details */}
                        <h4>{consultant.first_name} {consultant.last_name}</h4>
                        <p><strong>Expertise:</strong> {consultant.expertise}</p>
                        <p><strong>Experience:</strong> {consultant.experience} years</p>
                        <p><strong>Charges:</strong> ₹{consultant.starting_charges}</p>

                        {/* Link to Consultant Profile */}
                        <Link to={`/consultant/${consultant.id}`} className={style.cardLink}>View Profile</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiseaseDetails;

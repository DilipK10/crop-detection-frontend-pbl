//importing necessary libraries and styles
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import styles from './Invoice.module.css';
import logo from '../../../assets/images/soil-monitoring.png';
import html2pdf from 'html2pdf.js';
import { API_URL } from '../../../../config';

// This component generates an invoice for a specific order, displaying user and seller details, product information, and total amount.
const InvoicePage = () => {
    const { saleId } = useParams();
    const [userData, setUserData] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [productDetails, setProductDetails] = useState([]);
    const [sellerData, setSellerData] = useState(null);
    const [invoiceTimestamp, setInvoiceTimestamp] = useState('');
    const componentRef = useRef();

    // Fetching the token from local storage and setting headers for API requests
    const token = localStorage.getItem('access');
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // Function to handle PDF download
    const handlePrint = () => {
        const invoiceElement = componentRef.current;

        const options = {
            margin: 1,
            filename: `Invoice_${saleId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf().set(options).from(invoiceElement).save();
    };

    // Fetching user profile and order summary data when the component mounts
    useEffect(() => {
        fetch(`${API_URL}/user/profile/`, { headers })
            .then(res => res.json())
            .then(setUserData);

        fetch(`${API_URL}/checkout/fetch-order-summary/`, { headers })
            .then(res => res.json())
            .then(async data => {
                // Find the order with the matching saleId
                const order = data.find(o => String(o.id) === saleId);
                if (order) {
                    setOrderData(order);
                    // Fetch product details for each item in the order
                    const productPromises = order.orders.map(item =>
                        fetch(`${API_URL}/products/product/${item.product.id}`, { headers })
                            .then(res => res.json())
                            .then(prod => ({
                                ...prod,
                                quantity: item.quantity,
                                total_price: item.total_price,
                            }))
                    );
                    // Wait for all product details to be fetched
                    const products = await Promise.all(productPromises);
                    setProductDetails(products);

                    // Fetch seller data for the first product in the order
                    const sellerField = products[0]?.seller;
                    const sellerId = typeof sellerField === 'object' ? sellerField?.id : sellerField;

                    if (sellerId) {
                        fetch(`${API_URL}/seller/profile/${sellerId}`, { headers })
                            .then(res => res.json())
                            .then(setSellerData);
                    }
                }
            });
    }, [saleId]);

    useEffect(() => {
        // Set the invoice timestamp to the current date and time
        const now = new Date();
        const formatted = now.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
        setInvoiceTimestamp(formatted);
    }, []);

    // Check if userData, orderData, and productDetails are available before rendering
    if (!userData || !orderData || productDetails.length === 0) {
        return <p>Loading invoice...</p>;
    }

    return (
        // Main container for the invoice page
        <div className={styles.page}>
            {/* // Header for the invoice page */}
            <div className={styles.downloadButton}>
                {/* // Button to download the invoice as a PDF */}
                <button onClick={handlePrint}>Download Invoice PDF</button>
            </div>

            {/* // Invoice content to be printed */}
            <div ref={componentRef} className={styles.invoiceContainer}>
                {/* // Header section of the invoice */}
                <div className={styles.header}>
                    <img src={logo} alt="Crop Detection" className={styles.logo} />
                    <h1>Crop Detection - Invoice</h1>
                    <p><strong>Date:</strong> {invoiceTimestamp}</p>
                </div>

                {/* // Customer and seller details section */}
                <div className={styles.section}>
                    <h2>Customer Details</h2>
                    <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                </div>

                {/* // Seller details section */}
                <div className={styles.section}>
                    <h2>Seller Details</h2>
                    {sellerData ? (
                        <>
                            <p><strong>Name:</strong> {sellerData.firstName} {sellerData.lastName}</p>
                            <p><strong>Email:</strong> {sellerData.email}</p>
                            <p><strong>Phone:</strong> {sellerData.phone}</p>
                            <p><strong>Business Name:</strong> {sellerData.businessName}</p>
                            <p><strong>GST Number:</strong> {sellerData.gst}</p>
                        </>
                    ) : (
                        <p>Seller information not available.</p>
                    )}
                </div>

                {/* // Order summary section     */}
                <div className={styles.section}>
                    <h2>Order Summary</h2>
                    <p><strong>Transaction ID:</strong> {orderData.transaction_id}</p>
                    <p><strong>Payment Method:</strong> {orderData.payment_method}</p>
                    <p><strong>Status:</strong> {orderData.payment_status}</p>
                    <p><strong>Shipping Address:</strong> {orderData.user_address}</p>
                </div>

                {/* // // Product details section     */} 
                <div className={styles.section}>
                    <h2>Product Details</h2>
                    <table className={styles.productTable}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetails.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.brand_name}</td>
                                    <td>₹{item.selling_price}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.total_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* // Total amount section */}
                <div className={styles.section} style={{ textAlign: 'right' }}>
                    <h2>Total: ₹{orderData.total_amount}</h2>
                </div>

                {/* // Footer section */}
                <div className={styles.footerNote}>
                    <p>This is an electronically generated invoice and does not require a signature.</p>
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;

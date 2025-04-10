import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import styles from './Invoice.module.css';

const InvoicePage = () => {
  const { saleId } = useParams();
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const componentRef = useRef();

  const token = localStorage.getItem('access');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Invoice',
  });

  useEffect(() => {
    // Auto-print on mount (optional)
    if (componentRef.current) {
      setTimeout(() => handlePrint(), 1000);
    }
  }, [componentRef.current]);

  useEffect(() => {
    // User profile
    fetch('http://127.0.0.1:8000/user/profile/', { headers })
      .then(res => res.json())
      .then(setUserData)
      .catch(err => console.error('User fetch error:', err));

    // Order details
    fetch('http://127.0.0.1:8000/checkout/fetch-order-summary/', { headers })
      .then(res => res.json())
      .then(async data => {
        const order = data.find(o => String(o.id) === saleId);
        if (order) {
          setOrderData(order);

          // Fetch product details for all products in this order
          const productPromises = order.orders.map(item =>
            fetch(`http://127.0.0.1:8000/products/product/${item.product.id}`, { headers })
              .then(res => res.json())
              .then(prod => ({ ...prod, quantity: item.quantity, total_price: item.total_price }))
          );

          const results = await Promise.all(productPromises);
          setProductDetails(results);
        }
      })
      .catch(err => console.error('Order fetch error:', err));
  }, [saleId]);

  if (!userData || !orderData || productDetails.length === 0) {
    return <p>Loading invoice...</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.downloadButton}>
        <button onClick={handlePrint}>Download PDF</button>
      </div>

      <div className={styles.invoiceContainer} ref={componentRef}>
        {/* Company Header */}
        <div className={styles.header}>
          <img src="/logo.png" alt="Crop Detection" className={styles.logo} />
          <h1>Crop Detection - Invoice</h1>
        </div>

        {/* Customer */}
        <div className={styles.section}>
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
        </div>

        {/* Order Summary */}
        <div className={styles.section}>
          <h2>Order Summary</h2>
          <p><strong>Transaction ID:</strong> {orderData.transaction_id}</p>
          <p><strong>Payment Method:</strong> {orderData.payment_method}</p>
          <p><strong>Payment Status:</strong> {orderData.payment_status}</p>
          <p><strong>Shipping Address:</strong> {orderData.user_address}</p>
          <p><strong>Total Amount:</strong> ₹{orderData.total_amount}</p>
        </div>

        {/* Product Loop */}
        <div className={styles.section}>
          <h2>Product Details</h2>
          {productDetails.map((product, idx) => (
            <div key={idx} className={styles.productBlock}>
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> ₹{product.selling_price}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Total Price:</strong> ₹{product.total_price}</p>
              {product.image && (
                <img src={product.image} alt={product.name} className={styles.productImage} />
              )}
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;

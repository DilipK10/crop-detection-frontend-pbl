// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { useReactToPrint } from 'react-to-print';
// import styles from './Invoice.module.css';

// const InvoicePage = () => {
//   const { saleId } = useParams();
//   const [userData, setUserData] = useState(null);
//   const [orderData, setOrderData] = useState(null);
//   const [productDetails, setProductDetails] = useState([]);
//   const componentRef = useRef();

//   const token = localStorage.getItem('access');
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   };

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: 'Invoice',
//   });

//   useEffect(() => {
//     // Auto-print on mount (optional)
//     if (componentRef.current) {
//       setTimeout(() => handlePrint(), 1000);
//     }
//   }, [componentRef.current]);

//   useEffect(() => {
//     // User profile
//     fetch('http://127.0.0.1:8000/user/profile/', { headers })
//       .then(res => res.json())
//       .then(setUserData)
//       .catch(err => console.error('User fetch error:', err));

//     // Order details
//     fetch('http://127.0.0.1:8000/checkout/fetch-order-summary/', { headers })
//       .then(res => res.json())
//       .then(async data => {
//         const order = data.find(o => String(o.id) === saleId);
//         if (order) {
//           setOrderData(order);

//           // Fetch product details for all products in this order
//           const productPromises = order.orders.map(item =>
//             fetch(`http://127.0.0.1:8000/products/product/${item.product.id}`, { headers })
//               .then(res => res.json())
//               .then(prod => ({ ...prod, quantity: item.quantity, total_price: item.total_price }))
//           );

//           const results = await Promise.all(productPromises);
//           setProductDetails(results);
//         }
//       })
//       .catch(err => console.error('Order fetch error:', err));
//   }, [saleId]);

//   if (!userData || !orderData || productDetails.length === 0) {
//     return <p>Loading invoice...</p>;
//   }

//   return (
//     <div className={styles.page}>
//       <div className={styles.downloadButton}>
//         <button onClick={handlePrint}>Download PDF</button>
//       </div>

//       <div className={styles.invoiceContainer} ref={componentRef}>
//         {/* Company Header */}
//         <div className={styles.header}>
//           <img src="/logo.png" alt="Crop Detection" className={styles.logo} />
//           <h1>Crop Detection - Invoice</h1>
//         </div>

//         {/* Customer */}
//         <div className={styles.section}>
//           <h2>Customer Details</h2>
//           <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
//           <p><strong>Phone:</strong> {userData.phone}</p>
//         </div>

//         {/* Order Summary */}
//         <div className={styles.section}>
//           <h2>Order Summary</h2>
//           <p><strong>Transaction ID:</strong> {orderData.transaction_id}</p>
//           <p><strong>Payment Method:</strong> {orderData.payment_method}</p>
//           <p><strong>Payment Status:</strong> {orderData.payment_status}</p>
//           <p><strong>Shipping Address:</strong> {orderData.user_address}</p>
//           <p><strong>Total Amount:</strong> ₹{orderData.total_amount}</p>
//         </div>

//         {/* Product Loop */}
//         <div className={styles.section}>
//           <h2>Product Details</h2>
//           {productDetails.map((product, idx) => (
//             <div key={idx} className={styles.productBlock}>
//               <p><strong>Name:</strong> {product.name}</p>
//               <p><strong>Brand:</strong> {product.brand}</p>
//               <p><strong>Description:</strong> {product.description}</p>
//               <p><strong>Price:</strong> ₹{product.selling_price}</p>
//               <p><strong>Quantity:</strong> {product.quantity}</p>
//               <p><strong>Total Price:</strong> ₹{product.total_price}</p>
//               {product.image && (
//                 <img src={product.image} alt={product.name} className={styles.productImage} />
//               )}
//               <hr />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoicePage;

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import styles from './Invoice.module.css';
import logo from '../../../assets/images/soil-monitoring.png';
import html2pdf from 'html2pdf.js';
import { API_URL } from '../../../../config';

const InvoicePage = () => {
  const { saleId } = useParams();
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [sellerData, setSellerData] = useState(null);
  const [invoiceTimestamp, setInvoiceTimestamp] = useState('');
  const componentRef = useRef();

  const token = localStorage.getItem('access');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: `Invoice_${saleId}`,
  //   removeAfterPrint: true,
  // });

  // const handlePrint  = () => {
  //   console.log('Printing invoice...');
  //   // const printWindow = window.open('', '_blank');
  //   // if (printWindow) {
  //   //   printWindow.document.write('<html><head><title>Invoice</title>');
  //   //   printWindow.document.write('<link rel="stylesheet" href="/path/to/your/styles.css">'); // Adjust the path to your CSS file
  //   //   printWindow.document.write('</head><body>');
  //   //   printWindow.document.write(componentRef.current.innerHTML);
  //   //   printWindow.document.write('</body></html>');
  //   //   printWindow.document.close();
  //   //   printWindow.print();
  //   // }

  //   // Show and generate the PDF
  //   const invoiceElement = componentRef.current;
  //   // invoiceElement.style.display = 'block';

  //   const options = {
  //       margin: 1,
  //       // filename: `INVOICE_${invoiceData.sale_id}.pdf`,
  //       filename: `Invoice_${saleId}.pdf`,
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  //   };

  //   html2pdf().set(options).from(invoiceElement).save().then(() => {
  //       invoiceElement.style.display = 'none';
  //   });
  // };

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

  useEffect(() => {
    fetch(`${API_URL}/user/profile/`, { headers })
      .then(res => res.json())
      .then(setUserData);

    fetch(`${API_URL}/checkout/fetch-order-summary/`, { headers })
      .then(res => res.json())
      .then(async data => {
        const order = data.find(o => String(o.id) === saleId);
        if (order) {
          setOrderData(order);
          const productPromises = order.orders.map(item =>
            fetch(`${API_URL}/products/product/${item.product.id}`, { headers })
              .then(res => res.json())
              .then(prod => ({
                ...prod,
                quantity: item.quantity,
                total_price: item.total_price,
              }))
          );
          const products = await Promise.all(productPromises);
          setProductDetails(products);

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

  if (!userData || !orderData || productDetails.length === 0) {
    return <p>Loading invoice...</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.downloadButton}>
        <button onClick={handlePrint}>Download Invoice PDF</button>
      </div>

      <div ref={componentRef} className={styles.invoiceContainer}>
        <div className={styles.header}>
          <img src={logo} alt="Crop Detection" className={styles.logo} />
          <h1>Crop Detection - Invoice</h1>
          <p><strong>Date:</strong> {invoiceTimestamp}</p>
        </div>

        <div className={styles.section}>
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
        </div>

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

        <div className={styles.section}>
          <h2>Order Summary</h2>
          <p><strong>Transaction ID:</strong> {orderData.transaction_id}</p>
          <p><strong>Payment Method:</strong> {orderData.payment_method}</p>
          <p><strong>Status:</strong> {orderData.payment_status}</p>
          <p><strong>Shipping Address:</strong> {orderData.user_address}</p>
        </div>

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

        <div className={styles.section} style={{ textAlign: 'right' }}>
          <h2>Total: ₹{orderData.total_amount}</h2>
        </div>

        <div className={styles.footerNote}>
          <p>This is an electronically generated invoice and does not require a signature.</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;

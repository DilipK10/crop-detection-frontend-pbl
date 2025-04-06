import React, { useContext, useState } from "react";
import { CartContext } from "../../../CartContext";
import styles from "./OrderHistory.module.css";
import image1 from "../../../assets/images/image1.jpg";
import image2 from "../../../assets/images/img_2.jpg";
import image3 from "../../../assets/images/img_3.jpg";
import image4 from "../../../assets/images/img_4.jpg";
import image5 from "../../../assets/images/img_5.jpg";

const OrderHistory = () => {
  const { orderHistory } = useContext(CartContext);
  const [filterStatus, setFilterStatus] = useState("All");
  
  // Sample orders as fallback if no orders in context
  const sampleOrders = [
    {
      id: "#ORD001",
      name: "Nestle Original Coffee-Mate Coffee Creamer",
      image: image1,
      price: "$32.85",
      quantity: 2,
      status: "Delivered",
      date: "March 10, 2025",
    },
    {
      id: "#ORD002",
      name: "Organic Cage-Free Grade A Large Brown Eggs",
      image: image2,
      price: "$18.50",
      quantity: 1,
      status: "Shipped",
      date: "March 12, 2025",
    },
    {
      id: "#ORD003",
      name: "Seeds of Change Organic Quinoa",
      image: image3,
      price: "$25.99",
      quantity: 3,
      status: "Processing",
      date: "March 15, 2025",
    },
    {
      id: "#ORD004",
      name: "Naturally Flavored Cinnamon Vanilla Light Roast Coffee",
      image: image4,
      price: "$12.99",
      quantity: 1,
      status: "Cancelled",
      date: "March 18, 2025",
    },
    {
      id: "#ORD005",
      name: "Foster Farms Takeout Crispy Classic Buffalo Wings",
      image: image5,
      price: "$14.75",
      quantity: 2,
      status: "Delivered",
      date: "March 20, 2025",
    },
  ];

  // Function to filter orders by status
  const filterOrders = (orders) => {
    if (filterStatus === "All") return orders;
    return orders.filter(order => order.status === filterStatus);
  };

  // Use order history from context if available, otherwise use sample orders
  const displayOrders = orderHistory && orderHistory.length > 0 ? orderHistory : sampleOrders;
  const filteredOrders = filterOrders(displayOrders);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Order History</h2>
      
      {/* Filter controls */}
      <div className={styles.filterControls}>
        <p className={styles.filterLabel}>Filter by status:</p>
        <div className={styles.filterButtons}>
          {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
            <button 
              key={status} 
              className={`${styles.filterButton} ${filterStatus === status ? styles.activeFilter : ''}`} 
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      
      {orderHistory && orderHistory.length > 0 ? (
        <>
          {filteredOrders.length > 0 ? (
            <div className={styles.orderList}>
              {filteredOrders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <p className={styles.orderId}><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                      {order.status}
                    </p>
                  </div>
                  
                  <div className={styles.orderItems}>
                    {order.items && order.items.map((item, index) => (
                      <div key={index} className={styles.orderItem}>
                        <img src={item.image} alt={item.name} className={styles.productImage} />
                        <div className={styles.details}>
                          <p className={styles.productName}>{item.name}</p>
                          <div className={styles.itemDetails}>
                            <p className={styles.price}><strong>Price:</strong> ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={styles.orderFooter}>
                    <p><strong>Total:</strong> ${order.totalPrice}</p>
                    {order.shippingInfo && (
                      <p><strong>Shipping Address:</strong> {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyMessage}>No orders found with status "{filterStatus}". Try another filter.</p>
          )}
        </>
      ) : (
        <div>
          <p className={styles.emptyMessage}>You have no order history yet. Start shopping now!</p>
          
          {filteredOrders.length > 0 ? (
            <div className={styles.orderList}>
              {filteredOrders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <p className={styles.orderId}><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                      {order.status}
                    </p>
                  </div>
                  
                  <div className={styles.orderItems}>
                    <div className={styles.orderItem}>
                      <img src={order.image} alt={order.name} className={styles.productImage} />
                      <div className={styles.details}>
                        <p className={styles.productName}>{order.name}</p>
                        <div className={styles.itemDetails}>
                          <p className={styles.price}><strong>Price:</strong> {order.price}</p>
                          <p><strong>Quantity:</strong> {order.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.orderFooter}>
                    <p><strong>Order Date:</strong> {order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyMessage}>No sample orders found with status "{filterStatus}". Try another filter.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

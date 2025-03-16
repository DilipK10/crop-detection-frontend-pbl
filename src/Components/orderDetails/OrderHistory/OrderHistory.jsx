import React from "react";
import styles from "./OrderHistory.module.css";
import image1 from "../../../assets/images/image1.jpg";
import image2 from "../../../assets/images/img_2.jpg";
import image3 from "../../../assets/images/img_3.jpg";
import image4 from "../../../assets/images/img_4.jpg";
import image5 from "../../../assets/images/img_5.jpg";

const OrderHistory = () => {
  const orders = [
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

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🛒 Order History</h2>
      <div className={styles.orderList}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <img src={order.image} alt={order.name} className={styles.productImage} />
            <div className={styles.details}>
              <p className={styles.orderId}><strong>Order ID:</strong> {order.id}</p>
              <p className={styles.productName}>{order.name}</p>
              <p className={styles.price}><strong>Price:</strong> {order.price}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;

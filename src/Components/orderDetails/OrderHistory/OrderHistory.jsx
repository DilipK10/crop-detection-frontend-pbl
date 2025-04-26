// importing necessary libraries and styles
import React, { useEffect, useState } from "react";
import styles from "./OrderHistory.module.css";
import axios from "axios";
import { API_URL } from "../../../../config";

// OrderHistory component to display the order history of the user
const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Function to fetch order summary from the backend
        const fetchOrderSummary = async () => {
            try {
                const token = localStorage.getItem("access");

                const orderResponse = await axios.get(
                    `${API_URL}/checkout/fetch-order-summary/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Format the order data to include product details
                const ordersWithProducts = await Promise.all(
                    orderResponse.data.map(async (order) => {
                        const formattedItems = await Promise.all(
                            order.orders.map(async (item) => {
                                return {
                                    name: item.product.name,
                                    price: item.rate,
                                    quantity: item.quantity,
                                };
                            })
                        );

                        return {
                            id: order.id,
                            date: new Date(order.order_date).toLocaleDateString(),
                            totalPrice: order.total_amount,
                            shippingInfo: {
                                address: order.user_address,
                            },
                            items: formattedItems,
                        };
                    })
                );

                setOrders(ordersWithProducts);
            } catch (error) {
                console.error("Error fetching order summary:", error);
            }
        };

        fetchOrderSummary();
    }, []);

    return (
        // main container for the order history
        <div className={styles.container}>
            <h2 className={styles.heading}>Order History</h2>

            {orders.length > 0 ? (
                // If there are orders, display them in a list
                <div className={styles.orderList}>
                    {orders.map((order) => (
                        // Each order is displayed in a card format
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <p className={styles.orderId}>
                                    <strong>Order ID:</strong> {order.id}
                                </p>
                                <p>
                                    <strong>Date:</strong> {order.date}
                                </p>
                            </div>

                            {/* // Displaying the items in the order */}
                            <div className={styles.orderItems}>
                                {order.items.map((item, index) => (

                                    // Each item in the order is displayed with its details
                                    <div key={index} className={styles.orderItem}>
                                        <div className={styles.details}>
                                            <p className={styles.productName}>{item.name}</p>

                                            {/* // Displaying the quantity of the product */}
                                            <div className={styles.itemDetails}>
                                                <p className={styles.price}>
                                                    <strong>Price:</strong> ₹{parseFloat(item.price).toFixed(2)}
                                                </p>
                                                <p>
                                                    <strong>Quantity:</strong> {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* // Displaying the total price and shipping address */}
                            <div className={styles.orderFooter}>
                                <p>
                                    <strong>Total:</strong> ₹{parseFloat(order.totalPrice).toFixed(2)}
                                </p>
                                <p>
                                    <strong>Shipping Address:</strong> {order.shippingInfo.address}
                                </p>
                                <a
                                    href={`/invoice/${order.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.invoiceLink}
                                >
                                    View Invoice
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.emptyMessage}>You have no order history yet.</p>
            )}
        </div>
    );
};

export default OrderHistory;



//importing necessary libraries and styles
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import { API_URL } from '../../../../config';

// This component handles the checkout process, including displaying the order summary, user details, and payment options.
const Checkout = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: ''
    });

    const [formData, setFormData] = useState({
        address: ''
    });

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCartAndUser = async () => {
            try {
                // Fetch cart
                const cartRes = await fetch(`${API_URL}/cart/view/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                });

                if (!cartRes.ok) throw new Error('Failed to fetch cart');
                const cartData = await cartRes.json();

                // Format cart data
                const formattedCart = cartData.map(item => ({
                    id: item.id,
                    product: item.product,
                    quantity: item.quantity
                }));

                setCart(formattedCart);

                // Calculate total amount
                const total = formattedCart.reduce((sum, item) =>
                    sum + parseFloat(item.product.selling_price) * item.quantity, 0);
                setTotalAmount(total);

                // Fetch user profile
                const userRes = await fetch(`${API_URL}/user/profile/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                });

                if (!userRes.ok) throw new Error('Failed to fetch user');
                const userData = await userRes.json();

                setUserDetails({
                    name: `${userData.firstName} ${userData.lastName}`,
                    phone: String(userData.phone).trim()
                });

            } catch (err) {
                console.error('Error:', err);
                alert('Failed to load cart or user info.');
            }
        };

        fetchCartAndUser();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle payment initiation
    const handlePayment = async () => {
        try {
            const res = await fetch(`${API_URL}/checkout/create_order/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
                body: JSON.stringify({ amount: totalAmount })
            });

            // Check if the response is ok
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            // Load Razorpay script if not already loaded
            const options = {
                key: data.razorpay_key,
                amount: data.amount,
                currency: data.currency,
                name: "Crop Disease",
                description: "Test Transaction",
                order_id: data.order_id,
                handler: async (response) => {
                    // Send only required fields to backend
                    const order = {
                        address: formData.address,
                        total_amount: totalAmount,
                        transaction_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        payment_method: 'online',
                        payment_status: 'success'
                    };

                    // Save order to backend
                    const orderRes = await fetch(`${API_URL}/checkout/placeorder/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        },
                        body: JSON.stringify(order)
                    });

                    if (orderRes.ok) {
                        alert("Order placed successfully!");
                        navigate('/history');
                    } else {
                        alert("Order save failed, but payment was successful.");
                    }
                },
                prefill: {
                    name: userDetails.name || "Customer",
                    email: "customer@example.com",
                    contact: userDetails.phone || "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            // Load Razorpay script if not already loaded
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment initiation failed.");
        }
    };

    return (
        // Main container for the checkout page
        <div className={styles.checkoutContainer}>
            <h2 className={styles.heading}>Checkout</h2>

            {/* // Grid layout for displaying order summary and form */}
            <div className={styles.checkoutGrid}>
                {/* // Order summary section */}
                <div className={styles.orderSummary}>
                    <h3>Order Summary</h3>
                    {cart.map(item => (
                        // Display each item in the cart
                        <div key={item.id} className={styles.summaryItem}>
                            <img
                                src={item.product.images?.[0]?.image || "/placeholder.jpg"}
                                alt={item.product.name}
                                className={styles.summaryImage}
                            />
                            {/* // Display product details */}
                            <div className={styles.summaryDetails}>
                                <p className={styles.summaryName}>{item.product.name}</p>
                                <p className={styles.summaryPrice}>
                                    Rs. {parseFloat(item.product.selling_price).toFixed(2)} x {item.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* // Display total amount */}
                    <div className={styles.totalSection}>
                        <h4>Total: Rs. {totalAmount.toFixed(2)}</h4>
                    </div>
                </div>

                {/* // User details and payment form section */}
                <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className={styles.checkoutForm}>
                    {/* // Display Address */}
                    <div className={styles.formSection}>
                        <h3>Shipping Address</h3>
                        <div className={styles.formGroup}>
                            <label>Address</label>
                            {/* // Input field for address */}
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* // button to initiate payment */}
                    <button type="submit" className={styles.placeOrderBtn}>
                        Pay & Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;

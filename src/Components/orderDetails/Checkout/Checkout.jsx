// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../../../CartContext';
// import styles from './Checkout.module.css';

// const Checkout = () => {
//     const navigate = useNavigate();
//     const { cart, clearCart, addToOrderHistory } = useContext(CartContext);
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         address: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         cardNumber: '',
//         expiryDate: '',
//         cvv: ''
//     });

//     const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         // Create order object
//         const order = {
//             id: `#ORD${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
//             items: [...cart],
//             totalPrice,
//             shippingInfo: {
//                 name: `${formData.firstName} ${formData.lastName}`,
//                 email: formData.email,
//                 phone: formData.phone,
//                 address: formData.address,
//                 city: formData.city,
//                 state: formData.state,
//                 zipCode: formData.zipCode
//             },
//             date: new Date().toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             }),
//             status: 'Processing'
//         };
        
//         // Add order to history
//         addToOrderHistory(order);
        
//         // Here you would typically send the order to your backend
//         alert('Order placed successfully!');
//         clearCart();
//         navigate('/history');
//     };

//     return (
//         <div className={styles.checkoutContainer}>
//             <h2 className={styles.heading}>Checkout</h2>
            
//             <div className={styles.checkoutGrid}>
//                 {/* Order Summary */}
//                 <div className={styles.orderSummary}>
//                     <h3>Order Summary</h3>
//                     {cart.map(item => (
//                         <div key={item.id} className={styles.summaryItem}>
//                             <img src={item.image} alt={item.name} className={styles.summaryImage} />
//                             <div className={styles.summaryDetails}>
//                                 <p className={styles.summaryName}>{item.name}</p>
//                                 <p className={styles.summaryPrice}>${item.price.toFixed(2)} x {item.quantity}</p>
//                             </div>
//                         </div>
//                     ))}
//                     <div className={styles.totalSection}>
//                         <h4>Total: ${totalPrice}</h4>
//                     </div>
//                 </div>

//                 {/* Checkout Form */}
//                 <form onSubmit={handleSubmit} className={styles.checkoutForm}>
//                     <div className={styles.formSection}>
//                         <h3>Shipping Information</h3>
//                         <div className={styles.formGrid}>
//                             <div className={styles.formGroup}>
//                                 <label>First Name</label>
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     value={formData.firstName}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label>Last Name</label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={formData.lastName}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label>Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label>Phone</label>
//                                 <input
//                                     type="tel"
//                                     name="phone"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label>Address</label>
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label>City</label>
//                                 <input
//                                     type="text"
//                                     name="city"
//                                     value={formData.city}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label>State</label>
//                                 <input
//                                     type="text"
//                                     name="state"
//                                     value={formData.state}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label>ZIP Code</label>
//                                 <input
//                                     type="text"
//                                     name="zipCode"
//                                     value={formData.zipCode}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className={styles.formSection}>
//                         <h3>Payment Information</h3>
//                         <div className={styles.formGrid}>
//                             <div className={styles.formGroup}>
//                                 <label>Card Number</label>
//                                 <input
//                                     type="text"
//                                     name="cardNumber"
//                                     value={formData.cardNumber}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label>Expiry Date</label>
//                                 <input
//                                     type="text"
//                                     name="expiryDate"
//                                     placeholder="MM/YY"
//                                     value={formData.expiryDate}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label>CVV</label>
//                                 <input
//                                     type="text"
//                                     name="cvv"
//                                     value={formData.cvv}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <button type="submit" className={styles.placeOrderBtn}>
//                         Place Order
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Checkout; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import { API_URL } from '../../../../config';

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

                const formattedCart = cartData.map(item => ({
                    id: item.id,
                    product: item.product,
                    quantity: item.quantity
                }));

                setCart(formattedCart);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

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

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment initiation failed.");
        }
    };

    return (
        <div className={styles.checkoutContainer}>
            <h2 className={styles.heading}>Checkout</h2>

            <div className={styles.checkoutGrid}>
                <div className={styles.orderSummary}>
                    <h3>Order Summary</h3>
                    {cart.map(item => (
                        <div key={item.id} className={styles.summaryItem}>
                            <img
                                src={item.product.images?.[0]?.image || "/placeholder.jpg"}
                                alt={item.product.name}
                                className={styles.summaryImage}
                            />
                            <div className={styles.summaryDetails}>
                                <p className={styles.summaryName}>{item.product.name}</p>
                                <p className={styles.summaryPrice}>
                                    Rs. {parseFloat(item.product.selling_price).toFixed(2)} x {item.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className={styles.totalSection}>
                        <h4>Total: Rs. {totalAmount.toFixed(2)}</h4>
                    </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className={styles.checkoutForm}>
                    <div className={styles.formSection}>
                        <h3>Shipping Address</h3>
                        <div className={styles.formGroup}>
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className={styles.placeOrderBtn}>
                        Pay & Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../CartContext';
import styles from './Checkout.module.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart, addToOrderHistory } = useContext(CartContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create order object
        const order = {
            id: `#ORD${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            items: [...cart],
            totalPrice,
            shippingInfo: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode
            },
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            status: 'Processing'
        };
        
        // Add order to history
        addToOrderHistory(order);
        
        // Here you would typically send the order to your backend
        alert('Order placed successfully!');
        clearCart();
        navigate('/history');
    };

    return (
        <div className={styles.checkoutContainer}>
            <h2 className={styles.heading}>Checkout</h2>
            
            <div className={styles.checkoutGrid}>
                {/* Order Summary */}
                <div className={styles.orderSummary}>
                    <h3>Order Summary</h3>
                    {cart.map(item => (
                        <div key={item.id} className={styles.summaryItem}>
                            <img src={item.image} alt={item.name} className={styles.summaryImage} />
                            <div className={styles.summaryDetails}>
                                <p className={styles.summaryName}>{item.name}</p>
                                <p className={styles.summaryPrice}>${item.price.toFixed(2)} x {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <div className={styles.totalSection}>
                        <h4>Total: ${totalPrice}</h4>
                    </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                    <div className={styles.formSection}>
                        <h3>Shipping Information</h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
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
                            <div className={styles.formGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h3>Payment Information</h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className={styles.placeOrderBtn}>
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout; 
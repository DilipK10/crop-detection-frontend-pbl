import React, { useState } from 'react';
import styles from './MyCart.module.css';
import { Link } from 'react-router-dom';
import image1 from "../../../assets/images/image1.jpg";
import image2 from "../../../assets/images/img_2.jpg";
import image3 from "../../../assets/images/img_3.jpg";
import image4 from "../../../assets/images/img_4.jpg";
import image5 from "../../../assets/images/img_5.jpg";

// Sample Cart Products (You can replace this with dynamic cart data)
const initialCart = [
    {
        id: 1,
        name: "Nestle Original Coffee-Mate Coffee Creamer",
        image: image1,
        price: 32.85,
        quantity: 1
    },
    {
        id: 2,
        name: "Organic Cage-Free Grade A Large Brown Eggs",
        image: image2,
        price: 28.50,
        quantity: 1
    },
    {
        id: 3,
        name: "Seeds of Change Organic Quinoa",
        image: image3,
        price: 18.99,
        quantity: 1
    }
];

const MyCart = () => {
    const [cart, setCart] = useState(initialCart);

    // Handle Quantity Change
    const updateQuantity = (id, quantity) => {
        setCart(cart.map(item => 
            item.id === id ? { ...item, quantity: Number(quantity) } : item
        ));
    };

    // Handle Remove Item
    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Calculate Total Price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className={styles.cartContainer}>
            <h2 className={styles.heading}>🛒 My Cart</h2>

            {cart.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty. <Link to="/">Go Shopping!</Link></p>
            ) : (
                <div className={styles.cartItems}>
                    {cart.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                            <div className={styles.itemDetails}>
                                <p className={styles.itemName}>{item.name}</p>
                                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                                <select 
                                    value={item.quantity} 
                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                    className={styles.quantitySelector}
                                >
                                    {[...Array(10).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                                <button className={styles.removeButton} onClick={() => removeItem(item.id)}>❌ Remove</button>
                            </div>
                        </div>
                    ))}

                    {/* Total Price Section */}
                    <div className={styles.cartSummary}>
                        <h3>Total: ${totalPrice}</h3>
                        <button className={styles.checkoutButton}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyCart;

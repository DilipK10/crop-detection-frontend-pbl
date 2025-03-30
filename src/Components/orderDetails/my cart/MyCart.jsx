import React, { useContext } from 'react';
import styles from './MyCart.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../CartContext';

const MyCart = () => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    // Handle Quantity Change
    const updateQuantity = (item, quantity) => {
        // Create a new item with updated quantity
        const updatedItem = { ...item, quantity: Number(quantity) };
        
        // Remove the old item and add the updated one
        removeFromCart(item.id);
        addToCart(updatedItem);
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
                                {item.size && <p className={styles.itemSize}>Size: {item.size}</p>}
                                <select 
                                    value={item.quantity} 
                                    onChange={(e) => updateQuantity(item, e.target.value)}
                                    className={styles.quantitySelector}
                                >
                                    {[...Array(10).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                                <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>❌ Remove</button>
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

//importing necessary libraries and styles
import React, { useEffect, useState } from 'react';
import styles from './MyCart.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../config'; // Adjust the import based on your project structure

// MyCart component to display and manage the shopping cart
const MyCart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    // Fetch cart from backend
    useEffect(() => {
        fetchCart();
    }, []);

    // Function to fetch cart items from the backend
    const fetchCart = async () => {
        try {
            const response = await fetch(`${API_URL}/cart/view/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch cart');

            const data = await response.json();

            // Format the cart data to match the component's state structure
            const formattedCart = data.map(item => ({
                id: item.id,
                productId: item.product.id,
                name: item.product.name,
                price: parseFloat(item.product.selling_price),
                image: item.product.images?.[0]?.image || '/default-image.png',
                quantity: item.quantity
            }));


            setCart(formattedCart);
        } catch (err) {
            console.error('Error fetching cart:', err);
            // alert('Could not load cart items');
        }
    };

    // Function to update the quantity of an item in the cart
    const updateQuantity = async (itemId, newQuantity) => {
        const item = cart.find(i => i.id === itemId);
        if (!item) return;

        setCart(prevCart =>
            prevCart.map(i =>
                i.id === itemId ? { ...i, quantity: Number(newQuantity) } : i
            )
        );

        // Update the quantity in the backend
        try {
            const response = await fetch(`${API_URL}/cart/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
                body: JSON.stringify({
                    productID: item.productId,
                    quantity: Number(newQuantity)
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Failed to update quantity');
            }

            // Optional: Uncomment to re-fetch cart from backend
            // await fetchCart();
        } catch (err) {
            console.error("Update quantity error:", err);
            alert("Failed to update quantity.");
        }
    };

    // Function to remove an item from the cart
    const removeItem = async (itemId, productId) => {
        try {
            const response = await fetch(`${API_URL}/cart/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
                body: JSON.stringify({ productID: productId })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Failed to remove item');
            }

            setCart(prevCart => prevCart.filter(item => item.id !== itemId));
            alert("Item removed from cart.");
        } catch (err) {
            console.error("Remove item error:", err);
            alert("Failed to remove item from cart.");
        }
    };

    // Calculate the total price of items in the cart
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    // Function to handle checkout
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        navigate('/checkout');
    };

    return (
        // Main component 
        <div className={styles.cartContainer}>
            <h2 className={styles.heading}>🛒 My Cart</h2>

            {cart.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty. <Link to="/">Go Shopping!</Link></p>
            ) : (
                // Cart items display
                <div className={styles.cartItems}>
                    {cart.map(item => (

                        // Individual cart item display
                        <div key={item.id} className={styles.cartItem}>
                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                            <div className={styles.itemDetails}>
                                <p className={styles.itemName}>{item.name}</p>
                                <p className={styles.itemPrice}>₹{item.price.toFixed(2)}</p>

                                {/* // Quantity selector and remove button */}
                                <select
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                    className={styles.quantitySelector}
                                >
                                    {[...Array(10).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                                {/* // Remove button */}
                                <button
                                    className={styles.removeButton}
                                    onClick={() => removeItem(item.id, item.productId)}
                                >
                                    ❌ Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* // Total price and checkout button */}
                    <div className={styles.cartSummary}>
                        <h3>Total: ₹{totalPrice}</h3>
                        <button className={styles.checkoutButton} onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCart;

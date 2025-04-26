import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(); // Ensure context is created

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage if available
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Initialize orderHistory from localStorage if available
    const [orderHistory, setOrderHistory] = useState(() => {
        const savedHistory = localStorage.getItem('orderHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Save orderHistory to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }, [orderHistory]);

    const addToCart = (product) => {
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
            // If product exists, update quantity instead of adding new item
            const updatedCart = [...cart];

            // We are replacing the product entirely in case other attributes have changed
            // For example, if size was changed in product details
            updatedCart[existingItemIndex] = product;

            setCart(updatedCart);
        } else {
            // If product doesn't exist, add it to cart
            setCart([...cart, product]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const addToOrderHistory = (order) => {
        setOrderHistory([...orderHistory, order]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            orderHistory,
            addToOrderHistory
        }}>
            {children}
        </CartContext.Provider>
    );
};

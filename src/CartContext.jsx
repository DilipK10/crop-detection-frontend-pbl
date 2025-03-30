import { createContext, useState } from "react";

export const CartContext = createContext(); // Ensure context is created

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

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

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

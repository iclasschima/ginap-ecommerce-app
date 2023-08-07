import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const isProductInCart = cartItems.find((item) => item.id === product.id);

    if (isProductInCart) {
      // Increment the quantity if the product already exists in the cart
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      // Add the product to the cart if it doesn't exist
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems.filter((item) => item.quantity > 0));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };

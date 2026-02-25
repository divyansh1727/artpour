import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, customerInfo = {}) => {
    if (!product._id) product._id = product.id || crypto.randomUUID();
    if (!product.price) product.price = Number(product.price || 0);

    setCart(prev => {
      const exists = prev.find(p => p._id === product._id);
      if (exists) {
        return prev.map(p =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + quantity, customerInfo }
            : p
        );
      } else {
        return [...prev, { ...product, quantity, customerInfo }];
      }
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p._id !== id));

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(p => (p._id === id ? { ...p, quantity: qty } : p)));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
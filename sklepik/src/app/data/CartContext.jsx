'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import {products} from '@/app/data/products';
const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const tempCart = JSON.parse(storedCart);
  
      // Filtrowanie: tylko produkty które istnieją i mają stock > 0
      const validCart = tempCart.filter((cartItem) => {
        const matchingProduct = products.find((p) => p.id === cartItem.id);
        return matchingProduct && matchingProduct.stock > 0;
      });
  
      setCart(validCart);
      localStorage.setItem('cart', JSON.stringify(validCart)); // Nadpisz nieprawidłowe
    }
  }, [products]);
  

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

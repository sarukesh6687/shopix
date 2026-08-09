import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    if (user) api.get('/cart').then(r => setCart(r.data)).catch(() => {});
    else setCart({ items: [] });
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await api.post('/cart/add', { productId, quantity });
    setCart(data);
  };

  const updateItem = async (itemId, quantity) => {
    const { data } = await api.put(`/cart/item/${itemId}`, { quantity });
    setCart(data);
  };

  const removeItem = async (itemId) => {
    const { data } = await api.delete(`/cart/item/${itemId}`);
    setCart(data);
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
    } catch (e) {}
    setCart({ items: [] });
  };

  const items = Array.isArray(cart?.items) ? cart.items : [];
  const itemCount = items.reduce((s, i) => s + (i?.quantity || 1), 0);
  const total = items.reduce((s, i) => {
    const p = i?.product;
    const price = p?.discountPercent > 0 ? p.price * (1 - p.discountPercent / 100) : p?.price || 0;
    return s + price * (i?.quantity || 1);
  }, 0);

  return <CartContext.Provider value={{ cart: { items }, addToCart, updateItem, removeItem, clearCart, itemCount, total }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);


import { useCallback, useState } from 'react';
import { CartItem, Coupon, Product } from '../types';
import {
  calculateCartTotal,
  getMaxApplicableDiscount,
  getRemainingStock,
  updateCartItemQuantity,
} from '../utils/cartUtils';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = useCallback(
    (product: Product) => {
      const remainingStock = getRemainingStock(product, cart);
      if (remainingStock <= 0) return;

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.product.id === product.id);
        if (existingItem) {
          return updateCartItemQuantity(prevCart, product.id, existingItem.quantity + 1);
        }
        return [...prevCart, { product, quantity: 1 }];
      });
    },
    [cart],
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  }, []);

  const applyCoupon = useCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
  }, []);

  const removeCoupon = useCallback(() => {
    setSelectedCoupon(null);
  }, []);

  const getItemDiscount = useCallback((item: CartItem) => {
    return getMaxApplicableDiscount(item);
  }, []);

  return {
    cart,
    selectedCoupon,
    total: calculateCartTotal(cart, selectedCoupon),
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    getItemDiscount,
    getRemainingStock: useCallback((product: Product) => getRemainingStock(product, cart), [cart]),
    calculateCartTotal: () => calculateCartTotal(cart, selectedCoupon),
  };
};

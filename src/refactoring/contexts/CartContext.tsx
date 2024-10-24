import { createContext, ReactNode, useContext } from 'react';
import { useCart } from '../hooks';

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<ReturnType<typeof useCart> | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cartState = useCart();
  return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

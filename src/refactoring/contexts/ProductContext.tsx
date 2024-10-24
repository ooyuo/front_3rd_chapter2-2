import React, { createContext, useContext, ReactNode } from 'react';
import { useProducts } from '../hooks';
import { Product } from '../types';

interface ProductProviderProps {
  children: ReactNode;
  initialProducts?: Product[];
}

const ProductContext = createContext<ReturnType<typeof useProducts> | undefined>(undefined);

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
  initialProducts = [],
}) => {
  const productState = useProducts(initialProducts);

  return <ProductContext.Provider value={productState}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

import { useCallback, useEffect, useState } from 'react';
import { Discount, Product } from '../../types.ts';
import { initialProduct } from '../constants/initialState.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(initialProduct);

  const toggleProductAccordion = useCallback((productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }, []);

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateProduct = useCallback((updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    );
    setEditingProduct(null);
  }, []);

  const handleUpdateProductName = useCallback((productId: string, newName: string) => {
    setEditingProduct((prev) =>
      prev && prev.id === productId ? { ...prev, name: newName } : prev,
    );
  }, []);

  const handleUpdatePrice = useCallback((productId: string, newPrice: number) => {
    setEditingProduct((prev) =>
      prev && prev.id === productId ? { ...prev, price: newPrice } : prev,
    );
  }, []);

  const handleUpdateStock = useCallback((productId: string, newStock: number) => {
    setEditingProduct((prev) =>
      prev && prev.id === productId ? { ...prev, stock: newStock } : prev,
    );
  }, []);

  const handleAddDiscount = useCallback(
    (productId: string) => {
      setEditingProduct((prev) => {
        if (prev && prev.id === productId) {
          return {
            ...prev,
            discounts: [...prev.discounts, newDiscount],
          };
        }
        return prev;
      });
      setNewDiscount({ quantity: 0, rate: 0 });
    },
    [newDiscount],
  );

  const handleRemoveDiscount = useCallback((productId: string, index: number) => {
    setEditingProduct((prev) => {
      if (prev && prev.id === productId) {
        return {
          ...prev,
          discounts: prev.discounts.filter((_, i) => i !== index),
        };
      }
      return prev;
    });
  }, []);

  const handleAddNewProduct = useCallback(
    (productData: Omit<Product, 'id'>) => {
      const productWithId = {
        ...productData,
        id: (products.length + 1).toString(),
        discounts: productData.discounts || [],
      };
      setProducts((prev) => [...prev, productWithId]);
      setShowNewProductForm(false);
      setNewProduct(initialProduct);
    },
    [products.length],
  );

  const handleToggleNewProductForm = useCallback(() => {
    setShowNewProductForm((prev) => !prev);
  }, []);

  const handleEditComplete = () => {
    if (editingProduct) {
      handleUpdateProduct(editingProduct);
    }
  };
  return {
    products,
    openProductIds,
    editingProduct,
    newDiscount,
    showNewProductForm,
    newProduct,
    toggleProductAccordion,
    setEditingProduct,
    handleEditProduct,
    handleUpdateProduct,
    handleUpdateProductName,
    handleUpdatePrice,
    handleUpdateStock,
    handleAddDiscount,
    handleRemoveDiscount,
    handleAddNewProduct,
    handleToggleNewProductForm,
    setNewProduct,
    setNewDiscount,
    handleEditComplete,
  };
};

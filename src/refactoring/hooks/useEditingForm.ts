import { useMemo } from 'react';
import { useProductContext } from '../contexts';

export const useEditingForm = () => {
  const {
    editingProduct,
    handleUpdateProductName,
    handleUpdatePrice,
    handleUpdateStock,
    handleEditComplete,
  } = useProductContext();

  const formFields = useMemo(() => {
    if (!editingProduct) return [];

    return [
      {
        id: 'name',
        label: '상품명',
        type: 'text' as const,
        value: editingProduct.name,
        onChange: (value: string) => handleUpdateProductName(editingProduct.id, value),
      },
      {
        id: 'price',
        label: '가격',
        type: 'number' as const,
        value: editingProduct.price,
        onChange: (value: string) => handleUpdatePrice(editingProduct.id, parseInt(value) || 0),
      },
      {
        id: 'stock',
        label: '재고',
        type: 'number' as const,
        value: editingProduct.stock,
        onChange: (value: string) => handleUpdateStock(editingProduct.id, parseInt(value) || 0),
      },
    ];
  }, [editingProduct, handleUpdateProductName, handleUpdatePrice, handleUpdateStock]);

  return {
    formFields,
    handleEditComplete,
    editingProduct,
  };
};

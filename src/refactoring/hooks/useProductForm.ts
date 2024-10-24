import { useCallback } from 'react';
import { useProductContext } from '../contexts';

export interface NewProduct {
  name: string;
  price: number;
  stock: number;
}

export const FORM_FIELDS = [
  {
    id: 'name',
    label: '상품명',
    type: 'text',
    placeholder: '상품명을 입력하세요',
  },
  {
    id: 'price',
    label: '가격',
    type: 'number',
    placeholder: '가격을 입력하세요',
  },
  {
    id: 'stock',
    label: '재고',
    type: 'number',
    placeholder: '재고 수량을 입력하세요',
  },
] as const;

export const useProductForm = () => {
  const { newProduct, setNewProduct, handleAddNewProduct } = useProductContext();

  const updateField = useCallback(
    <K extends keyof NewProduct>(field: K, value: NewProduct[K]) => {
      setNewProduct((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setNewProduct],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleAddNewProduct(newProduct);
    },
    [handleAddNewProduct],
  );

  return {
    formData: newProduct,
    updateField,
    handleSubmit,
  };
};

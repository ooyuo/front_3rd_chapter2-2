import { useCallback, useState } from 'react';
import { useProductContext } from '../contexts';
import { DiscountFormData } from '../types';

export const useDiscountForm = () => {
  const { editingProduct, newDiscount, setNewDiscount, handleAddDiscount } = useProductContext();
  const [errors, setErrors] = useState<Partial<Record<keyof DiscountFormData, string>>>({});

  const validateForm = (data: DiscountFormData): boolean => {
    const newErrors: Partial<Record<keyof DiscountFormData, string>> = {};

    if (data.quantity <= 0) {
      newErrors.quantity = '수량은 0보다 커야 합니다';
    }
    if (data.ratePercentage < 0 || data.ratePercentage > 100) {
      newErrors.ratePercentage = '할인율은 0-100% 사이여야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuantityChange = useCallback(
    (value: string) => {
      const quantity = parseInt(value) || 0;
      setNewDiscount((prev) => ({
        ...prev,
        quantity,
      }));
    },
    [setNewDiscount],
  );

  const handleRateChange = useCallback(
    (value: string) => {
      const ratePercentage = parseInt(value) || 0;
      setNewDiscount((prev) => ({
        ...prev,
        rate: ratePercentage / 100,
      }));
    },
    [setNewDiscount],
  );

  const handleSubmit = useCallback(() => {
    const formData: DiscountFormData = {
      quantity: newDiscount.quantity,
      ratePercentage: newDiscount.rate * 100,
    };

    if (validateForm(formData) && editingProduct?.id) {
      handleAddDiscount(editingProduct.id);
    }
  }, [newDiscount, editingProduct?.id, handleAddDiscount]);

  return {
    formData: {
      quantity: newDiscount.quantity,
      ratePercentage: newDiscount.rate * 100,
    },
    errors,
    handleQuantityChange,
    handleRateChange,
    handleSubmit,
  };
};

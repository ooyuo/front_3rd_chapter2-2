import { useCallback } from 'react';
import { useProductContext } from '../contexts';

export const useNewDiscountForm = (productId: string) => {
  const { newDiscount, setNewDiscount, handleAddDiscount } = useProductContext();

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
    handleAddDiscount(productId);
  }, [handleAddDiscount, productId]);

  const ratePercentage = newDiscount.rate * 100;

  return {
    quantity: newDiscount.quantity,
    ratePercentage,
    handleQuantityChange,
    handleRateChange,
    handleSubmit,
  };
};

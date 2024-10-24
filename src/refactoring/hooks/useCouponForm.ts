import { ChangeEvent, useState } from 'react';
import { INITIAL_COUPON_STATE } from '../constants/coupon';
import { useCouponsContext } from '../contexts';
import { Coupon, DiscountType } from '../types';

export const useCouponForm = () => {
  const { addCoupon } = useCouponsContext();
  const [coupon, setCoupon] = useState<Coupon>(INITIAL_COUPON_STATE);

  const handleInputChange = (field: keyof Coupon) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;

    setCoupon((prev) => ({ ...prev, [field]: value }));
  };

  const handleDiscountTypeChange = (value: string) => {
    setCoupon((prev) => ({
      ...prev,
      discountType: value as DiscountType,
    }));
  };

  const handleSubmit = () => {
    addCoupon(coupon);
    setCoupon(INITIAL_COUPON_STATE);
  };

  return {
    coupon,
    handleInputChange,
    handleDiscountTypeChange,
    handleSubmit,
  };
};

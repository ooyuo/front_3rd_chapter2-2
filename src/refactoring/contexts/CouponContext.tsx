import React, { createContext, useContext, useState, useCallback } from 'react';
import { Coupon } from '../types';

interface CouponContextType {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  addCoupon: (coupon: Coupon) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addCoupon = useCallback((newCoupon: Coupon) => {
    setCoupons((prev) => [...prev, newCoupon]);
  }, []);

  const applyCoupon = useCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
  }, []);

  const removeCoupon = useCallback(() => {
    setSelectedCoupon(null);
  }, []);

  return (
    <CouponContext.Provider
      value={{
        coupons,
        selectedCoupon,
        addCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponsContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupons must be used within a CouponProvider');
  }
  return context;
};

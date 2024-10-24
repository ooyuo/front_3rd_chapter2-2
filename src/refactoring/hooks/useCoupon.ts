import { Coupon } from '../../types.ts';
import { useCallback, useState } from 'react';

export const useCoupons = (initialCoupons?: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons || []);

  const addCoupon = useCallback((newCoupon: Coupon) => {
    setCoupons((prev) => [...prev, newCoupon]);
  }, []);

  return { coupons, addCoupon };
};

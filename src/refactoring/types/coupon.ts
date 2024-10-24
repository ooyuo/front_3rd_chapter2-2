export type DiscountType = 'amount' | 'percentage';

export interface Coupon {
  name: string;
  code: string;
  discountType: 'amount' | 'percentage';
  discountValue: number;
}

export interface SelectOption {
  label: string;
  value: string;
}

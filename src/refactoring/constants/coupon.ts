import { SelectOption } from '../types';

export const INITIAL_COUPON_STATE = {
  name: '',
  code: '',
  discountType: 'percentage' as const,
  discountValue: 0,
};

export const DISCOUNT_OPTIONS: SelectOption[] = [
  { value: 'amount', label: '금액(원)' },
  { value: 'percentage', label: '할인율(%)' },
];

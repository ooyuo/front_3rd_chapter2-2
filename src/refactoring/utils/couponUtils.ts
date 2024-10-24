export const formatDiscount = (type: 'amount' | 'percentage', value: number): string => {
  return type === 'amount' ? `${value.toLocaleString()}원` : `${value}%`;
};

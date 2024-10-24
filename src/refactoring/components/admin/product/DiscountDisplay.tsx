import { memo } from 'react';
import { Discount } from '../../../types';

export interface DiscountDisplayProps {
  discount: Discount;
  className?: string;
}

const DiscountDisplay = memo(({ discount }: DiscountDisplayProps) => {
  const formattedQuantity = discount.quantity.toLocaleString();
  const formattedRate = (discount.rate * 100).toFixed(1);

  return (
    <div className="mb-2">
      <span>{formattedQuantity}개</span> 이상 구매 시 <span>{formattedRate}%</span> 할인
    </div>
  );
});

DiscountDisplay.displayName = 'DiscountDisplay';

export default DiscountDisplay;

import { memo } from 'react';
import { Discount } from '../../../types';
import Button from '../../common/Button';

export interface DiscountItemProps {
  discount: Discount;
  onRemove: () => void;
}

const DiscountItem = memo(({ discount, onRemove }: DiscountItemProps) => {
  const formattedRate = (discount.rate * 100).toFixed(1);

  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
      </span>
      <Button
        onClick={onRemove}
        aria-label={`${discount.quantity}개 이상 ${formattedRate}% 할인 삭제`}
      >
        삭제
      </Button>
    </div>
  );
});

DiscountItem.displayName = 'DiscountItem';

export default DiscountItem;

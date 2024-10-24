import { memo } from 'react';
import { useProductContext } from '../../../contexts/ProductContext';
import { Discount } from '../../../types';
import Button from '../../common/Button';

interface DiscountItemProps {
  discount: Discount;
  index: number;
}

const DiscountItem = memo(({ discount, index }: DiscountItemProps) => {
  const { editingProduct, handleRemoveDiscount } = useProductContext();

  if (!editingProduct) {
    return null;
  }

  const formattedQuantity = discount.quantity.toLocaleString();
  const formattedRate = (discount.rate * 100).toFixed(1);

  const handleDelete = () => {
    if (window.confirm('이 할인을 삭제하시겠습니까?')) {
      handleRemoveDiscount(editingProduct.id, index);
    }
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {formattedQuantity}개 이상 구매 시 {formattedRate}% 할인
      </span>
      <Button
        onClick={handleDelete}
        aria-label={`${formattedQuantity}개 이상 ${formattedRate}% 할인 삭제`}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        삭제
      </Button>
    </div>
  );
});

DiscountItem.displayName = 'DiscountItem';

export default DiscountItem;

import { Coupon } from '../../../types';
import { formatDiscount } from '../../../utils/couponUtils';

interface CouponItemProps {
  coupon: Coupon;
  index: number;
}

const CouponItem = ({ coupon, index }: CouponItemProps) => {
  const { name, code, discountType, discountValue } = coupon;
  const formattedDiscount = formatDiscount(discountType, discountValue);

  return (
    <div key={index} data-testid={`coupon-${index + 1}`} className="bg-gray-100 p-2 rounded">
      {name} ({code}):
      {formattedDiscount} 할인
    </div>
  );
};

export default CouponItem;

import { useCouponsContext } from '../../../contexts/CouponContext';
import CouponItem from './CouponItem';

const CouponList = () => {
  const { coupons } = useCouponsContext();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
      <div className="space-y-2">
        {coupons.map((coupon, index) => (
          <CouponItem key={index} coupon={coupon} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CouponList;

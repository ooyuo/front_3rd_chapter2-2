import Input from '../../common/Input';
import Select from '../../common/Select';
import Button from '../../common/Button';
import { DISCOUNT_OPTIONS } from '../../../constants/coupon';
import { useCouponForm } from '../../../hooks/useCouponForm';

const CouponForm = () => {
  const { coupon, handleInputChange, handleDiscountTypeChange, handleSubmit } = useCouponForm();

  return (
    <form
      className="space-y-2 mb-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input
        type="text"
        placeholder="쿠폰 이름"
        value={coupon.name}
        onChange={handleInputChange('name')}
      />
      <Input
        type="text"
        placeholder="쿠폰 코드"
        value={coupon.code}
        onChange={handleInputChange('code')}
      />

      <div className="flex gap-2">
        <Select
          options={DISCOUNT_OPTIONS}
          value={coupon.discountType}
          onChange={handleDiscountTypeChange}
        />

        <Input
          type="number"
          min="0"
          placeholder="할인 값"
          value={coupon.discountValue}
          onChange={handleInputChange('discountValue')}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
      >
        쿠폰 추가
      </Button>
    </form>
  );
};

export default CouponForm;

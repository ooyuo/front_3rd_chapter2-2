import { memo } from 'react';
import { useDiscountForm } from '../../../hooks/useDiscountForm';
import Button from '../../common/Button';
import Input from '../../common/Input';

const DiscountForm = memo(() => {
  const { formData, errors, handleQuantityChange, handleRateChange, handleSubmit } =
    useDiscountForm();

  return (
    <div className="flex space-x-2">
      <div>
        <Input
          type="number"
          placeholder="수량"
          value={formData.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          min="1"
          required
          error={errors.quantity}
        />
        {errors.quantity && <p>{errors.quantity}</p>}
      </div>

      <div>
        <Input
          type="number"
          placeholder="할인율 (%)"
          value={formData.ratePercentage}
          onChange={(e) => handleRateChange(e.target.value)}
          min="0"
          max="100"
          required
          error={errors.ratePercentage}
        />
        {errors.ratePercentage && <p>{errors.ratePercentage}</p>}
      </div>

      <Button className="w-1/3" onClick={handleSubmit}>
        할인 추가
      </Button>
    </div>
  );
});

DiscountForm.displayName = 'DiscountForm';

export default DiscountForm;

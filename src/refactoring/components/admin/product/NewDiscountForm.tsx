import { memo } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { useNewDiscountForm } from '../../../hooks/useNewDiscountForm';

interface NewDiscountFormProps {
  productId: string;
}
const NewDiscountForm = memo(({ productId }: NewDiscountFormProps) => {
  const { quantity, ratePercentage, handleQuantityChange, handleRateChange, handleSubmit } =
    useNewDiscountForm(productId);

  return (
    <form
      className="flex space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input
        type="number"
        placeholder="수량"
        value={quantity}
        onChange={(e) => handleQuantityChange(e.target.value)}
        className="w-1/3 p-2 border rounded"
      />
      <Input
        type="number"
        placeholder="할인율 (%)"
        value={ratePercentage}
        onChange={(e) => handleRateChange(e.target.value)}
        className="w-1/3 p-2 border rounded"
      />
      <Button type="submit" className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        할인 추가
      </Button>
    </form>
  );
});

NewDiscountForm.displayName = 'NewDiscountForm';

export default NewDiscountForm;

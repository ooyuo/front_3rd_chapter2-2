import { Discount } from '../../../types';
import DiscountItem from './DiscountItem';
import NewDiscountForm from './NewDiscountForm';

interface DiscountSectionProps {
  discounts: Discount[];
  productId: string;
}

const DiscountSection = ({ discounts, productId }: DiscountSectionProps) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      {discounts?.map((discount, index) => (
        <DiscountItem key={index} discount={discount} index={index} />
      ))}
      <NewDiscountForm productId={productId} />
    </div>
  );
};

export default DiscountSection;

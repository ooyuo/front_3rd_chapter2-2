import { useProductContext } from '../../../contexts/ProductContext';
import { Product } from '../../../types';
import Button from '../../common/Button';
import DiscountDisplay from './DiscountDisplay';

interface DisplayInfoProps {
  product: Product;
}

const DisplayInfo = ({ product }: DisplayInfoProps) => {
  const { setEditingProduct } = useProductContext();

  const handleModify = () => {
    setEditingProduct(product);
  };

  const hasDiscounts = product?.discounts?.length > 0;

  return (
    <div>
      {hasDiscounts &&
        product?.discounts?.map((discount, index) => (
          <DiscountDisplay key={`${product.id}-discount-${index}`} discount={discount} />
        ))}
      <Button
        data-testid="modify-button"
        onClick={handleModify}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </Button>
    </div>
  );
};

export default DisplayInfo;

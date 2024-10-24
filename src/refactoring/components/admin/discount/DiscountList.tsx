import { useProductContext } from '../../../contexts/ProductContext';
import DiscountItem from './DiscountItem';

const DiscountList = () => {
  const { editingProduct, handleRemoveDiscount } = useProductContext();

  return (
    <>
      {editingProduct?.discounts?.map((discount, index) => (
        <DiscountItem
          key={`discount-${editingProduct.id}-${index}`}
          discount={discount}
          onRemove={() => handleRemoveDiscount(editingProduct.id, index)}
        />
      ))}
    </>
  );
};

export default DiscountList;

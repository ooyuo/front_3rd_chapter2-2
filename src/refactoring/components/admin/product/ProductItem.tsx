import { useProductContext } from '../../../contexts/ProductContext';
import { Product } from '../../../types';
import { formatPrice } from '../../../utils/common';
import Button from '../../common/Button';
import { ProductDetails } from './ProductDetails';

interface ProductItem {
  product: Product;
  index: number;
}

const ProductItem = ({ product, index }: ProductItem) => {
  const { openProductIds, toggleProductAccordion } = useProductContext();
  const isOpen = openProductIds.has(product.id);
  const { id, name, price, stock } = product;

  const handleToggle = () => {
    toggleProductAccordion(id);
  };
  console.log(index, 'index');
  return (
    <div
      key={product.id}
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <Button
        data-testid="toggle-button"
        onClick={handleToggle}
        className="w-full text-left font-semibold"
      >
        {name} - {formatPrice(price)}원 (재고: {stock})
      </Button>
      {isOpen && <ProductDetails product={product} />}
    </div>
  );
};

export default ProductItem;

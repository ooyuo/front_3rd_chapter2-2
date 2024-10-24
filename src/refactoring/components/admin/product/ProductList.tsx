import { useProductContext } from '../../../contexts/ProductContext';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { products } = useProductContext();

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductList;

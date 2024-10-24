import { useProductContext } from '../../../contexts/ProductContext';
import { Product } from '../../../types';
import DisplayInfo from './DisplayInfo';
import EditingForm from './EditingForm';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { editingProduct } = useProductContext();

  return (
    <div className="mt-2">
      {editingProduct ? <EditingForm /> : <DisplayInfo product={product} />}
    </div>
  );
};

import ProductForm from './ProductForm';
import { useProductContext } from '../../../contexts/ProductContext';
import Header from '../../common/Header';
import ProductList from './ProductList';

const ProductManagement = () => {
  const { showNewProductForm, handleToggleNewProductForm } = useProductContext();

  return (
    <div>
      <Header showNewProductForm={showNewProductForm} onToggleForm={handleToggleNewProductForm} />
      {showNewProductForm && <ProductForm />}
      <ProductList />
    </div>
  );
};

export default ProductManagement;

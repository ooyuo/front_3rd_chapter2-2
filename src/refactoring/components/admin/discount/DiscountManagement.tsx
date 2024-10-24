import DiscountList from './DiscountList';
import DiscountForm from './DiscountForm';

const DiscountManagement = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      <DiscountList />
      <DiscountForm />
    </div>
  );
};

export default DiscountManagement;

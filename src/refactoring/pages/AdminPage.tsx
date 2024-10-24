import CouponManagement from '../components/admin/coupon/CouponManagement';
import ProductManagement from '../components/admin/product/ProductManagement';

const AdminPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductManagement />
        <CouponManagement />
      </div>
    </div>
  );
};

export default AdminPage;

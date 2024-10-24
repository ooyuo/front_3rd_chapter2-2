import { Coupon, Product } from '../../types.ts';
import { useCartContext } from '../contexts/CartContext.tsx';
import CartItem from '../components/cart/CartItem.tsx';
import ProductCard from '../components/cart/ProductCard.tsx';
import CouponSelector from '../components/cart/CouponSelector.tsx';
import OrderSummary from '../components/cart/OrderSummary.tsx';

interface CartPageProps {
  products: Product[];
  coupons: Coupon[];
}

const CartPage = ({ products, coupons }: CartPageProps) => {
  const { cart } = useCartContext();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
          <CouponSelector coupons={coupons} />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;

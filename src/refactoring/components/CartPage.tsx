import { Coupon, Product } from '../../types.ts';
import CartItem from './cart/CartItem.tsx';
import { useCartContext } from '../contexts/CartContext.tsx';
import OrderSummary from './cart/OrderSummary.tsx';
import CouponSelector from './cart/CouponSelector.tsx';
import ProductCard from './cart/ProductCard.tsx';

interface CartPageProps {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: CartPageProps) => {
  const { cart } = useCartContext();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map((item) => (
              <CartItem item={item} />
            ))}
          </div>
          <CouponSelector coupons={coupons} />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

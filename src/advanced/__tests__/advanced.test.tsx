import { useState } from 'react';
import { describe, expect, test } from 'vitest';
import { act, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import { CartItem, Coupon, Product } from '../../types';
import {
  CartProvider,
  CouponProvider,
  ProductProvider,
  useCouponsContext,
} from '../../refactoring/contexts';
import { useProducts } from '../../refactoring/hooks';
import {
  calculateCartTotal,
  calculateItemTotal,
  getAppliedDiscount,
  getMaxApplicableDiscount,
  getMaxDiscount,
  getRemainingStock,
  updateCartItemQuantity,
} from '../../refactoring/utils/cartUtils';
import { AdminPage } from '../../refactoring/components/AdminPage';
import { CartPage } from '../../refactoring/components/CartPage';

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.1 }],
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];
const mockCoupons: Coupon[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000,
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10,
  },
];

const TestAdminPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleCouponAdd = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return (
    <AdminPage
      products={products}
      coupons={coupons}
      onProductUpdate={handleProductUpdate}
      onProductAdd={handleProductAdd}
      onCouponAdd={handleCouponAdd}
    />
  );
};

describe('advanced > ', () => {
  describe('시나리오 테스트 > ', () => {
    test('장바구니 페이지 테스트 > ', async () => {
      render(
        <CartProvider>
          <ProductProvider>
            <CouponProvider>
              <CartPage products={mockProducts} coupons={mockCoupons} />
            </CouponProvider>
          </ProductProvider>
        </CartProvider>,
      );
      const product1 = screen.getByTestId('product-p1');
      const product2 = screen.getByTestId('product-p2');
      const product3 = screen.getByTestId('product-p3');
      const addToCartButtonsAtProduct1 = within(product1).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct2 = within(product2).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct3 = within(product3).getByText('장바구니에 추가');

      // 1. 상품 정보 표시
      expect(product1).toHaveTextContent('상품1');
      expect(product1).toHaveTextContent('10,000원');
      expect(product1).toHaveTextContent('재고: 20개');
      expect(product2).toHaveTextContent('상품2');
      expect(product2).toHaveTextContent('20,000원');
      expect(product2).toHaveTextContent('재고: 20개');
      expect(product3).toHaveTextContent('상품3');
      expect(product3).toHaveTextContent('30,000원');
      expect(product3).toHaveTextContent('재고: 20개');

      // 2. 할인 정보 표시
      expect(screen.getByText('10개 이상: 10% 할인')).toBeInTheDocument();

      // 3. 상품1 장바구니에 상품 추가
      fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

      // 4. 할인율 계산
      expect(screen.getByText('상품 금액: 10,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 0원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 10,000원')).toBeInTheDocument();

      // 5. 상품 품절 상태로 만들기
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      // 6. 품절일 때 상품 추가 안 되는지 확인하기
      expect(product1).toHaveTextContent('재고: 0개');
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent('재고: 0개');

      // 7. 할인율 계산
      expect(screen.getByText('상품 금액: 200,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 20,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 180,000원')).toBeInTheDocument();

      // 8. 상품을 각각 10개씩 추가하기
      fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
      fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

      const increaseButtons = screen.getAllByText('+');
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 9. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 110,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 590,000원')).toBeInTheDocument();

      // 10. 쿠폰 적용하기
      const couponSelect = screen.getByRole('combobox');
      fireEvent.change(couponSelect, { target: { value: '1' } }); // 10% 할인 쿠폰 선택

      // 11. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 169,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 531,000원')).toBeInTheDocument();

      // 12. 다른 할인 쿠폰 적용하기
      fireEvent.change(couponSelect, { target: { value: '0' } }); // 5000원 할인 쿠폰
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 115,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 585,000원')).toBeInTheDocument();
    });

    test('관리자 페이지 테스트 > ', async () => {
      render(<TestAdminPage />);

      const $product1 = screen.getByTestId('product-1');

      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText('새 상품 추가'));

      fireEvent.change(screen.getByLabelText('상품명'), { target: { value: '상품4' } });
      fireEvent.change(screen.getByLabelText('가격'), { target: { value: '15000' } });
      fireEvent.change(screen.getByLabelText('재고'), { target: { value: '30' } });

      fireEvent.click(screen.getByText('추가'));

      const $product4 = screen.getByTestId('product-4');

      expect($product4).toHaveTextContent('상품4');
      expect($product4).toHaveTextContent('15000원');
      expect($product4).toHaveTextContent('재고: 30');

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('toggle-button'));
      fireEvent.click(within($product1).getByTestId('modify-button'));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue('20'), { target: { value: '25' } });
        fireEvent.change(within($product1).getByDisplayValue('10000'), {
          target: { value: '12000' },
        });
        fireEvent.change(within($product1).getByDisplayValue('상품1'), {
          target: { value: '수정된 상품1' },
        });
      });

      fireEvent.click(within($product1).getByText('수정 완료'));

      expect($product1).toHaveTextContent('수정된 상품1');
      expect($product1).toHaveTextContent('12000원');
      expect($product1).toHaveTextContent('재고: 25');

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('modify-button'));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText('수량'), { target: { value: '5' } });
        fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), { target: { value: '5' } });
      });
      fireEvent.click(screen.getByText('할인 추가'));

      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(screen.queryByText('10개 이상 구매 시 10% 할인')).not.toBeInTheDocument();
      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(screen.queryByText('10개 이상 구매 시 10% 할인')).not.toBeInTheDocument();
      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), { target: { value: '새 쿠폰' } });
      fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), { target: { value: 'NEW10' } });
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'percentage' } });
      fireEvent.change(screen.getByPlaceholderText('할인 값'), { target: { value: '10' } });

      fireEvent.click(screen.getByText('쿠폰 추가'));

      const $newCoupon = screen.getByTestId('coupon-3');

      expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
    });
  });

  describe('자유롭게 작성해보세요.', () => {
    describe('Cart Utility Functions', () => {
      const mockProduct: Product = {
        id: 'p1',
        name: '테스트 상품',
        price: 10000,
        stock: 20,
        discounts: [
          { quantity: 5, rate: 0.05 },
          { quantity: 10, rate: 0.1 },
        ],
      };

      describe('calculateItemTotal', () => {
        test('할인이 없을 때 정확한 총액을 계산해야 한다', () => {
          const item: CartItem = {
            product: { ...mockProduct, discounts: [] },
            quantity: 3,
          };

          const total = calculateItemTotal(item);
          expect(total).toBe(30000); // 10000 * 3
        });

        test('수량 할인을 올바르게 적용해야 한다', () => {
          const item: CartItem = {
            product: mockProduct,
            quantity: 10,
          };

          const total = calculateItemTotal(item);
          expect(total).toBe(90000); // (10000 * 10) * 0.9 (10% 할인)
        });

        test('최대 할인율을 적용해야 한다', () => {
          const item: CartItem = {
            product: {
              ...mockProduct,
              discounts: [
                { quantity: 5, rate: 0.05 },
                { quantity: 5, rate: 0.1 },
              ],
            },
            quantity: 5,
          };

          const total = calculateItemTotal(item);
          expect(total).toBe(45000); // (10000 * 5) * 0.9 (10% 할인)
        });
      });

      describe('getMaxApplicableDiscount', () => {
        test('수량이 할인 기준을 충족하지 않으면 0을 반환해야 한다', () => {
          const item: CartItem = {
            product: mockProduct,
            quantity: 3,
          };

          const discount = getMaxApplicableDiscount(item);
          expect(discount).toBe(0);
        });

        test('수량에 따라 적용 가능한 최대 할인율을 반환해야 한다', () => {
          const item: CartItem = {
            product: mockProduct,
            quantity: 10,
          };

          const discount = getMaxApplicableDiscount(item);
          expect(discount).toBe(0.1);
        });

        test('할인이 없는 상품은 0을 반환해야 한다', () => {
          const item: CartItem = {
            product: { ...mockProduct, discounts: [] },
            quantity: 10,
          };

          const discount = getMaxApplicableDiscount(item);
          expect(discount).toBe(0);
        });
      });

      describe('calculateCartTotal', () => {
        const cartItems: CartItem[] = [
          { product: mockProduct, quantity: 10 }, // 90,000원 (10% 할인)
          {
            product: { ...mockProduct, id: 'p2', price: 20000 },
            quantity: 5,
          }, // 95,000원 (5% 할인)
        ];

        test('장바구니 총액을 올바르게 계산해야 한다', () => {
          const total = calculateCartTotal(cartItems, null);
          expect(total.totalBeforeDiscount).toBe(200000); // (10000 * 10) + (20000 * 5)
          expect(total.totalAfterDiscount).toBe(185000); // 90000 + 95000
          expect(total.totalDiscount).toBe(15000);
        });

        test('퍼센트 쿠폰을 올바르게 적용해야 한다', () => {
          const coupon: Coupon = {
            name: '10% 할인',
            code: 'PERCENT10',
            discountType: 'percentage',
            discountValue: 10,
          };

          const total = calculateCartTotal(cartItems, coupon);
          expect(total.totalAfterDiscount).toBe(166500); // 185000 * 0.9
          expect(total.totalDiscount).toBe(33500);
        });

        test('금액 쿠폰을 올바르게 적용해야 한다', () => {
          const coupon: Coupon = {
            name: '10000원 할인',
            code: 'AMOUNT10000',
            discountType: 'amount',
            discountValue: 10000,
          };

          const total = calculateCartTotal(cartItems, coupon);
          expect(total.totalAfterDiscount).toBe(175000); // 185000 - 10000
          expect(total.totalDiscount).toBe(25000);
        });
      });

      describe('updateCartItemQuantity', () => {
        const cartItems: CartItem[] = [
          { product: mockProduct, quantity: 1 },
          { product: { ...mockProduct, id: 'p2' }, quantity: 2 },
        ];

        test('수량을 올바르게 업데이트해야 한다', () => {
          const updated = updateCartItemQuantity(cartItems, 'p1', 3);
          expect(updated[0].quantity).toBe(3);
        });

        test('재고 초과 수량은 최대값으로 제한해야 한다', () => {
          const updated = updateCartItemQuantity(cartItems, 'p1', 25);
          expect(updated[0].quantity).toBe(20); // stock limit
        });

        test('수량이 0이 되면 아이템을 제거해야 한다', () => {
          const updated = updateCartItemQuantity(cartItems, 'p1', 0);
          expect(updated.length).toBe(1);
          expect(updated[0].product.id).toBe('p2');
        });
      });

      describe('getMaxDiscount', () => {
        test('할인 목록에서 최대 할인율을 반환해야 한다', () => {
          const discounts = [
            { quantity: 5, rate: 0.05 },
            { quantity: 10, rate: 0.1 },
            { quantity: 15, rate: 0.15 },
          ];

          const maxDiscount = getMaxDiscount(discounts);
          expect(maxDiscount).toBe(0.15);
        });

        test('빈 할인 목록에서는 0을 반환해야 한다', () => {
          const maxDiscount = getMaxDiscount([]);
          expect(maxDiscount).toBe(0);
        });
      });

      describe('getAppliedDiscount', () => {
        test('적용 가능한 최대 할인율을 반환해야 한다', () => {
          const item: CartItem = {
            product: mockProduct,
            quantity: 10,
          };

          const discount = getAppliedDiscount(item);
          expect(discount).toBe(0.1);
        });

        test('수량이 부족하면 0을 반환해야 한다', () => {
          const item: CartItem = {
            product: mockProduct,
            quantity: 3,
          };

          const discount = getAppliedDiscount(item);
          expect(discount).toBe(0);
        });
      });

      describe('getRemainingStock', () => {
        test('장바구니에 없는 상품의 재고를 정확히 반환해야 한다', () => {
          const cart: CartItem[] = [];
          const remaining = getRemainingStock(mockProduct, cart);
          expect(remaining).toBe(20);
        });

        test('장바구니에 있는 상품의 남은 재고를 계산해야 한다', () => {
          const cart: CartItem[] = [{ product: mockProduct, quantity: 5 }];
          const remaining = getRemainingStock(mockProduct, cart);
          expect(remaining).toBe(15); // 20 - 5
        });

        test('다른 상품의 수량은 재고 계산에 영향을 주지 않아야 한다', () => {
          const cart: CartItem[] = [{ product: { ...mockProduct, id: 'p2' }, quantity: 5 }];
          const remaining = getRemainingStock(mockProduct, cart);
          expect(remaining).toBe(20);
        });
      });
    });
    test('초기 상태가 올바르게 설정되어야 한다', () => {
      const { result } = renderHook(() => useProducts(mockProducts));

      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.openProductIds.size).toBe(0);
      expect(result.current.editingProduct).toBeNull();
      expect(result.current.newDiscount).toEqual({ quantity: 0, rate: 0 });
      expect(result.current.showNewProductForm).toBe(false);
    });

    test('상품 아코디언 토글이 정상적으로 동작해야 한다', () => {
      const { result } = renderHook(() => useProducts(mockProducts));

      act(() => {
        result.current.toggleProductAccordion('1');
      });

      expect(result.current.openProductIds.has('1')).toBe(true);

      act(() => {
        result.current.toggleProductAccordion('1');
      });

      expect(result.current.openProductIds.has('1')).toBe(false);
    });
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <CouponProvider>{children}</CouponProvider>
    );

    test('쿠폰을 추가할 수 있어야 한다', () => {
      const { result } = renderHook(() => useCouponsContext(), { wrapper });

      const newCoupon: Coupon = {
        name: '테스트 쿠폰',
        code: 'TEST10',
        discountType: 'percentage',
        discountValue: 10,
      };

      act(() => {
        result.current.addCoupon(newCoupon);
      });

      expect(result.current.coupons).toHaveLength(1);
      expect(result.current.coupons[0]).toEqual(newCoupon);
    });

    test('쿠폰을 적용하고 제거할 수 있어야 한다', () => {
      const { result } = renderHook(() => useCouponsContext(), { wrapper });

      const coupon: Coupon = {
        name: '테스트 쿠폰',
        code: 'TEST10',
        discountType: 'percentage',
        discountValue: 10,
      };

      act(() => {
        result.current.applyCoupon(coupon);
      });

      expect(result.current.selectedCoupon).toEqual(coupon);

      act(() => {
        result.current.removeCoupon();
      });

      expect(result.current.selectedCoupon).toBeNull();
    });
  });
});

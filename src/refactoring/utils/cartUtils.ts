import { CartTotal } from '../../types';
import { CartItem, Coupon, Product } from '../types';

/**
 * 장바구니 아이템의 최종 가격을 계산
 * @param item 장바구니 아이템
 * @returns 할인이 적용된 총 금액
 */
export const calculateItemTotal = (item: CartItem): number => {
  const { product, quantity } = item;
  const baseTotal = quantity * product.price;
  const maxDiscountRate = getMaxApplicableDiscount(item);
  const discountedTotal = baseTotal * (1 - maxDiscountRate);

  return Math.round(discountedTotal);
};

/**
 * 상품에 적용 가능한 최대 할인율을 계산
 * @param item 장바구니 아이템
 * @returns 적용 가능한 최대 할인율 (0~1 사이의 값)
 */
export const getMaxApplicableDiscount = (item: CartItem): number => {
  const { product, quantity } = item;
  if (!product.discounts?.length) return 0;

  return product.discounts
    .filter((discount) => quantity >= discount.quantity)
    .reduce((maxRate, discount) => Math.max(maxRate, discount.rate), 0);
};

/**
 * 장바구니 전체 금액을 계산
 * @param cartItems 장바구니 아이템 목록
 * @param appliedCoupon 적용된 쿠폰
 * @returns 할인 전 총액, 할인 후 총액, 총 할인액을 포함한 객체
 */
export const calculateCartTotal = (
  cartItems: CartItem[],
  appliedCoupon: Coupon | null,
): CartTotal => {
  // 할인 전 총액 계산
  const totalBeforeDiscount = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  );
  const totalAfterItemDiscounts = cartItems.reduce(
    (total, item) => total + calculateItemTotal(item),
    0,
  );

  // 쿠폰 할인 계산
  let finalTotal = totalAfterItemDiscounts;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      finalTotal = totalAfterItemDiscounts * (1 - appliedCoupon.discountValue / 100);
    } else {
      finalTotal = Math.max(0, totalAfterItemDiscounts - appliedCoupon.discountValue);
    }
  }

  const totalDiscount = totalBeforeDiscount - finalTotal;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(finalTotal),
    totalDiscount: Math.round(totalDiscount),
  };
};

/**
 * 장바구니 아이템의 수량을 업데이트
 * @param cartItems 장바구니 아이템 목록
 * @param productId 상품 ID
 * @param quantity 변경할 수량
 * @returns 업데이트된 장바구니 아이템 목록
 */
export const updateCartItemQuantity = (
  cartItems: CartItem[],
  productId: string,
  quantity: number,
): CartItem[] => {
  return cartItems
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const newQuantity = Math.min(Math.max(0, quantity), maxQuantity);
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
};

/**
 * 할인 목록에서 최대 할인율을 반환
 * @param discounts 할인 정보 배열
 * @returns 최대 할인율 (0~1 사이의 값)
 */
export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

/**
 * 장바구니 아이템에 적용된 할인율을 계산
 * @param item 장바구니 아이템
 * @returns 적용된 할인율 (0~1 사이의 값)
 */
export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  return discounts
    .filter((discount) => quantity >= discount.quantity)
    .reduce((maxRate, discount) => Math.max(maxRate, discount.rate), 0);
};

/**
 * 상품의 남은 재고를 계산
 * @param product 상품 정보
 * @param cart 장바구니 아이템 목록
 * @returns 남은 재고 수량
 */
export const getRemainingStock = (product: Product, cart: CartItem[]): number => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

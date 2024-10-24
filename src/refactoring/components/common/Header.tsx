import React, { memo } from 'react';
import Button from './Button';

const Header = memo(
  ({
    showNewProductForm,
    onToggleForm,
  }: {
    showNewProductForm: boolean;
    onToggleForm: () => void;
  }) => (
    <>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <Button
        onClick={onToggleForm}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </Button>
    </>
  ),
);

export default Header;

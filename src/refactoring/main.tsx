import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider, CouponProvider, ProductProvider } from './contexts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <ProductProvider>
        <CouponProvider>
          <App />
        </CouponProvider>
      </ProductProvider>
    </CartProvider>
  </React.StrictMode>,
);

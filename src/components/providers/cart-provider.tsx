'use client';

import { useEffect, useState } from 'react';
import { CartSidebar } from '@/components/cart/cart-sidebar';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <CartSidebar />
    </>
  );
}
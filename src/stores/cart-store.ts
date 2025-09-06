'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart, WooProduct } from '@/types/woocommerce';

interface CartStore extends Cart {
  // Actions
  addItem: (product: WooProduct, quantity?: number, variationId?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  
  // Cart state
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      total: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      itemCount: 0,
      isOpen: false,

      // Actions
      addItem: (product: WooProduct, quantity = 1, variationId?: number) => {
        const itemId = variationId ? `${product.id}-${variationId}` : product.id.toString();
        const existingItem = get().items.find(item => item.id === itemId);
        
        if (existingItem) {
          get().updateQuantity(itemId, existingItem.quantity + quantity);
        } else {
          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            variationId,
            quantity,
            product,
            subtotal: parseFloat(product.price) * quantity,
          };
          
          set(state => ({
            items: [...state.items, newItem],
          }));
          get().calculateTotals();
        }
      },

      removeItem: (id: string) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        }));
        get().calculateTotals();
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                  subtotal: parseFloat(item.product.price) * quantity,
                }
              : item
          ),
        }));
        get().calculateTotals();
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          subtotal: 0,
          tax: 0,
          shipping: 0,
          itemCount: 0,
        });
      },

      calculateTotals: () => {
        const { items } = get();
        const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Simple tax calculation (can be customized)
        const taxRate = 0.1; // 10% tax rate
        const tax = subtotal * taxRate;
        
        // Simple shipping calculation (can be customized)
        const shipping = subtotal > 50 ? 0 : 5; // Free shipping over $50
        
        const total = subtotal + tax + shipping;

        set({
          subtotal: Math.round(subtotal * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          shipping: Math.round(shipping * 100) / 100,
          total: Math.round(total * 100) / 100,
          itemCount,
        });
      },

      setIsOpen: (open: boolean) => {
        set({ isOpen: open });
      },
    }),
    {
      name: 'woocommerce-cart',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        subtotal: state.subtotal,
        tax: state.tax,
        shipping: state.shipping,
        itemCount: state.itemCount,
      }),
    }
  )
);
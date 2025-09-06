'use client';

import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/components/cart/cart-item';
import Link from 'next/link';

export function CartSidebar() {
  const { 
    isOpen, 
    setIsOpen, 
    items, 
    total, 
    subtotal, 
    tax, 
    shipping, 
    itemCount 
  } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Shopping Cart
            <span className="text-sm font-normal text-muted-foreground">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-4">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/50"></div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add some products to get started
              </p>
            </div>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            {/* Cart Summary */}
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    Checkout
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/cart">
                    View Cart
                  </Link>
                </Button>
              </div>

              {/* Free Shipping Banner */}
              {subtotal < 50 && (
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    Add <span className="font-semibold">${(50 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                  <div className="w-full bg-background rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
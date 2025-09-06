'use client';

import { CartItem as CartItemType } from '@/types/woocommerce';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  const incrementQuantity = () => handleQuantityChange(quantity + 1);
  const decrementQuantity = () => handleQuantityChange(quantity - 1);

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="space-y-3">
      <div className="flex space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
            {item.product.images && item.product.images.length > 0 ? (
              <img
                src={item.product.images[0].src || "https://placehold.co/200x200?text=Product+Image"}
                alt={item.product.images[0].alt || item.product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground text-center p-1">
                  {item.product.name.substring(0, 20)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-2">
          <div>
            <h4 className="font-medium text-sm leading-tight line-clamp-2">
              {item.product.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              ${parseFloat(item.product.price).toFixed(2)} each
            </p>
            {item.product.sku && (
              <p className="text-xs text-muted-foreground">
                SKU: {item.product.sku}
              </p>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              −
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="h-8 w-16 text-center"
              min="1"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={incrementQuantity}
            >
              +
            </Button>
          </div>

          {/* Price and Remove */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">
              ${item.subtotal.toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive h-8 px-2"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}
'use client';

import { WooProduct } from '@/types/woocommerce';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: WooProduct;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    try {
      addItem(product, 1);
      // Optional: Show success toast here
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Optional: Show error toast here
    } finally {
      setIsAdding(false);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '$0.00' : `$${numPrice.toFixed(2)}`;
  };

  const discountPercentage = product.on_sale && product.regular_price && product.sale_price
    ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price)) / parseFloat(product.regular_price)) * 100)
    : 0;

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      <Link href={`/product/${product.slug}`}>
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-muted">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0].src || "https://placehold.co/400x400?text=Product+Image"}
                alt={product.images[0].alt || product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-center p-4 text-sm">
                  {product.name}
                </span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge variant="secondary" className="bg-blue-500 text-white">
                Featured
              </Badge>
            )}
            {product.on_sale && discountPercentage > 0 && (
              <Badge variant="destructive">
                -{discountPercentage}%
              </Badge>
            )}
            {product.stock_status === 'outofstock' && (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Quick Add Button - Shows on Hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock_status === 'outofstock'}
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              {isAdding ? 'Adding...' : 'Quick Add'}
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`} className="space-y-2">
          {/* Product Category */}
          {product.categories && product.categories.length > 0 && (
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.categories[0].name}
            </div>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Product Rating */}
          {product.average_rating && parseFloat(product.average_rating) > 0 && (
            <div className="flex items-center space-x-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs ${
                      i < Math.floor(parseFloat(product.average_rating))
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.rating_count})
              </span>
            </div>
          )}

          {/* Product Description */}
          {product.short_description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {product.short_description.replace(/<[^>]*>/g, '')}
            </p>
          )}
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-primary">
              {formatPrice(product.price)}
            </span>
            {product.on_sale && product.regular_price && product.regular_price !== product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdding || product.stock_status === 'outofstock'}
            className="ml-2"
          >
            {isAdding ? '...' : 'Add'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
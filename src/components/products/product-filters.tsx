'use client';

import { ProductFilters } from '@/types/woocommerce';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: 'gaming-mods', name: 'Gaming Mods' },
    { id: 'controllers', name: 'Controllers & Hardware' },
    { id: 'digital-tools', name: 'Digital Tools' },
    { id: 'exclusive', name: 'Exclusive Content' },
  ];

  const priceRanges = [
    { label: 'Under $10', min: 0, max: 10 },
    { label: '$10 - $25', min: 10, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: 'Over $100', min: 100, max: undefined },
  ];

  const applyFilters = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      page: 1,
      perPage: filters.perPage || 12,
      orderby: filters.orderby || 'date',
      order: filters.order || 'desc',
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.featured) count++;
    if (filters.onSale) count++;
    if (filters.inStock) count++;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Categories</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={localFilters.category === category.id}
                onCheckedChange={(checked) => {
                  setLocalFilters(prev => ({
                    ...prev,
                    category: checked ? category.id : undefined
                  }));
                }}
              />
              <Label htmlFor={category.id} className="text-sm cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Price Range</Label>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${index}`}
                checked={localFilters.minPrice === range.min && localFilters.maxPrice === range.max}
                onCheckedChange={(checked) => {
                  setLocalFilters(prev => ({
                    ...prev,
                    minPrice: checked ? range.min : undefined,
                    maxPrice: checked ? range.max : undefined,
                  }));
                }}
              />
              <Label htmlFor={`price-${index}`} className="text-sm cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
        
        {/* Custom Price Range */}
        <div className="mt-4 space-y-2">
          <Label className="text-sm">Custom Range</Label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters.minPrice || ''}
              onChange={(e) => {
                const value = e.target.value ? parseFloat(e.target.value) : undefined;
                setLocalFilters(prev => ({ ...prev, minPrice: value }));
              }}
              className="w-20"
            />
            <span className="self-center text-sm">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice || ''}
              onChange={(e) => {
                const value = e.target.value ? parseFloat(e.target.value) : undefined;
                setLocalFilters(prev => ({ ...prev, maxPrice: value }));
              }}
              className="w-20"
            />
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Features</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={localFilters.featured || false}
              onCheckedChange={(checked) => {
                setLocalFilters(prev => ({
                  ...prev,
                  featured: checked || undefined
                }));
              }}
            />
            <Label htmlFor="featured" className="text-sm cursor-pointer">
              Featured Products
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={localFilters.onSale || false}
              onCheckedChange={(checked) => {
                setLocalFilters(prev => ({
                  ...prev,
                  onSale: checked || undefined
                }));
              }}
            />
            <Label htmlFor="on-sale" className="text-sm cursor-pointer">
              On Sale
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={localFilters.inStock || false}
              onCheckedChange={(checked) => {
                setLocalFilters(prev => ({
                  ...prev,
                  inStock: checked || undefined
                }));
              }}
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Filters:</span>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">
                {activeFiltersCount} active
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden relative">
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <FilterContent />
            <div className="flex space-x-2 mt-6">
              <Button onClick={applyFilters} className="flex-1">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
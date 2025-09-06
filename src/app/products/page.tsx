'use client';

import { useState, useEffect } from 'react';
import { WooProduct, ProductFilters } from '@/types/woocommerce';
import { ProductCard } from '@/components/products/product-card';
import { ProductFilters as ProductFiltersComponent } from '@/components/products/product-filters';
import { ProductSort } from '@/components/products/product-sort';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductsPage() {
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    perPage: 12,
    orderby: 'date',
    order: 'desc',
  });
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
          }
        });

        const response = await fetch(`/api/products?${params.toString()}`);
        const result = await response.json();

        if (result.success) {
          setProducts(result.data);
          setTotalPages(result.pagination?.totalPages || 1);
        } else {
          throw new Error(result.message || 'Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
        // Set mock products for demo
        setProducts(getMockProducts());
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const getMockProducts = (): WooProduct[] => [
    {
      id: 1,
      name: 'Premium Gaming Controller Mod',
      slug: 'premium-gaming-controller-mod',
      price: '29.99',
      regular_price: '39.99',
      sale_price: '29.99',
      on_sale: true,
      featured: true,
      short_description: 'Enhanced gaming controller with custom modifications for competitive gaming.',
      images: [
        {
          id: 1,
          src: 'https://placehold.co/400x400?text=Gaming+Controller+with+RGB+LED+custom+modifications',
          alt: 'Gaming controller with RGB LED custom modifications',
          name: 'Gaming Controller',
          date_created: '',
          date_created_gmt: '',
          date_modified: '',
          date_modified_gmt: ''
        }
      ],
      categories: [{ id: 1, name: 'Gaming', slug: 'gaming' }],
      stock_status: 'instock' as const,
      // Required properties with defaults
      permalink: '',
      date_created: '',
      date_created_gmt: '',
      date_modified: '',
      date_modified_gmt: '',
      type: 'simple' as const,
      status: 'publish' as const,
      catalog_visibility: 'visible' as const,
      description: '',
      sku: '',
      date_on_sale_from: null,
      date_on_sale_to: null,
      purchasable: true,
      total_sales: 0,
      virtual: false,
      downloadable: false,
      downloads: [],
      download_limit: 0,
      download_expiry: 0,
      external_url: '',
      button_text: '',
      tax_status: 'taxable' as const,
      tax_class: '',
      manage_stock: false,
      stock_quantity: null,
      backorders: 'no' as const,
      backorders_allowed: false,
      backordered: false,
      low_stock_amount: null,
      sold_individually: false,
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      shipping_required: false,
      shipping_taxable: false,
      shipping_class: '',
      shipping_class_id: 0,
      reviews_allowed: true,
      average_rating: '4.5',
      rating_count: 25,
      upsell_ids: [],
      cross_sell_ids: [],
      parent_id: 0,
      purchase_note: '',
      tags: [],
      attributes: [],
      default_attributes: [],
      variations: [],
      grouped_products: [],
      menu_order: 0,
      price_html: '$29.99',
      related_ids: [],
      meta_data: [],
      stock_status_text: 'In Stock'
    },
    {
      id: 2,
      name: 'GTA V Ultimate Mod Pack',
      slug: 'gta-v-ultimate-mod-pack',
      price: '24.99',
      regular_price: '24.99',
      sale_price: '',
      on_sale: false,
      featured: true,
      short_description: 'Complete GTA V modification pack with vehicles, weapons, and maps.',
      images: [
        {
          id: 2,
          src: 'https://placehold.co/400x400?text=GTA+V+Mod+Pack+with+vehicles+weapons+maps',
          alt: 'GTA V Mod Pack with vehicles weapons and custom maps',
          name: 'GTA V Mod Pack',
          date_created: '',
          date_created_gmt: '',
          date_modified: '',
          date_modified_gmt: ''
        }
      ],
      categories: [{ id: 2, name: 'Game Mods', slug: 'game-mods' }],
      stock_status: 'instock' as const,
      // Required properties with defaults (same as above)
      permalink: '',
      date_created: '',
      date_created_gmt: '',
      date_modified: '',
      date_modified_gmt: '',
      type: 'simple' as const,
      status: 'publish' as const,
      catalog_visibility: 'visible' as const,
      description: '',
      sku: '',
      date_on_sale_from: null,
      date_on_sale_to: null,
      purchasable: true,
      total_sales: 0,
      virtual: false,
      downloadable: true,
      downloads: [],
      download_limit: 0,
      download_expiry: 0,
      external_url: '',
      button_text: '',
      tax_status: 'taxable' as const,
      tax_class: '',
      manage_stock: false,
      stock_quantity: null,
      backorders: 'no' as const,
      backorders_allowed: false,
      backordered: false,
      low_stock_amount: null,
      sold_individually: false,
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      shipping_required: false,
      shipping_taxable: false,
      shipping_class: '',
      shipping_class_id: 0,
      reviews_allowed: true,
      average_rating: '4.8',
      rating_count: 42,
      upsell_ids: [],
      cross_sell_ids: [],
      parent_id: 0,
      purchase_note: '',
      tags: [],
      attributes: [],
      default_attributes: [],
      variations: [],
      grouped_products: [],
      menu_order: 0,
      price_html: '$24.99',
      related_ids: [],
      meta_data: [],
      stock_status_text: 'In Stock'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      search: searchQuery.trim() || undefined,
      page: 1
    }));
  };

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of premium gaming products and modifications
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button type="submit">Search</Button>
        </form>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <ProductFiltersComponent
            filters={filters}
            onFiltersChange={handleFilterChange}
          />
          <ProductSort
            orderBy={filters.orderby || 'date'}
            order={filters.order || 'desc'}
            onChange={(orderby, order) => handleFilterChange({ orderby, order })}
          />
        </div>
      </div>

      {/* Error State */}
      {error && !loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.max(1, (filters.page || 1) - 1))}
                disabled={filters.page === 1}
              >
                Previous
              </Button>
              
              <span className="px-4 py-2 text-sm">
                Page {filters.page || 1} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.min(totalPages, (filters.page || 1) + 1))}
                disabled={filters.page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && !error && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => {
            setFilters({ page: 1, perPage: 12, orderby: 'date', order: 'desc' });
            setSearchQuery('');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { WooProduct } from '@/types/woocommerce';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import woocommerce from '@/lib/woocommerce';
import Link from 'next/link';

export function FeaturedProducts() {
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await woocommerce.getFeaturedProducts(1, 8);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Failed to load featured products');
        // Fallback to mock data for demo purposes
        setProducts(getMockProducts());
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
      // ... other required properties with defaults
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
      // ... other required properties with defaults
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

  if (error && products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{error}</p>
        <Button asChild className="mt-4">
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our hand-picked selection of premium gaming modifications and digital products
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/products">
                View All Products
              </Link>
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
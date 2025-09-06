import { NextRequest, NextResponse } from 'next/server';
import woocommerce from '@/lib/woocommerce';
import { ProductFilters } from '@/types/woocommerce';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const filters: ProductFilters = {
      page: parseInt(searchParams.get('page') || '1'),
      perPage: parseInt(searchParams.get('per_page') || '12'),
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      tag: searchParams.get('tag') || undefined,
      featured: searchParams.get('featured') === 'true' ? true : undefined,
      onSale: searchParams.get('on_sale') === 'true' ? true : undefined,
      minPrice: searchParams.get('min_price') ? parseFloat(searchParams.get('min_price')!) : undefined,
      maxPrice: searchParams.get('max_price') ? parseFloat(searchParams.get('max_price')!) : undefined,
      inStock: searchParams.get('in_stock') === 'true' ? true : undefined,
      orderby: (searchParams.get('orderby') as any) || 'date',
      order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
    };

    // Fetch products from WooCommerce
    const response = await woocommerce.getProducts(filters);

    return NextResponse.json({
      success: true,
      data: response.data,
      pagination: {
        page: filters.page || 1,
        perPage: filters.perPage || 12,
        total: response.total,
        totalPages: response.totalPages,
      }
    });

  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create new product (admin functionality)
    const product = await woocommerce.createProduct(body);
    
    return NextResponse.json({
      success: true,
      data: product,
    });
    
  } catch (error) {
    console.error('Create Product Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create product',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import woocommerce from '@/lib/woocommerce';
import { OrderFilters } from '@/types/woocommerce';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const filters: OrderFilters = {
      page: parseInt(searchParams.get('page') || '1'),
      perPage: parseInt(searchParams.get('per_page') || '10'),
      status: searchParams.get('status') || undefined,
      customer: searchParams.get('customer') ? parseInt(searchParams.get('customer')!) : undefined,
      dateStart: searchParams.get('date_start') || undefined,
      dateEnd: searchParams.get('date_end') || undefined,
    };

    // Fetch orders from WooCommerce
    const response = await woocommerce.getOrders(filters);

    return NextResponse.json({
      success: true,
      data: response.data,
      pagination: {
        page: filters.page || 1,
        perPage: filters.perPage || 10,
        total: response.total,
        totalPages: response.totalPages,
      }
    });

  } catch (error) {
    console.error('Orders API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch orders',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create new order in WooCommerce
    const order = await woocommerce.createOrder(body);
    
    return NextResponse.json({
      success: true,
      data: order,
    });
    
  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create order',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
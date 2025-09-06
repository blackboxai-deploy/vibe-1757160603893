import { NextRequest, NextResponse } from 'next/server';
import woocommerce from '@/lib/woocommerce';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid product ID',
      }, { status: 400 });
    }

    // Fetch single product from WooCommerce
    const product = await woocommerce.getProduct(productId);

    return NextResponse.json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.error('Product Detail API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch product',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid product ID',
      }, { status: 400 });
    }

    // Update product in WooCommerce (admin functionality)
    const product = await woocommerce.updateProduct(productId, body);
    
    return NextResponse.json({
      success: true,
      data: product,
    });
    
  } catch (error) {
    console.error('Update Product Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update product',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid product ID',
      }, { status: 400 });
    }

    // Delete product from WooCommerce (admin functionality)
    const product = await woocommerce.deleteProduct(productId);
    
    return NextResponse.json({
      success: true,
      data: product,
    });
    
  } catch (error) {
    console.error('Delete Product Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete product',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
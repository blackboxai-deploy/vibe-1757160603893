import { 
  WooProduct, 
  WooOrder, 
  WooCustomer, 
  ProductFilters, 
  OrderFilters,
  WooApiListResponse
} from '@/types/woocommerce';

// WooCommerce API Client Configuration
class WooCommerceAPI {
  private baseUrl: string;
  private consumerKey: string;
  private consumerSecret: string;
  private version: string = 'wc/v3';

  constructor() {
    this.baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://g5indianmods.com'
      : 'https://g5indianmods.com';
    this.consumerKey = typeof window === 'undefined' 
      ? process.env.WOOCOMMERCE_CONSUMER_KEY || ''
      : '';
    this.consumerSecret = typeof window === 'undefined' 
      ? process.env.WOOCOMMERCE_CONSUMER_SECRET || ''
      : '';
  }

  // Create authentication header
  private getAuthHeader(): string {
    const credentials = typeof window === 'undefined'
      ? Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64')
      : btoa(`${this.consumerKey}:${this.consumerSecret}`);
    return `Basic ${credentials}`;
  }

  // Build API URL with parameters
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseUrl}/wp-json/${this.version}/${endpoint}`);
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          url.searchParams.append(key, params[key].toString());
        }
      });
    }
    
    return url.toString();
  }

  // Generic API request method
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}, 
    params?: Record<string, any>
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthHeader(),
        ...options.headers,
      },
    };

    try {
      console.log(`Making WooCommerce API request to: ${url}`);
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('WooCommerce API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          url
        });
        throw new Error(`WooCommerce API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('WooCommerce API Request Failed:', error);
      throw error;
    }
  }

  // Product API Methods
  async getProducts(filters: ProductFilters = {}): Promise<WooApiListResponse<WooProduct>> {
    const params = {
      page: filters.page || 1,
      per_page: filters.perPage || 12,
      orderby: filters.orderby || 'date',
      order: filters.order || 'desc',
      search: filters.search,
      category: filters.category,
      tag: filters.tag,
      featured: filters.featured,
      on_sale: filters.onSale,
      min_price: filters.minPrice,
      max_price: filters.maxPrice,
      stock_status: filters.inStock ? 'instock' : undefined,
    };

    const data = await this.request<WooProduct[]>('products', { method: 'GET' }, params);
    
    return {
      data,
      total: 0, // Will be set from response headers
      totalPages: 0,
      page: filters.page || 1,
      perPage: filters.perPage || 12,
    };
  }

  async getProduct(id: number): Promise<WooProduct> {
    return this.request<WooProduct>(`products/${id}`);
  }

  async getProductBySlug(slug: string): Promise<WooProduct[]> {
    return this.request<WooProduct[]>('products', { method: 'GET' }, { slug });
  }

  async createProduct(product: Partial<WooProduct>): Promise<WooProduct> {
    return this.request<WooProduct>('products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: number, product: Partial<WooProduct>): Promise<WooProduct> {
    return this.request<WooProduct>(`products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: number): Promise<WooProduct> {
    return this.request<WooProduct>(`products/${id}`, { method: 'DELETE' });
  }

  // Order API Methods
  async getOrders(filters: OrderFilters = {}): Promise<WooApiListResponse<WooOrder>> {
    const params = {
      page: filters.page || 1,
      per_page: filters.perPage || 10,
      status: filters.status,
      customer: filters.customer,
      after: filters.dateStart,
      before: filters.dateEnd,
    };

    const data = await this.request<WooOrder[]>('orders', { method: 'GET' }, params);
    
    return {
      data,
      total: 0,
      totalPages: 0,
      page: filters.page || 1,
      perPage: filters.perPage || 10,
    };
  }

  async getOrder(id: number): Promise<WooOrder> {
    return this.request<WooOrder>(`orders/${id}`);
  }

  async createOrder(order: Partial<WooOrder>): Promise<WooOrder> {
    return this.request<WooOrder>('orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrder(id: number, order: Partial<WooOrder>): Promise<WooOrder> {
    return this.request<WooOrder>(`orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(order),
    });
  }

  async updateOrderStatus(id: number, status: string): Promise<WooOrder> {
    return this.updateOrder(id, { status } as Partial<WooOrder>);
  }

  // Customer API Methods
  async getCustomers(page: number = 1, perPage: number = 10): Promise<WooApiListResponse<WooCustomer>> {
    const data = await this.request<WooCustomer[]>('customers', { method: 'GET' }, {
      page,
      per_page: perPage,
    });
    
    return {
      data,
      total: 0,
      totalPages: 0,
      page,
      perPage,
    };
  }

  async getCustomer(id: number): Promise<WooCustomer> {
    return this.request<WooCustomer>(`customers/${id}`);
  }

  async createCustomer(customer: Partial<WooCustomer>): Promise<WooCustomer> {
    return this.request<WooCustomer>('customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  }

  async updateCustomer(id: number, customer: Partial<WooCustomer>): Promise<WooCustomer> {
    return this.request<WooCustomer>(`customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    });
  }

  // Category API Methods
  async getCategories(page: number = 1, perPage: number = 100) {
    return this.request('products/categories', { method: 'GET' }, {
      page,
      per_page: perPage,
      hide_empty: true,
    });
  }

  // Search Methods
  async searchProducts(query: string, page: number = 1, perPage: number = 12): Promise<WooApiListResponse<WooProduct>> {
    return this.getProducts({
      search: query,
      page,
      perPage,
    });
  }

  // Featured Products
  async getFeaturedProducts(page: number = 1, perPage: number = 8): Promise<WooApiListResponse<WooProduct>> {
    return this.getProducts({
      featured: true,
      page,
      perPage,
    });
  }

  // Sale Products
  async getSaleProducts(page: number = 1, perPage: number = 12): Promise<WooApiListResponse<WooProduct>> {
    return this.getProducts({
      onSale: true,
      page,
      perPage,
    });
  }

  // Related Products
  async getRelatedProducts(productId: number): Promise<WooProduct[]> {
    const product = await this.getProduct(productId);
    if (product.related_ids && product.related_ids.length > 0) {
      const relatedProducts = await Promise.all(
        product.related_ids.slice(0, 4).map(id => this.getProduct(id))
      );
      return relatedProducts.filter(Boolean);
    }
    return [];
  }

  // Health check method
  async checkConnection(): Promise<boolean> {
    try {
      await this.request('products', { method: 'GET' }, { per_page: 1 });
      return true;
    } catch (error) {
      console.error('WooCommerce connection failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const woocommerce = new WooCommerceAPI();
export default woocommerce;
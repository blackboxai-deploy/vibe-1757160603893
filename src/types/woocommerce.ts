// WooCommerce API Types and Interfaces

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: 'simple' | 'grouped' | 'external' | 'variable';
  status: 'draft' | 'pending' | 'private' | 'publish';
  featured: boolean;
  catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden';
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_to: string | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: WooDownload[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: 'taxable' | 'shipping' | 'none';
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  backorders: 'no' | 'notify' | 'yes';
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  dimensions: WooProductDimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: WooProductCategory[];
  tags: WooProductTag[];
  images: WooProductImage[];
  attributes: WooProductAttribute[];
  default_attributes: WooProductDefaultAttribute[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: WooMetaData[];
  stock_status_text: string;
}

export interface WooProductDimensions {
  length: string;
  width: string;
  height: string;
}

export interface WooProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooProductTag {
  id: number;
  name: string;
  slug: string;
}

export interface WooProductImage {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

export interface WooProductAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooProductDefaultAttribute {
  id: number;
  name: string;
  option: string;
}

export interface WooDownload {
  id: string;
  name: string;
  file: string;
}

export interface WooMetaData {
  id: number;
  key: string;
  value: string;
}

// Order Types
export interface WooOrder {
  id: number;
  parent_id: number;
  status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed' | 'trash';
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: WooOrderAddress;
  shipping: WooOrderAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: string | null;
  date_paid: string | null;
  cart_hash: string;
  number: string;
  meta_data: WooMetaData[];
  line_items: WooOrderLineItem[];
  tax_lines: WooOrderTaxLine[];
  shipping_lines: WooOrderShippingLine[];
  fee_lines: WooOrderFeeLine[];
  coupon_lines: WooOrderCouponLine[];
  refunds: WooOrderRefund[];
}

export interface WooOrderAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface WooOrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: WooOrderTax[];
  meta_data: WooMetaData[];
  sku: string;
  price: number;
  image: WooProductImage;
}

export interface WooOrderTaxLine {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  rate_percent: number;
  meta_data: WooMetaData[];
}

export interface WooOrderShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: WooOrderTax[];
  meta_data: WooMetaData[];
}

export interface WooOrderFeeLine {
  id: number;
  name: string;
  tax_class: string;
  tax_status: string;
  total: string;
  total_tax: string;
  taxes: WooOrderTax[];
  meta_data: WooMetaData[];
}

export interface WooOrderCouponLine {
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  meta_data: WooMetaData[];
}

export interface WooOrderRefund {
  id: number;
  reason: string;
  total: string;
}

export interface WooOrderTax {
  id: number;
  total: string;
  subtotal: string;
}

// Customer Types
export interface WooCustomer {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: WooOrderAddress;
  shipping: WooOrderAddress;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: WooMetaData[];
}

// Cart Types
export interface CartItem {
  id: string;
  productId: number;
  variationId?: number;
  quantity: number;
  product: WooProduct;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  itemCount: number;
}

// API Response Types
export interface WooApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface WooApiListResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
}

// Filter and Query Types
export interface ProductFilters {
  category?: string;
  tag?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  featured?: boolean;
  inStock?: boolean;
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'modified' | 'menu_order' | 'popularity' | 'rating' | 'price';
  order?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

export interface OrderFilters {
  status?: string;
  customer?: number;
  dateStart?: string;
  dateEnd?: string;
  page?: number;
  perPage?: number;
}
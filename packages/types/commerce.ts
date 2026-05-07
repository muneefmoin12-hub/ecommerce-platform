// ── Product Types ─────────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  inventoryQuantity: number;
  options: Record<string, string>;
  images: ProductImage[];
  weight?: number;
  weightUnit?: 'kg' | 'lb' | 'oz' | 'g';
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
  position: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: ProductCategory[];
  imageUrl?: string;
}

export interface Product {
  id: string;
  medusaId?: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: ProductImage[];
  variants: ProductVariant[];
  categories: ProductCategory[];
  tags: string[];
  status: ProductStatus;
  inventoryQuantity: number;
  weight?: number;
  dimensions?: ProductDimensions;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type ProductStatus = 'draft' | 'published' | 'archived';

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in';
}

// ── Cart Types ────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  product: Pick<Product, 'id' | 'name' | 'slug' | 'images'>;
  variant: Pick<ProductVariant, 'id' | 'sku' | 'title' | 'price' | 'options'>;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  shippingTotal: number;
  total: number;
  currency: string;
  couponCode?: string;
  shippingAddress?: Address;
  createdAt: string;
  updatedAt: string;
}

// ── Order Types ───────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export type FulfillmentStatus =
  | 'not_fulfilled'
  | 'partially_fulfilled'
  | 'fulfilled'
  | 'returned';

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  variantTitle: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  medusaId?: string;
  displayId: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  shippingTotal: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Address Types ─────────────────────────────────────────────────────────────

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// ── Review Types ──────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

// ── Shipping Types ────────────────────────────────────────────────────────────

export interface ShippingOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  estimatedDays: number;
  provider: string;
}

// ── Discount Types ────────────────────────────────────────────────────────────

export type DiscountType = 'percentage' | 'fixed_amount' | 'free_shipping';

export interface Discount {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount: number;
  startsAt: string;
  endsAt?: string;
  isActive: boolean;
}

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { ProductsService } from '../products/products.service';

interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
  variantTitle: string;
  imageUrl?: string;
}

interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  updatedAt: string;
}

const CART_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

@Injectable()
export class CartService implements OnModuleInit {
  private redis!: Redis;

  constructor(
    private readonly productsService: ProductsService,
    private readonly config: ConfigService,
  ) {}

  onModuleInit() {
    this.redis = new Redis({
      host: this.config.get('REDIS_HOST', 'localhost'),
      port: this.config.get<number>('REDIS_PORT', 6379),
      password: this.config.get('REDIS_PASSWORD'),
      lazyConnect: true,
    });
    this.redis.on('error', (err) => {
      // Non-fatal: cart falls back gracefully
      console.warn('[CartService] Redis connection error:', err.message);
    });
  }

  private cartKey(cartId: string) {
    return `cart:${cartId}`;
  }

  private async readCart(cartId: string): Promise<Cart | null> {
    try {
      const raw = await this.redis.get(this.cartKey(cartId));
      return raw ? (JSON.parse(raw) as Cart) : null;
    } catch {
      return null;
    }
  }

  private async writeCart(cart: Cart): Promise<void> {
    try {
      cart.updatedAt = new Date().toISOString();
      await this.redis.setex(this.cartKey(cart.id), CART_TTL_SECONDS, JSON.stringify(cart));
    } catch {
      // ignore — graceful degradation
    }
  }

  getOrCreate(cartId: string, userId?: string): Promise<Cart> {
    return this.readCart(cartId).then(async (existing) => {
      if (existing) return existing;
      const fresh: Cart = {
        id: cartId,
        userId,
        items: [],
        subtotal: 0,
        taxTotal: 0,
        total: 0,
        updatedAt: new Date().toISOString(),
      };
      await this.writeCart(fresh);
      return fresh;
    });
  }

  async addItem(
    cartId: string,
    productId: string,
    variantId: string,
    quantity: number,
    userId?: string,
  ): Promise<Cart> {
    const product = await this.productsService.findOne(productId);
    const variant = product.variants?.find((v: any) => v.id === variantId);
    if (!variant) throw new NotFoundException('Variant not found');

    const cart = await this.getOrCreate(cartId, userId);
    const existingIndex = cart.items.findIndex(
      (i) => i.productId === productId && i.variantId === variantId,
    );

    const item: CartItem = {
      id: `${productId}-${variantId}`,
      productId,
      variantId,
      quantity,
      unitPrice: variant.price,
      productName: product.name,
      variantTitle: variant.title ?? 'Default',
      imageUrl: product.images?.[0]?.url,
    };

    if (existingIndex >= 0) {
      cart.items[existingIndex]!.quantity += quantity;
    } else {
      cart.items.push(item);
    }

    return this.recalculate(cart);
  }

  async updateItem(cartId: string, itemId: string, quantity: number): Promise<Cart> {
    const cart = await this.readCart(cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.id !== itemId);
    } else {
      const item = cart.items.find((i) => i.id === itemId);
      if (!item) throw new NotFoundException('Cart item not found');
      item.quantity = quantity;
    }

    return this.recalculate(cart);
  }

  async removeItem(cartId: string, itemId: string): Promise<Cart> {
    const cart = await this.readCart(cartId);
    if (!cart) throw new NotFoundException('Cart not found');
    cart.items = cart.items.filter((i) => i.id !== itemId);
    return this.recalculate(cart);
  }

  async get(cartId: string): Promise<Cart> {
    const cart = await this.readCart(cartId);
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async clear(cartId: string): Promise<void> {
    try {
      await this.redis.del(this.cartKey(cartId));
    } catch {
      // ignore
    }
  }

  private async recalculate(cart: Cart): Promise<Cart> {
    cart.subtotal = cart.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    cart.taxTotal = Math.round(cart.subtotal * 0.1);
    cart.total = cart.subtotal + cart.taxTotal;
    await this.writeCart(cart);
    return cart;
  }
}

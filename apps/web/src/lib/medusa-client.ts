import Medusa from '@medusajs/js-sdk';

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL ?? 'http://localhost:9000';
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? '';

export const medusa = new Medusa({
  baseUrl: MEDUSA_URL,
  debug: process.env.NODE_ENV === 'development',
  publishableKey: PUBLISHABLE_KEY,
  auth: {
    type: 'session',
  },
});

// ── Product helpers ────────────────────────────────────────────────────────────

export async function getMedusaProducts(options: {
  limit?: number;
  offset?: number;
  q?: string;
  category_id?: string[];
  order?: string;
} = {}) {
  try {
    const { products, count } = await medusa.store.product.list({
      limit: options.limit ?? 24,
      offset: options.offset ?? 0,
      q: options.q,
      category_id: options.category_id,
      order: options.order,
    });
    return { products, count };
  } catch {
    return { products: [], count: 0 };
  }
}

export async function getMedusaProduct(handle: string) {
  try {
    const { products } = await medusa.store.product.list({ handle });
    return products[0] ?? null;
  } catch {
    return null;
  }
}

// ── Cart helpers ────────────────────────────────────────────────────────────────

export async function createMedusaCart() {
  try {
    const { cart } = await medusa.store.cart.create({});
    return cart;
  } catch {
    return null;
  }
}

export async function getMedusaCart(cartId: string) {
  try {
    const { cart } = await medusa.store.cart.retrieve(cartId);
    return cart;
  } catch {
    return null;
  }
}

export async function addMedusaLineItem(cartId: string, variantId: string, quantity = 1) {
  try {
    const { cart } = await medusa.store.cart.createLineItem(cartId, {
      variant_id: variantId,
      quantity,
    });
    return cart;
  } catch {
    return null;
  }
}

export async function updateMedusaLineItem(cartId: string, lineItemId: string, quantity: number) {
  try {
    const { cart } = await medusa.store.cart.updateLineItem(cartId, lineItemId, { quantity });
    return cart;
  } catch {
    return null;
  }
}

export async function removeMedusaLineItem(cartId: string, lineItemId: string) {
  try {
    const { cart } = await medusa.store.cart.deleteLineItem(cartId, lineItemId);
    return cart;
  } catch {
    return null;
  }
}

export async function completeMedusaCart(cartId: string) {
  try {
    const result = await medusa.store.cart.complete(cartId);
    return result;
  } catch {
    return null;
  }
}

// ── Auth helpers ────────────────────────────────────────────────────────────────

export async function medusaLogin(email: string, password: string) {
  try {
    const token = await medusa.auth.login('customer', 'emailpass', { email, password });
    return { token, error: null };
  } catch (err: any) {
    return { token: null, error: err?.message ?? 'Login failed' };
  }
}

export async function medusaRegister(email: string, password: string, firstName: string, lastName: string) {
  try {
    const token = await medusa.auth.register('customer', 'emailpass', { email, password });
    if (token) {
      await medusa.store.customer.create({ first_name: firstName, last_name: lastName, email });
    }
    return { token, error: null };
  } catch (err: any) {
    return { token: null, error: err?.message ?? 'Registration failed' };
  }
}

// ── Order helpers ───────────────────────────────────────────────────────────────

export async function getMedusaOrders() {
  try {
    const { orders } = await medusa.store.order.list({});
    return orders;
  } catch {
    return [];
  }
}

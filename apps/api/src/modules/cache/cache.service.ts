import { Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get<T>(key);
  }

  async set(key: string, value: unknown, ttlMs?: number): Promise<void> {
    await this.cache.set(key, value, ttlMs);
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async wrap<T>(key: string, fn: () => Promise<T>, ttlMs = 60_000): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== undefined) return cached;
    const fresh = await fn();
    await this.set(key, fresh, ttlMs);
    return fresh;
  }

  /** Invalidate all keys matching a prefix pattern */
  async delByPrefix(prefix: string): Promise<void> {
    // cache-manager v5 doesn't expose KEYS directly; call store reset as fallback
    // For precise prefix deletion, use ioredis directly in RedisCartStore
    const store = (this.cache as any).store;
    if (typeof store?.keys === 'function') {
      const keys: string[] = await store.keys(`${prefix}*`);
      await Promise.all(keys.map((k) => this.del(k)));
    }
  }
}

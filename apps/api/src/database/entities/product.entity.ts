import { Entity, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { TimestampedEntity } from './base.entity';
import { Category } from './category.entity';
import type { ProductStatus } from '@ecommerce/types';

@Entity('products')
@Index(['sku'], { unique: true })
@Index(['slug'], { unique: true })
@Index(['medusaId'])
export class Product extends TimestampedEntity {
  @Column({ name: 'medusa_id', unique: true, nullable: true })
  medusaId: string | null;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'short_description', nullable: true })
  shortDescription: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'compare_at_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
  compareAtPrice: number | null;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'jsonb', default: '[]' })
  images: object[];

  @Column({ type: 'jsonb', default: '[]' })
  variants: object[];

  @Column({ default: 'draft' })
  status: ProductStatus;

  @Column({ name: 'inventory_quantity', default: 0 })
  inventoryQuantity: number;

  @Column({ type: 'simple-array', default: '' })
  tags: string[];

  @Column({ type: 'jsonb', default: '{}' })
  metadata: object;

  @ManyToMany(() => Category, (cat) => cat.products, { eager: true })
  @JoinTable({
    name: 'product_categories',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];
}

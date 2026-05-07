import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { TimestampedEntity } from './base.entity';
import { User } from './user.entity';
import type { OrderStatus, PaymentStatus, FulfillmentStatus } from '@ecommerce/types';

@Entity('orders')
@Index(['medusaId'], { unique: true, where: '"medusa_id" IS NOT NULL' })
@Index(['userId'])
export class Order extends TimestampedEntity {
  @Column({ name: 'medusa_id', nullable: true })
  medusaId: string | null;

  @Column({ name: 'display_id', unique: true })
  displayId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @Column({ type: 'jsonb', default: '[]' })
  items: object[];

  @Column({ default: 'pending' })
  status: OrderStatus;

  @Column({ name: 'payment_status', default: 'pending' })
  paymentStatus: PaymentStatus;

  @Column({ name: 'fulfillment_status', default: 'not_fulfilled' })
  fulfillmentStatus: FulfillmentStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column({ name: 'discount_total', type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountTotal: number;

  @Column({ name: 'tax_total', type: 'decimal', precision: 10, scale: 2, default: 0 })
  taxTotal: number;

  @Column({ name: 'shipping_total', type: 'decimal', precision: 10, scale: 2, default: 0 })
  shippingTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ name: 'shipping_address', type: 'jsonb' })
  shippingAddress: object;

  @Column({ name: 'billing_address', type: 'jsonb' })
  billingAddress: object;

  @Column({ name: 'tracking_number', nullable: true })
  trackingNumber: string | null;

  @Column({ name: 'tracking_url', nullable: true })
  trackingUrl: string | null;

  @Column({ nullable: true, type: 'text' })
  notes: string | null;
}

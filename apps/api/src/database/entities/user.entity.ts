import { Entity, Column, OneToMany, Index } from 'typeorm';
import { TimestampedEntity } from './base.entity';
import { Order } from './order.entity';
import type { UserRole } from '@ecommerce/types';

@Entity('users')
@Index(['email'], { unique: true })
export class User extends TimestampedEntity {
  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string | null;

  @Column({ name: 'last_name', nullable: true })
  lastName: string | null;

  @Column({ nullable: true })
  phone: string | null;

  @Column({ default: 'customer' })
  role: UserRole;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ type: 'jsonb', default: '[]' })
  addresses: object[];

  @Column({ type: 'jsonb', default: '{"currency":"USD","language":"en","marketingEmails":true,"orderUpdates":true}' })
  preferences: object;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

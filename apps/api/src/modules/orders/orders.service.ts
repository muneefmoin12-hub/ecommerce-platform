import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Order } from '../../database/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}
import type { OrdersQuery } from '@ecommerce/types';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateOrderDto, userId?: string): Promise<Order> {
    const subtotal = 0;
    const taxTotal = Math.round(subtotal * 0.1);
    const total = subtotal + taxTotal;

    const order = this.orderRepo.create({
      displayId: generateOrderId(),
      userId: userId ?? null,
      items: dto.items as object[],
      shippingAddress: dto.shippingAddress,
      billingAddress: dto.billingAddress ?? dto.shippingAddress,
      subtotal,
      taxTotal,
      total,
      notes: dto.notes ?? null,
    });

    const saved = await this.orderRepo.save(order);
    this.eventEmitter.emit('order.created', saved);
    return saved;
  }

  async findOne(id: string, userId?: string): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    if (userId && order.userId !== userId) throw new ForbiddenException();
    return order;
  }

  async findByUser(userId: string, query: Partial<OrdersQuery> = {}) {
    const { page = 1, limit = 20 } = query;
    const [data, total] = await this.orderRepo.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findAll(query: Partial<OrdersQuery> = {}) {
    const { page = 1, limit = 20, status } = query;
    const [data, total] = await this.orderRepo.findAndCount({
      where: status ? { status: status as any } : {},
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status as any;
    const saved = await this.orderRepo.save(order);
    this.eventEmitter.emit('order.status_changed', { order: saved, status });
    return saved;
  }
}

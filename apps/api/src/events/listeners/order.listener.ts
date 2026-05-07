import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class OrderListener {
  private readonly logger = new Logger(OrderListener.name);

  @OnEvent('order.created')
  handleOrderCreated(order: { id: string; displayId: string; userId: string | null }) {
    this.logger.log(`Order created: ${order.displayId} (${order.id})`);
    // TODO: Send confirmation email, notify inventory service, etc.
  }

  @OnEvent('order.status_changed')
  handleStatusChanged(data: { order: { id: string }; status: string }) {
    this.logger.log(`Order ${data.order.id} status → ${data.status}`);
    // TODO: Send status update email to customer
  }

  @OnEvent('inventory.low_stock')
  handleLowStock(data: { productId: string; quantity: number }) {
    this.logger.warn(`Low stock alert: product ${data.productId} (qty: ${data.quantity})`);
    // TODO: Notify admin, reorder automatically, etc.
  }
}

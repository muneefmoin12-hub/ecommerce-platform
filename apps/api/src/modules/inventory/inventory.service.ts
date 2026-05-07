import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductsService } from '../products/products.service';

const LOW_STOCK_THRESHOLD = 10;

@Injectable()
export class InventoryService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getStock(productId: string) {
    const product = await this.productsService.findOne(productId);
    return {
      productId,
      quantity: product.inventoryQuantity,
      isLowStock: product.inventoryQuantity <= LOW_STOCK_THRESHOLD,
      isInStock: product.inventoryQuantity > 0,
    };
  }

  async adjustStock(productId: string, delta: number): Promise<void> {
    const product = await this.productsService.findOne(productId);
    const newQty = Math.max(0, product.inventoryQuantity + delta);
    await this.productsService.update(productId, { inventoryQuantity: newQty });

    if (newQty <= LOW_STOCK_THRESHOLD) {
      this.eventEmitter.emit('inventory.low_stock', { productId, quantity: newQty });
    }
    if (newQty === 0) {
      this.eventEmitter.emit('inventory.out_of_stock', { productId });
    }
  }
}

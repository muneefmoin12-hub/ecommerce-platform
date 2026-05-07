import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { IsString, IsNumber, Min } from 'class-validator';

class AddItemDto {
  @IsString() productId: string;
  @IsString() variantId: string;
  @IsNumber() @Min(1) quantity: number;
}

@ApiTags('cart')
@Controller({ path: 'cart', version: '1' })
export class CartController {
  constructor(private readonly cartService: CartService) {}

  private getCartId(req: Request, user?: { id: string }): string {
    return user?.id ?? (req.headers['x-cart-id'] as string ?? 'guest-cart');
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get cart' })
  getCart(@Req() req: Request, @CurrentUser() user?: { id: string }): Promise<any> {
    return this.cartService.getOrCreate(this.getCartId(req, user), user?.id);
  }

  @Post('items')
  @Public()
  @ApiOperation({ summary: 'Add item to cart' })
  addItem(
    @Req() req: Request,
    @Body() dto: AddItemDto,
    @CurrentUser() user?: { id: string },
  ): Promise<any> {
    return this.cartService.addItem(this.getCartId(req, user), dto.productId, dto.variantId, dto.quantity, user?.id);
  }

  @Patch('items/:itemId')
  @Public()
  @ApiOperation({ summary: 'Update item quantity' })
  updateItem(
    @Req() req: Request,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
    @CurrentUser() user?: { id: string },
  ): Promise<any> {
    return this.cartService.updateItem(this.getCartId(req, user), itemId, quantity);
  }

  @Delete('items/:itemId')
  @Public()
  @ApiOperation({ summary: 'Remove item from cart' })
  removeItem(
    @Req() req: Request,
    @Param('itemId') itemId: string,
    @CurrentUser() user?: { id: string },
  ): Promise<any> {
    return this.cartService.removeItem(this.getCartId(req, user), itemId);
  }

  @Delete()
  @Public()
  @ApiOperation({ summary: 'Clear cart' })
  clearCart(@Req() req: Request, @CurrentUser() user?: { id: string }) {
    this.cartService.clear(this.getCartId(req, user));
    return { success: true };
  }
}

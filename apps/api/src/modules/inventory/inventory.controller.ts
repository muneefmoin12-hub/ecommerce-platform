import { Controller, Get, Patch, Param, Body, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('inventory')
@Controller({ path: 'inventory', version: '1' })
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get(':productId')
  @Public()
  @ApiOperation({ summary: 'Get stock level for a product' })
  getStock(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.inventoryService.getStock(productId);
  }

  @Patch(':productId/adjust')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adjust stock level (admin only)' })
  adjustStock(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body('delta') delta: number,
  ) {
    return this.inventoryService.adjustStock(productId, delta);
  }
}

import { IsString, IsNumber, IsOptional, IsArray, IsEnum, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { ProductStatus } from '@ecommerce/types';

export class CreateProductDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() sku: string;
  @ApiProperty() @IsString() slug: string;
  @ApiProperty() @IsString() description: string;
  @ApiPropertyOptional() @IsOptional() @IsString() shortDescription?: string;
  @ApiProperty() @IsNumber() @Min(0) price: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) compareAtPrice?: number;
  @ApiPropertyOptional({ default: 'USD' }) @IsOptional() @IsString() currency?: string;
  @ApiPropertyOptional({ enum: ['draft', 'published', 'archived'] })
  @IsOptional() @IsEnum(['draft', 'published', 'archived']) status?: ProductStatus;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) inventoryQuantity?: number;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() tags?: string[];
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() categoryIds?: string[];
}

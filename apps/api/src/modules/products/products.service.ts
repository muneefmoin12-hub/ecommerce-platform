import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, FindOptionsWhere } from 'typeorm';
import { Product } from '../../database/entities/product.entity';
import { Category } from '../../database/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { ProductsQuery } from '@ecommerce/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll(query: ProductsQuery = {}) {
    const {
      page = 1,
      limit = 24,
      search,
      categoryId,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
    } = query;

    const where: FindOptionsWhere<Product> = {};
    if (status) where.status = status as any;
    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = Between(minPrice, maxPrice) as any;
    }
    if (search) where.name = Like(`%${search}%`);

    const [data, total] = await this.productRepo.findAndCount({
      where,
      relations: ['categories'],
      order: { [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id }, relations: ['categories'] });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { slug }, relations: ['categories'] });
    if (!product) throw new NotFoundException(`Product with slug "${slug}" not found`);
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const categories = dto.categoryIds?.length
      ? await this.categoryRepo.findByIds(dto.categoryIds)
      : [];

    const product = this.productRepo.create({ ...dto, categories });
    return this.productRepo.save(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    if (dto.categoryIds !== undefined) {
      product.categories = dto.categoryIds.length
        ? await this.categoryRepo.findByIds(dto.categoryIds)
        : [];
    }

    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.softRemove(product);
  }
}

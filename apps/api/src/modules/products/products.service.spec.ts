import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../../database/entities/product.entity';
import { Category } from '../../database/entities/category.entity';

const mockProduct: Partial<Product> = {
  id: 'uuid-1',
  name: 'Test Product',
  slug: 'test-product',
  sku: 'TEST-001',
  price: 1999,
  description: 'A test product',
  status: 'published',
  inventoryQuantity: 10,
  categories: [],
};

const mockProductRepo = {
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  softRemove: jest.fn(),
};

const mockCategoryRepo = {
  findByIds: jest.fn(),
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: mockProductRepo },
        { provide: getRepositoryToken(Category), useValue: mockCategoryRepo },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('findAll', () => {
    it('returns paginated products', async () => {
      mockProductRepo.findAndCount.mockResolvedValue([[mockProduct], 1]);
      const result = await service.findAll({ page: 1, limit: 24 });
      expect(result.data).toHaveLength(1);
      expect(result.meta.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('returns product when found', async () => {
      mockProductRepo.findOne.mockResolvedValue(mockProduct);
      const result = await service.findOne('uuid-1');
      expect(result.name).toBe('Test Product');
    });

    it('throws NotFoundException when not found', async () => {
      mockProductRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates and saves product', async () => {
      mockCategoryRepo.findByIds.mockResolvedValue([]);
      mockProductRepo.create.mockReturnValue(mockProduct);
      mockProductRepo.save.mockResolvedValue(mockProduct);

      const result = await service.create({
        name: 'Test Product',
        sku: 'TEST-001',
        slug: 'test-product',
        description: 'Test',
        price: 1999,
      });
      expect(result.name).toBe('Test Product');
      expect(mockProductRepo.save).toHaveBeenCalledTimes(1);
    });
  });
});

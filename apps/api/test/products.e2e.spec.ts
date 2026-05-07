import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Products (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/products → 200', () => {
    return request(app.getHttpServer())
      .get('/api/v1/products')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('meta');
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });

  it('GET /api/v1/products/:id (not found) → 404', () => {
    return request(app.getHttpServer())
      .get('/api/v1/products/00000000-0000-0000-0000-000000000000')
      .expect(404);
  });

  it('POST /api/v1/products (unauthenticated) → 401', () => {
    return request(app.getHttpServer())
      .post('/api/v1/products')
      .send({ name: 'Test Product', sku: 'TEST-001', slug: 'test-product', description: 'Test', price: 1999 })
      .expect(401);
  });
});

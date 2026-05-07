import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth (e2e)', () => {
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

  const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'TestPass123',
    firstName: 'Test',
    lastName: 'User',
  };

  let accessToken: string;

  it('POST /auth/register → 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send(testUser)
      .expect(201);

    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
    accessToken = res.body.data.accessToken;
  });

  it('POST /auth/login → 200', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    expect(res.body.data).toHaveProperty('accessToken');
  });

  it('POST /auth/login (wrong password) → 401', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: 'wrong' })
      .expect(401);
  });

  it('GET /auth/me (authenticated) → 200', () => {
    return request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('GET /auth/me (unauthenticated) → 401', () => {
    return request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .expect(401);
  });
});

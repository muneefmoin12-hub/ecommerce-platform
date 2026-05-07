import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function databaseConfig(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: config.get<string>('DATABASE_URL'),
    host: config.get<string>('DATABASE_HOST', 'localhost'),
    port: config.get<number>('DATABASE_PORT', 5432),
    database: config.get<string>('DATABASE_NAME', 'ecommerce'),
    username: config.get<string>('DATABASE_USER', 'postgres'),
    password: config.get<string>('DATABASE_PASSWORD'),
    ssl: config.get<boolean>('DATABASE_SSL', false) ? { rejectUnauthorized: false } : false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
    synchronize: config.get('NODE_ENV') === 'development',
    logging: config.get('NODE_ENV') === 'development' ? ['query', 'error'] : ['error'],
    retryAttempts: 3,
    retryDelay: 3000,
    autoLoadEntities: true,
  };
}

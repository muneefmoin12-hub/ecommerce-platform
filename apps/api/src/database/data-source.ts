import { DataSource } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require('dotenv') as { config: (opts: object) => void };
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env.local') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  synchronize: false,
  logging: true,
});

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';
import { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } from './env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres', // nom du service docker
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true, // pour dev
  logging: false,
  entities: [User],
});

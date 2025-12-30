import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './data-source.js';

const app = express();
const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    app.get('/', (req, res) => {
      res.send('Hello world with TypeORM');
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('DB connection error:', err));

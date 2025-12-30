import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/data-source';
import { userRouter } from './modules/user/user.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { PORT } from './config/env';

const app = express();

app.use(express.json());

// Routes
app.use('/users', userRouter);

// Middleware global d’erreur
app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error', err);
  });

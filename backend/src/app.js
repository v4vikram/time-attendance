import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middleware.js';
import routes from './routes/index.js';

const app = express();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Version 1 Routes
app.use('/api/v1', routes);

// Global Error Handler
app.use(errorHandler);

export default app;

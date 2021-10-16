import loggers from './src/lib/logger';
import classRouter from './src/controller/routers/createClass';
import bookedClassRouter from './src/controller/routers/bookedClass';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/classes', classRouter);

app.use('/bookings', bookedClassRouter);

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.statusCode || 404).send({ message: error.type });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  loggers.info(`Glofox application is serving on port ${port}.`);
});

export default app;

const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//express.json middleware
app.use(express.json());
// serving static files
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);

module.exports = app;

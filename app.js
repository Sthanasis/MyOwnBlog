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
//define my own middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); //convert date to readable string
  next();
});

app.use('/api/v1/users', userRouter);

module.exports = app;

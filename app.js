const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const articleRouter = require('./routes/articleRoutes');
const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//express.json middleware
app.use(express.json());
// serving static files
app.use(express.static(`${__dirname}/public`));
app.get('/home.html', (req, res) => {
  res.render('home');
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/articles', articleRouter);

module.exports = app;

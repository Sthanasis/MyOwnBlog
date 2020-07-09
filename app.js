const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const articleRouter = require('./routes/articleRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serving static files from public folder
app.use(express.static(path.join(__dirname, 'public')));
// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//express.json middleware
app.use(express.json());
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/articles', articleRouter);

module.exports = app;

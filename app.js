const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.redirect('/home.html');
});

app.get('/home.html', (req, res) => {
  res.render('/home.html');
});

module.exports = app;

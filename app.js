const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.redirect('/home.html');
});

app.get('/home.html', (req, res) => {
  res.render('/home.html');
});

app.listen(PORT, () => {
  console.log('App is running on port 3000');
});

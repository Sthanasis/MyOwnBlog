const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.send('Hello from the home page');
});

app.listen(PORT, () => {
  console.log('App is running on port 3000');
});

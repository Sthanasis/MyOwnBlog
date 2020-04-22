//config dotenv before declaring the app
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

const DB =
  'mongodb+srv://Sakis:10921092@cluster0-efnnj.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

dotenv.config({
  path: './config.env',
});

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Application is running on localhost:${port}`);
});

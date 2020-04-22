//config dotenv before declaring the app
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
  path: './config.env',
});

const DB = `mongodb+srv://sakis:${process.env.DB_PASSWORD}@cluster0-fzepy.mongodb.net/test?retryWrites=true&w=majority`;
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

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Application is running on localhost:${port}`);
});

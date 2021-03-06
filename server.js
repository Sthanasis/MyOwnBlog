//config dotenv before declaring the app
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});
const app = require('./app');

const DB = `mongodb+srv://sakis:${proccess.env.DB_PASSWORD}@cluster0-nyjez.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: 'test',
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Application is running on localhost:${port}`);
});

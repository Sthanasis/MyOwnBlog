//config dotenv before declaring the app
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './.config.env',
});
const app = require('./app');

const DB = `mongodb://sakis:${process.env.DB_PASSWORD}@cluster0-shard-00-00-nyjez.gcp.mongodb.net:27017,cluster0-shard-00-01-nyjez.gcp.mongodb.net:27017,cluster0-shard-00-02-nyjez.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

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

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Application is running on localhost:${port}`);
});

const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💣');
  console.log(err.name, ',', err.message);
  process.exit(1); //1 is for uncalled exception
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE;
// console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB Connection Successfull!');
  });

// console.log(process.env);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port} ...`);
  // console.log(process.env);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💣');
  console.log(err.name, ',', err.message);
  server.close(() => {
    process.exit(1); //1 is for uncalled exception
  });
});

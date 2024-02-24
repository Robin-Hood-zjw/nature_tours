/* eslint-disable import/newline-after-import */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './conflg.env' });
const app = require('./app');

const path = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(path, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connections successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`App running port ${port}...\n`),
);

process.on('unhandledRejection', (err) => {
  console.log('\nUNHANDLED REJECTION! SHUTTING DOWN...');
  console.log(err.name, err.message);

  process.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.log('\nUNCAUGHT EXCEPTION! Shutting down...');
  console.log(err);

  server.close(() => process.exit(1));
});

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
  .then(() => {
    console.log('DB connections successful!');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running port ${port}...\n`));

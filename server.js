/* eslint-disable import/newline-after-import */
const dotenv = require('dotenv');
dotenv.config({ path: './conflg.env' });

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running port ${port}...`));

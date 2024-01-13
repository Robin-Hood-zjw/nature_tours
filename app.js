const morgan = require('morgan');
const express = require('express');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  console.log(req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find${req.originalUrl} on this server!`,
  // });

  const err = new Error(`Can't find${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
});

app.use((err, req, res, next) => {
  console.log(err.stack);

  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({ status: err.status, message: err.message });
});

module.exports = app;

const AppError = require('../utils/appError');

const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.message.path}: ${err.message.value}`, 400);

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    stack: err.stack,
    status: err.status,
    message: err.message,
  });
};

const sendErrorProd = (err, res) => {
  console.log(err);

  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({ status: 'error', message: err });
    // res.status(500).json({ status: 'error', message: 'Somthing went wrong.' });
  }
};

// module.exports = (err, req, res, next) => {
//   err.status = err.status || 'error';
//   err.statusCode = err.statusCode || 500;

//   if (process.env.NODE_ENV === 'development') {
//     sendErrorDev(err, res);
//   } else if (process.env.NODE_ENV === 'production') {
//     let error = { ...err };

//     console.log('\nI am in a production mode\n\n', err, '\n\n');

//     if (err.message.name === 'CastError') error = handleCastErrorDB(error);
//     if (err.code === 11000) error = handleDuplicateFieldsDB(error);

//     sendErrorProd(err, res);
//   }
// };

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    // console.log(err);

    if (error.message.split(' ')[0] === 'CastError')
      error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    sendErrorProd(error, res);
  }
};

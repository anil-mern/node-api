let error = (err) => {
  return {
    statusCode: err.statusCode || err.status || 410,
    message: err.message || JSON.stringify(err),
  };
};

module.exports.errorHandler = error;

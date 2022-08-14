module.exports = (server) => {
  server.use((err, req, res, next) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(err.statusCode).json(err.message);
  });
};

function errorMiddleware(error, req, res, next) {
  console.error("ERRO CAPTURADO:", error);

  const status = error.statusCode || 500;
  const message = error.message || 'Ocorreu um erro interno no servidor.';

  res.status(status).json({
    status: 'error',
    statusCode: status,
    message: message,
  });
}

module.exports = errorMiddleware;
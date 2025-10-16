// src/middleware/admin.middleware.js

function adminMiddleware(req, res, next) {
  // Este middleware DEVE ser executado DEPOIS do authMiddleware,
  // pois ele depende do req.user que o authMiddleware cria.
  
  const { role } = req.user;

  if (role !== 'ADMIN') {
    // Se o usuário não for um administrador, bloqueia o acesso.
    return res.status(403).json({ message: 'Acesso negado. Rota exclusiva para administradores.' });
  }

  // Se o usuário for um administrador, permite que a requisição continue.
  return next();
}

module.exports = adminMiddleware;
// src/middleware/admin.middleware.js

function adminMiddleware(req, res, next) {
  // Este middleware DEVE rodar DEPOIS do authMiddleware
  
  // Verifica se req.user foi definido pelo authMiddleware
  if (!req.user || !req.user.role) {
     return res.status(500).json({ message: 'Erro interno: dados do usuário não encontrados na requisição.' });
  }

  const { role } = req.user;

  if (role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acesso negado. Rota exclusiva para administradores.' });
  }

  // Se for ADMIN, continua
  return next();
}

module.exports = adminMiddleware;
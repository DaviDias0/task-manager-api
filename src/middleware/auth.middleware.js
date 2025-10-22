// src/middleware/auth.middleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  // Verifica se o formato é Bearer token
  const parts = authorization.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Formato de token inválido.' });
  }
  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email, role } = decoded; // Extrai id, email e role

    // Adiciona os dados decodificados ao objeto req para uso posterior
    req.user = { id, email, role };

    return next(); // Continua para a próxima função (middleware ou controller)
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

module.exports = authMiddleware;
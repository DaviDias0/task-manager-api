// src/middleware/auth.middleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // --- A CORREÇÃO CRÍTICA ESTÁ AQUI ---
    // Agora extraímos o 'role' do token decodificado
    const { id, email, role } = decoded;

    // E adicionamos o 'role' ao objeto 'req.user'
    req.user = { id, email, role };
    // ------------------------------------

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

module.exports = authMiddleware;
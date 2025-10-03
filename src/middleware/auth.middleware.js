// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  if (token == null) {
    return res.sendStatus(401); // Não autorizado (sem token)
  }

  jwt.verify(token, 'SEU_SEGREDO_JWT', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Proibido (token inválido)
    }
    req.user = user; // Adiciona os dados do usuário (ex: id) na requisição
    next(); // Passa para a próxima função (o controller)
  });
}

module.exports = authenticateToken;
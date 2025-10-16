// src/routes/auth.routes.js

const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

// --- ROTAS PÚBLICAS ---
// Qualquer um pode tentar se registrar ou fazer login
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// --- ROTA PROTEGIDA ---
// Apenas usuários com um token válido podem acessar seu próprio perfil
router.get('/auth/profile', authMiddleware, AuthController.getProfile);

module.exports = router;
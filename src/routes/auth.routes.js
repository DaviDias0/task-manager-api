// src/routes/auth.routes.js

const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware'); // Importa o novo middleware

const router = Router();

// --- ROTAS PÚBLICAS ---
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// --- ROTA DE USUÁRIO LOGADO ---
router.get('/auth/profile', authMiddleware, AuthController.getProfile);

// --- NOVA ROTA DE ADMIN ---
// A requisição passa primeiro pelo authMiddleware, depois pelo adminMiddleware, e só então chega ao controller.
router.get('/admin/users', authMiddleware, adminMiddleware, AuthController.getAllUsers);

module.exports = router;
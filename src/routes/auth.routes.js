// src/routes/auth.routes.js

const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = Router();

// --- ROTAS PÚBLICAS ---
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// --- ROTA DE USUÁRIO LOGADO ---
router.get('/auth/profile', authMiddleware, AuthController.getProfile);

// --- ROTAS DE ADMIN ---
router.get('/admin/users', authMiddleware, adminMiddleware, AuthController.getAllUsers);
router.delete('/admin/users/:id', authMiddleware, adminMiddleware, AuthController.deleteUser);
router.put('/admin/users/:id/role', authMiddleware, adminMiddleware, AuthController.updateUserRole);


module.exports = router;
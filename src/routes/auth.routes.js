// src/routes/auth.routes.js (VERSÃO CORRETA)

const { Router } = require('express');
const multer = require('multer'); // Importa multer
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const uploadConfig = require('../config/upload'); // Importa a config

const router = Router();
const upload = multer(uploadConfig); // Cria a instância do Multer

// --- ROTAS PÚBLICAS (Sem prefixo /auth/) ---
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// --- ROTAS DE USUÁRIO LOGADO (Sem prefixo /auth/) ---
router.get('/profile', authMiddleware, AuthController.getProfile);

// ROTA DE UPLOAD DE FOTO (Sem prefixo /auth/)
router.patch(
  '/profile/picture',          // Caminho relativo
  authMiddleware,              // Verifica login
  upload.single('avatar'),     // Processa upload
  AuthController.updateProfilePicture // Chama controller
);

// --- ROTAS DE ADMIN (Sem prefixo /admin/ - assumindo que será adicionado no index.js) ---
// Se você NÃO usa app.use('/admin', ...) no index.js, volte os prefixos aqui
router.get('/users', authMiddleware, adminMiddleware, AuthController.getAllUsers); // Ex: /users
router.delete('/users/:id', authMiddleware, adminMiddleware, AuthController.deleteUser); // Ex: /users/:id
router.put('/users/:id/role', authMiddleware, adminMiddleware, AuthController.updateUserRole); // Ex: /users/:id/role

module.exports = router;
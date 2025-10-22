// src/routes/auth.routes.js

const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/profile', authMiddleware, AuthController.getProfile);
router.get('/admin/users', authMiddleware, adminMiddleware, AuthController.getAllUsers);
router.delete('/admin/users/:id', authMiddleware, adminMiddleware, AuthController.deleteUser);

module.exports = router;
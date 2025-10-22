// src/routes/task.routes.js

const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

// Aplica autenticação a todas as rotas abaixo
router.use('/tasks', authMiddleware);

router.post('/tasks', TaskController.create);
router.get('/tasks', TaskController.findByUser);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

module.exports = router;
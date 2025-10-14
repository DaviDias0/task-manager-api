// src/routes/task.routes.js

const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
// A CORREÇÃO ESTÁ AQUI: o nome da pasta agora está no singular
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

// Aplica o middleware de autenticação a todas as rotas de tarefas
router.use('/tasks', authMiddleware);

router.post('/tasks', TaskController.create);
router.get('/tasks', TaskController.findByUser);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

module.exports = router;
// src/routes/task.routes.js

const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

// --- ROTAS DE TAREFAS (Todas requerem login) ---
// O middleware é aplicado a todas as rotas definidas ABAIXO neste router
router.use('/tasks', authMiddleware);

router.post('/tasks', TaskController.create);
router.get('/tasks', TaskController.findByUser);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

module.exports = router;
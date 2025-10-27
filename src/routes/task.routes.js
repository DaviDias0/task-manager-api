// src/routes/task.routes.js (CORRIGIDO: ROTAS RELATIVAS)

const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

// Aplica o middleware de autenticação a TODAS as rotas neste router
// Sem prefixo aqui, pois ele será adicionado no index.js
router.use(authMiddleware);

// --- ROTAS DE TAREFAS (Rotas relativas, ex: GET /) ---
// Rota final será GET /tasks
router.get('/', TaskController.findByUser);

// Rota final será POST /tasks
router.post('/', TaskController.create);

// Rota final será PUT /tasks/:id
router.put('/:id', TaskController.update);

// Rota final será DELETE /tasks/:id
router.delete('/:id', TaskController.delete);

module.exports = router;
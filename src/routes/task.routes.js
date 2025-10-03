const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const authenticateToken = require('../middleware/auth.middleware'); // <-- Importa o guarda

// Aplica o guarda a TODAS as rotas deste arquivo
router.use(authenticateToken);

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
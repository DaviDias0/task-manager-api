const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Rota para buscar todas as tarefas
router.get('/', taskController.getAllTasks);

// Rota para criar uma nova tarefa
router.post('/', taskController.createTask);

module.exports = router;
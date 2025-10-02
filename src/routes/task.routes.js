const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Rota para buscar todas as tarefas (GET /tasks)
router.get('/', taskController.getAllTasks);

// Rota para criar uma nova tarefa (POST /tasks)
router.post('/', taskController.createTask);

// Rota para atualizar uma tarefa (PATCH /tasks/:id)
router.patch('/:id', taskController.updateTask);

// Rota para deletar uma tarefa (DELETE /tasks/:id)
router.delete('/:id', taskController.deleteTask);

module.exports = router;
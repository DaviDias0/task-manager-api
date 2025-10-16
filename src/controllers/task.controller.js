// src/controllers/task.controller.js

const TaskService = require('../services/task.service');

class TaskController {
  async create(req, res) {
    try {
      const task = await TaskService.create(req.user.id, req.body);
      res.status(201).json(task);
    } catch (error) {
      console.error("ERRO AO CRIAR TAREFA:", error);
      res.status(500).json({ message: 'Erro ao criar tarefa.' });
    }
  }

  // FUNÇÃO ATUALIZADA AQUI
  async findByUser(req, res) {
    try {
      // Extrai os parâmetros de ordenação da query string da URL (ex: /tasks?sortBy=dueDate)
      const { sortBy, order } = req.query;
      const tasks = await TaskService.findByUser(req.user.id, sortBy, order);
      res.status(200).json(tasks);
    } catch (error) {
      console.error("ERRO AO BUSCAR TAREFAS:", error);
      res.status(500).json({ message: 'Erro ao buscar tarefas.' });
    }
  }

  async update(req, res) {
    try {
      const task = await TaskService.update(req.params.id, req.body);
      res.status(200).json(task);
    } catch (error) {
      console.error("ERRO AO ATUALIZAR TAREFA:", error);
      res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
    }
  }

  async delete(req, res) {
    try {
      await TaskService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("ERRO AO DELETAR TAREFA:", error);
      res.status(500).json({ message: 'Erro ao deletar tarefa.' });
    }
  }
}

module.exports = new TaskController();
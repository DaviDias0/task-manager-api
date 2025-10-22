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

  async findByUser(req, res) {
    try {
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
      // Garante que o usuário só possa editar suas próprias tarefas (verificação extra)
      const taskToUpdate = await prisma.task.findUnique({ where: { id: Number(req.params.id) } });
      if (!taskToUpdate) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }
      if (taskToUpdate.userId !== req.user.id) {
         return res.status(403).json({ message: 'Você não tem permissão para editar esta tarefa.' });
      }

      const task = await TaskService.update(req.params.id, req.body);
      res.status(200).json(task);
    } catch (error) {
      console.error("ERRO AO ATUALIZAR TAREFA:", error);
      res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
    }
  }

  async delete(req, res) {
    try {
      // Garante que o usuário só possa deletar suas próprias tarefas
      const taskToDelete = await prisma.task.findUnique({ where: { id: Number(req.params.id) } });
       if (!taskToDelete) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }
      if (taskToDelete.userId !== req.user.id) {
         return res.status(403).json({ message: 'Você não tem permissão para deletar esta tarefa.' });
      }

      await TaskService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("ERRO AO DELETAR TAREFA:", error);
      res.status(500).json({ message: 'Erro ao deletar tarefa.' });
    }
  }
}

// IMPORTANTE: Precisamos importar o prisma aqui para as verificações de segurança
const prisma = require('../lib/prisma'); 

module.exports = new TaskController();
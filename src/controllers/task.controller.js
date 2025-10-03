const taskService = require('../services/task.service.js');

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.findAllTasks(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const newTask = await taskService.createTask(req.body, userId);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.updateTask(id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
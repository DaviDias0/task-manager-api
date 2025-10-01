const taskService = require('../services/task.service.js');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.findAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask); // 201 = Created
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
};
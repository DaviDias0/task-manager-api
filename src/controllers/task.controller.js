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

// --- FUNÇÃO MODIFICADA ---
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Pega o ID do usuário logado do token
    const updatedTask = await taskService.updateTask(id, userId, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    // Retorna um erro específico se a tarefa não for encontrada ou não pertencer ao usuário
    if (error.message.includes('não encontrada')) {
      return res.status(404).json({ message: error.message });
    }
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Pega o ID do usuário logado
    await taskService.deleteTask(id, userId);
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
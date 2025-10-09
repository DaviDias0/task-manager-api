const taskRepository = require('../repositories/task.repository.js');
const prisma = require('../database/prismaClient'); // Importante para buscar a tarefa atualizada

const findAllTasks = async (userId) => {
  return await taskRepository.findAllTasksByAuthor(userId);
};

const createTask = async (taskData, userId) => {
  if (!taskData.title) {
    const error = new Error("Título é obrigatório.");
    error.statusCode = 400;
    throw error;
  }
  return await taskRepository.createTask(taskData, userId);
};

// --- FUNÇÃO CORRIGIDA ---
const updateTask = async (taskId, userId, taskData) => {
  // Lógica de negócio: Se um status foi enviado, converte para o formato do Enum
  if (taskData.status) {
    // Converte "in-progress" para "IN_PROGRESS" e "done" para "DONE"
    taskData.status = taskData.status.toUpperCase().replace('-', '_');
  }

  const result = await taskRepository.updateTask(taskId, userId, taskData);

  if (result.count === 0) {
    const error = new Error('Tarefa não encontrada ou não pertence ao usuário.');
    error.statusCode = 404;
    throw error;
  }

  // Boa prática: Após atualizar, busca e retorna o registro completo para o frontend
  const updatedTask = await prisma.task.findUnique({ where: { id: Number(taskId) } });
  return updatedTask;
};

const deleteTask = async (taskId, userId) => {
  const result = await taskRepository.deleteTask(taskId, userId);
  if (result.count === 0) {
    const error = new Error('Tarefa não encontrada ou não pertence ao usuário.');
    error.statusCode = 404;
    throw error;
  }
  return result;
};

module.exports = {
  findAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
const prisma = require('../database/prismaClient');

const findAllTasks = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: { authorId: userId },
  });
  return tasks;
};

const createTask = async (taskData, userId) => {
  const { title, description } = taskData;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      authorId: userId,
    },
  });
  return task;
};

// --- FUNÇÃO MODIFICADA ---
const updateTask = async (taskId, userId, taskData) => {
  // Primeiro, verifica se a tarefa que está sendo atualizada realmente pertence ao usuário logado
  const task = await prisma.task.findFirst({
    where: {
      id: Number(taskId),
      authorId: userId,
    },
  });

  // Se não encontrar a tarefa (ou ela não for do usuário), lança um erro
  if (!task) {
    throw new Error('Tarefa não encontrada ou não pertence ao usuário.');
  }

  // Se a tarefa for encontrada, prossegue com a atualização
  const updatedTask = await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: taskData, // taskData pode ser { title, description, status }
  });
  return updatedTask;
};

const deleteTask = async (taskId, userId) => {
  // A mesma lógica de segurança se aplica aqui
  await prisma.task.deleteMany({
    where: {
      id: Number(taskId),
      authorId: userId, // Garante que só o dono pode deletar
    },
  });
};

module.exports = {
  findAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
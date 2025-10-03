const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Instância do Prisma criada

const findAllTasks = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: { authorId: userId },
  });
  return tasks;
};
const createTask = async (taskData, userId) => { // <--- Adicione userId
  const { title, description } = taskData;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      authorId: userId, // <--- Associe o ID do autor
    },
  });
  return task;
};

const updateTask = async (id, taskData) => {
  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: taskData,
  });
  return task;
};

const deleteTask = async (id) => {
  await prisma.task.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  findAllTasks,
  createTask,
  updateTask,
  createTask,
  deleteTask,
};
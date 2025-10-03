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
  deleteTask,
};
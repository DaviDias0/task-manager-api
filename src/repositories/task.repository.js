const prisma = require('../database/prismaClient');

const findAllTasksByAuthor = async (userId) => {
  return await prisma.task.findMany({
    where: { 
      authorId: userId,
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
};

const createTask = async (data, userId) => {
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      authorId: userId,
    },
  });
};

const updateTask = async (taskId, userId, data) => {
  return await prisma.task.updateMany({
    where: {
      id: Number(taskId),
      authorId: userId,
    },
    data: data,
  });
};

const deleteTask = async (taskId, userId) => {
  return await prisma.task.updateMany({
    where: {
      id: Number(taskId),
      authorId: userId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

module.exports = { findAllTasksByAuthor, createTask, updateTask, deleteTask };
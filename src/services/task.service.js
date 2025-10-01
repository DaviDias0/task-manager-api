const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findAllTasks = async () => {
    const tasks = await prisma.task.findMany();
    return tasks;
};

const createTask = async (taskData) => {
  const { title, description } = taskData;
  const task = await prisma.task.create({
    data: {
      title,
      description,
    },
  });
  return task;
};

module.exports = {
  findAllTasks,
  createTask,
};
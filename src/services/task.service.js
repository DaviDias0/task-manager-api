const { PrismaClient } = require('@prisma/client');


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
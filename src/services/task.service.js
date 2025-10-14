// src/services/task.service.js

const TaskRepository = require('../repositories/task.repository');
const prisma = require('../lib/prisma');

class TaskService {
  async create(userId, taskData) {
    const { title, description, priority, dueDate } = taskData;
    return prisma.task.create({
      data: {
        title,
        description,
        userId,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
  }

  async findByUser(userId) {
    return TaskRepository.findAllTasksByUser(userId);
  }

  async update(id, taskData) {
    const { title, description, status, priority, dueDate } = taskData;
    return prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
  }

  async delete(id) {
    return prisma.task.update({
      where: { id: Number(id) },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

module.exports = new TaskService();
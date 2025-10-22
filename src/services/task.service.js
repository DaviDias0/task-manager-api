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

  async findByUser(userId, sortBy, order) {
    return TaskRepository.findAllTasksByUser(userId, sortBy, order);
  }

  async update(id, taskData) {
    const taskId = Number(id);
    if (isNaN(taskId)) { throw new Error('ID da tarefa inválido.'); }
    // Remove 'id' e 'userId' do objeto de dados para evitar atualização indevida
    const { id: taskIdFromData, userId, ...dataToUpdate } = taskData;
    return prisma.task.update({
      where: { id: taskId },
      data: {
        ...dataToUpdate,
        // Garante que a data seja salva corretamente
        dueDate: dataToUpdate.dueDate ? new Date(dataToUpdate.dueDate) : null,
      },
    });
  }

  async delete(id) {
    const taskId = Number(id);
    if (isNaN(taskId)) { throw new Error('ID da tarefa inválido.'); }
    // Implementação de Soft Delete
    return prisma.task.update({
      where: { id: taskId },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

module.exports = new TaskService();
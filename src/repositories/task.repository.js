// src/repositories/task.repository.js

const prisma = require('../lib/prisma');

/**
 * Busca todas as tarefas de um usuário que não foram deletadas.
 * @param {number} userId - O ID do usuário logado.
 * @returns {Promise<Task[]>} Uma lista de tarefas.
 */
const findAllTasksByUser = async (userId) => {
  return prisma.task.findMany({
    where: {
      userId: userId, // Corrigido para usar 'userId'
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

module.exports = {
  findAllTasksByUser,
};
// src/repositories/task.repository.js

const prisma = require('../lib/prisma');

/**
 * Busca todas as tarefas de um usuário, com ordenação dinâmica.
 * @param {number} userId - O ID do usuário logado.
 * @param {string} sortBy - O campo pelo qual ordenar (ex: 'createdAt', 'dueDate').
 * @param {string} order - A direção da ordenação ('asc' ou 'desc').
 * @returns {Promise<Task[]>} Uma lista de tarefas.
 */
const findAllTasksByUser = async (userId, sortBy = 'createdAt', order = 'desc') => {
  // Constrói o objeto de ordenação dinamicamente para o Prisma
  const orderBy = {
    [sortBy]: order,
  };

  return prisma.task.findMany({
    where: {
      userId: userId,
      deletedAt: null,
    },
    orderBy: orderBy, // Aplica a ordenação dinâmica aqui
  });
};

module.exports = {
  findAllTasksByUser,
};
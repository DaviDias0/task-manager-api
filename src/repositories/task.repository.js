// src/repositories/task.repository.js

const prisma = require('../lib/prisma');

/**
 * Busca todas as tarefas de um usuário, com ordenação dinâmica.
 * @param {number} userId - O ID do usuário logado.
 * @param {string} sortBy - O campo pelo qual ordenar ('createdAt', 'dueDate', 'priority').
 * @param {string} order - A direção da ordenação ('asc' ou 'desc').
 * @returns {Promise<Task[]>} Uma lista de tarefas.
 */
const findAllTasksByUser = async (userId, sortBy = 'createdAt', order = 'desc') => {
  // Validação básica dos parâmetros de ordenação para segurança
  const validSortBy = ['createdAt', 'dueDate', 'priority', 'title', 'status'].includes(sortBy) ? sortBy : 'createdAt';
  const validOrder = ['asc', 'desc'].includes(order) ? order : 'desc';

  const orderBy = {
    [validSortBy]: validOrder,
  };

  // Tratamento especial para ordenar por dueDate (nulos por último)
  if (validSortBy === 'dueDate') {
    orderBy[validSortBy] = { sort: validOrder, nulls: 'last' };
  }


  return prisma.task.findMany({
    where: {
      userId: userId,
      deletedAt: null,
    },
    orderBy: orderBy,
  });
};

module.exports = {
  findAllTasksByUser,
};
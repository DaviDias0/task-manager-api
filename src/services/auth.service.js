const prisma = require('../database/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (email, password, name) => {
  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('E-mail já cadastrado.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  delete user.password;
  return user;
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Usuário não encontrado.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Senha inválida.');
  }

  // IMPORTANTE: Em um projeto real, 'SEU_SEGREDO_JWT' deve vir de uma variável de ambiente.
  const token = jwt.sign({ id: user.id, email: user.email }, 'SEU_SEGREDO_JWT', { expiresIn: '1d' });

  delete user.password;
  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
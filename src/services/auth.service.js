const prisma = require('../database/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (email, password, name) => {
  // Limpa os dados de entrada
  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
  if (existingUser) {
    const error = new Error('E-mail já cadastrado.');
    error.statusCode = 400;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(cleanPassword, 10);
  const user = await prisma.user.create({
    data: { email: cleanEmail, password: hashedPassword, name },
  });
  delete user.password;
  return user;
};

const loginUser = async (email, password) => {
  // Limpa os dados de entrada
  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  const user = await prisma.user.findUnique({ where: { email: cleanEmail } });
  if (!user) {
    const error = new Error('Credenciais inválidas.');
    error.statusCode = 401;
    throw error;
  }
  
  // Compara a senha limpa com a senha no banco
  const isPasswordValid = await bcrypt.compare(cleanPassword, user.password);
  if (!isPasswordValid) {
    const error = new Error('Credenciais inválidas.');
    error.statusCode = 401;
    throw error;
  }
  
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  delete user.password;
  return { user, token };
};

module.exports = { registerUser, loginUser };
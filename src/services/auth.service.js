// src/services/auth.service.js

const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  async register(userData) {
    const { name, email, password } = userData;

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async login(credentials) {
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas.');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token expira em 1 dia
    });

    return { token };
  }

  // --- NOVA FUNÇÃO ADICIONADA ---
  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Remove a senha do objeto antes de retorná-lo
    delete user.password;
    return user;
  }
}

module.exports = new AuthService();
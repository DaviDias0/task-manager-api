// src/services/auth.service.js

const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  async register(userData) {
    const { name, email, password } = userData;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Este e-mail já está em uso.');
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }, // role será USER por padrão
    });
    return user;
  }

  async login(credentials) {
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) { throw new Error('Credenciais inválidas.'); }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) { throw new Error('Credenciais inválidas.'); }
    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token };
  }

  async getProfile(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) { throw new Error('Usuário não encontrado.'); }
    delete user.password;
    return user;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return usersWithoutPasswords;
  }

  async deleteUser(userIdToDelete) {
    const id = Number(userIdToDelete);
    if (isNaN(id)) { throw new Error('ID de usuário inválido.'); }
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) { throw new Error('Usuário não encontrado.'); }
    try {
      // Tenta deletar o usuário
      await prisma.user.delete({ where: { id: id } });
      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      // Verifica se o erro é por causa de tarefas associadas
      if (error.code === 'P2003' || (error.meta && error.meta.field_name?.includes('Task_userId_fkey'))) {
         throw new Error('Não é possível deletar o usuário pois ele possui tarefas associadas.');
      }
      throw error; // Re-lança outros erros
    }
  }
}

module.exports = new AuthService();
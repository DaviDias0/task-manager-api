// src/services/auth.service.js

const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Role } = require('@prisma/client');


class AuthService {
  async register(userData) {
    const { name, email, password } = userData;
    console.log(`AuthService: register - Verificando se email ${email} já existe.`); // Log S_R1
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log(`AuthService: register - Email ${email} já existe.`); // Log S_R_ERR1
      throw new Error('Este e-mail já está em uso.');
    }
    console.log(`AuthService: register - Email ${email} disponível. Gerando hash da senha.`); // Log S_R2
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(`AuthService: register - Hash gerado. Criando usuário no banco.`); // Log S_R3
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    console.log(`AuthService: register - Usuário ${user.id} criado. Removendo senha do retorno.`); // Log S_R4
    // REMOVE A SENHA ANTES DE RETORNAR
    delete user.password;
    return user;
  }

  async login(credentials) {
    const { email, password } = credentials;
    console.log(`AuthService: Buscando usuário com email: ${email}`); // Log A
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('AuthService: Usuário não encontrado.'); // Log B (Erro)
      throw new Error('Credenciais inválidas.');
    }
    console.log(`AuthService: Usuário ${user.id} encontrado. Comparando senha...`); // Log C
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`AuthService: Senha inválida para usuário ${user.id}.`); // Log D (Erro)
      throw new Error('Credenciais inválidas.');
    }
    console.log(`AuthService: Senha válida para usuário ${user.id}. Gerando token...`); // Log E
    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('AuthService: ERRO FATAL - JWT_SECRET não definido no .env!'); // Log F (Erro Fatal)
      throw new Error('Erro interno do servidor na configuração de autenticação.');
    }
    console.log(`AuthService: Assinando token para usuário ${user.id} com role ${user.role}`); // Log G
    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1d' });
    console.log('AuthService: Token gerado com sucesso.'); // Log H
    return { token };
  }

  async getProfile(userId) {
    console.log(`Service: getProfile - Buscando usuário com ID: ${userId}`); // Log SP1
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      console.log(`Service: getProfile - Prisma retornou:`, user ? `Usuário ID ${user.id}` : 'null'); // Log SP2
      if (!user) {
        console.log(`Service: getProfile - Usuário ID ${userId} não encontrado.`); // Log SP E1 (Erro)
        throw new Error('Usuário não encontrado.');
      }
      delete user.password;
      console.log(`Service: getProfile - Retornando perfil para usuário ID ${userId}.`); // Log SP3
      return user;
    } catch (error) {
       console.error(`Service: getProfile - Erro do Prisma ou outro erro:`, error); // Log SP E2 (Erro)
       throw error;
    }
  }

  async getAllUsers() {
    console.log('Service: getAllUsers - Buscando todos os usuários.'); // Log SU1
    try {
      const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
      console.log(`Service: getAllUsers - Prisma retornou ${users.length} usuários.`); // Log SU2
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      console.log('Service: getAllUsers - Retornando lista sem senhas.'); // Log SU3
      return usersWithoutPasswords;
    } catch (error) {
       console.error(`Service: getAllUsers - Erro do Prisma ou outro erro:`, error); // Log SU E1 (Erro)
       throw error;
    }
  }

  // --- FUNÇÃO deleteUser COM PROTEÇÃO ---
  async deleteUser(userIdToDelete) {
    console.log(`Service: deleteUser - Iniciando para ID: ${userIdToDelete}`);
    const id = Number(userIdToDelete);
    if (isNaN(id)) { console.error(`Service: deleteUser - ID inválido: ${userIdToDelete}`); throw new Error('ID de usuário inválido.'); }

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) { console.log(`Service: deleteUser - Usuário ID ${id} não encontrado.`); throw new Error('Usuário não encontrado.'); }

    // *** PROTEÇÃO ADICIONADA AQUI ***
    if (user.role === 'ADMIN') {
      console.warn(`Service: deleteUser - Tentativa de deletar ADMIN ID ${id} bloqueada.`);
      throw new Error('Não é possível deletar um administrador.');
    }
    // *******************************

    try {
      console.log(`Service: deleteUser - Tentando deletar usuário (não-admin) ID ${id}`);
      await prisma.user.delete({ where: { id: id } });
      console.log(`Service: deleteUser - Usuário ID ${id} deletado com sucesso.`);
      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      console.error(`Service: deleteUser - Erro ao deletar usuário ID ${id}:`, error);
      if (error.code === 'P2003' || (error.meta && error.meta.field_name?.includes('Task_userId_fkey'))) {
         throw new Error('Não é possível deletar o usuário pois ele possui tarefas associadas.');
      }
      throw error;
    }
  }
  // ------------------------------------

  async updateUserRole(userIdToUpdate, newRole) {
    console.log(`Service: updateUserRole - Iniciando para ID: ${userIdToUpdate}, Novo Role: ${newRole}`);
    const id = Number(userIdToUpdate);
    if (isNaN(id)) { console.error(`Service: updateUserRole - ID inválido: ${userIdToUpdate}`); throw new Error('ID de usuário inválido.'); }
    if (!Object.values(Role).includes(newRole)) { console.error(`Service: updateUserRole - Role inválido: ${newRole}`); throw new Error('Cargo inválido especificado.'); }
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) { console.log(`Service: updateUserRole - Usuário ID ${id} não encontrado.`); throw new Error('Usuário não encontrado.'); }
    try {
      console.log(`Service: updateUserRole - Atualizando role do usuário ID ${id} para ${newRole}`);
      const updatedUser = await prisma.user.update({ where: { id: id }, data: { role: newRole } });
      delete updatedUser.password;
      console.log(`Service: updateUserRole - Role atualizado com sucesso para ID ${id}`);
      return updatedUser;
    } catch(error) {
      console.error(`Service: updateUserRole - Erro ao atualizar role para ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = new AuthService();
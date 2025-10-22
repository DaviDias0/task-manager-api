// src/controllers/auth.controller.js

const AuthService = require('../services/auth.service');

class AuthController {
  async register(req, res) {
    console.log('AuthController: Função register INICIADA.'); // Log R1
    try {
      console.log('AuthController: Chamando AuthService.register com email:', req.body.email); // Log R2
      const user = await AuthService.register(req.body);
      console.log('AuthController: register - Usuário criado, enviando resposta.'); // Log R3
      res.status(201).json(user);
    } catch (error) {
       console.error('AuthController: register - Erro capturado:', error); // Log R_ERR
      res.status(400).json({ message: error.message || 'Erro ao registrar usuário.' });
    }
  }

  async login(req, res) {
    console.log('AuthController: Recebida requisição POST /auth/login');
    try {
      console.log('AuthController: Chamando AuthService.login com:', req.body.email);
      const { token } = await AuthService.login(req.body);
      console.log('AuthController: AuthService.login retornou com sucesso.');
      res.status(200).json({ token });
      console.log('AuthController: Resposta 200 enviada.');
    } catch (error) {
      console.error('AuthController: Erro capturado no login!', error);
      const statusCode = error.message === 'Credenciais inválidas.' ? 401 : 500;
      res.status(statusCode).json({ message: error.message || 'Erro interno no login.' });
    }
  }

  async getProfile(req, res) {
    console.log('Controller: getProfile - Iniciando.');
    console.log('Controller: getProfile - req.user:', req.user);
    try {
      if (!req.user || typeof req.user.id === 'undefined') {
        console.error('Controller: getProfile - ERRO: req.user.id está indefinido!');
        return res.status(401).json({ message: 'ID do usuário não encontrado na autenticação.' });
      }
      console.log(`Controller: getProfile - Chamando AuthService.getProfile com ID: ${req.user.id}`);
      const userProfile = await AuthService.getProfile(req.user.id);
      console.log('Controller: getProfile - AuthService retornou.');
      res.status(200).json(userProfile);
      console.log('Controller: getProfile - Resposta 200 enviada.');
    } catch (error) {
      console.error('Controller: getProfile - Erro capturado:', error);
      res.status(error.message === 'Usuário não encontrado.' ? 404 : 500).json({ message: error.message || 'Erro interno.' });
    }
  }

  async getAllUsers(req, res) {
    console.log('Controller: getAllUsers - Iniciando.');
    console.log('Controller: getAllUsers - req.user (verificando role):', req.user);
    try {
      console.log('Controller: getAllUsers - Chamando AuthService.getAllUsers.');
      const users = await AuthService.getAllUsers();
      console.log('Controller: getAllUsers - AuthService retornou.');
      res.status(200).json(users);
      console.log('Controller: getAllUsers - Resposta 200 enviada.');
    } catch (error) {
      console.error("ERRO AO BUSCAR USUÁRIOS:", error);
      res.status(500).json({ message: 'Erro interno ao buscar usuários.' });
    }
  }

  // --- FUNÇÃO deleteUser ATUALIZADA COM TRATAMENTO 403 ---
  async deleteUser(req, res) {
    console.log(`Controller: deleteUser - Iniciando para ID: ${req.params.id}`);
    try {
      const userIdToDelete = req.params.id;
      console.log(`Controller: deleteUser - Chamando AuthService.deleteUser com ID: ${userIdToDelete}`);
      await AuthService.deleteUser(userIdToDelete);
      console.log(`Controller: deleteUser - AuthService retornou sucesso para ID: ${userIdToDelete}`);
      res.status(204).send(); // Sucesso
    } catch (error) {
      console.error(`Controller: deleteUser - Erro capturado para ID: ${req.params.id}:`, error);

      // --- TRATAMENTO DE ERRO ESPECÍFICO AQUI ---
      if (error.message === 'Não é possível deletar um administrador.') {
        return res.status(403).json({ message: error.message }); // 403 Forbidden
      }
      // -----------------------------------------

      if (error.message === 'Usuário não encontrado.') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes('tarefas associadas') || error.message.includes('inválido')) {
        return res.status(400).json({ message: error.message });
      }
      // Erro genérico
      res.status(500).json({ message: 'Erro interno ao deletar usuário.' });
    }
  }
  // ----------------------------------------------------

  async updateUserRole(req, res) {
    console.log(`Controller: updateUserRole - Iniciando para ID: ${req.params.id}`);
    try {
      const userIdToUpdate = req.params.id;
      const { role: newRole } = req.body;
      console.log(`Controller: updateUserRole - Chamando AuthService.updateUserRole com ID: ${userIdToUpdate}, Role: ${newRole}`);
      if (!newRole) { return res.status(400).json({ message: 'Novo cargo (role) não especificado.' }); }
      const updatedUser = await AuthService.updateUserRole(userIdToUpdate, newRole);
      console.log(`Controller: updateUserRole - AuthService retornou sucesso para ID: ${userIdToUpdate}`);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(`Controller: updateUserRole - Erro capturado para ID: ${req.params.id}:`, error);
      if (error.message === 'Usuário não encontrado.') { return res.status(404).json({ message: error.message }); }
      if (error.message.includes('inválido')) { return res.status(400).json({ message: error.message }); }
      res.status(500).json({ message: 'Erro interno ao atualizar cargo.' });
    }
  }
}

module.exports = new AuthController();
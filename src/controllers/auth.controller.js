// src/controllers/auth.controller.js (VERSÃO CORRIGIDA)

const AuthService = require('../services/auth.service');
const fs = require('fs').promises; // Import fs.promises para deletar arquivo em caso de erro

class AuthController {
  async register(req, res, next) {
    console.log('AuthController: Função register INICIADA.');
    try {
      console.log('AuthController: Chamando AuthService.register com email:', req.body.email);
      const user = await AuthService.register(req.body);
      console.log('AuthController: register - Usuário criado, enviando resposta.');
      const { password: _, ...userWithoutPassword } = user; // Remove senha
      res.status(201).json(userWithoutPassword);
    } catch (error) {
       console.error('AuthController: register - Erro capturado:', error);
       res.status(400).json({ message: error.message || 'Erro ao registrar usuário.' });
    }
  }

  async login(req, res, next) {
    console.log('AuthController: Recebida requisição POST /auth/login');
    try {
      console.log('AuthController: Chamando AuthService.login com:', req.body.email);
      const { token } = await AuthService.login(req.body);
      console.log('AuthController: AuthService.login retornou com sucesso.');
      res.status(200).json({ token });
      console.log('AuthController: Resposta 200 enviada.');
    } catch (error) {
      console.error('AuthController: Erro capturado no login!', error);
      const statusCode = error.message === 'Credenciais inválidas.' ? 401 : 400;
      res.status(statusCode).json({ message: error.message || 'Erro interno no login.' });
    }
  }

  async getProfile(req, res, next) {
    console.log('Controller: getProfile - Iniciando.');
    try {
      if (!req.user || typeof req.user.id === 'undefined') {
        console.error('Controller: getProfile - ERRO: req.user.id está indefinido!');
        return res.status(401).json({ message: 'Usuário não autenticado corretamente.' });
      }
      console.log(`Controller: getProfile - Chamando AuthService.getProfile com ID: ${req.user.id}`);
      const userProfile = await AuthService.getProfile(req.user.id);
      console.log('Controller: getProfile - AuthService retornou.');
      res.status(200).json(userProfile);
      console.log('Controller: getProfile - Resposta 200 enviada.');
    } catch (error) {
      console.error('Controller: getProfile - Erro capturado:', error);
      const statusCode = error.message === 'Usuário não encontrado.' ? 404 : 500;
      res.status(statusCode).json({ message: error.message || 'Erro interno ao buscar perfil.' });
    }
  }

  // --- MÉTODO updateProfilePicture (ADICIONADO AQUI DENTRO DA CLASSE) ---
  async updateProfilePicture(req, res, next) {
    console.log('Controller: updateProfilePicture - Iniciando.');
    try {
      // Verifica se o upload (multer) e a autenticação (authMiddleware) funcionaram
      if (!req.file) {
        console.error('Controller: updateProfilePicture - ERRO: req.file não encontrado.');
        return res.status(400).json({ message: 'Nenhum arquivo de imagem foi enviado.' });
      }
      if (!req.user || !req.user.id) {
         console.error('Controller: updateProfilePicture - ERRO: req.user.id não encontrado.');
         // Se chegou aqui, multer salvou o arquivo. Precisamos deletá-lo.
         if (req.file && req.file.path) {
            fs.unlink(req.file.path).catch(err => console.error("Erro ao deletar arquivo após falha de autenticação:", err));
         }
         return res.status(401).json({ message: 'Usuário não autenticado.' });
      }

      const userId = req.user.id;
      const filename = req.file.filename; // Nome único salvo pelo multer
      console.log(`Controller: updateProfilePicture - Chamando AuthService com UserID: ${userId}, Filename: ${filename}`);

      // Chama o serviço para atualizar o BD
      const updatedUser = await AuthService.updateProfilePicture(userId, filename);
      console.log('Controller: updateProfilePicture - AuthService retornou usuário atualizado.');

      // Remove a senha antes de enviar a resposta
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.status(200).json(userWithoutPassword);
      console.log('Controller: updateProfilePicture - Resposta 200 enviada.');

    } catch (error) {
      console.error('Controller: updateProfilePicture - Erro capturado:', error);
      // Deleta o arquivo que pode ter sido salvo se o BD falhar
      if (req.file && req.file.path) {
         fs.unlink(req.file.path).catch(err => console.error("Erro ao deletar arquivo após falha no service:", err));
      }
      // Passa o erro para o error handler global (se existir) ou envia 500
      // next(error); // Se tiver um error handler global
      res.status(500).json({ message: error.message || 'Erro interno ao atualizar foto.' });
    }
  }
  // --- FIM DO MÉTODO ADICIONADO ---


  // Métodos de Admin (mantidos como estavam)
  async getAllUsers(req, res, next) {
    console.log('Controller: getAllUsers - Iniciando.');
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

  async deleteUser(req, res, next) {
    console.log(`Controller: deleteUser - Iniciando para ID: ${req.params.id}`);
    try {
      const userIdToDelete = parseInt(req.params.id, 10);
      if (isNaN(userIdToDelete)) {
        return res.status(400).json({ message: 'ID de usuário inválido.' });
      }
      console.log(`Controller: deleteUser - Chamando AuthService.deleteUser com ID: ${userIdToDelete}`);
      await AuthService.deleteUser(userIdToDelete);
      console.log(`Controller: deleteUser - AuthService retornou sucesso para ID: ${userIdToDelete}`);
      res.status(204).send(); // Sucesso sem conteúdo
    } catch (error) {
      console.error(`Controller: deleteUser - Erro capturado para ID: ${req.params.id}:`, error);
      if (error.message === 'Não é possível deletar um administrador.' || error.message.includes('tarefas associadas')) {
        return res.status(403).json({ message: error.message });
      }
      if (error.message === 'Usuário não encontrado.') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Erro interno ao deletar usuário.' });
    }
  }

  async updateUserRole(req, res, next) {
    console.log(`Controller: updateUserRole - Iniciando para ID: ${req.params.id}`);
    try {
      const userIdToUpdate = parseInt(req.params.id, 10);
      const { role: newRole } = req.body;

      if (isNaN(userIdToUpdate)) { return res.status(400).json({ message: 'ID de usuário inválido.' }); }
      if (!newRole || (newRole !== 'USER' && newRole !== 'ADMIN')) { return res.status(400).json({ message: 'Cargo (role) inválido ou não especificado.' }); }

      console.log(`Controller: updateUserRole - Chamando AuthService.updateUserRole com ID: ${userIdToUpdate}, Role: ${newRole}`);
      const updatedUser = await AuthService.updateUserRole(userIdToUpdate, newRole);
      console.log(`Controller: updateUserRole - AuthService retornou sucesso para ID: ${userIdToUpdate}`);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(`Controller: updateUserRole - Erro capturado para ID: ${req.params.id}:`, error);
      if (error.message === 'Usuário não encontrado.') { return res.status(404).json({ message: error.message }); }
      res.status(500).json({ message: 'Erro interno ao atualizar cargo.' });
    }
  }
}

// Exporta uma instância da classe, agora com o método updateProfilePicture
module.exports = new AuthController();
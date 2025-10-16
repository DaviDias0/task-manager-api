// src/controllers/auth.controller.js

const AuthService = require('../services/auth.service');

class AuthController {
  async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { token } = await AuthService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const userProfile = await AuthService.getProfile(req.user.id);
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // --- NOVA FUNÇÃO PARA ADMINS ---
  async getAllUsers(req, res) {
    try {
      const users = await AuthService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
  }
}

module.exports = new AuthController();
// src/controllers/auth.controller.js

const AuthService = require('../services/auth.service');

class AuthController {
  async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      // Não retorna a senha
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao registrar usuário.', error: error.message });
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
}

module.exports = new AuthController();
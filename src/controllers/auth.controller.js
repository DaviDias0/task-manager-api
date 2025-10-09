const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.registerUser(email, password, name);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
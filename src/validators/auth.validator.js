const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('name').notEmpty().withMessage('O nome é obrigatório.'),
  body('email').isEmail().withMessage('Forneça um e-mail válido.'),
  body('password').isLength({ min: 6 }).withMessage('A senha precisa ter no mínimo 6 caracteres.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateRegistration,
};
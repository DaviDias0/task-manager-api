    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/auth.controller');
    const { validateRegistration } = require('../validators/auth.validator.js');
    
    router.post('/register', validateRegistration, authController.register);
    router.post('/login', authController.login);
    
    module.exports = router;
    

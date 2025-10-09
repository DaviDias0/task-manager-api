    const express = require('express');
    const router = express.Router();
    const taskController = require('../controllers/task.controller');
    const authenticateToken = require('../middleware/auth.middleware');
    
    router.use(authenticateToken);
    
    router.get('/', taskController.getAllTasks);
    router.post('/', taskController.createTask);
    router.patch('/:id', taskController.updateTask);
    router.delete('/:id', taskController.deleteTask);
    
    module.exports = router;
    

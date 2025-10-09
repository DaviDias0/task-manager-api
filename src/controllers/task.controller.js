const taskService = require('../services/task.service.js');

const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.findAllTasks(userId);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newTask = await taskService.createTask(req.body, userId);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await taskService.updateTask(id, userId, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await taskService.deleteTask(id, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
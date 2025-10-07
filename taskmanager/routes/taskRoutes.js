import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/taskController.js';

const route = express.Router();

// TODO: Create Routes

// create task

route.post('/', createTask);

// Get all task
route.get('/', getAllTasks);

// Get Task by id
route.get('/:id', getTaskById);

// Update task by id
route.patch('/:id', updateTask);

// delete task by id
route.delete('/:id', deleteTask);

export default route;
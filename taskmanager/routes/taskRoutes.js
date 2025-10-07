import express from 'express'
import { createTask } from '../controllers/taskController.js';

const route = express.Router()

// TODO: Create Routes

// create task

route.post('/', createTask)

export default route
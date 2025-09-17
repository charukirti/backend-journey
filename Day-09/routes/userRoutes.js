import express from 'express';

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser
} from '../controllers/userController.js';


const router = express.Router();

// GET /api/users - GET all users

router.get('/', getAllUsers);

// GET /api/users - GET user by ID

router.get('/:id', getUserById);

// POST /api/users - Create new user

router.post('/', createUser);

// PATCH /api/users - update existing user

router.patch('/:id', updateUser);

export default router;
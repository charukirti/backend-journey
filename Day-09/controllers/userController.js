import UserModel from '../models/User.js';
import { AppError, errorHandler } from '../middlewares/errorHandler.js';

// GET all users
export const getAllUsers = async (req, res) => {
    const users = await UserModel.find({});
    return res.status(200).json(users);
};


// GET user by ID
export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await UserModel.findById(userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        console.log(user);

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


// CREATE (POST) new user

export const createUser = async (req, res, next) => {
    try {
        const body = req.body;

        if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
            throw new AppError('All fields are required', 400);
        }

        const result = await UserModel.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle,

        });

        console.log(result);

        return res.status(201).json({ message: "New record created successfully", data: result });

    } catch (error) {
        next(error);
    }
};


// UPDATE (PATCH) user

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};
import bcrypt from "bcryptjs";
import { AppError } from '../middlewares/errorHandler.js';
import UserModel from "../models/model.js";
import { createToken } from "../utils/createToken.js";

// health route

export function health(req, res, next) {
    res.json({ message: 'Everything is fine' });
}

// render sign up form

export function showSignUp(req, res, next) {
    res.render('sign-up');
}

// render sign in form 

export function showSignIn(req, res, next) {
    res.render('sign-in');
}

// sign up

export async function signUp(req, res, next) {
    try {
        const { fullname, username, email, password, role } = req.body;

        // password la hash kela
        const saltRounds = 12;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // create new user with hashed password

        const newUser = new UserModel({
            fullname,
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: newUser._id
        });

    } catch (error) {
        next(new AppError('Failed to create user', 400));
    }
}

// sign in

export async function signIn(req, res, next) {
    try {
        const { username, email, password } = req.body;

        // find user
        const user = await UserModel.findOne({
            $or: [{ username }, { email }]
        });

        // if ther is no user throw error
        if (!user) {
            return next(new AppError('user not found', 404));
        }

        // if there is user then compare password

        const isValidPassword = await bcrypt.compare(password, user.password);

        // if password does not match, send warning
        if (!isValidPassword) {
            return next(new AppError('invalid credentials', 401));
        }

        // if password match, update last logged in, send success message

        user.lastloggedin = new Date();

        await user.save();

        // create jwt token

        const token = createToken(user._id)

        // Login successful
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error);
        next(new AppError('login failed', 500));
    }
}

// get all users

export function getUsers(req, res, next) {
    res.json({ message: 'users route' });
}

// user details

export function getUser(req, res, next) {
    res.json({
        success: true,
        message: 'accessed protected route',
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role,
            lastloggedin: req.user.lastloggedin
        }
    });
}

// sign out

export function signOut(req, res, next) {
    res.json({ message: 'Sign out route' });
}
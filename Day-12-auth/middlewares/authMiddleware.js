import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';
import UserModel from '../models/model.js';

export async function authenticateToken(req, res, next) {
    try {
        // Get token from authorization header

        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer')
            ? authHeader.slice(7) // remove 'Bearer'
            : null;

        if (!token) {
            return next(new AppError('Access denied, No token provided', 401));
        }

        // verify token 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Get user info (optional - for req.user)
        const user = await UserModel.findById(decoded.userId).select('-password');

        if (!user) {
            return next(new AppError('User not found.', 401));
        }

        // 4. Add user to request object
        req.user = user;

        // 5. Continue to next middleware/route
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new AppError('Invalid token.', 401));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Token expired.', 401));
        }
        return next(new AppError('Token verification failed.', 401));
    }
}
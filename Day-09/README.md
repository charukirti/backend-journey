# Day 9: MVC Architecture in Express.js

**Date**: September 17, 2025

## 📚 What is MVC Architecture?

**MVC (Model-View-Controller)** is a software architectural pattern that separates an application into three interconnected components:

### **Model** 🗃️
- **Purpose**: Manages data and business logic
- **Responsibilities**: 
  - Database operations (CRUD)
  - Data validation
  - Business rules
  - Data structure definitions
- **In Express.js**: Mongoose schemas and models

### **View** 👁️
- **Purpose**: Handles presentation layer
- **Responsibilities**: 
  - User interface
  - Data display
  - User interactions
- **In REST APIs**: JSON responses (no traditional views)

### **Controller** 🎮
- **Purpose**: Acts as intermediary between Model and View
- **Responsibilities**: 
  - Request handling
  - Business logic processing
  - Response formatting
  - Error handling

## 🏗️ Project Structure Transformation

### Before MVC (Monolithic)
```
project/
└── server.js (everything in one file)
```

### After MVC (Organized)
```
project/
├── config/
│   └── database.js          # Database connection
├── models/
│   └── User.js             # Data schema & model
├── controllers/
│   └── userController.js   # Business logic
├── routes/
│   └── userRoutes.js       # Route definitions
├── middlewares/
│   └── errorHandler.js     # Error handling
└── server.js               # Server configuration
```

## 🔧 Implementation Steps

### Step 1: Create Folder Structure
```bash
mkdir config models controllers routes middlewares
```

### Step 2: Extract Database Configuration
**File**: `config/database.js`
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_STRING);
        console.log('Connected to MONGODB');
    } catch (error) {
        console.error('Unable to connect mongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;
```

### Step 3: Create Model
**File**: `models/User.js`
```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String },
    gender: { type: String }
}, { timestamps: true });

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
```

### Step 4: Extract Middleware
**File**: `middlewares/errorHandler.js`
```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Something went wrong";

    res.status(statusCode).json({
        success: false,
        message
    });
};

export { AppError, errorHandler };
```

### Step 5: Create Controller
**File**: `controllers/userController.js`
```javascript
import UserModel from '../models/User.js';
import { AppError } from '../middlewares/errorHandler.js';

export const getAllUsers = async (req, res) => {
    const users = await UserModel.find({});
    return res.status(200).json(users);
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, gender, jobTitle } = req.body;
        
        if (!firstName || !lastName || !email || !gender || !jobTitle) {
            throw new AppError('All fields are required', 400);
        }

        const result = await UserModel.create({
            firstName, lastName, email, gender, jobTitle
        });

        return res.status(201).json({ 
            message: "New record created successfully", 
            data: result 
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};
```

### Step 6: Create Routes
**File**: `routes/userRoutes.js`
```javascript
import express from 'express';
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser 
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);

export default router;
```

### Step 7: Clean Server File
**File**: `server.js`
```javascript
import express from 'express';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send(`Hello and welcome to PORT ${PORT}`);
});

app.use('/api/users', userRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
```

## ✅ Benefits of MVC

### **1. Separation of Concerns**
- Each file has a single responsibility
- Easy to locate specific functionality
- Reduced code coupling

### **2. Maintainability**
- Changes in one layer don't affect others
- Bug fixes are isolated
- Code is self-documenting

### **3. Scalability**
- Easy to add new models, controllers, routes
- Team members can work on different components
- Follows industry standards

### **4. Testability**
- Controllers can be unit tested independently
- Models can be tested separately
- Mocking dependencies is easier

### **5. Reusability**
- Controller functions can be reused
- Models can be imported anywhere
- Middleware can be applied to multiple routes

---


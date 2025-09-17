import express from 'express';
import connectDB from './config/database.js';
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT;


// connection to mongoDB
connectDB();

// middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Hello and welcome to PORT ${PORT}`)
})

// routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
import express from 'express';
import connectDB from './config/dbconfig.js';
import route from './routes/taskRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.static('public'))

connectDB()

app.get('/', (req, res, next) => {
    res.send('Taskmanager api is running');
});

app.use('/api/task', route)


app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
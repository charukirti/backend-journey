import express from 'express';
import connectDB from './config/dbconfig.js';
import route from './routes/taskRoutes.js';

const app = express();

const port = process.env.PORT;

app.use(express.json());

connectDB()

app.get('/', (req, res, next) => {
    res.send('Taskmanager api is running');
});

app.use('/api/task', route)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
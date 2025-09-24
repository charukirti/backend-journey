import express from 'express'
import connectDB from './config/DBconfig.js';
import { errorHandler } from './middlewares/errorHandler.js';
import userRouter from './routes/userRoutes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.set('views', './views')

connectDB()

const port = process.env.PORT || 3001

app.get('/health', (req, res) => {
    res.json({message: 'Everything is fine'})
})

app.use('/auth', userRouter)


// app.use(errorHandler())

app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`)
})
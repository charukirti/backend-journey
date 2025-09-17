import express from 'express'
import connectDB from './config/database.js'
import { errorHandler } from './middlewares/errorHandlers.js';
import urlRoute from './routes/urlRoutes.js'


const app = express()
const PORT = process.env.PORT

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
    res.send(`Welcome to PORT: ${PORT}`)
})

app.use('/api/url', urlRoute)

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
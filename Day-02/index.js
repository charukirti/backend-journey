const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello ExpressJS!')
})

app.listen(PORT, () => {
    console.log(`Saying hello on port ${PORT}`)
})
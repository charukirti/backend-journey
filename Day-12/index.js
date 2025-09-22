import express from 'express'

const app = express()

const port = process.env.PORT || 3001

app.get('/health', (req, res) => {
    res.json({message: 'Everything is fine'})
})


app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`)
})
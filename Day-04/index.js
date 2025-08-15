const express = require('express')
const app = express()
const PORT = 3000

/* 

Middleware: 
 - It is a function which has access of request object, response object, and next object and sits in the req-res cycle.
 - It can read and modify request object
 - It can read and modify response object
 - Stop the cycle and send a response immediately
 - Or pass control to the next middleware or route handler by calling next()

*/

// middleware in action

app.use((req, res, next) => {
    // res.send('Hello this is middleware')
    console.log('This is middleware')
    next()
})

app.get("/", (req, res) => {
    console.log('Hello Charukirti, Welcome to the Day-04 of backend journey')
    res.send('<h1>Hello Charukirti, Welcome to the Day-04 of backend journey</h1>')
})

app.listen(PORT, () => {
    console.log(`Saying Hello 👋, on port ${PORT}`)
})
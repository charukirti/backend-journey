const express = require('express'); // import express framework

/* 2. Created an Express app instance
 - This app object has methods for routing HTTP requests like GET, POST, DELETE etc.
 - Configuring middleware, redering HTML views etc.
*/
const app = express();

// 3. Port where server will listen
const PORT = 3000;


/* 4. Route handler
- app.get(path, callback) .get() GET request to '/' i.e route.
- First parameter: '/' is the root path 
- Second parameter: callback function that runs when someone visits the path
*/
app.get('/', (req, res) => {
    // req = request object (contains info about HTTP request)
    // res = response object (used to send response back to client)
    res.send('Hello Express JS! its day 3');
});

app.get('/about', (req, res) => {
    res.send('This is an about page');
});

// ---------- Route with parameter. ----------------

// The :name is parameter - it can be any value
app.get('/hello/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`Hello ${userName}! Welcome to our website`);
});

app.get('/age/:number', (req, res) => {
    const age = req.params.number;
    res.send(`You are ${age} years old`);
});


// 5. Start the server
/* app.listen(port, callback)
    - Tells server to listen on specified port
    - Callback function runs once server starts successfully
*/
app.listen(PORT, () => {
    console.log(`Saying hello on port ${PORT}`);
});

// How it works:

// 1. Server starts and listens port 3000
// 2. When someone visits http://localhost/3000/
// 3. The get('/', ...) route handler executes
// 4. server sends back 'Hello Express JS! its day 3'
// 5. req contains data about HTTP request (headers, body, params) 
// 6. res used to send response back (HTML, JSON, files, etc.)
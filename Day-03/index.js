const express = require('express');
const app = express();
const PORT = 5000;


app.get('/', (req, res) => {
    res.send('This is home page');
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



app.get('/user/:name', (req, res) => {
    const userName = req.params.name;

    res.send(`Username is ${userName}`);
});


// ---------- Route with multiple parameter --------

app.get('/add/:first/:second', (req, res) => {
    const numberOne = parseInt(req.params.first);
    const numberTwo = parseInt(req.params.second);

    const add = numberOne + numberTwo;
    res.send(`Addition of ${numberOne} and ${numberTwo} is ${add}`);

});


// ---------------- Routes with JSON response ------------

// instead of res.send(), we use res.json() for structured data

app.get('/api/user/:name', (req, res) => {
    const userName = req.params.name;

    res.json({
        message: 'User found',
        name: userName,
        timeStamp: new Date().toISOString(),
        success: true
    });
});

app.get('/api/profile/:name/:age', (req, res) => {
    const userName = req.params.name;
    const userAge = parseInt(req.params.age);

    res.json({
        "profile": {
            "name": userName,
            "age": userAge,
            "isAdult": userAge >= 18
        },
        "message": 'Profile added successfully'
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
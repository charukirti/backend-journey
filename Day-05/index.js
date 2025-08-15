const express = require('express');
const users = require('./mock_data.json');

const app = express();
const PORT = 3000;

// routes
app.get('/', (req, res) => {
    return res.send('<h1>Hello World</h1>');
});

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    const html = `<ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>`

    res.send(html)
});


app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)

    const user = users.find(user => user.id === id)

    return res.json(user)
})

app.post('/api/users', (req, res) => {
    //TODO: CReate new user

    return res.json({status: 'pending'})
})


app.patch("/api/users/:id", (req, res) => {
    
})

// listen
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
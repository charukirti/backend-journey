const express = require('express');
const users = require('./mock_data.json');
const fs = require('fs')
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: false}))

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
    </ul>`;

    res.send(html);
});


app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    return res.json(user);
});

app.post('/api/users', (req, res) => {
    //TODO: Create new user
    const body = req.body
    console.log('Body', body)
    users.push({...body, id: users.length + 1})
    fs.writeFile("./mock_data.json", JSON.stringify(users), (err, data) => {
        return res.json({status: 'pending'})
    })
    return res.json({status: 'pending'})
})


// app.patch("/api/users/:id", (req, res) => {
//     // TODO: Edit the user
// })

// app.delete("/api/users/:id", (req, res) => {
//     // TODO: Delete the user
// })


/* ------------- Grouping ----------- */

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
}).put((req, res) => {
    return res.json({ status: 'Pending' });
}).delete((req, res) => {
    return res.json({ status: 'Pending' });
});

// listen
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
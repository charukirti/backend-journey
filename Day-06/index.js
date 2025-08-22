const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
const books = require('./books.json');
const fs = require('fs');


app.get('/', (req, res) => {
    res.send('This is home page');
});

app.get('/api/books', (req, res) => {
    res.send(books);
});

app.get('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);
    res.send(books.filter(book => book.id === id));
});

app.post('/api/books', (req, res) => {
    const body = req.body;

    if (!body.title || !body.author) {
        return res.status(400).json({ error: 'Tile and author is missing' });
    }

    const newBook = { id: books.length + 1, ...body };

    books.push(newBook);

    fs.writeFile('./books.json', JSON.stringify(books), (err, data) => {
        return res.json({ status: 'pending' });
    });

});

app.listen(PORT, () => {
    console.log('Server is running');
});
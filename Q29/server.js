const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let books = [];

// Load books from books.json if it exists
if (fs.existsSync('books.json')) {
    const data = fs.readFileSync('books.json', 'utf8');
    books = JSON.parse(data);
}

app.post('/books', (req, res) => {
    const book = req.body;
    books.push(book);
    
    // Save books to books.json
    fs.writeFileSync('books.json', JSON.stringify(books, null, 2));

    res.status(201).send('Book added successfully!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
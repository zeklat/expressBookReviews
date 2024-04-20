const express = require('express');
const axios = require('axios');
const public_users = express.Router();

// Task 10: Get the list of books available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('https://api.example.com/books');
        const books = response.data;
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch books" });
    }
});

// Task 11: Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`https://api.example.com/books/${isbn}`);
        const book = response.data;
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 12: Get book details based on author using async-await with Axios
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(`https://api.example.com/books?author=${author}`);
        const booksByAuthor = response.data;
        res.status(200).json(booksByAuthor);
    } catch (error) {
        res.status(404).json({ message: "Books by author not found" });
    }
});

// Task 13: Get book details based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`https://api.example.com/books?title=${title}`);
        const booksByTitle = response.data;
        res.status(200).json(booksByTitle);
    } catch (error) {
        res.status(404).json({ message: "Books by title not found" });
    }
});

module.exports.general = public_users;

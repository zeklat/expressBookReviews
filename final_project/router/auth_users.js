const express = require('express');
const jwt = require('jsonwebtoken');
const books = require("./booksdb.js");
const regd_users = express.Router();

const users = [];

const isValid = (username) => {
    //write code to check if the username is valid
}

const authenticatedUser = (username, password) => {
    //write code to check if username and password match the one we have in records.
}

// Logging in as a registered user
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if username and password match the records
    if (authenticatedUser(username, password)) {
        // Generate JWT token
        const token = jwt.sign({ username }, 'secret');
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.query;
    const username = req.user.username;

    if (!review) {
        return res.status(400).json({ message: "Review is required" });
    }

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Check if the user already has a review for the book
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review added successfully" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const username = req.user.username;

    if (!books[isbn] || !books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "Review not found" });
    }

    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

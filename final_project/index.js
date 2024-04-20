const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Initialize session middleware
app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// Authentication middleware
app.use("/customer/auth/*", function auth(req, res, next) {
    // Get the access token from the request headers or query parameters
    const accessToken = req.headers.authorization || req.query.access_token;

    if (!accessToken) {
        return res.status(401).json({ error: "Access token is required" });
    }

    try {
        // Verify the access token
        const decoded = jwt.verify(accessToken, 'your_secret_key');

        // Set user information in the session
        req.session.user = decoded.user;

        // Call next middleware or route handler
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid access token" });
    }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));

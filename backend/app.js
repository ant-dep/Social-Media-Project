// Imports
const express = require('express')
const app = express()
const path = require("path");
const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");

// routes
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");
const commentsRoutes = require("./routes/comments");

require('dotenv').config(); // private code plugin
const cors = require('cors'); // API calls plugin
const bodyParser = require('body-parser');
require("./db.config");

// Specify generic requests model
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());
app.use('/api/post', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/post', commentsRoutes);

// Input sanitization against XXS attacks
app.use(xss());

// Set HTTP headers with helmet
app.use(helmet());

// Limit several sessions in a shortime to avoid force's attacks
app.use(rateLimit());

module.exports = app;
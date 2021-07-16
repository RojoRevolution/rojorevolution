const express = require('express');
const path = require('path');

const PORT = 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Up Paths
app.use(express.static(path.join(__dirname, '/public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// ===================
// REQUIRE ROUTES HERE
require('./routes/html-routes.js')(app);
// ====================

// Server Listener
app.listen(PORT, function () {
    console.log(`App vibing on Port: ${PORT}`);
});
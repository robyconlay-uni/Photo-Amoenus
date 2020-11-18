const express = require('express');
const app = express();
const mongoose = require("mongoose");



app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://commonUser:7M1LXWdGfoTYVcTm@locations.xogwk.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });



/**
 * Middleware to manage authentication
 */
/*
app.use((req, res, next) => {
    req.loggedUser = req.query.user;
    next();
});
*/


/* Moduli per la gestione delle richieste alle API */
const locationsRoute = require('./locations.js');

app.use('/', express.static('static'));     //default path
app.use('/locations', locationsRoute);      //operations on locations


const userRoutes = require('./registration.js'); // route for the registration
app.use('/user', userRoutes);  // everything that go to /registration will go to registration.js


/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;

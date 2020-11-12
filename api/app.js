const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static('static'));



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

app.use('/locations', locationsRoute);



/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;

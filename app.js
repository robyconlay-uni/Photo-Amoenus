const express = require('express');
const app = express();

const locations = require('.api/routes/locations');


app.use('/locations', locations);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.staus = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
});

module.exports = app;
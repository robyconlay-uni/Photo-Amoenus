const express = require('express');
const app = express();

const locationsRoutes = require('.api/routes/locations');


app.use('/locations', locationsRoutes);

app.use((req, res) => {
    res.status(404);
    res.json({error : 'Not Found'});
});


module.exports = app;

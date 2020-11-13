const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Location = require("./models/locationScheme");

router.get('/', (req, res) => {     //get all existing locations 
    Location.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            });
        });
});

router.get('/:locationId', (req, res) => {  //get a precise location, indicated by id
    const id = req.params.locationId;
    Location.findBy(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            });
        });
});

module.exports = router;

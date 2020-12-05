const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Report = require('./models/reportScheme');


//Show all the reports in the database

router.get('/', (req, res, next) => {
    console.log("Ecco l'elenco dei reports");

    Report.find()
        .exec()
        .then(docs => {
            /*console.log("count:" + docs.length);
            console.log("reports:");*/
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                reports: docs.map(doc => {
                    return {
                        id: doc._id,
                        email: doc.email,
                        text: doc.text,
                        get: {
                            type: 'GET',
                            url: 'http://localhost:' + process.env.PORT + '/checkReports/' + doc.id
                        }
                    }
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            });
        });
});

/**
 *Show one location
 
router.get('/:locationId', (req, res, next) => {
    const idLoc = req.params.locationId;
    if (idLoc != null) {
        Location.findById(idLoc)
            .select('_id name address city description locationImage category likes')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        location: doc
                    });
                    //res.sendFile(doc.locationImage);
                } else {
                    console.log('Non è stata trovata location con questo ID');
                    res.status(404).json({
                        message: 'No valid entry'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        res.status(400).json({
            error: 'Invalid location ID'
        });
    }
});

*/

module.exports = router;
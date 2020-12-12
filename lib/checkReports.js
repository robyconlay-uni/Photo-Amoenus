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
                        _id: doc.id,
                        email: doc.email,
                        text: doc.text,
                        id_picture: doc.id_picture,
                        get: {
                            type: 'GET',
                            url: 'http://localhost:' + process.env.PORT + '/checkReports/' + doc._id
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
 *Show one report */
 
router.get('/:repId', (req, res, next) => {
    const repId = req.params._id;
    console.log("RepID: " + repId);
    if (repId != null) {
        Report.findById(repId)
            .select('_id email text id_picture')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        report: doc
                    });
                    //res.sendFile(doc.locationImage);
                } else {
                    console.log('Non è stata trovato report con questo ID');
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
            error: 'Invalid report ID'
        });
    }
});


module.exports = router;
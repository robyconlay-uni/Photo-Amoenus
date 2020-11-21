/**
 * File in cui metto le funzioni per gestire le LOCATIONS
 */
const mongoose = require("mongoose");

const Location = require('../models/locationScheme');

/**
 *Show all locations in database
 */
exports.locations_get_all = (req, res, next) => {
    console.log("Ecco l'elenco dei luoghi");
    Location.find()
        .select('_id name address description image category likes')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                locations: docs.map(doc => {
                    return{
                        _id: doc._id,
                        name: doc.name,
                        address: doc.address,
                        description: doc.description,
                        image: doc.image,
                        category: doc.category,
                        likes: doc.likes,
                        get: {
                            type: 'GET',
                            url: 'http://localhost:'+ process.env.PORT +'/locations/'+doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            });
        });
}

/**
 *Show one location 
 */
exports.locations_get_one = (req, res, next) => {
    const idLoc = req.params.id;
    if(idLoc != null){
        Location.findById(id)
            .select('_id name address description image category likes')
            .exec()
            .then(doc => {
                if(doc){
                    res.status(200).json({
                        location: doc
                    });
                }else{
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
}

/**
 *Add a location to database
 */
exports.locations_create_location = (req, res, next) => {
    console.log('POST locations/'+ req.body.name + ' '+ req.body.description);

    const location = new Location({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category, 
        likes: 0
    });

    location 
        .save()
        .then(result => {
            console.log(result);
            res.status(201).location('/location/'+ result._id).json({
                message:'Location created',
                createdLoccation: {
                    _id: result._id,
                    name: result.name
                },
                get: {
                    type: 'GET',
                    url: 'http://localhost:'+ process.env.PORT+'/locations/'+ result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

/**
 *Delete a location in database
 */
exports.locations_delete_location = (req, res, next) => {
    const id = req.params.locationId;
    Location.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Location deleted',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
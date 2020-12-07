const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Favourites = require('./models/favouriteScheme');
const User = require("./models/userScheme");

/**
 * get all favourites of all users
 */
router.get('/all', (req, res) => {
    Favourites.find()
        .select("_id favourites")
        .exec()
        .then(docs => {
            if (!docs) {
                res.status(404).json({
                    message: 'Error retrieving favourites'
                });
            }
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/**
 * get favourites of 1 user
 */
router.get('/', (req, res) => {
    var id = userData.userId;

    Favourites.findOne({ _id: id })
        .select("_id favourites")
        .exec()
        .then(data => {
            if (data.length == 0) {
                res.status(404).json({
                    message: 'No valid user for favourites',
                    data: data
                });
            } else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/**
 * add favourite to a user
 */
router.post('/', (req, res) => {
    var id = userData.userId;

    if (!req.body.favourites) {
        return res.status(500).json({
            message: "Not enough information provided"
        });
    }

    Favourites.find({ _id: id }) //check if favourite for this user already exists
        .select("_id")
        .exec()
        .then(data => {
            if (data.length > 0) {
                return res.status(500).json({
                    message: "Favourite for this user already exists",
                    _id: id
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err,
                message: "Error during check of user id for favourite POST"
            });
        });

    const favourite = new Favourites({
        _id: id,
        favourites: req.body.favourites     //received as an array
    });

    favourite
        .save()
        .then(result => {
            console.log(result);
            res.status(201).location('/favourite/' + result._id).json({
                message: 'Favourite created',
                createdFavourite: {
                    _id: result._id,
                    favourite: result.favourites
                },
                get: {
                    type: 'GET',
                    url: 'http://localhost:' + process.env.PORT + '/favourite/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/**
 * expand favourites of a user
 * pass id of locations in body
 */
router.patch('/', (req, res) => {
    var id = userData.userId;

    Favourites.update({ _id: req.params.id }, { $push: { favourites: req.body.id } })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/**
 * delete one in the favourites of the user
 */
router.patch('/', (req, res) => {
    var id = userData.userId;

    Favourites.update({ _id: req.params.id }, { $pull: { favourites: req.body.id } })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Favourite deleted for user',
                user_id: id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/**
 * delete all favourites in table
 */
router.delete('/all', (req, res) => {
    Favourites.remove({})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All favourites deleted',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


/**
 * delete all favourites of the user
 */
router.delete('/', (req, res) => {
    var id = userData.userId;

    Favourites.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All favourite of a user deleted',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;

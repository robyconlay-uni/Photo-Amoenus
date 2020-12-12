const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");


const User = require("./models/userScheme");

router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            //console.log(docs);
            if (!docs) {
                console.log('Errore nel trovare gli user');
                res.status(404).json({
                    message: 'Error retrieving users'
                });
            }
            res.status(200).json({
                users: docs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            }); 
        });
});

router.post('/signup', (req, res, next) => {
    console.log(req.body.email);
    try{
        User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    message: 'user already exist'
                });
            }
        }) 
    } catch {
        bcryptjs.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: err
                });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                });
                user
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'User created'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: err
                            });
                        });
                }
        });

    }
});


/*
router.get("/logout", (req,res, next) =>{
    token = undefined;
    res.redirect("/")
})
*/

router.post("/login", (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:id", (req, res, next) => {
    userId = req.params._id;
    if(userId != null){
        User.remove({id: userId})
            .exec()
            .then(result => {
                res.status(201).json({
                    message: 'User deleted'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        res.status(404).json({
            message: 'No Id passed'
        })
    }
});

module.exports = router;
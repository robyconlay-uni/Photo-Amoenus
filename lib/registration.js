const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require("./models/userScheme");

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(422).json({
                message: 'user already exist'
            });
        } else {
            bcryptjs.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        id: new mongoose.Types.ObjectId(),
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
                            error: err
                        });
                    });
                }
            });
    
        }
    });
});
/*
router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email}) // cerca nello schema User quello che ti passa nel body
        .exec()
        .then(user =>{
            if(user.length<1){
                return res.status(401).json({
                    message: "Authentication failed!"
                });
            }
            bcryptjsjsjs.compare(req.body.password, username[0].password, (err, result) =>{
                if(err){
                    return res.status(401).json({
                        message: "Authentication failed!"
                    });
                }
                if(result){
                    return res.status(200).json({
                        message: "Authentication successful"
                    });
                }
                res.status(401).json({
                    message: "Authentication failed!"
                });
            });    
    });    
        .catch(err => {
            console.log(err);
             res.status(500).json({
            error: err
             });
        });
});*/

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Authentication failed"
          });
        }
        bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Authentication failed"
            });
          }
          if (result) {
            /*const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );*/
            return res.status(200).json({
              message: "Authentication successful",
              //token: token
            });
          }
          res.status(401).json({
            message: "Authentication failed"
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
  
router.delete("./:id", (req, res, next) => {
    User.remove({ id: req.params.id})
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
});

module.exports = router;
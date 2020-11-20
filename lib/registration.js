const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
            bcrypt.hash(req.body.password, 10, (err, hash) => {
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

router.post('login', (req, res, next) => {
    User.find({ email: req.body.email}) // cerca nello schema User quello che ti passa nel body
        .exec()
        .then(user =>)
            if(user.length<1){
                return res.status(401).json({
                    message: "Authentication failed!"
                })
            }
            bcryptjs.compare(req.body.password, user[0].password)

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
})
  
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
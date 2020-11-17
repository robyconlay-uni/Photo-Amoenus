const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var max_id = -1;

const Location = require("./models/locationScheme");



router.get('/', (req, res) => {     //get all existing locations 
    console.log("Ecco l'elenco dei luoghi: ");
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

router.get('/:id', (req, res) => {  //get a precise location, indicated by id
    const idLoc = req.params.id;
    if (idLoc != "") {
        Location.find({_id: idLoc}).exec().then(
            doc => {
                if(doc.length == 0){
                    console.log("Non è stato trovata location con questo ID");
                    res.status(404).json({error: "No location found"});
                } else {
                    console.log(doc);
                    res.status(200).json(doc);
                }
            }
        ).catch(err => {
            console.log(err);
            console.log("Non è stato trovata location con questo ID");
            res.status(404).json({error: 'Invalid location ID'});
        })
    } else {
        res.status(400).json({ error: 'Invalid location ID' });
    }
});



router.post('/', function(req, res) {
    console.log('POST locations/ ' + req.body.name + ' ' + req.body.description);
    const p = new Location({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category, 
        likes: req.body.likes
    })
    p.save().then(()=> console.log("Aggiunta location " + p.name + " con id " + p._id));
    
    res.status(201).location("/" + p._id).send("Aggiunta location " + p.name + " con id " + p._id);   
});

module.exports = router;

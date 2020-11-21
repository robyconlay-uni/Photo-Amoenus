const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        console.log("Sì");
    } else {
        console.log("No");
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    //fileFilter: fileFilter
});

const Location = require("./models/locationScheme");



router.get('/', (req, res) => {     //get all existing locations 
    console.log("Ecco l'elenco dei luoghi: ");
    Location.find()
        .select('name address description locationImage category likes')
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
    if (idLoc != null) {
        Location.findById(idLoc)
            .select('name address description locationImage category likes')
            .exec()
            .then(doc => {
                console.log("Dal database: ", doc);
                if(doc){
                    res.status(200).json({
                        location: doc
                    });
                }
            }).catch(err => {
                console.log(err);
                console.log("Non è stato trovata location con questo ID");
                res.status(404).json({error: 'Invalid location ID'});
            })
    } else {
        res.status(400).json({ error: 'Invalid location ID' });
    }
});


router.post('/', upload.single('locationImage'), function(req, res) {
    console.log(req.file);

    console.log('POST locations/ ' + req.body.name + ' ' + req.body.description);
    const p = new Location({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        locationImage: req.file.path,
        category: req.body.category, 
        likes: req.body.likes
    })
    p.save().then(()=> console.log("Aggiunta location " + p.name + " con id " + p._id));
    
    res.status(201).location("/" + p._id).send("Aggiunta location " + p.name + " con id " + p._id);   
});

module.exports = router;

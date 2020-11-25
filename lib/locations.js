const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require('fs');
const path= require('path');
/**
 * Gestione upload immagini
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toLocaleDateString()+"-"+ Date.now()+ file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


const Location = require('./models/locationScheme');
const Image = require('./models/imageScheme');

/**
 *Show all locations in database
 */
router.get('/', (req, res, next) => {
    console.log("Ecco l'elenco dei luoghi");
    
    //FILTRI
    const category = req.body.category;
    const city = req.body.city;
    
    //

    Location.find()
        .byCategory(category)
        .byCity(city)
        .select('_id name address city description locationImage category likes')
        .exec()
        .then(docs => {
            /*console.log("count:" + docs.length);
            console.log("locations:");*/
            console.log(docs);
            res.status(200).json(docs);/*{
                count: docs.length,
                locations: docs.map(doc => {
                    return{
                        _id: doc._id,
                        name: doc.name,
                        address: doc.address,
                        city: doc.city,
                        description: doc.description,
                        locationImage: doc.locationImage,
                        category: doc.category,
                        likes: doc.likes,
                        get: {
                            type: 'GET',
                            url: 'http://localhost:'+ process.env.PORT +'/locations/'+doc._id
                        }
                    }
                })
            })*/
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
 */
router.get('/:locationId', (req, res, next) => {
    const idLoc = req.params.locationId;
    if(idLoc != null){
        Location.findById(idLoc)
            .select('_id name address city description locationImage category likes')
            .exec()
            .then(doc => {
                if(doc){
                    //res.status(200).json(doc);
                    Image.find({_id: doc.locationId}, (err, item) =>{
                        if(err) {
                            console.log(err);
                        } else {
                            res.status(200).send({
                                body: doc,
                                file: item
                            });
                        }
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
});

/**
 *Add a location to database
 */
router.post('/', upload.single('locationImage'), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    console.log('POST locations/'+ req.body.name + ' '+ req.body.description);


    const obj = {
        _id: new mongoose.Types.ObjectId(),
        img: {
            data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
            contentType: 'image/png' || 'image/jpeg' || 'image/jpg'

        }
    }
    Image.create(obj, (err, item) => {
        if(err) {
            console.log(err);
        } else {
            console.log(item);
            item.save();
        }
    });






    const location = new Location({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name.toLowerCase(),
        address: req.body.address.toLowerCase(),
        city: req.body.city.toLowerCase(),
        description: req.body.description.toLowerCase(),
        locationImage: obj._id,
        category: req.body.category.toLowerCase(), 
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
});

/**
 *Delete a location in database
 */
router.delete('/:locationId', (req, res, next) => {
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
});

module.exports = router;
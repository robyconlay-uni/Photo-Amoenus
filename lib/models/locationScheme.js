//schema model for location table


const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({    //to be modified
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    description: String,
    image: String,      //array of IDs, with every id identifying an image
    category: String, 
    likes: Number
});

module.exports = mongoose.model('Location', locationSchema);
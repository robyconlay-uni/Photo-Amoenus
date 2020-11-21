//schema model for location table


const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({    //to be modified
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},      //array of IDs, with every id identifying an image
    category: {type: String, required: true}, 
    likes: Number
});

module.exports = mongoose.model('Location', locationSchema);
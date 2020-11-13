//schema model for location table


const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({    //to be modified
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    descrizione: String,
    images: Array,      //array of IDs, with every id identifying an image
    categoria: String, 
    comments: Array,
    likes: Number
});

module.exports = mongoose.model('Location', locationSchema);
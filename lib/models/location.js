//schema model for location table


const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({    //to be modified
    id: mongoose.Schema.Types.ObjectId,
    name: String,
});

module.exports = mongoose.model('Location', locationSchema);
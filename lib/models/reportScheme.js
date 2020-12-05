//schema model for report table

const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    email: String,
    text: String
});

module.exports = mongoose.model('Report', reportSchema);
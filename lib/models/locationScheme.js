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

/**
 * Ricerca con FILTRI
 */
//Se category è null ritorna tutti gli elementi, altrimenti applica il filtro
locationSchema.query.byCategory = function(category){
    if(!category){
        return this;
    } else {
        var cat = category.toLowerCase();
        return this.where({category: cat});
    }
};



module.exports = mongoose.model('Location', locationSchema);
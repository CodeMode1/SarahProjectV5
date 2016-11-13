var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ressourceSchema = new Schema({
    nom: {
        type: String
    }
});

module.exports = mongoose.model('Ressource', ressourceSchema);
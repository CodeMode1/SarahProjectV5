var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Sequence = require('../models/sequence');
var genSequence = Sequence.generateurSequence('evenement');

var evenementSchema = new Schema({
    noEvenement: {
        type: Number
    },
    nom: {
        type: String
    },
    dateEvenement: {
        type: String
    },
    contact: {
        type: String
    },
    client: {
        type: String
    },
    selectEtat: {
        type: String
    },
    dateSoumission: {
        type: String
    },
    dateConfirmation: {
        type: String
    },
    dateFacturation: {
        type: String
    },
    dateNonRetenu: {
        type: String
    },
    dateAnnulation: {
        type: String
    },
    notes: {
        type: String
    },
    validationTache: {
        type: Boolean,
        default: false
    },
    creerPar: {
        type: String
    },
    dateCree: {
        type: Date,
        default: Date.now
    },
    modifPar: {
        type: String
    },
    modif: {
        type: Date
    }
});

evenementSchema.pre('save', function (next) {
    var doc = this;
    genSequence.next(function (nextSeq) {
        doc.noEvenement = nextSeq;
        next();
    });
});


/* foreign key
        client_FK: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }
*/


module.exports = mongoose.model('Evenement', evenementSchema);
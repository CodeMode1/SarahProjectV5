var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Sequence = require('../models/sequence');
var genSequence = Sequence.generateurSequence('evenement');
//var schemaActivite = require('mongoose').model('Activite').schema;

var activiteSchema = new Schema({
    nom: {
        type: String
    },
    debut: {
        type: String
    },
    fin: {
        type: String
    },
    etat: {
        type: String
    },
    nbPersonnes: {
        type: String
    },
    serviceTotal: {
        type: String
    },
    fraisServiceTotal: {
        type: String
    },
    noFacture: {
        type: String
    },
    surreservation: {
        type: Boolean,
        default: false
    },
    raisonNonRetenu: {
        type: String
    },
    modifiePar: {
        type: String
    },
    modifie: {
        type: Date
    }
});

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
    },
    client_FK: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    activites: [activiteSchema]
});

evenementSchema.pre('save', function (next) {
    var doc = this;
    genSequence.next(function (nextSeq) {
        doc.noEvenement = nextSeq;
        next();
    });
});


module.exports = mongoose.model('Evenement', evenementSchema);
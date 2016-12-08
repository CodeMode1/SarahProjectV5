var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Sequence = require('../models/sequence');
var genSequence = Sequence.generateurSequence('evenement');
//var schemaActivite = require('mongoose').model('Activite').schema;

var serviceSchema = new Schema({
    temps: {
        type: String
    },
    nom: {
        type: String
    },
    categorie: {
        type: String
    },
    quantite: {
        type: Number
    },
    prixUnitaire: {
        type: Number
    },
    escompte: {
        type: Number
    },
    fraisService: {
        type: Number
    },
    fraisServiceTotal: {
        type: Number
    },
    sousTotal: {
        type: Number
    },
    modifiePar: {
        type: String
    },
    modifie: {
        type: String
    },
    total: {
        type: Number
    }
});

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
        type: Number
    },
    fraisServiceTotal: {
        type: Number
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
        type: String
    },
    services: [serviceSchema],
    ressourcesCheck: [{
        type: Schema.Types.ObjectId,
        ref: 'Ressource'
    }]

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
        type: String
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
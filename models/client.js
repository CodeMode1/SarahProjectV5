var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Sequence = require('../models/sequence');
var genSequence = Sequence.generateurSequence('client');
var Evenement = require('./evenement');

var clientSchema = new Schema({
    noClient: {
        type: Number
    },
    prenom: {
        type: String
    },
    nom: {
        type: String,
        required: true
    },
    noCompte: {
        type: String
    },
    courriel: {
        type: String
    },
    cell: {
        type: String
    },
    compagnie: {
        type: String
    },
    adresse: {
        type: String
    },
    ville: {
        type: String
    },
    codePostal: {
        type: String
    },
    telPrincipal: {
        type: String
    },
    province: {
        type: String
    },
    pays: {
        type: String
    },
    fax: {
        type: String
    },
    telSecondaire: {
        type: String
    },
    memo: {
        type: String
    },
    memoAVenir: {
        type: String
    },
    noExTaxeProv: {
        type: String
    },
    noExTaxeFed: {
        type: String
    },
    selectStatut: {
        type: String
    },
    selectSource: {
        type: String
    },
    modifPar: {
        type: String
    },
    modif: {
        type: Date
    },
    dateDernEv: {
        type: Date
    },
    creerPar: {
        type: String
    },
    dateCree: {
        type: Date,
        default: Date.now
    }
});

clientSchema.pre('save', function (next) {
    var doc = this;
    genSequence.next(function (nextSeq) {
        doc.noClient = nextSeq;
        next();
    });
});

/*
clientSchema.pre('remove', function (next) {
    var doc = this;
    Evenement.remove({
        client_FK: doc_id
    }).exec();
    next();
});
*/


module.exports = mongoose.model('Client', clientSchema);
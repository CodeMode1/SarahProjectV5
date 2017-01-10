var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Client = require('../models/client');
var Evenement = require('../models/evenement');
var ObjectId = require('mongodb').ObjectID;

router.get('/', function (req, res, next) {
    var getClients = Client.find();

    getClients.sort({
            dateCree: 'desc'
        })
        .exec(function (err, results) {
            if (err) {
                return res.status(404).json({
                    title: 'erreur produite',
                    error: err
                });
            }
            res.status(200).json({
                message: 'succès',
                obj: results
            });
        });
});


router.get('/:noClient', function (req, res, next) {
    var noClient = req.params.noClient;
    Client.findOne({
        noClient: noClient
    }, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'erreur produite',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'Client Introuvable',
                error: {
                    message: 'Aucun client avec ce code'
                }
            });
        }
        res.status(200).json({
            message: 'succès',
            obj: doc
        });
    });

});

/* wildcard : "joker" créer un index Text sur tous les champs d'un document de la collection client:
    db.clients.createIndex({"$**":"text"}) dans le mongo shell. (un index Text par collection) */

router.get('/search/:specialSearch', function (req, res, next) {
    var specialSearch = req.params.specialSearch;

    Client.find({
        $text: {
            $search: specialSearch,
            $caseSensitive: false
        }
    }, {
        score: {
            $meta: "textScore"
        }
    }).sort({
        score: {
            $meta: "textScore"
        }
    }).limit(10).exec(function (err, results) {
        if (err) {
            return res.status(404).json({
                title: 'erreur produite',
                error: err
            });
        }
        if (!results || !results.length) {
            return res.status(404).json({
                title: 'Clients Introuvables',
                error: {
                    message: 'Aucuns clients avec ces informations'
                }
            });
        }
        res.status(200).json({
            message: 'succès',
            obj: results
        });
    })
});


/* middleware : requêtes voyagent de haut en bas. ( defensive programming)
   seulement un User loggué peut créer, modifier et supprimer des clients
*/

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, jwtDecode) {
        if (err) {
            return res.status(401).json({
                title: 'Authentification échouée',
                error: err
            });
        }
        // sortir du middleware pour aller à la prochaine requête
        next();
    });
});


/* créer un client
 */

router.post('/', function (req, res, next) {
    var jwtDecode = jwt.decode(req.query.token);

    User.findById(jwtDecode.user._id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'erreur produite',
                error: err
            });
        }
        var client = new Client({
            prenom: req.body.prenom,
            nom: req.body.nom,
            noCompte: req.body.noCompte,
            courriel: req.body.courriel,
            cell: req.body.cell,
            compagnie: req.body.compagnie,
            adresse: req.body.adresse,
            ville: req.body.ville,
            codePostal: req.body.codePostal,
            telPrincipal: req.body.telPrincipal,
            province: req.body.province,
            pays: req.body.pays,
            fax: req.body.fax,
            telSecondaire: req.body.telSecondaire,
            memo: req.body.memo,
            memoAVenir: req.body.memoAVenir,
            noExTaxeProv: req.body.noExTaxeProv,
            noExTaxeFed: req.body.noExTaxeFed,
            selectStatut: req.body.selectStatut,
            selectSource: req.body.selectSource,
            modifPar: req.body.modifPar,
            modif: req.body.modif,
            dateDernEv: req.body.dateDernEv,
            creerPar: doc.prenom + " " + doc.nom
        });
        client.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'impossible de sauvegarder le client',
                    error: err
                });
            }
            res.status(201).json({
                message: 'client sauvegarder',
                obj: result
            });
        });
    });
});

/*  Modifier un client
 */

router.put('/:id', function (req, res, next) {
    var jwtDecode = jwt.decode(req.query.token);

    User.findById(jwtDecode.user._id, function (err, user) {
        if (err) {
            return res.status(404).json({
                title: 'erreur produite',
                error: err
            });
        }
        Client.findById(req.params.id, function (err, doc) {
            if (err) {
                return res.status(404).json({
                    title: 'erreur produite',
                    error: err
                });
            }
            var update = {
                clientId: req.body.clientId,
                noClient: req.body.noClient,
                prenom: req.body.prenom,
                nom: req.body.nom,
                noCompte: req.body.noCompte,
                courriel: req.body.courriel,
                cell: req.body.cell,
                compagnie: req.body.compagnie,
                adresse: req.body.adresse,
                ville: req.body.ville,
                codePostal: req.body.codePostal,
                telPrincipal: req.body.telPrincipal,
                province: req.body.province,
                pays: req.body.pays,
                fax: req.body.fax,
                telSecondaire: req.body.telSecondaire,
                memo: req.body.memo,
                memoAVenir: req.body.memoAVenir,
                noExTaxeProv: req.body.noExTaxeProv,
                noExTaxeFed: req.body.noExTaxeFed,
                selectStatut: req.body.selectStatut,
                selectSource: req.body.selectSource,
                modifPar: user.prenom + " " + user.nom,
                modif: new Date(),
                dateDernEv: doc.dateDernEv,
                creerPar: doc.creerPar
            };
            Client.findByIdAndUpdate(req.params.id, update, function (err, result) {
                if (err) {
                    return res.status(404).json({
                        title: 'erreur produite',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'success',
                    obj: result
                });
            });
        });
    });
});

/*  Supprimer un client
 */

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    //chercher FK evenement relie à un client(son id)
    Client.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'erreur produite',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'aucun client trouvé',
                error: {
                    message: 'client introuvable'
                }
            });
        }
        doc.remove(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'erreur produite',
                    error: err
                });
            }
            res.status(201).json({
                message: 'succès',
                obj: result
            });
        });
    });
});

module.exports = router;
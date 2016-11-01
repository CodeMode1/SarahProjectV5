var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Evenement = require('../models/evenement');

/*  populate va chercher les objets Clients par la FK pointé sur CLient.
    si pas populate, let get renvoit des Ids.
    Todo: populate, retourner seulement les champs nécessaires de l'objet
            .populate('client_FK')
*/
router.get('/', function (req, res, next) {
    var getEvenements = Evenement.find();

    getEvenements.sort({
            dateCree: 'desc'
        })
        .limit(10)
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

router.get('/:noEvenement', function (req, res, next) {
    var noEvenement = req.params.noEvenement;
    Evenement.findOne({
        noEvenement: noEvenement
    }, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'erreur produite',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'Evenement introuvable',
                error: {
                    message: 'Aucun evenement avec ce No'
                }
            });
        }
        res.status(200).json({
            message: 'succès',
            obj: doc
        });
    });
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

/* créer un évènement
    evenement.client_Fk = req.body.client_FK;
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
        var evenement = new Evenement({
            nom: req.body.nom,
            dateEvenement: req.body.dateEvenement,
            contact: req.body.contact,
            client: req.body.client,
            selectEtat: req.body.selectEtat,
            dateSoumission: req.body.dateSoumission,
            dateConfirmation: req.body.dateConfirmation,
            dateFacturation: req.body.dateFacturation,
            dateNonRetenu: req.body.dateNonRetenu,
            dateAnnulation: req.body.dateAnnulation,
            notes: req.body.notes,
            validationTache: req.body.validationTache,
            creerPar: doc.prenom + " " + doc.nom,
            modifPar: req.body.modifPar,
            modif: req.body.modif
        });
        evenement.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'erreur produite',
                    error: err
                });
            }
            res.status(201).json({
                message: 'evenement sauvegarder',
                obj: result
            });
        });
    });
});


/*  Modifier un évènement
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
        Evenement.findById(req.params.id, function (err, doc) {
            if (err) {
                return res.status(404).json({
                    title: 'erreur produite',
                    error: err
                })
            }
            var update = {
                evenementId: req.body.evenementId,
                noEvenement: req.body.noEvenement,
                nom: req.body.nom,
                dateEvenement: req.body.dateEvenement,
                contact: req.body.contact,
                client: req.body.client,
                selectEtat: req.body.selectEtat,
                dateSoumission: req.body.dateSoumission,
                dateConfirmation: req.body.dateConfirmation,
                dateFacturation: req.body.dateFacturation,
                dateNonRetenu: req.body.dateNonRetenu,
                dateAnnulation: req.body.dateAnnulation,
                notes: req.body.notes,
                validationTache: req.body.validationTache,
                creerPar: req.body.creerPar,
                dateCree: req.body.dateCree,
                modifPar: user.prenom + " " + user.nom,
                modif: new Date(),
                client_FK: req.body.client_FK
            };
            Evenement.findByIdAndUpdate(req.params.id, update, function (err, result) {
                if (err) {
                    return res.status(404).json({
                        title: 'erreur produite',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'succès',
                    obj: result
                })
            });
        });
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Ressource = require('../models/ressource');

router.get('/', function (req, res, next) {

    Ressource.find(function (err, results) {
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

/* créer une ressource
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
        var ressource = new Ressource({
            nom: req.body.nom
        });
        ressource.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'erreur produite',
                    error: err
                });
            }
            res.status(201).json({
                message: 'ressource sauvegarder',
                obj: result
            });
        });
    });
});

/*  Modifier une ressource
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
        Ressource.findById(req.params.id, function (err, doc) {
            if (err) {
                return res.status(404).json({
                    title: 'erreur produite',
                    error: err
                })
            }
            var update = {
                nom: req.body.nom
            };
            Ressource.findByIdAndUpdate(req.params.id, update, function (err, result) {
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

/*  Supprimer une ressource
 */

router.delete('/:id', function (req, res, next) {
    Ressource.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'erreur produite',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'aucune ressource trouvée',
                error: {
                    message: 'ressource introuvable'
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
var express = require('express');
var router = express.Router();
var Evenement = require('../models/evenement');

router.get('/', function (req, res, next) {
    var getEvenements = Evenement.find();
    var objs = [];

    getEvenements
        .populate('activites')
        .exec(function (err, results) {
            if (err) {
                return res.status(404).json({
                    title: 'erreur produite',
                    error: err
                });
            }
            results.forEach(function (entry) {
                "use strict";
                for (let i = 0; i < entry.activites.length; i++) {
                    if (entry.activites[i].ressourcesCheck != null && entry.activites[i].ressourcesCheck != undefined) {
                        console.log("resourceCheck defined");
                        for (let j = 0; j < entry.activites[i].ressourcesCheck.length; j++) {
                            console.log("resourceCheck.length = " + entry.activites[i].ressourcesCheck.length);
                            var startDate = new Date(Date.parse(entry.activites[i].debut));
                            var endDate = new Date(Date.parse(entry.activites[i].fin));
                            let activite = {
                                TaskID: entry.activites[i]._id,
                                Title: entry.activites[i].nom,
                                Start: startDate,
                                End: endDate,
                                Description: entry.nom,
                                OwnerID: entry.activites[i].ressourcesCheck[j]
                            };
                            objs.push(activite);
                            console.log(entry.noEvenement + " : " + entry.nom);
                            console.log(entry.activites[i].nom);
                        }
                    }
                }
            });
            res.status(200).json(objs);
        });
});

module.exports = router;
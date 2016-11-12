var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*  requêtes voyagent top à bottom.
    MIDDLEWARE: fonction appliquée sur la requête.
*/

//import les routes de l'app
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/users');
var clientRoutes = require('./routes/clients');
var evenementRoutes = require('./routes/evenements');

//Express framework.
var app = express();
mongoose.connect('localhost:27017/sarahdb2');

//setup du view engine. Le template choisi est HandleBars, syntax html avec embedded variables.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// décommenter après placer favicon dans /public
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(logger('dev'));
//parser le body de la requête. Extract Json data ou url-encoded data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
//exposer le dossier public au browser.
app.use(express.static(path.join(__dirname, 'public')));

//si client, serveur ne sont pas servis sur le même port.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

//Routing: diriger les requêtes au bon routeur.
app.use('/user', userRoutes);
app.use('/client', clientRoutes);
app.use('/evenement', evenementRoutes);
app.use('/', appRoutes);

//catch 404 et passe au error handler.
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handlers.

//error handler développement.
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

//error handler production.
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('erreur', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
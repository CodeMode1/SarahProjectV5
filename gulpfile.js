var gulp = require('gulp');
var inject = require('gulp-inject');

//import gulp dependencies. 
var gulpTypescript = require('gulp-typescript');
//SourceMaps: JS fichiers non-minifiés et combinés pour faciliter débogguage.(fichiers JS originels).
var gulpSourcemaps = require('gulp-sourcemaps');

var del = require('del');

//dossier développement, Production, dépendances production Node Modules.
var appDev = './assets/app/';
var appProd = './public/js/app/';
var vendor = './public/js/vendor';

//loader configuration compilation typescript.
var tsconfig = gulpTypescript.createProject('tsconfig.json');

//compilation tous TS fichiers du dossier dév en JS fichiers dans dossier production.
gulp.task('build-ts', function () {
    return gulp.src(appDev + '/**/*.ts')
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(tsconfig))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(appProd));
});

//copier html et css dans dossier production.
gulp.task('build-copy', function () {
    return gulp.src([appDev + '**/*.html', appDev + '**/*.htm', appDev + '**/*.css'])
        .pipe(gulp.dest(appProd));
});

//nettoyer le dossier de production: reflétée la plus récente version. 
gulp.task('clean', function () {
    del(appProd + '/**/*');
});

//dépendances production du Node Modules de Angular2 et dépendances.
gulp.task('vendor', function () {
    gulp.src('./node_modules/@angular/**')
        .pipe(gulp.dest(vendor + '/@angular'));

    //es6-shim
    gulp.src('./node_modules/es6-shim/**')
        .pipe(gulp.dest(vendor + '/es6-shim'));

    //reflect metadata
    gulp.src('./node_modules/reflect-metadata/**')
        .pipe(gulp.dest(vendor + '/reflect-metadata/'));

    //rxjs
    gulp.src('./node_modules/rxjs/**')
        .pipe(gulp.dest(vendor + '/rxjs/'));

    //systemjs
    gulp.src('./node_modules/systemjs/**')
        .pipe(gulp.dest(vendor + '/systemjs/'));

    //ng2-bootstrap
    gulp.src('./node_modules/ng2-bootstrap/**')
        .pipe(gulp.dest(vendor + '/ng2-bootstrap/'));

    //ng2 datepicker
    gulp.src('./node_modules/ng2-datetime-picker/**')
        .pipe(gulp.dest(vendor + '/ng2-datetime-picker/'));

    //moment
    gulp.src('./node_modules/moment/**')
        .pipe(gulp.dest(vendor + '/moment/'));

    //zonejs
    return gulp.src('./node_modules/zone.js/**')
        .pipe(gulp.dest(vendor + '/zone.js/'));
});

//task qui build dynamiquement les script css du folder public(css global du projet) dans index.hbs.
gulp.task('inject', function () {
    //src fichiers
    var injectSrc = gulp.src('./public/stylesheets/*.css', {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public/'
    }
    return gulp.src('./views/index.hbs')
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./views'));
});

//task qui surveille changement dans fichiers TS et html,htm,css du dossier dév et exécute un build.
gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(appDev + '**/*.{html,htm,css}', ['build-copy']);
});

//task défaut si npm run gulp.Démarre le watch, démarre un premier build/build-copy, build des dépendances production Angular. 
gulp.task('default', ['inject', 'watch', 'build-ts', 'build-copy', 'vendor']);
//task de build pour la production(déploiement).
gulp.task('build', ['build-ts', 'build-copy', 'vendor']);
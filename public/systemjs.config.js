(function (global) {
    //SYSTEM JS: module loader.
    //map permet au sys loader de mapper l'app.
    var map = {
        'app': 'js/app',
        'rxjs': 'js/vendor/rxjs',
        '@angular': 'js/vendor/@angular',
        'ng2-datetime-picker': 'js/vendor/ng2-datetime-picker/dist',
        'ng2-pagination': 'js/vendor/ng2-pagination',

        '@angular/core': 'js/vendor/@angular/core/bundles/core.umd.js',
        '@angular/common': 'js/vendor/@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'js/vendor/@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'js/vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'js/vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'js/vendor/@angular/http/bundles/http.umd.js',
        '@angular/router': 'js/vendor/@angular/router/bundles/router.umd.js',
        '@angular/forms': 'js/vendor/@angular/forms/bundles/forms.umd.js',

        '@angular/core/testing': 'js/vendor/@angular/core/bundles/core-testing.umd.js',
        '@angular/common/testing': 'js/vendor/@angular/common/bundles/common-testing.umd.js',
        '@angular/compiler/testing': 'js/vendor/@angular/compiler/bundles/compiler-testing.umd.js',
        '@angular/http/testing': 'js/vendor/@angular/http/bundles/http-testing.umd.js',
        '@angular/platform-browser/testing': 'js/vendor/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
        '@angular/platform-browser-dynamic/testing': 'js/vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
        '@angular/router/testing': 'js/vendor/@angular/router/bundles/router-testing.umd.js'
    };

    //packages dit au sys loader comment loader quand pas nom fichier ou/et pas extension.
    var packages = {
        'app': {
            main: 'boot.js',
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'ng2-datetime-picker': {
            main: 'ng2-datetime-picker.umd.js',
            defaultExtension: 'js'
        },
        'ng2-pagination': {
            main: './index.js',
            defaultExtension: 'js'
        }
    };

    var config = {
        map: map,
        packages: packages
    };

    //filterSystemConfig - index.html peut modifier config avant d'être enregistrée.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);
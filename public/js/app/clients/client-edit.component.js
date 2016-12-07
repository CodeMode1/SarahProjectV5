"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var client_service_1 = require('./client.service');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var client_1 = require('./client');
var erreur_service_1 = require('../erreurs/erreur.service');
var EditClientComponent = (function () {
    function EditClientComponent(_formBuilder, _clientService, _erreurService, _activatedRoute, _router) {
        this._formBuilder = _formBuilder;
        this._clientService = _clientService;
        this._erreurService = _erreurService;
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this.identification = "Identification";
        this.gestion = "Gestion";
        this.myClient = new client_1.Client();
        this.modeSoumission = true;
        this.formActualiser = true;
        this.formCopie = true;
        this.urlCopie = this._router.url;
    }
    EditClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._activatedRoute.params.subscribe(function (params) {
            if (params.hasOwnProperty('id')) {
                _this.estNouveau = false;
                _this.codeClient = +params['id'];
                _this._clientService.getClient(_this.codeClient)
                    .subscribe(function (data) {
                    _this.myClient = data;
                    console.log("client a modif: ");
                    console.log(_this.myClient);
                    // Si URL contient "copie", alors vide les champs du client copié.
                    if (_this.urlCopie.includes("copie")) {
                        _this.formActualiser = false;
                        _this.copierClient();
                    }
                    console.log("client à copier vierge : ");
                    console.log(_this.myClient);
                }, function (error) { return _this._erreurService.handleErreur(error); });
                console.log('url : ');
                console.log(_this._router.url);
                if (_this.urlCopie.includes("copie")) {
                    console.log("set mode copie");
                    _this.estNouveau = true;
                }
            }
            else {
                _this.estNouveau = true;
            }
            console.log("est ce que nouveau : ");
            console.log(_this.estNouveau);
            // Init form
            _this.creerForm();
        });
        //this.testCP();
    };
    EditClientComponent.prototype.creerForm = function () {
        var noClient = null;
        var prenom = '';
        var nom = '';
        var noCompte = '';
        var courriel = '';
        var cell = '';
        var compagnie = '';
        var adresse = '';
        var ville = '';
        var codePostal = '';
        var telPrincipal = '';
        var province = '';
        var pays = '';
        var fax = '';
        var telSecondaire = '';
        var memo = '';
        var memoAVenir = '';
        var noExTaxeProv = '';
        var noExTaxeFed = '';
        var selectStatut = '';
        var selectSource = '';
        var modifPar = '';
        var modif = null;
        var dateDernEv = null;
        var creePar = '';
        var cree = null;
        if (!this.estNouveau) {
            // Setter la valeur du client au form control.
            this.myClient.noClient = noClient;
            this.myClient.prenom = prenom;
            this.myClient.nom = nom;
            this.myClient.noCompte = noCompte;
            this.myClient.courriel = courriel;
            this.myClient.cell = cell;
            this.myClient.compagnie = compagnie;
            this.myClient.adresse = adresse;
            this.myClient.ville = ville;
            this.myClient.codePostal = codePostal;
            this.myClient.telPrincipal = telPrincipal;
            this.myClient.province = province;
            this.myClient.pays = pays;
            this.myClient.fax = fax;
            this.myClient.telSecondaire = telSecondaire;
            this.myClient.memo = memo;
            this.myClient.memoAVenir = memoAVenir;
            this.myClient.noExTaxeProv = noExTaxeProv;
            this.myClient.noExTaxeFed = noExTaxeFed;
            this.myClient.selectStatut = selectStatut;
            this.myClient.selectSource = selectSource;
            this.myClient.modifPar = modifPar;
            this.myClient.modif = modif;
            this.myClient.dateDernEv = dateDernEv;
            this.myClient.creerPar = creePar;
            this.myClient.dateCree = cree;
        }
        // Creer le form avec des blancs ou les valeurs du client cherché.
        this.editClientForm = this._formBuilder.group({
            noClient: [noClient],
            prenom: [prenom],
            nom: [nom, forms_1.Validators.required],
            noCompte: [noCompte],
            courriel: [courriel, this.estCourrielOK],
            cell: [cell],
            compagnie: [compagnie],
            adresse: [adresse],
            ville: [ville],
            codePostal: [codePostal, this.estCodePostalOK],
            telPrincipal: [telPrincipal, this.estTelephoneOK],
            province: [province],
            pays: [pays],
            fax: [fax],
            telSecondaire: [telSecondaire],
            memo: [memo],
            memoAVenir: [memoAVenir],
            noExTaxeProv: [noExTaxeProv],
            noExTaxeFed: [noExTaxeFed],
            selectStatut: [selectStatut],
            selectSource: [selectSource],
            modifPar: [modifPar],
            modif: [modif],
            dateDernEv: [dateDernEv],
            creePar: [creePar],
            cree: [cree]
        });
    };
    EditClientComponent.prototype.copierClient = function () {
        this.myClient.clientId = null;
        this.myClient.noClient = null;
        this.myClient.modifPar = null;
        this.myClient.modif = null;
        this.myClient.dateDernEv = null;
        this.myClient.creerPar = null;
        this.myClient.dateCree = null;
    };
    EditClientComponent.prototype.copieCeClient = function () {
        this.copierClient();
        this.formCopie = false;
        this.modeSoumission = true;
    };
    EditClientComponent.prototype.actualiserClient = function () {
        var _this = this;
        if (this.myClient.noClient != null && (this.myClient.noClient).toString() != "") {
            this._clientService.getClient(Number(this.myClient.noClient))
                .subscribe(function (data) {
                console.log(_this.myClient.noClient);
                _this.myClient = data;
            }, function (error) {
                _this._erreurService.handleErreur(error);
            });
        }
    };
    /* Réagir au changement usager, cet evenement est applique sur tous les inputs du form.
         selon la syntax: (ngModelChange)="onUserChange($event)" */
    EditClientComponent.prototype.onUserChange = function () {
        // Enable Enregistrer bouton.
        this.modeSoumission = true;
    };
    EditClientComponent.prototype.formatCP = function (input) {
        // Enlever les espaces, globalement.
        var chaine = input.value.replace(/\s+/g, "");
        // Ajouter l'espace au 3eme carac.
        if (chaine.length > 3) {
            // Placer l'espace à la bonne place.
            chaine = chaine.substr(0, 3) + " " + chaine.substr(3, 3);
        }
        // Transformer le code Postal en majuscule.
        input.value = chaine.toUpperCase();
    };
    EditClientComponent.prototype.formatTP = function (input) {
        // Enlever tout ce qui n'est pas chiffre, globalement.
        var chaine = input.value.replace(/[^0-9]/g, "");
        console.log(chaine);
        // Au 11eme carac tapé, je reconstruis le tel avec ses bons chiffres.
        if (chaine.length > 10) {
            chaine = chaine.substr(1, 3) + chaine.substr(5, 3) + chaine.substr(9, 4);
        }
        // Au 10eme carac, je formatte selon (XXX)XXX-XXXX.
        if (chaine.length === 10) {
            chaine = "(" + chaine.substr(0, 3) + ")" + chaine.substr(3, 3) + "-" + chaine.substr(6, 4);
        }
        /* si ces if sont inversés, chaine non-formattée.
           car au 10eme carac :
           chaine.length > 10 et donc la chaine revient non-formattée. */
        input.value = chaine;
    };
    EditClientComponent.prototype.estCodePostalOK = function (control) {
        // Validation a réussi: pas de valeur tapée
        if (!control.value) {
            return null;
        }
        /* Format regex canadien :
            ^ : chaine commence, $ : fin séquence
            lettre : pas de D, F, I, O, Q U
            1er lettre: pas de W, Z, chiffre: \d, lettre, blanc, chiffre, lettre, chiffre */
        var regexCP = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ ]\d[ABCEGHJKLMNPRSTVWXYZ]\d$/;
        if (!control.value.match(regexCP)) {
            return { codePostalInvalide: true };
        }
        // Validation résussie
        return null;
    };
    EditClientComponent.prototype.estTelephoneOK = function (control) {
        if (!control.value) {
            return null;
        }
        /* Format regex canadien:
           ^ : sequence commence, $ : fin sequence
           ( , chiffre(x3), ) , chiffre (x3), - , chiffre (x4) */
        var regexTP = /^\u0028\d{3}\u0029\d{3}\u002D\d{4}$/;
        if (!control.value.match(regexTP)) {
            return { telephoneInvalide: true };
        }
        // Validation réussie
        return null;
    };
    // Validation: retourne null si valide et un boolean si erreur.
    EditClientComponent.prototype.estCourrielOK = function (control) {
        if (control.value) {
            var regexCourriel = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (!control.value.match(regexCourriel))
                return { courrielInvalide: true };
        }
        // Validation réussie
        return null;
    };
    EditClientComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log("cree client : ");
        console.log(this.editClientForm.value);
        // IF NOUVEAU, APPEL CRÉÉ, SINON APPEL UPDATE
        if (this.estNouveau || !this.formCopie) {
            this._clientService.creerClient(this.myClient)
                .subscribe(function (data) {
                console.log('data du serveur :');
                console.log(data);
                // Sauver data du serveur dans myClient.
                _this.myClient = data;
                // Voir le message de sauvegarde succès.
                _this.sauvegardeClient = true;
            }, function (error) { return _this._erreurService.handleErreur(error); });
            this.formCopie = true;
        }
        else {
            this._clientService.updateClient(this.myClient)
                .subscribe(function (data) { return console.log(data); }, function (error) { return _this._erreurService.handleErreur(error); });
        }
        this.modeSoumission = false;
    };
    EditClientComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    EditClientComponent.prototype.testCP = function () {
        //retoune null (valide)
        //console.log(this.estCodePostalOK('H2S 0B5')); //ok
        //console.log(this.estCodePostalOK('h2s 0b5')); //ok
        //console.log(this.estCodePostalOK('h2s0b5'));  //ok
        //retourne true (fail)
        //console.log(this.estCodePostalOK('Z3V H2S')); //Ok
        //console.log(this.estCodePostalOK('z3vh2s'));  //ok
        //console.log(this.estCodePostalOK('B3V H2'));  //ok
    };
    EditClientComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-edit-client',
            templateUrl: 'client-edit.component.html',
            styles: ["\n        .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n        \n        .form-group{\n            float:left;\n        }\n\n        .divFooter{\n            text-align:center;\n        }\n\n        .footer{\n            border-top: 2px solid black;\n        }\n\n        button{  \n            display:block;\n            margin: 0 auto;\n        }\n\n        .space {\n            padding: 2%;\n        }\n\n        h2{\n            padding-top:1%;\n            padding-bottom:2%;\n        }\n\n        .title{\n            text-align:left;\n        }\n\n        .memo{\n            float: left;\n            clear: both;\n            padding: 0 0 2% 0;\n        }\n\n        textarea{\n            resize: none;\n        }\n\n        .gestionInputs{\n            float: left;\n            clear: both;\n        }\n\n        .dropdown{\n            padding:0;\n        }\n        .alert-success{\n            text-align:center;\n        }\n    "
            ]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, client_service_1.ClientService, erreur_service_1.ErreurService, router_1.ActivatedRoute, router_1.Router])
    ], EditClientComponent);
    return EditClientComponent;
}());
exports.EditClientComponent = EditClientComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudHMvY2xpZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0QsK0JBQThCLGtCQUFrQixDQUFDLENBQUE7QUFDakQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQXVDLGlCQUFpQixDQUFDLENBQUE7QUFFekQsdUJBQXVCLFVBQVUsQ0FBQyxDQUFBO0FBQ2xDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBdUUxRDtJQWNJLDZCQUFvQixZQUF5QixFQUFVLGNBQTZCLEVBQVUsY0FBNkIsRUFDL0csZUFBK0IsRUFBVSxPQUFlO1FBRGhELGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUMvRyxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2hFLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDcEMsQ0FBQztJQUVGLHNDQUFRLEdBQVI7UUFBQSxpQkFzQ0M7UUFyQ0csSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ3JELFVBQUMsTUFBVztZQUNSLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxj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QUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFBQyxJQUFJLENBQUEsQ0FBQztZQUNILElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQzFDLFNBQVMsQ0FDTixVQUFBLElBQUksSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQWpCLENBQWlCLEVBQ3pCLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQ25ELENBQUM7UUFDVixDQUFDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTyxvQ0FBTSxHQUFkO1FBQ0ksdUJBQXVCO1FBQ25CLG9EQUFvRDtRQUNwRCxvREFBb0Q7UUFDcEQsb0RBQW9EO1FBRXhELHNCQUFzQjtRQUNsQixvREFBb0Q7UUFDcEQsb0RBQW9EO1FBQ3BELG9EQUFvRDtJQUM1RCxDQUFDO0lBNVhMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBQyw0QkFBNEI7WUFDeEMsTUFBTSxFQUFFLENBQUMsNitCQTBEUjthQUNBO1NBQ0osQ0FBQzs7MkJBQUE7SUE2VEYsMEJBQUM7QUFBRCxDQTVUQSxBQTRUQyxJQUFBO0FBNVRZLDJCQUFtQixzQkE0VC9CLENBQUEiLCJmaWxlIjoiY2xpZW50cy9jbGllbnQtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuL2NsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1JYJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnLi9jbGllbnQnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcblxyXG5pbnRlcmZhY2UgUmVzdWx0YXRWYWxpZGF0aW9uIHtcclxuICAgIFtjbGU6IHN0cmluZ106IGJvb2xlYW47XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktZWRpdC1jbGllbnQnLFxyXG4gICAgdGVtcGxhdGVVcmw6J2NsaWVudC1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAub3V0ZXJ7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAxJSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAuZm9ybS1ncm91cHtcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5kaXZGb290ZXJ7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmZvb3RlcntcclxuICAgICAgICAgICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIGJsYWNrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnV0dG9ueyAgXHJcbiAgICAgICAgICAgIGRpc3BsYXk6YmxvY2s7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNwYWNlIHtcclxuICAgICAgICAgICAgcGFkZGluZzogMiU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoMntcclxuICAgICAgICAgICAgcGFkZGluZy10b3A6MSU7XHJcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOjIlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnRpdGxle1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmxlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAubWVtb3tcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMiUgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHRhcmVhe1xyXG4gICAgICAgICAgICByZXNpemU6IG5vbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZ2VzdGlvbklucHV0c3tcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmRyb3Bkb3due1xyXG4gICAgICAgICAgICBwYWRkaW5nOjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5hbGVydC1zdWNjZXNze1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcbiAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFZGl0Q2xpZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgaWRlbnRpZmljYXRpb246IHN0cmluZztcclxuICAgIGdlc3Rpb246IHN0cmluZztcclxuICAgIGVkaXRDbGllbnRGb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBmb3JtQ29waWU6IGJvb2xlYW47XHJcbiAgICBmb3JtQWN0dWFsaXNlcjogYm9vbGVhbjtcclxuICAgIG1vZGVTb3VtaXNzaW9uOiBib29sZWFuO1xyXG4gICAgc2F1dmVnYXJkZUNsaWVudDogYm9vbGVhbjtcclxuICAgIG15Q2xpZW50IDogQ2xpZW50O1xyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgY29kZUNsaWVudDogbnVtYmVyO1xyXG4gICAgdXJsQ29waWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgX2NsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsIHByaXZhdGUgX2VycmV1clNlcnZpY2U6IEVycmV1clNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgIHRoaXMuaWRlbnRpZmljYXRpb24gPSBcIklkZW50aWZpY2F0aW9uXCI7XHJcbiAgICAgICAgdGhpcy5nZXN0aW9uID0gXCJHZXN0aW9uXCI7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudCA9IG5ldyBDbGllbnQoKTtcclxuICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZvcm1BY3R1YWxpc2VyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZvcm1Db3BpZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cmxDb3BpZSA9IHRoaXMuX3JvdXRlci51cmw7XHJcbiAgICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyBcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuX2FjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChwYXJhbXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYocGFyYW1zLmhhc093blByb3BlcnR5KCdpZCcpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvZGVDbGllbnQgPSArcGFyYW1zWydpZCddO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsaWVudFNlcnZpY2UuZ2V0Q2xpZW50KHRoaXMuY29kZUNsaWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlDbGllbnQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IGEgbW9kaWY6IFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15Q2xpZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaSBVUkwgY29udGllbnQgXCJjb3BpZVwiLCBhbG9ycyB2aWRlIGxlcyBjaGFtcHMgZHUgY2xpZW50IGNvcGnDqS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnVybENvcGllLmluY2x1ZGVzKFwiY29waWVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1BY3R1YWxpc2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29waWVyQ2xpZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IMOgIGNvcGllciB2aWVyZ2UgOiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUNsaWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cmwgOiAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fcm91dGVyLnVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudXJsQ29waWUuaW5jbHVkZXMoXCJjb3BpZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldCBtb2RlIGNvcGllXCIpOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSB0cnVlOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXN0Tm91dmVhdSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVzdCBjZSBxdWUgbm91dmVhdSA6IFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZXN0Tm91dmVhdSk7XHJcbiAgICAgICAgICAgICAgICAvLyBJbml0IGZvcm1cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlZXJGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApOyAgICAgIFxyXG4gICAgICAgIC8vdGhpcy50ZXN0Q1AoKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVlckZvcm0oKXtcclxuICAgICAgICBsZXQgbm9DbGllbnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBwcmVub20gPSAnJztcclxuICAgICAgICBsZXQgbm9tID0gJyc7XHJcbiAgICAgICAgbGV0IG5vQ29tcHRlID0gJyc7XHJcbiAgICAgICAgbGV0IGNvdXJyaWVsID0gJyc7XHJcbiAgICAgICAgbGV0IGNlbGwgPSAnJztcclxuICAgICAgICBsZXQgY29tcGFnbmllID0gJyc7XHJcbiAgICAgICAgbGV0IGFkcmVzc2UgPSAnJztcclxuICAgICAgICBsZXQgdmlsbGUgPSAnJztcclxuICAgICAgICBsZXQgY29kZVBvc3RhbCA9ICcnO1xyXG4gICAgICAgIGxldCB0ZWxQcmluY2lwYWwgPSAnJztcclxuICAgICAgICBsZXQgcHJvdmluY2UgPSAnJztcclxuICAgICAgICBsZXQgcGF5cyA9ICcnO1xyXG4gICAgICAgIGxldCBmYXggPSAnJztcclxuICAgICAgICBsZXQgdGVsU2Vjb25kYWlyZSA9ICcnO1xyXG4gICAgICAgIGxldCBtZW1vID0gJyc7XHJcbiAgICAgICAgbGV0IG1lbW9BVmVuaXIgPSAnJztcclxuICAgICAgICBsZXQgbm9FeFRheGVQcm92ID0gJyc7XHJcbiAgICAgICAgbGV0IG5vRXhUYXhlRmVkID0gJyc7XHJcbiAgICAgICAgbGV0IHNlbGVjdFN0YXR1dCA9ICcnO1xyXG4gICAgICAgIGxldCBzZWxlY3RTb3VyY2UgPSAnJztcclxuICAgICAgICBsZXQgbW9kaWZQYXIgPSAnJztcclxuICAgICAgICBsZXQgbW9kaWYgPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlRGVybkV2ID0gbnVsbDtcclxuICAgICAgICBsZXQgY3JlZVBhciA9ICcnO1xyXG4gICAgICAgIGxldCBjcmVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgIC8vIFNldHRlciBsYSB2YWxldXIgZHUgY2xpZW50IGF1IGZvcm0gY29udHJvbC5cclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5ub0NsaWVudCA9IG5vQ2xpZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LnByZW5vbSA9IHByZW5vbTtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5ub20gPSBub207XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQubm9Db21wdGUgPSBub0NvbXB0ZTtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5jb3VycmllbCA9IGNvdXJyaWVsO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LmNlbGwgPSBjZWxsO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LmNvbXBhZ25pZSA9IGNvbXBhZ25pZTtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5hZHJlc3NlID0gYWRyZXNzZTtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC52aWxsZSA9IHZpbGxlO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LmNvZGVQb3N0YWwgPSBjb2RlUG9zdGFsO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LnRlbFByaW5jaXBhbCA9IHRlbFByaW5jaXBhbDtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5wcm92aW5jZSA9IHByb3ZpbmNlO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LnBheXMgPSBwYXlzO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LmZheCA9IGZheDtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC50ZWxTZWNvbmRhaXJlID0gdGVsU2Vjb25kYWlyZTtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5tZW1vID0gbWVtbztcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5tZW1vQVZlbmlyID0gbWVtb0FWZW5pcjtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5ub0V4VGF4ZVByb3YgPSBub0V4VGF4ZVByb3Y7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQubm9FeFRheGVGZWQgPSBub0V4VGF4ZUZlZDtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5zZWxlY3RTdGF0dXQgPSBzZWxlY3RTdGF0dXQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQuc2VsZWN0U291cmNlID0gc2VsZWN0U291cmNlO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50Lm1vZGlmUGFyID0gbW9kaWZQYXI7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQubW9kaWYgPSBtb2RpZjtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5kYXRlRGVybkV2ID0gZGF0ZURlcm5FdjtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5jcmVlclBhciA9IGNyZWVQYXI7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQuZGF0ZUNyZWUgPSBjcmVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlZXIgbGUgZm9ybSBhdmVjIGRlcyBibGFuY3Mgb3UgbGVzIHZhbGV1cnMgZHUgY2xpZW50IGNoZXJjaMOpLlxyXG4gICAgICAgICB0aGlzLmVkaXRDbGllbnRGb3JtID0gdGhpcy5fZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgICAgICBub0NsaWVudDogW25vQ2xpZW50XSxcclxuICAgICAgICAgICAgcHJlbm9tOiBbcHJlbm9tXSxcclxuICAgICAgICAgICAgbm9tOiBbbm9tLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgbm9Db21wdGU6IFtub0NvbXB0ZV0sXHJcbiAgICAgICAgICAgIGNvdXJyaWVsOiBbY291cnJpZWwsIHRoaXMuZXN0Q291cnJpZWxPS10sXHJcbiAgICAgICAgICAgIGNlbGw6IFtjZWxsXSxcclxuICAgICAgICAgICAgY29tcGFnbmllOiBbY29tcGFnbmllXSxcclxuICAgICAgICAgICAgYWRyZXNzZTogW2FkcmVzc2VdLFxyXG4gICAgICAgICAgICB2aWxsZTogW3ZpbGxlXSxcclxuICAgICAgICAgICAgY29kZVBvc3RhbDogW2NvZGVQb3N0YWwsIHRoaXMuZXN0Q29kZVBvc3RhbE9LXSxcclxuICAgICAgICAgICAgdGVsUHJpbmNpcGFsOiBbdGVsUHJpbmNpcGFsLCB0aGlzLmVzdFRlbGVwaG9uZU9LXSxcclxuICAgICAgICAgICAgcHJvdmluY2U6IFtwcm92aW5jZV0sXHJcbiAgICAgICAgICAgIHBheXM6IFtwYXlzXSxcclxuICAgICAgICAgICAgZmF4OiBbZmF4XSxcclxuICAgICAgICAgICAgdGVsU2Vjb25kYWlyZTogW3RlbFNlY29uZGFpcmVdLFxyXG4gICAgICAgICAgICBtZW1vOiBbbWVtb10sXHJcbiAgICAgICAgICAgIG1lbW9BVmVuaXI6IFttZW1vQVZlbmlyXSxcclxuICAgICAgICAgICAgbm9FeFRheGVQcm92OiBbbm9FeFRheGVQcm92XSxcclxuICAgICAgICAgICAgbm9FeFRheGVGZWQ6IFtub0V4VGF4ZUZlZF0sXHJcbiAgICAgICAgICAgIHNlbGVjdFN0YXR1dDogW3NlbGVjdFN0YXR1dF0sXHJcbiAgICAgICAgICAgIHNlbGVjdFNvdXJjZTogW3NlbGVjdFNvdXJjZV0sIFxyXG4gICAgICAgICAgICBtb2RpZlBhcjogW21vZGlmUGFyXSxcclxuICAgICAgICAgICAgbW9kaWY6IFttb2RpZl0sXHJcbiAgICAgICAgICAgIGRhdGVEZXJuRXY6IFtkYXRlRGVybkV2XSxcclxuICAgICAgICAgICAgY3JlZVBhcjogW2NyZWVQYXJdLFxyXG4gICAgICAgICAgICBjcmVlOiBbY3JlZV0gICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29waWVyQ2xpZW50KCl7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5jbGllbnRJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5ub0NsaWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5tb2RpZlBhciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5tb2RpZiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5kYXRlRGVybkV2ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15Q2xpZW50LmNyZWVyUGFyID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15Q2xpZW50LmRhdGVDcmVlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb3BpZUNlQ2xpZW50KCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29waWVyQ2xpZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdHVhbGlzZXJDbGllbnQoKXtcclxuICAgICAgICBpZih0aGlzLm15Q2xpZW50Lm5vQ2xpZW50ICE9IG51bGwgJiYgKHRoaXMubXlDbGllbnQubm9DbGllbnQpLnRvU3RyaW5nKCkgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWVudFNlcnZpY2UuZ2V0Q2xpZW50KE51bWJlcih0aGlzLm15Q2xpZW50Lm5vQ2xpZW50KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlDbGllbnQubm9DbGllbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlDbGllbnQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogUsOpYWdpciBhdSBjaGFuZ2VtZW50IHVzYWdlciwgY2V0IGV2ZW5lbWVudCBlc3QgYXBwbGlxdWUgc3VyIHRvdXMgbGVzIGlucHV0cyBkdSBmb3JtLlxyXG4gICAgICAgICBzZWxvbiBsYSBzeW50YXg6IChuZ01vZGVsQ2hhbmdlKT1cIm9uVXNlckNoYW5nZSgkZXZlbnQpXCIgKi9cclxuICAgICBvblVzZXJDaGFuZ2UoKXtcclxuXHJcbiAgICAgICAgIC8vIEVuYWJsZSBFbnJlZ2lzdHJlciBib3V0b24uXHJcbiAgICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSB0cnVlO1xyXG4gICAgIH1cclxuXHJcbiAgICBmb3JtYXRDUChpbnB1dCl7XHJcbiAgICAgICAgLy8gRW5sZXZlciBsZXMgZXNwYWNlcywgZ2xvYmFsZW1lbnQuXHJcbiAgICAgICAgdmFyIGNoYWluZSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoL1xccysvZywgXCJcIik7XHJcbiAgICAgICAgLy8gQWpvdXRlciBsJ2VzcGFjZSBhdSAzZW1lIGNhcmFjLlxyXG4gICAgICAgIGlmKGNoYWluZS5sZW5ndGggPiAzKXtcclxuICAgICAgICAgICAgLy8gUGxhY2VyIGwnZXNwYWNlIMOgIGxhIGJvbm5lIHBsYWNlLlxyXG4gICAgICAgICAgICBjaGFpbmUgPSBjaGFpbmUuc3Vic3RyKDAsMykgKyBcIiBcIiArIGNoYWluZS5zdWJzdHIoMywzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVHJhbnNmb3JtZXIgbGUgY29kZSBQb3N0YWwgZW4gbWFqdXNjdWxlLlxyXG4gICAgICAgIGlucHV0LnZhbHVlID0gY2hhaW5lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybWF0VFAoaW5wdXQpe1xyXG4gICAgICAgIC8vIEVubGV2ZXIgdG91dCBjZSBxdWkgbidlc3QgcGFzIGNoaWZmcmUsIGdsb2JhbGVtZW50LlxyXG4gICAgICAgIHZhciBjaGFpbmUgPSBpbnB1dC52YWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coY2hhaW5lKTtcclxuXHJcbiAgICAgICAgLy8gQXUgMTFlbWUgY2FyYWMgdGFww6ksIGplIHJlY29uc3RydWlzIGxlIHRlbCBhdmVjIHNlcyBib25zIGNoaWZmcmVzLlxyXG4gICAgICAgIGlmKGNoYWluZS5sZW5ndGggPiAxMCl7XHJcbiAgICAgICAgICAgIGNoYWluZSA9IGNoYWluZS5zdWJzdHIoMSwzKSArIGNoYWluZS5zdWJzdHIoNSwzKSArIGNoYWluZS5zdWJzdHIoOSw0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF1IDEwZW1lIGNhcmFjLCBqZSBmb3JtYXR0ZSBzZWxvbiAoWFhYKVhYWC1YWFhYLlxyXG4gICAgICAgIGlmKGNoYWluZS5sZW5ndGggPT09IDEwKXtcclxuICAgICAgICAgICAgY2hhaW5lID0gXCIoXCIgKyBjaGFpbmUuc3Vic3RyKDAsMykgKyBcIilcIiArIGNoYWluZS5zdWJzdHIoMywzKSArIFwiLVwiICsgY2hhaW5lLnN1YnN0cig2LDQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKiBzaSBjZXMgaWYgc29udCBpbnZlcnPDqXMsIGNoYWluZSBub24tZm9ybWF0dMOpZS5cclxuICAgICAgICAgICBjYXIgYXUgMTBlbWUgY2FyYWMgOiBcclxuICAgICAgICAgICBjaGFpbmUubGVuZ3RoID4gMTAgZXQgZG9uYyBsYSBjaGFpbmUgcmV2aWVudCBub24tZm9ybWF0dMOpZS4gKi9cclxuICAgICAgICBpbnB1dC52YWx1ZSA9IGNoYWluZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVzdENvZGVQb3N0YWxPSyhjb250cm9sOiBGb3JtQ29udHJvbCk6IFJlc3VsdGF0VmFsaWRhdGlvbntcclxuICAgICAgICAvLyBWYWxpZGF0aW9uIGEgcsOpdXNzaTogcGFzIGRlIHZhbGV1ciB0YXDDqWVcclxuICAgICAgICBpZighY29udHJvbC52YWx1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBGb3JtYXQgcmVnZXggY2FuYWRpZW4gOlxyXG4gICAgICAgICAgICBeIDogY2hhaW5lIGNvbW1lbmNlLCAkIDogZmluIHPDqXF1ZW5jZVxyXG4gICAgICAgICAgICBsZXR0cmUgOiBwYXMgZGUgRCwgRiwgSSwgTywgUSBVXHJcbiAgICAgICAgICAgIDFlciBsZXR0cmU6IHBhcyBkZSBXLCBaLCBjaGlmZnJlOiBcXGQsIGxldHRyZSwgYmxhbmMsIGNoaWZmcmUsIGxldHRyZSwgY2hpZmZyZSAqL1xyXG4gICAgICAgIHZhciByZWdleENQID0gIC9eW0FCQ0VHSEpLTE1OUFJTVFZYWV1cXGRbQUJDRUdISktMTU5QUlNUVldYWVpdWyBdXFxkW0FCQ0VHSEpLTE1OUFJTVFZXWFlaXVxcZCQvO1xyXG4gICAgICAgIGlmKCFjb250cm9sLnZhbHVlLm1hdGNoKHJlZ2V4Q1ApKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtjb2RlUG9zdGFsSW52YWxpZGU6IHRydWV9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVmFsaWRhdGlvbiByw6lzdXNzaWVcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVzdFRlbGVwaG9uZU9LKGNvbnRyb2w6IEZvcm1Db250cm9sKTogUmVzdWx0YXRWYWxpZGF0aW9ue1xyXG4gICAgICAgIGlmKCFjb250cm9sLnZhbHVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIEZvcm1hdCByZWdleCBjYW5hZGllbjpcclxuICAgICAgICAgICBeIDogc2VxdWVuY2UgY29tbWVuY2UsICQgOiBmaW4gc2VxdWVuY2VcclxuICAgICAgICAgICAoICwgY2hpZmZyZSh4MyksICkgLCBjaGlmZnJlICh4MyksIC0gLCBjaGlmZnJlICh4NCkgKi8gXHJcbiAgICAgICAgdmFyIHJlZ2V4VFAgPSAvXlxcdTAwMjhcXGR7M31cXHUwMDI5XFxkezN9XFx1MDAyRFxcZHs0fSQvO1xyXG4gICAgICAgIGlmKCFjb250cm9sLnZhbHVlLm1hdGNoKHJlZ2V4VFApKXtcclxuICAgICAgICAgICAgcmV0dXJuIHt0ZWxlcGhvbmVJbnZhbGlkZTogdHJ1ZX07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFZhbGlkYXRpb24gcsOpdXNzaWVcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgIC8vIFZhbGlkYXRpb246IHJldG91cm5lIG51bGwgc2kgdmFsaWRlIGV0IHVuIGJvb2xlYW4gc2kgZXJyZXVyLlxyXG4gICAgIHByaXZhdGUgZXN0Q291cnJpZWxPSyhjb250cm9sOiBGb3JtQ29udHJvbCk6IFJlc3VsdGF0VmFsaWRhdGlvbntcclxuICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHJlZ2V4Q291cnJpZWwgPSAvW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlxcLlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSspKkAoPzpbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XFwuKStbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/LztcclxuICAgICAgICAgICAgaWYoIWNvbnRyb2wudmFsdWUubWF0Y2gocmVnZXhDb3VycmllbCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge2NvdXJyaWVsSW52YWxpZGU6IHRydWV9O1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyBWYWxpZGF0aW9uIHLDqXVzc2llXHJcbiAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjcmVlIGNsaWVudCA6IFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVkaXRDbGllbnRGb3JtLnZhbHVlKTtcclxuICAgICAgICAvLyBJRiBOT1VWRUFVLCBBUFBFTCBDUsOJw4ksIFNJTk9OIEFQUEVMIFVQREFURVxyXG4gICAgICAgIGlmKHRoaXMuZXN0Tm91dmVhdSB8fCAhdGhpcy5mb3JtQ29waWUpe1xyXG4gICAgICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmNyZWVyQ2xpZW50KHRoaXMubXlDbGllbnQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgZHUgc2VydmV1ciA6Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2F1dmVyIGRhdGEgZHUgc2VydmV1ciBkYW5zIG15Q2xpZW50LlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlDbGllbnQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZvaXIgbGUgbWVzc2FnZSBkZSBzYXV2ZWdhcmRlIHN1Y2PDqHMuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXV2ZWdhcmRlQ2xpZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1Db3BpZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLnVwZGF0ZUNsaWVudCh0aGlzLm15Q2xpZW50KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlU291bWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRlc3RDUCgpe1xyXG4gICAgICAgIC8vcmV0b3VuZSBudWxsICh2YWxpZGUpXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5lc3RDb2RlUG9zdGFsT0soJ0gyUyAwQjUnKSk7IC8vb2tcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVzdENvZGVQb3N0YWxPSygnaDJzIDBiNScpKTsgLy9va1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZXN0Q29kZVBvc3RhbE9LKCdoMnMwYjUnKSk7ICAvL29rXHJcblxyXG4gICAgICAgIC8vcmV0b3VybmUgdHJ1ZSAoZmFpbClcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVzdENvZGVQb3N0YWxPSygnWjNWIEgyUycpKTsgLy9Pa1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZXN0Q29kZVBvc3RhbE9LKCd6M3ZoMnMnKSk7ICAvL29rXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5lc3RDb2RlUG9zdGFsT0soJ0IzViBIMicpKTsgIC8vb2tcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=

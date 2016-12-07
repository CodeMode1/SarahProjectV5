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
var evenement_service_1 = require('./evenement.service');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var evenement_1 = require('./evenement');
var erreur_service_1 = require('../erreurs/erreur.service');
var client_service_1 = require('../clients/client.service');
var ressource_service_1 = require('../ressources/ressource.service');
var EvenementEditComponent = (function () {
    function EvenementEditComponent(_formBuilder, _evenementService, _erreurService, _activatedRoute, _clientService, _router, _ressourceService) {
        this._formBuilder = _formBuilder;
        this._evenementService = _evenementService;
        this._erreurService = _erreurService;
        this._activatedRoute = _activatedRoute;
        this._clientService = _clientService;
        this._router = _router;
        this._ressourceService = _ressourceService;
        this.myEvenement = new evenement_1.Evenement();
        this.modeSoumission = true;
        this.formActualiser = true;
        this.formCopie = true;
        this.hiddenFK = true;
        this.userLogue();
        this.urlCopie = this._router.url;
        this.ressources = [];
    }
    EvenementEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._activatedRoute.params.subscribe(function (params) {
            if (params.hasOwnProperty('id')) {
                _this.estNouveau = false;
                _this.noEvenement = +params['id'];
                _this._evenementService.getEvenement(_this.noEvenement)
                    .subscribe(function (data) {
                    _this.myEvenement = data;
                    console.log("evx a modifié : ");
                    console.log(_this.myEvenement);
                    // Si URL contient "copie", alors vide les champs du evx copié.
                    if (_this.urlCopie.includes("copie")) {
                        _this.formActualiser = false;
                        _this.copierEvx();
                    }
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
            console.log(_this.estNouveau);
            // Init le form.
            _this.creerForm();
            _this.getRessources();
        });
    };
    EvenementEditComponent.prototype.creerForm = function () {
        var noEvenement = null;
        var nom = '';
        var dateEvenement = null;
        var contact = '';
        var client = '';
        var selectEtat = '';
        var dateSoumission = null;
        var dateConfirmation = null;
        var dateFacturation = null;
        var dateNonRetenu = null;
        var dateAnnulation = null;
        var notes = '';
        var validationTache = false;
        var creerPar = '';
        var dateCree = null;
        var modifPar = '';
        var modif = null;
        var client_FK = null;
        if (!this.estNouveau) {
            // Setter la valeur de l'evenement au form control.
            this.myEvenement.noEvenement = noEvenement;
            this.myEvenement.nom = nom;
            this.myEvenement.dateEvenement = dateEvenement;
            this.myEvenement.contact = contact;
            this.myEvenement.client = client;
            this.myEvenement.selectEtat = selectEtat;
            this.myEvenement.dateSoumission = dateSoumission;
            this.myEvenement.dateConfirmation = dateConfirmation;
            this.myEvenement.dateFacturation = dateFacturation;
            this.myEvenement.dateNonRetenu = dateNonRetenu;
            this.myEvenement.dateAnnulation = dateAnnulation;
            this.myEvenement.notes = notes;
            this.myEvenement.validationTache = validationTache;
            this.myEvenement.creerPar = creerPar;
            this.myEvenement.dateCree = dateCree;
            this.myEvenement.modifPar = modifPar;
            this.myEvenement.modif = modif;
            this.myEvenement.client_FK = client_FK;
        }
        // Créer le form avec des blancs ou les valeurs de l'evenement cherché.
        this.editEvenementForm = this._formBuilder.group({
            nom: [nom],
            dateEvenement: [dateEvenement],
            contact: [contact],
            client: [client],
            selectEtat: [selectEtat],
            dateSoumission: [dateSoumission],
            dateConfirmation: [dateConfirmation],
            notes: [notes],
            dateFacturation: [dateFacturation],
            dateNonRetenu: [dateNonRetenu],
            validationTache: [validationTache],
            noEvenement: [noEvenement],
            creerPar: [creerPar],
            dateCree: [dateCree],
            modifPar: [modifPar],
            modif: [modif],
            dateAnnulation: [dateAnnulation],
            client_FK: [client_FK]
        });
    };
    EvenementEditComponent.prototype.copierEvx = function () {
        this.myEvenement.evenementId = null;
        this.myEvenement.noEvenement = null;
        this.myEvenement.dateConfirmation = null;
        this.myEvenement.dateFacturation = null;
        this.myEvenement.dateNonRetenu = null;
        this.myEvenement.dateAnnulation = null;
        this.myEvenement.dateSoumission = this.getDateActuelle();
    };
    EvenementEditComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log("valeurs du form evx créé: ");
        console.log(this.editEvenementForm.value);
        // If nouveau, appel créé, sinon appel update.
        if (this.estNouveau || !this.formCopie) {
            this._evenementService.creerEvenement(this.myEvenement)
                .subscribe(function (data) {
                console.log('data du serveur : ');
                console.log(data);
                _this.myEvenement = data;
                console.log(_this.myEvenement.dateEvenement);
                // Message succes creation evx.
                _this.sauvegardeEvenement = true;
            }, function (error) { return _this._erreurService.handleErreur(error); });
            this.formCopie = true;
        }
        else {
            this._evenementService.updateEvenement(this.myEvenement)
                .subscribe(function (data) { return console.log(data); }, function (error) { return _this._erreurService.handleErreur(error); });
        }
        this.modeSoumission = false;
    };
    EvenementEditComponent.prototype.boutonSwitch = function ($event) {
        this.modeSoumission = $event;
    };
    /* Réagir au changement usager, cet evenement est applique sur tous les inputs du form.
        selon la syntax: (ngModelChange)="onUserChange($event)" */
    EvenementEditComponent.prototype.onUserChange = function ($event) {
        console.log("EVX-onUserChange: " + $event);
        // Enable Enregistrer bouton.
        this.modeSoumission = true;
        // Tag Activites avec le user et le timestamp du changement.
        if (!this.estNouveau) {
            this.myEvenement.modif = new Date(this.getDateModif());
            this.myEvenement.modifPar = localStorage.getItem('userName');
        }
    };
    EvenementEditComponent.prototype.userLogue = function () {
        console.log('user logue : ');
        console.log(localStorage.getItem('userName'));
        this.userLoggue = localStorage.getItem('userName');
        this.myEvenement.contact = this.userLoggue;
    };
    EvenementEditComponent.prototype.getClients = function () {
        var _this = this;
        this._clientService.getClients()
            .subscribe(function (data) {
            _this.clients = data;
            console.log(_this.clients);
        }, function (error) { return _this._erreurService.handleErreur(error); });
    };
    EvenementEditComponent.prototype.getRessources = function () {
        var _this = this;
        this._ressourceService.getRessources().subscribe(function (data) {
            _this.ressources = data;
            console.log("ressource du serveur pour afficher dans la liste : ");
            for (var i = 0; i < _this.ressources.length; i++) {
                console.log(_this.ressources[i]);
                console.log(_this.ressources[i].nom);
            }
        }, function (error) { return _this._erreurService.handleErreur(error); });
    };
    EvenementEditComponent.prototype.clientSelect = function (client) {
        this.clientSelectedList = client;
        console.log('client selected List : ');
        console.log(this.clientSelectedList);
        this.noClientSelectedList = client.noClient;
        console.log('no client selected List: ');
        console.log(this.noClientSelectedList);
        // Affichage client sélectionné dans la boite modale. (prenom est null sur l'objet et undefined en affichage).
        if (this.clientSelectedList.prenom === null || this.clientSelectedList.prenom === "" || this.clientSelectedList.prenom === undefined) {
            this.aucunPrenomClientSelected = true;
        }
        else {
            this.aucunPrenomClientSelected = false;
        }
        console.log(this.aucunPrenomClientSelected);
    };
    EvenementEditComponent.prototype.saveClientSelected = function () {
        console.log('client a saver : ');
        this.clientSelectedSave = this.clientSelectedList;
        // Id mongo du client selected :
        this.clientId = this.clientSelectedSave.clientId;
        // Sauver dans le form control hidden du form envoyé au serveur.
        this.myEvenement.client_FK = this.clientId;
        console.log(this.clientSelectedSave.prenom);
        console.log('id mongo client selected : ');
        console.log(this.clientId);
        if (this.clientSelectedSave.prenom === null || this.clientSelectedSave.prenom === "" || this.clientSelectedSave.prenom === undefined) {
            this.myEvenement.client = this.clientSelectedSave.nom;
            return;
        }
        // Sauver le client selectionné dans le input client du form.
        this.myEvenement.client = this.clientSelectedSave.nom + ', ' + this.clientSelectedSave.prenom;
    };
    EvenementEditComponent.prototype.deleteClientSelected = function () {
        console.log('client selected delete: ');
        console.log(this.clientSelectedList);
        console.log(this.noClientSelectedList);
        console.log('id mongo client selected (meme que dans save): 5816566bd84fe82f14afb388 5816566bd84fe82f14afb388');
        console.log(this.clientId);
        console.log('client save : (meme que dans save)');
        console.log(this.clientSelectedSave);
    };
    EvenementEditComponent.prototype.actualiserEvx = function () {
        var _this = this;
        if (this.myEvenement.noEvenement != null && (this.myEvenement.noEvenement).toString() != "") {
            this._evenementService.getEvenement(Number(this.myEvenement.noEvenement))
                .subscribe(function (data) {
                console.log(_this.myEvenement.noEvenement);
                _this.myEvenement = data;
                _this.myEvenement.activites = data.activites;
                console.log(_this.myEvenement);
            }, function (error) {
                _this._erreurService.handleErreur(error);
            });
        }
    };
    EvenementEditComponent.prototype.copieCetEvx = function () {
        this.copierEvx();
        this.formCopie = false;
        this.modeSoumission = true;
    };
    EvenementEditComponent.prototype.getDateActuelle = function () {
        var date = new Date().toLocaleDateString();
        var yyyy = date.substring(6, 10);
        var mm = date.substring(3, 5);
        var dd = date.substring(0, 2);
        return (yyyy + "-" + mm + "-" + dd);
    };
    EvenementEditComponent.prototype.getDateModif = function () {
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6, 10);
        var mm = date.substring(3, 5);
        var dd = date.substring(0, 2);
        var hh = date.substring(12, 14);
        var mm = date.substring(15, 17);
        var ss = date.substring(18, 20);
        return (yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mm + ":" + ss);
    };
    EvenementEditComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    EvenementEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-evenement-edit',
            templateUrl: 'evenement-edit.component.html',
            styles: ["\n        #boutonModalOk{\n            float: left;\n            margin: 0 1% 0 0;\n        }\n         .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n\n        .clearDate{\n            clear:both;\n            float:left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .floatLeftDate{\n            float: left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .divFooter{\n            text-align:center;\n        }\n\n        .footer{\n            border-top: 2px solid black;\n        }\n\n        button{  \n            display:block;\n            margin: 0 auto;\n        }\n\n        .space {\n            padding: 2%;\n        }\n\n        textarea{\n            resize: none;\n        }\n\n        .alert-success{\n            text-align:center;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n\n         thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n         tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        .styleClientSelected{\n            border: 1px solid #ddd;\n        }\n        \n    "]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, evenement_service_1.EvenementService, erreur_service_1.ErreurService, router_1.ActivatedRoute, client_service_1.ClientService, router_1.Router, ressource_service_1.RessourceService])
    ], EvenementEditComponent);
    return EvenementEditComponent;
}());
exports.EvenementEditComponent = EvenementEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQXVDLGlCQUFpQixDQUFDLENBQUE7QUFFekQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBRzFELGtDQUFpQyxpQ0FBaUMsQ0FBQyxDQUFBO0FBNEVuRTtJQXlCSSxnQ0FBcUIsWUFBeUIsRUFBVSxpQkFBbUMsRUFDL0UsY0FBNkIsRUFBVSxlQUErQixFQUFVLGNBQTZCLEVBQzdHLE9BQWUsRUFBVSxpQkFBbUM7UUFGbkQsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQy9FLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0csWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDaEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FB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Q0FBQztRQUNoQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDZDQUFZLEdBQVo7UUFDRyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQXZZTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE1BQU0sRUFBRSxDQUFFLGt1Q0FrRVQsQ0FBQztTQUNMLENBQUM7OzhCQUFBO0lBbVVGLDZCQUFDO0FBQUQsQ0FsVUEsQUFrVUMsSUFBQTtBQWxVWSw4QkFBc0IseUJBa1VsQyxDQUFBIiwiZmlsZSI6ImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVuZW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9ldmVuZW1lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SWCc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudCB9IGZyb20gJy4vZXZlbmVtZW50JztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi4vY2xpZW50cy9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJy4uL2NsaWVudHMvY2xpZW50JztcclxuaW1wb3J0IHsgQWN0aXZpdGVMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi4vYWN0aXZpdGVzL2FjdGl2aXRlLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmVzc291cmNlU2VydmljZSB9IGZyb20gJy4uL3Jlc3NvdXJjZXMvcmVzc291cmNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2UgfSBmcm9tICcuLi9yZXNzb3VyY2VzL3Jlc3NvdXJjZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1ldmVuZW1lbnQtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2V2ZW5lbWVudC1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgI2JvdXRvbk1vZGFsT2t7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgMSUgMCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5jbGVhckRhdGV7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5mbG9hdExlZnREYXRle1xyXG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmRpdkZvb3RlcntcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZm9vdGVye1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgYmxhY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXR0b257ICBcclxuICAgICAgICAgICAgZGlzcGxheTpibG9jaztcclxuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3BhY2Uge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAyJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHRhcmVhe1xyXG4gICAgICAgICAgICByZXNpemU6IG5vbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYWxlcnQtc3VjY2Vzc3tcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICB0Ym9keSA+IHRyOmhvdmVye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlkNGY5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnN0eWxlQ2xpZW50U2VsZWN0ZWR7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEV2ZW5lbWVudEVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBlZGl0RXZlbmVtZW50Rm9ybTogRm9ybUdyb3VwO1xyXG4gICAgbW9kZVNvdW1pc3Npb246IGJvb2xlYW47XHJcbiAgICBzYXV2ZWdhcmRlRXZlbmVtZW50OiBib29sZWFuO1xyXG4gICAgbXlFdmVuZW1lbnQ6IEV2ZW5lbWVudDtcclxuICAgIGZvcm1BY3R1YWxpc2VyOiBib29sZWFuO1xyXG4gICAgZm9ybUNvcGllOiBib29sZWFuO1xyXG4gICAgLy8gSWQgZGUgbW9uZ28gZHUgY2xpZW50IHPDqWxlY3QuXHJcbiAgICBjbGllbnRJZDogc3RyaW5nO1xyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgbm9FdmVuZW1lbnQ6IG51bWJlcjtcclxuICAgIC8vIENoYW1wIGZvcmVpZ24ga2V5IGhpZGRlbi5cclxuICAgIGhpZGRlbkZLOiBib29sZWFuO1xyXG4gICAgLy8gQ29udGFjdCBkdSBjbGllbnQuXHJcbiAgICB1c2VyTG9nZ3VlOiBzdHJpbmc7XHJcbiAgICAvLyBDbGllbnQgYXJyYXkgcG91ciBjaG9peCBjbGllbnQuXHJcbiAgICBjbGllbnRzOiBDbGllbnRbXTtcclxuICAgIGNsaWVudFNlbGVjdGVkTGlzdDogQ2xpZW50O1xyXG4gICAgbm9DbGllbnRTZWxlY3RlZExpc3Q6IG51bWJlcjtcclxuICAgIGNsaWVudFNlbGVjdGVkU2F2ZTogQ2xpZW50O1xyXG4gICAgYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIHVybENvcGllOiBzdHJpbmc7XHJcbiAgICByZXNzb3VyY2VzOiBSZXNzb3VyY2VbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIF9ldmVuZW1lbnRTZXJ2aWNlOiBFdmVuZW1lbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2VycmV1clNlcnZpY2U6IEVycmV1clNlcnZpY2UsIHByaXZhdGUgX2FjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBfY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfcmVzc291cmNlU2VydmljZTogUmVzc291cmNlU2VydmljZSkgeyBcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudCA9IG5ldyBFdmVuZW1lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RlU291bWlzc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUFjdHVhbGlzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1Db3BpZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuRksgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJMb2d1ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVybENvcGllID0gdGhpcy5fcm91dGVyLnVybDtcclxuICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyBcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuX2FjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChwYXJhbXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYocGFyYW1zLmhhc093blByb3BlcnR5KCdpZCcpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vRXZlbmVtZW50ID0gK3BhcmFtc1snaWQnXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLmdldEV2ZW5lbWVudCh0aGlzLm5vRXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJldnggYSBtb2RpZmnDqSA6IFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15RXZlbmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaSBVUkwgY29udGllbnQgXCJjb3BpZVwiLCBhbG9ycyB2aWRlIGxlcyBjaGFtcHMgZHUgZXZ4IGNvcGnDqS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnVybENvcGllLmluY2x1ZGVzKFwiY29waWVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1BY3R1YWxpc2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29waWVyRXZ4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXJsIDogJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3JvdXRlci51cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnVybENvcGllLmluY2x1ZGVzKFwiY29waWVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXQgbW9kZSBjb3BpZVwiKTsgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lc3ROb3V2ZWF1ID0gdHJ1ZTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lc3ROb3V2ZWF1KTtcclxuICAgICAgICAgICAgICAgIC8vIEluaXQgbGUgZm9ybS5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlZXJGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlc3NvdXJjZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlZXJGb3JtKCl7XHJcbiAgICAgICAgbGV0IG5vRXZlbmVtZW50ID0gbnVsbDtcclxuICAgICAgICBsZXQgbm9tID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVFdmVuZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWN0ID0gJyc7XHJcbiAgICAgICAgbGV0IGNsaWVudCA9ICcnO1xyXG4gICAgICAgIGxldCBzZWxlY3RFdGF0ID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVTb3VtaXNzaW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZUNvbmZpcm1hdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVGYWN0dXJhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVOb25SZXRlbnUgPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlQW5udWxhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IG5vdGVzID0gJyc7XHJcbiAgICAgICAgbGV0IHZhbGlkYXRpb25UYWNoZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjcmVlclBhciA9ICcnO1xyXG4gICAgICAgIGxldCBkYXRlQ3JlZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1vZGlmUGFyID0gJyc7XHJcbiAgICAgICAgbGV0IG1vZGlmID0gbnVsbDtcclxuICAgICAgICBsZXQgY2xpZW50X0ZLID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgIC8vIFNldHRlciBsYSB2YWxldXIgZGUgbCdldmVuZW1lbnQgYXUgZm9ybSBjb250cm9sLlxyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50ID0gbm9FdmVuZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm9tID0gbm9tO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVFdmVuZW1lbnQgPSBkYXRlRXZlbmVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNvbnRhY3QgPSBjb250YWN0O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudCA9IGNsaWVudDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5zZWxlY3RFdGF0ID0gc2VsZWN0RXRhdDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlU291bWlzc2lvbiA9IGRhdGVTb3VtaXNzaW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVDb25maXJtYXRpb24gPSBkYXRlQ29uZmlybWF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVGYWN0dXJhdGlvbiA9IGRhdGVGYWN0dXJhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlTm9uUmV0ZW51ID0gZGF0ZU5vblJldGVudTtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQW5udWxhdGlvbiA9IGRhdGVBbm51bGF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm5vdGVzID0gbm90ZXM7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQudmFsaWRhdGlvblRhY2hlID0gdmFsaWRhdGlvblRhY2hlO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNyZWVyUGFyID0gY3JlZXJQYXI7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUNyZWUgPSBkYXRlQ3JlZTtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5tb2RpZlBhciA9IG1vZGlmUGFyO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmID0gbW9kaWY7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50X0ZLID0gY2xpZW50X0ZLO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3LDqWVyIGxlIGZvcm0gYXZlYyBkZXMgYmxhbmNzIG91IGxlcyB2YWxldXJzIGRlIGwnZXZlbmVtZW50IGNoZXJjaMOpLlxyXG4gICAgICAgIHRoaXMuZWRpdEV2ZW5lbWVudEZvcm0gPSB0aGlzLl9mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgIG5vbTogW25vbV0sXHJcbiAgICAgICAgICAgIGRhdGVFdmVuZW1lbnQ6IFtkYXRlRXZlbmVtZW50XSxcclxuICAgICAgICAgICAgY29udGFjdDogW2NvbnRhY3RdLFxyXG4gICAgICAgICAgICBjbGllbnQ6IFtjbGllbnRdLFxyXG4gICAgICAgICAgICBzZWxlY3RFdGF0OiBbc2VsZWN0RXRhdF0sXHJcbiAgICAgICAgICAgIGRhdGVTb3VtaXNzaW9uOiBbZGF0ZVNvdW1pc3Npb25dLFxyXG4gICAgICAgICAgICBkYXRlQ29uZmlybWF0aW9uOiBbZGF0ZUNvbmZpcm1hdGlvbl0sXHJcbiAgICAgICAgICAgIG5vdGVzOiBbbm90ZXNdLFxyXG4gICAgICAgICAgICBkYXRlRmFjdHVyYXRpb246IFtkYXRlRmFjdHVyYXRpb25dLFxyXG4gICAgICAgICAgICBkYXRlTm9uUmV0ZW51OiBbZGF0ZU5vblJldGVudV0sXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25UYWNoZTogW3ZhbGlkYXRpb25UYWNoZV0sXHJcbiAgICAgICAgICAgIG5vRXZlbmVtZW50OiBbbm9FdmVuZW1lbnRdLFxyXG4gICAgICAgICAgICBjcmVlclBhcjogW2NyZWVyUGFyXSxcclxuICAgICAgICAgICAgZGF0ZUNyZWU6IFtkYXRlQ3JlZV0sXHJcbiAgICAgICAgICAgIG1vZGlmUGFyOiBbbW9kaWZQYXJdLFxyXG4gICAgICAgICAgICBtb2RpZjogW21vZGlmXSxcclxuICAgICAgICAgICAgZGF0ZUFubnVsYXRpb246IFtkYXRlQW5udWxhdGlvbl0sXHJcbiAgICAgICAgICAgIGNsaWVudF9GSzogW2NsaWVudF9GS11cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb3BpZXJFdngoKXtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmV2ZW5lbWVudElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVDb25maXJtYXRpb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUZhY3R1cmF0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVOb25SZXRlbnUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUFubnVsYXRpb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZVNvdW1pc3Npb24gPSB0aGlzLmdldERhdGVBY3R1ZWxsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2YWxldXJzIGR1IGZvcm0gZXZ4IGNyw6nDqTogXCIgKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVkaXRFdmVuZW1lbnRGb3JtLnZhbHVlKTtcclxuICAgICAgICAvLyBJZiBub3V2ZWF1LCBhcHBlbCBjcsOpw6ksIHNpbm9uIGFwcGVsIHVwZGF0ZS5cclxuICAgICAgICBpZih0aGlzLmVzdE5vdXZlYXUgfHwgIXRoaXMuZm9ybUNvcGllKXtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbmVtZW50U2VydmljZS5jcmVlckV2ZW5lbWVudCh0aGlzLm15RXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgZHUgc2VydmV1ciA6ICcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQuZGF0ZUV2ZW5lbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1lc3NhZ2Ugc3VjY2VzIGNyZWF0aW9uIGV2eC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXV2ZWdhcmRlRXZlbmVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db3BpZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLnVwZGF0ZUV2ZW5lbWVudCh0aGlzLm15RXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gZmFsc2U7IFxyXG4gICAgfVxyXG5cclxuICAgIGJvdXRvblN3aXRjaCgkZXZlbnQpe1xyXG4gICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSAkZXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgIC8qIFLDqWFnaXIgYXUgY2hhbmdlbWVudCB1c2FnZXIsIGNldCBldmVuZW1lbnQgZXN0IGFwcGxpcXVlIHN1ciB0b3VzIGxlcyBpbnB1dHMgZHUgZm9ybS5cclxuICAgICAgICAgc2Vsb24gbGEgc3ludGF4OiAobmdNb2RlbENoYW5nZSk9XCJvblVzZXJDaGFuZ2UoJGV2ZW50KVwiICovXHJcbiAgICAgb25Vc2VyQ2hhbmdlKCRldmVudCl7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiRVZYLW9uVXNlckNoYW5nZTogXCIgKyAkZXZlbnQpO1xyXG5cclxuICAgICAgICAgLy8gRW5hYmxlIEVucmVnaXN0cmVyIGJvdXRvbi5cclxuICAgICAgICAgdGhpcy5tb2RlU291bWlzc2lvbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAvLyBUYWcgQWN0aXZpdGVzIGF2ZWMgbGUgdXNlciBldCBsZSB0aW1lc3RhbXAgZHUgY2hhbmdlbWVudC5cclxuICAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmID0gbmV3IERhdGUodGhpcy5nZXREYXRlTW9kaWYoKSk7XHJcbiAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmUGFyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgdXNlckxvZ3VlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgbG9ndWUgOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKSk7XHJcbiAgICAgICAgdGhpcy51c2VyTG9nZ3VlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jb250YWN0ID0gdGhpcy51c2VyTG9nZ3VlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENsaWVudHMoKXtcclxuICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmdldENsaWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudHMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc3NvdXJjZXMoKXtcclxuICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmdldFJlc3NvdXJjZXMoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzc291cmNlIGR1IHNlcnZldXIgcG91ciBhZmZpY2hlciBkYW5zIGxhIGxpc3RlIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLnJlc3NvdXJjZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXNzb3VyY2VzW2ldLm5vbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsaWVudFNlbGVjdChjbGllbnQ6IENsaWVudCl7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZWxlY3RlZExpc3QgPSBjbGllbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWVudCBzZWxlY3RlZCBMaXN0IDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZExpc3QpO1xyXG4gICAgICAgIHRoaXMubm9DbGllbnRTZWxlY3RlZExpc3QgPSBjbGllbnQubm9DbGllbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vIGNsaWVudCBzZWxlY3RlZCBMaXN0OiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vQ2xpZW50U2VsZWN0ZWRMaXN0KTtcclxuICAgICAgICAvLyBBZmZpY2hhZ2UgY2xpZW50IHPDqWxlY3Rpb25uw6kgZGFucyBsYSBib2l0ZSBtb2RhbGUuIChwcmVub20gZXN0IG51bGwgc3VyIGwnb2JqZXQgZXQgdW5kZWZpbmVkIGVuIGFmZmljaGFnZSkuXHJcbiAgICAgICAgaWYodGhpcy5jbGllbnRTZWxlY3RlZExpc3QucHJlbm9tID09PSBudWxsIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0LnByZW5vbSA9PT0gXCJcIiB8fCB0aGlzLmNsaWVudFNlbGVjdGVkTGlzdC5wcmVub20gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmF1Y3VuUHJlbm9tQ2xpZW50U2VsZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDbGllbnRTZWxlY3RlZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgYSBzYXZlciA6ICcpO1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlID0gdGhpcy5jbGllbnRTZWxlY3RlZExpc3Q7XHJcbiAgICAgICAgLy8gSWQgbW9uZ28gZHUgY2xpZW50IHNlbGVjdGVkIDpcclxuICAgICAgICB0aGlzLmNsaWVudElkID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUuY2xpZW50SWQ7XHJcbiAgICAgICAgLy8gU2F1dmVyIGRhbnMgbGUgZm9ybSBjb250cm9sIGhpZGRlbiBkdSBmb3JtIGVudm95w6kgYXUgc2VydmV1ci5cclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudF9GSyA9IHRoaXMuY2xpZW50SWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnaWQgbW9uZ28gY2xpZW50IHNlbGVjdGVkIDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgaWYodGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tID09PSBudWxsIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLnByZW5vbSA9PT0gXCJcIiB8fCB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5wcmVub20gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUubm9tO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNhdXZlciBsZSBjbGllbnQgc2VsZWN0aW9ubsOpIGRhbnMgbGUgaW5wdXQgY2xpZW50IGR1IGZvcm0uXHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnQgPSB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5ub20gKyAnLCAnICsgdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDbGllbnRTZWxlY3RlZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2VsZWN0ZWQgZGVsZXRlOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub0NsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lkIG1vbmdvIGNsaWVudCBzZWxlY3RlZCAobWVtZSBxdWUgZGFucyBzYXZlKTogNTgxNjU2NmJkODRmZTgyZjE0YWZiMzg4IDU4MTY1NjZiZDg0ZmU4MmYxNGFmYjM4OCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2F2ZSA6IChtZW1lIHF1ZSBkYW5zIHNhdmUpJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdHVhbGlzZXJFdngoKXtcclxuICAgICAgICBpZih0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50ICE9IG51bGwgJiYgKHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQpLnRvU3RyaW5nKCkgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UuZ2V0RXZlbmVtZW50KE51bWJlcih0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuYWN0aXZpdGVzID0gZGF0YS5hY3Rpdml0ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUV2ZW5lbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvcGllQ2V0RXZ4KCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29waWVyRXZ4KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVBY3R1ZWxsZSgpe1xyXG4gICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgdmFyIHl5eXkgPSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBtbSArIFwiLVwiICsgZGQpOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZU1vZGlmKCl7XHJcbiAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDE1LDE3KTtcclxuICAgICAgIHZhciBzcyA9IGRhdGUuc3Vic3RyaW5nKDE4LDIwKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkICsgXCIgXCIgKyBoaCArIFwiOlwiICsgbW0gKyBcIjpcIiArIHNzKTtcclxuICAgIH0gICBcclxuXHJcbiAgICBuZ09uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gXHJcbn0iXX0=

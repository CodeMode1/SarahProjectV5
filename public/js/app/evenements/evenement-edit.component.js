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
                    //Si URL contient "copie", alors vide les champs du evx copié.
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
            // init le form
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
            // setter la valeur de l'evenement au form control
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
        // créer le form avec des blancs ou les valeurs de l'evenement cherché
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
        // if nouveau, appel créé, sinon appel update
        if (this.estNouveau || !this.formCopie) {
            this._evenementService.creerEvenement(this.myEvenement)
                .subscribe(function (data) {
                console.log('data du serveur : ');
                console.log(data);
                _this.myEvenement = data;
                console.log(_this.myEvenement.dateEvenement);
                // message succes creation evx
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
        //Enable Enregistrer bouton.
        this.modeSoumission = true;
        //Tag Activites avec le user et le timestamp du changement.
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
            //print données pour chaque ressource
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
        //affichage client sélectionné dans la boite modale. (prenom est null sur l'objet et undefined en affichage)
        if (this.clientSelectedList.prenom === null || this.clientSelectedList.prenom === "" || this.clientSelectedList.prenom === undefined) {
            this.aucunPrenomClientSelected = true;
        }
        else {
            this.aucunPrenomClientSelected = false;
        }
        console.log(this.aucunPrenomClientSelected);
    };
    EvenementEditComponent.prototype.saveClientSelected = function () {
        // save client
        console.log('client a saver : ');
        this.clientSelectedSave = this.clientSelectedList;
        // id mongo du client selected :
        this.clientId = this.clientSelectedSave.clientId;
        //sauver dans le form control hidden du form envoyé au serveur.
        this.myEvenement.client_FK = this.clientId;
        console.log(this.clientSelectedSave.prenom);
        console.log('id mongo client selected : ');
        console.log(this.clientId);
        if (this.clientSelectedSave.prenom === null || this.clientSelectedSave.prenom === "" || this.clientSelectedSave.prenom === undefined) {
            this.myEvenement.client = this.clientSelectedSave.nom;
            return;
        }
        // sauver le client selectionné dans le input client du form.
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQXVDLGlCQUFpQixDQUFDLENBQUE7QUFFekQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBRzFELGtDQUFpQyxpQ0FBaUMsQ0FBQyxDQUFBO0FBNEVuRTtJQXlCSSxnQ0FBcUIsWUFBeUIsRUFBVSxpQkFBbUMsRUFDL0UsY0FBNkIsRUFBVSxlQUErQixFQUFVLGNBQTZCLEVBQzdHLE9BQWUsRUFBVSxpQkFBbUM7UUFGbkQsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQy9FLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0csWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDaEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FB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Q0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsNkNBQVksR0FBWjtRQUNHLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBellMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsTUFBTSxFQUFFLENBQUUsa3VDQWtFVCxDQUFDO1NBQ0wsQ0FBQzs7OEJBQUE7SUFxVUYsNkJBQUM7QUFBRCxDQXBVQSxBQW9VQyxJQUFBO0FBcFVZLDhCQUFzQix5QkFvVWxDLENBQUEiLCJmaWxlIjoiZXZlbmVtZW50cy9ldmVuZW1lbnQtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudFNlcnZpY2UgfSBmcm9tICcuL2V2ZW5lbWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1JYJztcclxuaW1wb3J0IHsgRXZlbmVtZW50IH0gZnJvbSAnLi9ldmVuZW1lbnQnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi9jbGllbnRzL2NsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50cy9jbGllbnQnO1xyXG5pbXBvcnQgeyBBY3Rpdml0ZUxpc3RDb21wb25lbnQgfSBmcm9tICcuLi9hY3Rpdml0ZXMvYWN0aXZpdGUtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcmVzc291cmNlcy9yZXNzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZSB9IGZyb20gJy4uL3Jlc3NvdXJjZXMvcmVzc291cmNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWV2ZW5lbWVudC1lZGl0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnZXZlbmVtZW50LWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAjYm91dG9uTW9kYWxPa3tcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAxJSAwIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAub3V0ZXJ7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAxJSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNsZWFyRGF0ZXtcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmZsb2F0TGVmdERhdGV7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZGl2Rm9vdGVye1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5mb290ZXJ7XHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBibGFjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbnsgIFxyXG4gICAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zcGFjZSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dGFyZWF7XHJcbiAgICAgICAgICAgIHJlc2l6ZTogbm9uZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5hbGVydC1zdWNjZXNze1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5lc3RTZWxlY3RSYW5nZXtcclxuICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1MTlCREI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRoZWFkID4gdHJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMjVlbSBzb2xpZCAjMTU2NWMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3R5bGVDbGllbnRTZWxlY3RlZHtcclxuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXZlbmVtZW50RWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIGVkaXRFdmVuZW1lbnRGb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBtb2RlU291bWlzc2lvbjogYm9vbGVhbjtcclxuICAgIHNhdXZlZ2FyZGVFdmVuZW1lbnQ6IGJvb2xlYW47XHJcbiAgICBteUV2ZW5lbWVudDogRXZlbmVtZW50O1xyXG4gICAgZm9ybUFjdHVhbGlzZXI6IGJvb2xlYW47XHJcbiAgICBmb3JtQ29waWU6IGJvb2xlYW47XHJcbiAgICAvLyBpZCBkZSBtb25nbyBkdSBjbGllbnQgc8OpbGVjdC5cclxuICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIGVzdE5vdXZlYXU6IGJvb2xlYW47XHJcbiAgICBub0V2ZW5lbWVudDogbnVtYmVyO1xyXG4gICAgLy8gY2hhbXAgZm9yZWlnbiBrZXkgaGlkZGVuXHJcbiAgICBoaWRkZW5GSzogYm9vbGVhbjtcclxuICAgIC8vdXNlciBsb2d1ZSBwYXIgZMOpZmF1dFxyXG4gICAgdXNlckxvZ2d1ZTogc3RyaW5nO1xyXG4gICAgLy9jbGllbnQgYXJyYXkgcG91ciBjaG9peCBjbGllbnRcclxuICAgIGNsaWVudHM6IENsaWVudFtdO1xyXG4gICAgY2xpZW50U2VsZWN0ZWRMaXN0OiBDbGllbnQ7XHJcbiAgICBub0NsaWVudFNlbGVjdGVkTGlzdDogbnVtYmVyO1xyXG4gICAgY2xpZW50U2VsZWN0ZWRTYXZlOiBDbGllbnQ7XHJcbiAgICBhdWN1blByZW5vbUNsaWVudFNlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgdXJsQ29waWU6IHN0cmluZztcclxuICAgIHJlc3NvdXJjZXM6IFJlc3NvdXJjZVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9mb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgX2V2ZW5lbWVudFNlcnZpY2U6IEV2ZW5lbWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSwgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9jbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwcml2YXRlIF9yZXNzb3VyY2VTZXJ2aWNlOiBSZXNzb3VyY2VTZXJ2aWNlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gbmV3IEV2ZW5lbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQWN0dWFsaXNlciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oaWRkZW5GSyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckxvZ3VlKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXJsQ29waWUgPSB0aGlzLl9yb3V0ZXIudXJsO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IFxyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5fYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHBhcmFtczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJhbXMuaGFzT3duUHJvcGVydHkoJ2lkJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXN0Tm91dmVhdSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9FdmVuZW1lbnQgPSArcGFyYW1zWydpZCddO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UuZ2V0RXZlbmVtZW50KHRoaXMubm9FdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2eCBhIG1vZGlmacOpIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2kgVVJMIGNvbnRpZW50IFwiY29waWVcIiwgYWxvcnMgdmlkZSBsZXMgY2hhbXBzIGR1IGV2eCBjb3Bpw6kuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy51cmxDb3BpZS5pbmNsdWRlcyhcImNvcGllXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtQWN0dWFsaXNlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvcGllckV2eCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VybCA6ICcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9yb3V0ZXIudXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy51cmxDb3BpZS5pbmNsdWRlcyhcImNvcGllXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0IG1vZGUgY29waWVcIik7ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXN0Tm91dmVhdSA9IHRydWU7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lc3ROb3V2ZWF1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZXN0Tm91dmVhdSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IGxlIGZvcm1cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlZXJGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlc3NvdXJjZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlZXJGb3JtKCl7XHJcbiAgICAgICAgbGV0IG5vRXZlbmVtZW50ID0gbnVsbDtcclxuICAgICAgICBsZXQgbm9tID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVFdmVuZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWN0ID0gJyc7XHJcbiAgICAgICAgbGV0IGNsaWVudCA9ICcnO1xyXG4gICAgICAgIGxldCBzZWxlY3RFdGF0ID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVTb3VtaXNzaW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZUNvbmZpcm1hdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVGYWN0dXJhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVOb25SZXRlbnUgPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlQW5udWxhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IG5vdGVzID0gJyc7XHJcbiAgICAgICAgbGV0IHZhbGlkYXRpb25UYWNoZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjcmVlclBhciA9ICcnO1xyXG4gICAgICAgIGxldCBkYXRlQ3JlZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1vZGlmUGFyID0gJyc7XHJcbiAgICAgICAgbGV0IG1vZGlmID0gbnVsbDtcclxuICAgICAgICBsZXQgY2xpZW50X0ZLID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgIC8vIHNldHRlciBsYSB2YWxldXIgZGUgbCdldmVuZW1lbnQgYXUgZm9ybSBjb250cm9sXHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQgPSBub0V2ZW5lbWVudDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub20gPSBub207XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUV2ZW5lbWVudCA9IGRhdGVFdmVuZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY29udGFjdCA9IGNvbnRhY3Q7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gY2xpZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LnNlbGVjdEV0YXQgPSBzZWxlY3RFdGF0O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVTb3VtaXNzaW9uID0gZGF0ZVNvdW1pc3Npb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUNvbmZpcm1hdGlvbiA9IGRhdGVDb25maXJtYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUZhY3R1cmF0aW9uID0gZGF0ZUZhY3R1cmF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVOb25SZXRlbnUgPSBkYXRlTm9uUmV0ZW51O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVBbm51bGF0aW9uID0gZGF0ZUFubnVsYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm90ZXMgPSBub3RlcztcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC52YWxpZGF0aW9uVGFjaGUgPSB2YWxpZGF0aW9uVGFjaGU7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY3JlZXJQYXIgPSBjcmVlclBhcjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQ3JlZSA9IGRhdGVDcmVlO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmUGFyID0gbW9kaWZQYXI7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubW9kaWYgPSBtb2RpZjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnRfRksgPSBjbGllbnRfRks7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjcsOpZXIgbGUgZm9ybSBhdmVjIGRlcyBibGFuY3Mgb3UgbGVzIHZhbGV1cnMgZGUgbCdldmVuZW1lbnQgY2hlcmNow6lcclxuICAgICAgICB0aGlzLmVkaXRFdmVuZW1lbnRGb3JtID0gdGhpcy5fZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgICAgICBub206IFtub21dLFxyXG4gICAgICAgICAgICBkYXRlRXZlbmVtZW50OiBbZGF0ZUV2ZW5lbWVudF0sXHJcbiAgICAgICAgICAgIGNvbnRhY3Q6IFtjb250YWN0XSxcclxuICAgICAgICAgICAgY2xpZW50OiBbY2xpZW50XSxcclxuICAgICAgICAgICAgc2VsZWN0RXRhdDogW3NlbGVjdEV0YXRdLFxyXG4gICAgICAgICAgICBkYXRlU291bWlzc2lvbjogW2RhdGVTb3VtaXNzaW9uXSxcclxuICAgICAgICAgICAgZGF0ZUNvbmZpcm1hdGlvbjogW2RhdGVDb25maXJtYXRpb25dLFxyXG4gICAgICAgICAgICBub3RlczogW25vdGVzXSxcclxuICAgICAgICAgICAgZGF0ZUZhY3R1cmF0aW9uOiBbZGF0ZUZhY3R1cmF0aW9uXSxcclxuICAgICAgICAgICAgZGF0ZU5vblJldGVudTogW2RhdGVOb25SZXRlbnVdLFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uVGFjaGU6IFt2YWxpZGF0aW9uVGFjaGVdLFxyXG4gICAgICAgICAgICBub0V2ZW5lbWVudDogW25vRXZlbmVtZW50XSxcclxuICAgICAgICAgICAgY3JlZXJQYXI6IFtjcmVlclBhcl0sXHJcbiAgICAgICAgICAgIGRhdGVDcmVlOiBbZGF0ZUNyZWVdLFxyXG4gICAgICAgICAgICBtb2RpZlBhcjogW21vZGlmUGFyXSxcclxuICAgICAgICAgICAgbW9kaWY6IFttb2RpZl0sXHJcbiAgICAgICAgICAgIGRhdGVBbm51bGF0aW9uOiBbZGF0ZUFubnVsYXRpb25dLFxyXG4gICAgICAgICAgICBjbGllbnRfRks6IFtjbGllbnRfRktdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29waWVyRXZ4KCl7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ldmVuZW1lbnRJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub0V2ZW5lbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQ29uZmlybWF0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVGYWN0dXJhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlTm9uUmV0ZW51ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVBbm51bGF0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVTb3VtaXNzaW9uID0gdGhpcy5nZXREYXRlQWN0dWVsbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblN1Ym1pdCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidmFsZXVycyBkdSBmb3JtIGV2eCBjcsOpw6k6IFwiICk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lZGl0RXZlbmVtZW50Rm9ybS52YWx1ZSk7XHJcbiAgICAgICAgLy8gaWYgbm91dmVhdSwgYXBwZWwgY3LDqcOpLCBzaW5vbiBhcHBlbCB1cGRhdGVcclxuICAgICAgICBpZih0aGlzLmVzdE5vdXZlYXUgfHwgIXRoaXMuZm9ybUNvcGllKXtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbmVtZW50U2VydmljZS5jcmVlckV2ZW5lbWVudCh0aGlzLm15RXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgZHUgc2VydmV1ciA6ICcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQuZGF0ZUV2ZW5lbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1lc3NhZ2Ugc3VjY2VzIGNyZWF0aW9uIGV2eFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdXZlZ2FyZGVFdmVuZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UudXBkYXRlRXZlbmVtZW50KHRoaXMubXlFdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSBmYWxzZTsgXHJcbiAgICB9XHJcblxyXG4gICAgYm91dG9uU3dpdGNoKCRldmVudCl7XHJcbiAgICAgICAgdGhpcy5tb2RlU291bWlzc2lvbiA9ICRldmVudDtcclxuICAgIH1cclxuXHJcbiAgICAgLyogUsOpYWdpciBhdSBjaGFuZ2VtZW50IHVzYWdlciwgY2V0IGV2ZW5lbWVudCBlc3QgYXBwbGlxdWUgc3VyIHRvdXMgbGVzIGlucHV0cyBkdSBmb3JtLlxyXG4gICAgICAgICBzZWxvbiBsYSBzeW50YXg6IChuZ01vZGVsQ2hhbmdlKT1cIm9uVXNlckNoYW5nZSgkZXZlbnQpXCIgKi9cclxuICAgICBvblVzZXJDaGFuZ2UoJGV2ZW50KXtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJFVlgtb25Vc2VyQ2hhbmdlOiBcIiArICRldmVudCk7XHJcblxyXG4gICAgICAgICAvL0VuYWJsZSBFbnJlZ2lzdHJlciBib3V0b24uXHJcbiAgICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgLy9UYWcgQWN0aXZpdGVzIGF2ZWMgbGUgdXNlciBldCBsZSB0aW1lc3RhbXAgZHUgY2hhbmdlbWVudC5cclxuICAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmID0gbmV3IERhdGUodGhpcy5nZXREYXRlTW9kaWYoKSk7XHJcbiAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmUGFyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgdXNlckxvZ3VlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgbG9ndWUgOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKSk7XHJcbiAgICAgICAgdGhpcy51c2VyTG9nZ3VlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jb250YWN0ID0gdGhpcy51c2VyTG9nZ3VlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENsaWVudHMoKXtcclxuICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmdldENsaWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudHMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc3NvdXJjZXMoKXtcclxuICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmdldFJlc3NvdXJjZXMoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vcHJpbnQgZG9ubsOpZXMgcG91ciBjaGFxdWUgcmVzc291cmNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3NvdXJjZSBkdSBzZXJ2ZXVyIHBvdXIgYWZmaWNoZXIgZGFucyBsYSBsaXN0ZSA6IFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5yZXNzb3VyY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzc291cmNlc1tpXS5ub20pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGllbnRTZWxlY3QoY2xpZW50OiBDbGllbnQpe1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0ID0gY2xpZW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2VsZWN0ZWQgTGlzdCA6ICcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0KTtcclxuICAgICAgICB0aGlzLm5vQ2xpZW50U2VsZWN0ZWRMaXN0ID0gY2xpZW50Lm5vQ2xpZW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdubyBjbGllbnQgc2VsZWN0ZWQgTGlzdDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub0NsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgLy9hZmZpY2hhZ2UgY2xpZW50IHPDqWxlY3Rpb25uw6kgZGFucyBsYSBib2l0ZSBtb2RhbGUuIChwcmVub20gZXN0IG51bGwgc3VyIGwnb2JqZXQgZXQgdW5kZWZpbmVkIGVuIGFmZmljaGFnZSlcclxuICAgICAgICBpZih0aGlzLmNsaWVudFNlbGVjdGVkTGlzdC5wcmVub20gPT09IG51bGwgfHwgdGhpcy5jbGllbnRTZWxlY3RlZExpc3QucHJlbm9tID09PSBcIlwiIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0LnByZW5vbSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5hdWN1blByZW5vbUNsaWVudFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hdWN1blByZW5vbUNsaWVudFNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUNsaWVudFNlbGVjdGVkKCl7XHJcbiAgICAgICAgLy8gc2F2ZSBjbGllbnRcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xpZW50IGEgc2F2ZXIgOiAnKTtcclxuICAgICAgICB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZSA9IHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0O1xyXG4gICAgICAgIC8vIGlkIG1vbmdvIGR1IGNsaWVudCBzZWxlY3RlZCA6XHJcbiAgICAgICAgdGhpcy5jbGllbnRJZCA9IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLmNsaWVudElkO1xyXG4gICAgICAgIC8vc2F1dmVyIGRhbnMgbGUgZm9ybSBjb250cm9sIGhpZGRlbiBkdSBmb3JtIGVudm95w6kgYXUgc2VydmV1ci5cclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudF9GSyA9IHRoaXMuY2xpZW50SWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnaWQgbW9uZ28gY2xpZW50IHNlbGVjdGVkIDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgaWYodGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tID09PSBudWxsIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLnByZW5vbSA9PT0gXCJcIiB8fCB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5wcmVub20gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUubm9tO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNhdXZlciBsZSBjbGllbnQgc2VsZWN0aW9ubsOpIGRhbnMgbGUgaW5wdXQgY2xpZW50IGR1IGZvcm0uXHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnQgPSB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5ub20gKyAnLCAnICsgdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDbGllbnRTZWxlY3RlZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2VsZWN0ZWQgZGVsZXRlOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub0NsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lkIG1vbmdvIGNsaWVudCBzZWxlY3RlZCAobWVtZSBxdWUgZGFucyBzYXZlKTogNTgxNjU2NmJkODRmZTgyZjE0YWZiMzg4IDU4MTY1NjZiZDg0ZmU4MmYxNGFmYjM4OCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2F2ZSA6IChtZW1lIHF1ZSBkYW5zIHNhdmUpJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdHVhbGlzZXJFdngoKXtcclxuICAgICAgICBpZih0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50ICE9IG51bGwgJiYgKHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQpLnRvU3RyaW5nKCkgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UuZ2V0RXZlbmVtZW50KE51bWJlcih0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuYWN0aXZpdGVzID0gZGF0YS5hY3Rpdml0ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUV2ZW5lbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvcGllQ2V0RXZ4KCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29waWVyRXZ4KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVBY3R1ZWxsZSgpe1xyXG4gICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgdmFyIHl5eXkgPSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBtbSArIFwiLVwiICsgZGQpOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZU1vZGlmKCl7XHJcbiAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDE1LDE3KTtcclxuICAgICAgIHZhciBzcyA9IGRhdGUuc3Vic3RyaW5nKDE4LDIwKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkICsgXCIgXCIgKyBoaCArIFwiOlwiICsgbW0gKyBcIjpcIiArIHNzKTtcclxuICAgIH0gICBcclxuXHJcbiAgICBuZ09uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gXHJcbn0iXX0=

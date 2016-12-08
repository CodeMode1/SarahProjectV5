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
        var modif = "";
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
            this.myEvenement.modif = this.getDateModif();
            console.log(this.myEvenement.modif);
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
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6, 10);
        var mm = date.substring(3, 5);
        var dd = date.substring(0, 2);
        return (yyyy + "-" + mm + "-" + dd);
    };
    EvenementEditComponent.prototype.getDateModif = function () {
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6, 10);
        var MM = date.substring(3, 5);
        var dd = date.substring(0, 2);
        var hh = date.substring(12, 14);
        var mm = date.substring(15, 17);
        var ss = date.substring(18, 20);
        return (yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQXVDLGlCQUFpQixDQUFDLENBQUE7QUFFekQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBRzFELGtDQUFpQyxpQ0FBaUMsQ0FBQyxDQUFBO0FBNEVuRTtJQXlCSSxnQ0FBcUIsWUFBeUIsRUFBVSxpQkFBbUMsRUFDL0UsY0FBNkIsRUFBVSxlQUErQixFQUFVLGNBQTZCLEVBQzdHLE9BQWUsRUFBVSxpQkFBbUM7UUFGbkQsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQy9FLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0csWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDaEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FB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QUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsNkNBQVksR0FBWjtRQUNHLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBeFlMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsTUFBTSxFQUFFLENBQUUsa3VDQWtFVCxDQUFDO1NBQ0wsQ0FBQzs7OEJBQUE7SUFvVUYsNkJBQUM7QUFBRCxDQW5VQSxBQW1VQyxJQUFBO0FBblVZLDhCQUFzQix5QkFtVWxDLENBQUEiLCJmaWxlIjoiZXZlbmVtZW50cy9ldmVuZW1lbnQtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudFNlcnZpY2UgfSBmcm9tICcuL2V2ZW5lbWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1JYJztcclxuaW1wb3J0IHsgRXZlbmVtZW50IH0gZnJvbSAnLi9ldmVuZW1lbnQnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi9jbGllbnRzL2NsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50cy9jbGllbnQnO1xyXG5pbXBvcnQgeyBBY3Rpdml0ZUxpc3RDb21wb25lbnQgfSBmcm9tICcuLi9hY3Rpdml0ZXMvYWN0aXZpdGUtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcmVzc291cmNlcy9yZXNzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZSB9IGZyb20gJy4uL3Jlc3NvdXJjZXMvcmVzc291cmNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWV2ZW5lbWVudC1lZGl0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnZXZlbmVtZW50LWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAjYm91dG9uTW9kYWxPa3tcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAxJSAwIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAub3V0ZXJ7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAxJSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNsZWFyRGF0ZXtcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmZsb2F0TGVmdERhdGV7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZGl2Rm9vdGVye1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5mb290ZXJ7XHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBibGFjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbnsgIFxyXG4gICAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zcGFjZSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dGFyZWF7XHJcbiAgICAgICAgICAgIHJlc2l6ZTogbm9uZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5hbGVydC1zdWNjZXNze1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5lc3RTZWxlY3RSYW5nZXtcclxuICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1MTlCREI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRoZWFkID4gdHJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMjVlbSBzb2xpZCAjMTU2NWMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3R5bGVDbGllbnRTZWxlY3RlZHtcclxuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXZlbmVtZW50RWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIGVkaXRFdmVuZW1lbnRGb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBtb2RlU291bWlzc2lvbjogYm9vbGVhbjtcclxuICAgIHNhdXZlZ2FyZGVFdmVuZW1lbnQ6IGJvb2xlYW47XHJcbiAgICBteUV2ZW5lbWVudDogRXZlbmVtZW50O1xyXG4gICAgZm9ybUFjdHVhbGlzZXI6IGJvb2xlYW47XHJcbiAgICBmb3JtQ29waWU6IGJvb2xlYW47XHJcbiAgICAvLyBJZCBkZSBtb25nbyBkdSBjbGllbnQgc8OpbGVjdC5cclxuICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIGVzdE5vdXZlYXU6IGJvb2xlYW47XHJcbiAgICBub0V2ZW5lbWVudDogbnVtYmVyO1xyXG4gICAgLy8gQ2hhbXAgZm9yZWlnbiBrZXkgaGlkZGVuLlxyXG4gICAgaGlkZGVuRks6IGJvb2xlYW47XHJcbiAgICAvLyBDb250YWN0IGR1IGNsaWVudC5cclxuICAgIHVzZXJMb2dndWU6IHN0cmluZztcclxuICAgIC8vIENsaWVudCBhcnJheSBwb3VyIGNob2l4IGNsaWVudC5cclxuICAgIGNsaWVudHM6IENsaWVudFtdO1xyXG4gICAgY2xpZW50U2VsZWN0ZWRMaXN0OiBDbGllbnQ7XHJcbiAgICBub0NsaWVudFNlbGVjdGVkTGlzdDogbnVtYmVyO1xyXG4gICAgY2xpZW50U2VsZWN0ZWRTYXZlOiBDbGllbnQ7XHJcbiAgICBhdWN1blByZW5vbUNsaWVudFNlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgdXJsQ29waWU6IHN0cmluZztcclxuICAgIHJlc3NvdXJjZXM6IFJlc3NvdXJjZVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9mb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgX2V2ZW5lbWVudFNlcnZpY2U6IEV2ZW5lbWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSwgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9jbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwcml2YXRlIF9yZXNzb3VyY2VTZXJ2aWNlOiBSZXNzb3VyY2VTZXJ2aWNlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gbmV3IEV2ZW5lbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQWN0dWFsaXNlciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oaWRkZW5GSyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckxvZ3VlKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXJsQ29waWUgPSB0aGlzLl9yb3V0ZXIudXJsO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IFxyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5fYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHBhcmFtczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJhbXMuaGFzT3duUHJvcGVydHkoJ2lkJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXN0Tm91dmVhdSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9FdmVuZW1lbnQgPSArcGFyYW1zWydpZCddO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UuZ2V0RXZlbmVtZW50KHRoaXMubm9FdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2eCBhIG1vZGlmacOpIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpIFVSTCBjb250aWVudCBcImNvcGllXCIsIGFsb3JzIHZpZGUgbGVzIGNoYW1wcyBkdSBldnggY29wacOpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudXJsQ29waWUuaW5jbHVkZXMoXCJjb3BpZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybUFjdHVhbGlzZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3BpZXJFdngoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cmwgOiAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fcm91dGVyLnVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudXJsQ29waWUuaW5jbHVkZXMoXCJjb3BpZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldCBtb2RlIGNvcGllXCIpOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSB0cnVlOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXN0Tm91dmVhdSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVzdE5vdXZlYXUpO1xyXG4gICAgICAgICAgICAgICAgLy8gSW5pdCBsZSBmb3JtLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVlckZvcm0oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVzc291cmNlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVlckZvcm0oKXtcclxuICAgICAgICBsZXQgbm9FdmVuZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBub20gPSAnJztcclxuICAgICAgICBsZXQgZGF0ZUV2ZW5lbWVudCA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNvbnRhY3QgPSAnJztcclxuICAgICAgICBsZXQgY2xpZW50ID0gJyc7XHJcbiAgICAgICAgbGV0IHNlbGVjdEV0YXQgPSAnJztcclxuICAgICAgICBsZXQgZGF0ZVNvdW1pc3Npb24gPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlQ29uZmlybWF0aW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZUZhY3R1cmF0aW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZU5vblJldGVudSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVBbm51bGF0aW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgbm90ZXMgPSAnJztcclxuICAgICAgICBsZXQgdmFsaWRhdGlvblRhY2hlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNyZWVyUGFyID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVDcmVlID0gbnVsbDtcclxuICAgICAgICBsZXQgbW9kaWZQYXIgPSAnJztcclxuICAgICAgICBsZXQgbW9kaWYgPSBcIlwiO1xyXG4gICAgICAgIGxldCBjbGllbnRfRksgPSBudWxsO1xyXG5cclxuICAgICAgICBpZighdGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgLy8gU2V0dGVyIGxhIHZhbGV1ciBkZSBsJ2V2ZW5lbWVudCBhdSBmb3JtIGNvbnRyb2wuXHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQgPSBub0V2ZW5lbWVudDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub20gPSBub207XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUV2ZW5lbWVudCA9IGRhdGVFdmVuZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY29udGFjdCA9IGNvbnRhY3Q7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gY2xpZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LnNlbGVjdEV0YXQgPSBzZWxlY3RFdGF0O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVTb3VtaXNzaW9uID0gZGF0ZVNvdW1pc3Npb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUNvbmZpcm1hdGlvbiA9IGRhdGVDb25maXJtYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUZhY3R1cmF0aW9uID0gZGF0ZUZhY3R1cmF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVOb25SZXRlbnUgPSBkYXRlTm9uUmV0ZW51O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVBbm51bGF0aW9uID0gZGF0ZUFubnVsYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm90ZXMgPSBub3RlcztcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC52YWxpZGF0aW9uVGFjaGUgPSB2YWxpZGF0aW9uVGFjaGU7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY3JlZXJQYXIgPSBjcmVlclBhcjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQ3JlZSA9IGRhdGVDcmVlO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmUGFyID0gbW9kaWZQYXI7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubW9kaWYgPSBtb2RpZjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnRfRksgPSBjbGllbnRfRks7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcsOpZXIgbGUgZm9ybSBhdmVjIGRlcyBibGFuY3Mgb3UgbGVzIHZhbGV1cnMgZGUgbCdldmVuZW1lbnQgY2hlcmNow6kuXHJcbiAgICAgICAgdGhpcy5lZGl0RXZlbmVtZW50Rm9ybSA9IHRoaXMuX2Zvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgICAgICAgbm9tOiBbbm9tXSxcclxuICAgICAgICAgICAgZGF0ZUV2ZW5lbWVudDogW2RhdGVFdmVuZW1lbnRdLFxyXG4gICAgICAgICAgICBjb250YWN0OiBbY29udGFjdF0sXHJcbiAgICAgICAgICAgIGNsaWVudDogW2NsaWVudF0sXHJcbiAgICAgICAgICAgIHNlbGVjdEV0YXQ6IFtzZWxlY3RFdGF0XSxcclxuICAgICAgICAgICAgZGF0ZVNvdW1pc3Npb246IFtkYXRlU291bWlzc2lvbl0sXHJcbiAgICAgICAgICAgIGRhdGVDb25maXJtYXRpb246IFtkYXRlQ29uZmlybWF0aW9uXSxcclxuICAgICAgICAgICAgbm90ZXM6IFtub3Rlc10sXHJcbiAgICAgICAgICAgIGRhdGVGYWN0dXJhdGlvbjogW2RhdGVGYWN0dXJhdGlvbl0sXHJcbiAgICAgICAgICAgIGRhdGVOb25SZXRlbnU6IFtkYXRlTm9uUmV0ZW51XSxcclxuICAgICAgICAgICAgdmFsaWRhdGlvblRhY2hlOiBbdmFsaWRhdGlvblRhY2hlXSxcclxuICAgICAgICAgICAgbm9FdmVuZW1lbnQ6IFtub0V2ZW5lbWVudF0sXHJcbiAgICAgICAgICAgIGNyZWVyUGFyOiBbY3JlZXJQYXJdLFxyXG4gICAgICAgICAgICBkYXRlQ3JlZTogW2RhdGVDcmVlXSxcclxuICAgICAgICAgICAgbW9kaWZQYXI6IFttb2RpZlBhcl0sXHJcbiAgICAgICAgICAgIG1vZGlmOiBbbW9kaWZdLFxyXG4gICAgICAgICAgICBkYXRlQW5udWxhdGlvbjogW2RhdGVBbm51bGF0aW9uXSxcclxuICAgICAgICAgICAgY2xpZW50X0ZLOiBbY2xpZW50X0ZLXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvcGllckV2eCgpe1xyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZXZlbmVtZW50SWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUNvbmZpcm1hdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlRmFjdHVyYXRpb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZU5vblJldGVudSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQW5udWxhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlU291bWlzc2lvbiA9IHRoaXMuZ2V0RGF0ZUFjdHVlbGxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJtaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZhbGV1cnMgZHUgZm9ybSBldnggY3LDqcOpOiBcIiApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdEV2ZW5lbWVudEZvcm0udmFsdWUpO1xyXG4gICAgICAgIC8vIElmIG5vdXZlYXUsIGFwcGVsIGNyw6nDqSwgc2lub24gYXBwZWwgdXBkYXRlLlxyXG4gICAgICAgIGlmKHRoaXMuZXN0Tm91dmVhdSB8fCAhdGhpcy5mb3JtQ29waWUpe1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLmNyZWVyRXZlbmVtZW50KHRoaXMubXlFdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBkdSBzZXJ2ZXVyIDogJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUV2ZW5lbWVudC5kYXRlRXZlbmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWVzc2FnZSBzdWNjZXMgY3JlYXRpb24gZXZ4LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdXZlZ2FyZGVFdmVuZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UudXBkYXRlRXZlbmVtZW50KHRoaXMubXlFdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSBmYWxzZTsgXHJcbiAgICB9XHJcblxyXG4gICAgYm91dG9uU3dpdGNoKCRldmVudCl7XHJcbiAgICAgICAgdGhpcy5tb2RlU291bWlzc2lvbiA9ICRldmVudDtcclxuICAgIH1cclxuXHJcbiAgICAgLyogUsOpYWdpciBhdSBjaGFuZ2VtZW50IHVzYWdlciwgY2V0IGV2ZW5lbWVudCBlc3QgYXBwbGlxdWUgc3VyIHRvdXMgbGVzIGlucHV0cyBkdSBmb3JtLlxyXG4gICAgICAgICBzZWxvbiBsYSBzeW50YXg6IChuZ01vZGVsQ2hhbmdlKT1cIm9uVXNlckNoYW5nZSgkZXZlbnQpXCIgKi9cclxuICAgICBvblVzZXJDaGFuZ2UoJGV2ZW50KXtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJFVlgtb25Vc2VyQ2hhbmdlOiBcIiArICRldmVudCk7XHJcblxyXG4gICAgICAgICAvLyBFbmFibGUgRW5yZWdpc3RyZXIgYm91dG9uLlxyXG4gICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgIC8vIFRhZyBBY3Rpdml0ZXMgYXZlYyBsZSB1c2VyIGV0IGxlIHRpbWVzdGFtcCBkdSBjaGFuZ2VtZW50LlxyXG4gICAgICAgICBpZighdGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubW9kaWYgPSB0aGlzLmdldERhdGVNb2RpZigpO1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUV2ZW5lbWVudC5tb2RpZik7XHJcbiAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmUGFyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgdXNlckxvZ3VlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgbG9ndWUgOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKSk7XHJcbiAgICAgICAgdGhpcy51c2VyTG9nZ3VlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jb250YWN0ID0gdGhpcy51c2VyTG9nZ3VlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENsaWVudHMoKXtcclxuICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmdldENsaWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudHMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc3NvdXJjZXMoKXtcclxuICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmdldFJlc3NvdXJjZXMoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzc291cmNlIGR1IHNlcnZldXIgcG91ciBhZmZpY2hlciBkYW5zIGxhIGxpc3RlIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLnJlc3NvdXJjZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXNzb3VyY2VzW2ldLm5vbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsaWVudFNlbGVjdChjbGllbnQ6IENsaWVudCl7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZWxlY3RlZExpc3QgPSBjbGllbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWVudCBzZWxlY3RlZCBMaXN0IDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZExpc3QpO1xyXG4gICAgICAgIHRoaXMubm9DbGllbnRTZWxlY3RlZExpc3QgPSBjbGllbnQubm9DbGllbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vIGNsaWVudCBzZWxlY3RlZCBMaXN0OiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vQ2xpZW50U2VsZWN0ZWRMaXN0KTtcclxuICAgICAgICAvLyBBZmZpY2hhZ2UgY2xpZW50IHPDqWxlY3Rpb25uw6kgZGFucyBsYSBib2l0ZSBtb2RhbGUuIChwcmVub20gZXN0IG51bGwgc3VyIGwnb2JqZXQgZXQgdW5kZWZpbmVkIGVuIGFmZmljaGFnZSkuXHJcbiAgICAgICAgaWYodGhpcy5jbGllbnRTZWxlY3RlZExpc3QucHJlbm9tID09PSBudWxsIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0LnByZW5vbSA9PT0gXCJcIiB8fCB0aGlzLmNsaWVudFNlbGVjdGVkTGlzdC5wcmVub20gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmF1Y3VuUHJlbm9tQ2xpZW50U2VsZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDbGllbnRTZWxlY3RlZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgYSBzYXZlciA6ICcpO1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlID0gdGhpcy5jbGllbnRTZWxlY3RlZExpc3Q7XHJcbiAgICAgICAgLy8gSWQgbW9uZ28gZHUgY2xpZW50IHNlbGVjdGVkIDpcclxuICAgICAgICB0aGlzLmNsaWVudElkID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUuY2xpZW50SWQ7XHJcbiAgICAgICAgLy8gU2F1dmVyIGRhbnMgbGUgZm9ybSBjb250cm9sIGhpZGRlbiBkdSBmb3JtIGVudm95w6kgYXUgc2VydmV1ci5cclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudF9GSyA9IHRoaXMuY2xpZW50SWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnaWQgbW9uZ28gY2xpZW50IHNlbGVjdGVkIDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgaWYodGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tID09PSBudWxsIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLnByZW5vbSA9PT0gXCJcIiB8fCB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5wcmVub20gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUubm9tO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNhdXZlciBsZSBjbGllbnQgc2VsZWN0aW9ubsOpIGRhbnMgbGUgaW5wdXQgY2xpZW50IGR1IGZvcm0uXHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnQgPSB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5ub20gKyAnLCAnICsgdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDbGllbnRTZWxlY3RlZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2VsZWN0ZWQgZGVsZXRlOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub0NsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lkIG1vbmdvIGNsaWVudCBzZWxlY3RlZCAobWVtZSBxdWUgZGFucyBzYXZlKTogNTgxNjU2NmJkODRmZTgyZjE0YWZiMzg4IDU4MTY1NjZiZDg0ZmU4MmYxNGFmYjM4OCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2F2ZSA6IChtZW1lIHF1ZSBkYW5zIHNhdmUpJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdHVhbGlzZXJFdngoKXtcclxuICAgICAgICBpZih0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50ICE9IG51bGwgJiYgKHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQpLnRvU3RyaW5nKCkgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UuZ2V0RXZlbmVtZW50KE51bWJlcih0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuYWN0aXZpdGVzID0gZGF0YS5hY3Rpdml0ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUV2ZW5lbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvcGllQ2V0RXZ4KCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29waWVyRXZ4KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVBY3R1ZWxsZSgpe1xyXG4gICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICB2YXIgeXl5eSA9IGRhdGUuc3Vic3RyaW5nKDYsMTApO1xyXG4gICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgIHZhciBkZCA9IGRhdGUuc3Vic3RyaW5nKDAsMik7XHJcbiAgICAgICByZXR1cm4gKHl5eXkgKyBcIi1cIiArIG1tICsgXCItXCIgKyBkZCk7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRlTW9kaWYoKXtcclxuICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgdmFyIHl5eXkgPSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgIHZhciBNTSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgdmFyIGhoID0gZGF0ZS5zdWJzdHJpbmcoMTIsMTQpO1xyXG4gICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMTUsMTcpO1xyXG4gICAgICAgdmFyIHNzID0gZGF0ZS5zdWJzdHJpbmcoMTgsMjApO1xyXG4gICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBNTSArIFwiLVwiICsgZGQgKyBcIiBcIiArIGhoICsgXCI6XCIgKyBtbSArIFwiOlwiICsgc3MpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIG5nT25EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiBcclxufSJdfQ==

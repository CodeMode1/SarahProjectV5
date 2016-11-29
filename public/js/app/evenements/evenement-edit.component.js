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
var EvenementEditComponent = (function () {
    function EvenementEditComponent(_formBuilder, _evenementService, _erreurService, _activatedRoute, _clientService, _router) {
        this._formBuilder = _formBuilder;
        this._evenementService = _evenementService;
        this._erreurService = _erreurService;
        this._activatedRoute = _activatedRoute;
        this._clientService = _clientService;
        this._router = _router;
        this.myEvenement = new evenement_1.Evenement();
        this.modeSoumission = true;
        this.formActualiser = true;
        this.formCopie = true;
        this.hiddenFK = true;
        this.userLogue();
        this.urlCopie = this._router.url;
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
    EvenementEditComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    EvenementEditComponent.prototype.onSubmit = function () {
        var _this = this;
        //change mode modification, enable bouton Actualiser et copier
        //this.modeSoumission = false;
        //this.formActualiser = false;
        //this.formCopie = false;
        console.log("valeurs du form evx créé: ");
        console.log(this.editEvenementForm.value);
        // if nouveau, appel créé, sinon appel update
        if (this.estNouveau) {
            this._evenementService.creerEvenement(this.myEvenement)
                .subscribe(function (data) {
                console.log('data du serveur : ');
                console.log(data);
                _this.myEvenement = data;
                console.log(_this.myEvenement.dateEvenement);
                // message succes creation evx
                _this.sauvegardeEvenement = true;
            }, function (error) { return _this._erreurService.handleErreur(error); });
        }
        else {
            this._evenementService.updateEvenement(this.myEvenement)
                .subscribe(function (data) { return console.log(data); }, function (error) { return _this._erreurService.handleErreur(error); });
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
        //this.clientSelected = null;
        //this.noClientSelected = null;
        //this.clientId = null;
        //le nom dans le input this.myEvenement.client est l'ancien
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
    EvenementEditComponent.prototype.getDateActuelle = function () {
        var date = new Date().toLocaleDateString();
        var yyyy = date.substring(6, 10);
        var mm = date.substring(3, 5);
        var dd = date.substring(0, 2);
        return (yyyy + "-" + mm + "-" + dd);
    };
    EvenementEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-evenement-edit',
            templateUrl: 'evenement-edit.component.html',
            styles: ["\n        #boutonModalOk{\n            float: left;\n            margin: 0 1% 0 0;\n        }\n         .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n\n        .clearDate{\n            clear:both;\n            float:left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .floatLeftDate{\n            float: left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .divFooter{\n            text-align:center;\n        }\n\n        .footer{\n            border-top: 2px solid black;\n        }\n\n        button{  \n            display:block;\n            margin: 0 auto;\n        }\n\n        .space {\n            padding: 2%;\n        }\n\n        textarea{\n            resize: none;\n        }\n\n        .alert-success{\n            text-align:center;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n\n         thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n         tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        .styleClientSelected{\n            border: 1px solid #ddd;\n        }\n        \n    "]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, evenement_service_1.EvenementService, erreur_service_1.ErreurService, router_1.ActivatedRoute, client_service_1.ClientService, router_1.Router])
    ], EvenementEditComponent);
    return EvenementEditComponent;
}());
exports.EvenementEditComponent = EvenementEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQXVDLGlCQUFpQixDQUFDLENBQUE7QUFFekQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBNkUxRDtJQXdCSSxnQ0FBcUIsWUFBeUIsRUFBVSxpQkFBbUMsRUFDL0UsY0FBNkIsRUFBVSxlQUErQixFQUFVLGNBQTZCLEVBQzdHLE9BQWU7UUFGTixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDL0UsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3RyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDckMsQ0FBQztJQUVMLHlDQUFRLEdBQVI7UUFBQSxpQkFrQ0M7UUFqQ0csSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENB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QixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsTUFBTSxFQUFFLENBQUUsa3VDQWtFVCxDQUFDO1NBQ0wsQ0FBQzs7OEJBQUE7SUFvUkYsNkJBQUM7QUFBRCxDQW5SQSxBQW1SQyxJQUFBO0FBblJZLDhCQUFzQix5QkFtUmxDLENBQUEiLCJmaWxlIjoiZXZlbmVtZW50cy9ldmVuZW1lbnQtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudFNlcnZpY2UgfSBmcm9tICcuL2V2ZW5lbWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1JYJztcclxuaW1wb3J0IHsgRXZlbmVtZW50IH0gZnJvbSAnLi9ldmVuZW1lbnQnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi9jbGllbnRzL2NsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50cy9jbGllbnQnO1xyXG5pbXBvcnQgeyBBY3Rpdml0ZUxpc3RDb21wb25lbnQgfSBmcm9tICcuLi9hY3Rpdml0ZXMvYWN0aXZpdGUtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktZXZlbmVtZW50LWVkaXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdldmVuZW1lbnQtZWRpdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFsgYFxyXG4gICAgICAgICNib3V0b25Nb2RhbE9re1xyXG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDElIDAgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgIC5vdXRlcntcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgcGFkZGluZzogMCAwIDElIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuY2xlYXJEYXRle1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZmxvYXRMZWZ0RGF0ZXtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5kaXZGb290ZXJ7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmZvb3RlcntcclxuICAgICAgICAgICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIGJsYWNrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnV0dG9ueyAgXHJcbiAgICAgICAgICAgIGRpc3BsYXk6YmxvY2s7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNwYWNlIHtcclxuICAgICAgICAgICAgcGFkZGluZzogMiU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0YXJlYXtcclxuICAgICAgICAgICAgcmVzaXplOiBub25lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmFsZXJ0LXN1Y2Nlc3N7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmVzdFNlbGVjdFJhbmdle1xyXG4gICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUxOUJEQjtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgdGhlYWQgPiB0cntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yNWVtIHNvbGlkICMxNTY1YzA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgdGJvZHkgPiB0cjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5ZDRmOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zdHlsZUNsaWVudFNlbGVjdGVke1xyXG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFdmVuZW1lbnRFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgZWRpdEV2ZW5lbWVudEZvcm06IEZvcm1Hcm91cDtcclxuICAgIG1vZGVTb3VtaXNzaW9uOiBib29sZWFuO1xyXG4gICAgc2F1dmVnYXJkZUV2ZW5lbWVudDogYm9vbGVhbjtcclxuICAgIG15RXZlbmVtZW50OiBFdmVuZW1lbnQ7XHJcbiAgICBmb3JtQWN0dWFsaXNlcjogYm9vbGVhbjtcclxuICAgIGZvcm1Db3BpZTogYm9vbGVhbjtcclxuICAgIC8vIGlkIGRlIG1vbmdvIGR1IGNsaWVudCBzw6lsZWN0LlxyXG4gICAgY2xpZW50SWQ6IHN0cmluZztcclxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgZXN0Tm91dmVhdTogYm9vbGVhbjtcclxuICAgIG5vRXZlbmVtZW50OiBudW1iZXI7XHJcbiAgICAvLyBjaGFtcCBmb3JlaWduIGtleSBoaWRkZW5cclxuICAgIGhpZGRlbkZLOiBib29sZWFuO1xyXG4gICAgLy91c2VyIGxvZ3VlIHBhciBkw6lmYXV0XHJcbiAgICB1c2VyTG9nZ3VlOiBzdHJpbmc7XHJcbiAgICAvL2NsaWVudCBhcnJheSBwb3VyIGNob2l4IGNsaWVudFxyXG4gICAgY2xpZW50czogQ2xpZW50W107XHJcbiAgICBjbGllbnRTZWxlY3RlZExpc3Q6IENsaWVudDtcclxuICAgIG5vQ2xpZW50U2VsZWN0ZWRMaXN0OiBudW1iZXI7XHJcbiAgICBjbGllbnRTZWxlY3RlZFNhdmU6IENsaWVudDtcclxuICAgIGF1Y3VuUHJlbm9tQ2xpZW50U2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICB1cmxDb3BpZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9mb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgX2V2ZW5lbWVudFNlcnZpY2U6IEV2ZW5lbWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSwgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9jbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7IFxyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gbmV3IEV2ZW5lbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQWN0dWFsaXNlciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oaWRkZW5GSyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckxvZ3VlKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXJsQ29waWUgPSB0aGlzLl9yb3V0ZXIudXJsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgXHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLl9hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocGFyYW1zOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnaWQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lc3ROb3V2ZWF1ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub0V2ZW5lbWVudCA9ICtwYXJhbXNbJ2lkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbmVtZW50U2VydmljZS5nZXRFdmVuZW1lbnQodGhpcy5ub0V2ZW5lbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXZ4IGEgbW9kaWZpw6kgOiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUV2ZW5lbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TaSBVUkwgY29udGllbnQgXCJjb3BpZVwiLCBhbG9ycyB2aWRlIGxlcyBjaGFtcHMgZHUgZXZ4IGNvcGnDqS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnVybENvcGllLmluY2x1ZGVzKFwiY29waWVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1BY3R1YWxpc2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29waWVyRXZ4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXJsIDogJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3JvdXRlci51cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnVybENvcGllLmluY2x1ZGVzKFwiY29waWVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXQgbW9kZSBjb3BpZVwiKTsgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lc3ROb3V2ZWF1ID0gdHJ1ZTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lc3ROb3V2ZWF1KTtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgbGUgZm9ybVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVlckZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlZXJGb3JtKCl7XHJcbiAgICAgICAgbGV0IG5vRXZlbmVtZW50ID0gbnVsbDtcclxuICAgICAgICBsZXQgbm9tID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVFdmVuZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWN0ID0gJyc7XHJcbiAgICAgICAgbGV0IGNsaWVudCA9ICcnO1xyXG4gICAgICAgIGxldCBzZWxlY3RFdGF0ID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVTb3VtaXNzaW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZUNvbmZpcm1hdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVGYWN0dXJhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVOb25SZXRlbnUgPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlQW5udWxhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IG5vdGVzID0gJyc7XHJcbiAgICAgICAgbGV0IHZhbGlkYXRpb25UYWNoZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjcmVlclBhciA9ICcnO1xyXG4gICAgICAgIGxldCBkYXRlQ3JlZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1vZGlmUGFyID0gJyc7XHJcbiAgICAgICAgbGV0IG1vZGlmID0gbnVsbDtcclxuICAgICAgICBsZXQgY2xpZW50X0ZLID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgIC8vIHNldHRlciBsYSB2YWxldXIgZGUgbCdldmVuZW1lbnQgYXUgZm9ybSBjb250cm9sXHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQgPSBub0V2ZW5lbWVudDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub20gPSBub207XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUV2ZW5lbWVudCA9IGRhdGVFdmVuZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY29udGFjdCA9IGNvbnRhY3Q7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gY2xpZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LnNlbGVjdEV0YXQgPSBzZWxlY3RFdGF0O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVTb3VtaXNzaW9uID0gZGF0ZVNvdW1pc3Npb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUNvbmZpcm1hdGlvbiA9IGRhdGVDb25maXJtYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUZhY3R1cmF0aW9uID0gZGF0ZUZhY3R1cmF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVOb25SZXRlbnUgPSBkYXRlTm9uUmV0ZW51O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVBbm51bGF0aW9uID0gZGF0ZUFubnVsYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm90ZXMgPSBub3RlcztcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC52YWxpZGF0aW9uVGFjaGUgPSB2YWxpZGF0aW9uVGFjaGU7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY3JlZXJQYXIgPSBjcmVlclBhcjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQ3JlZSA9IGRhdGVDcmVlO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmUGFyID0gbW9kaWZQYXI7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubW9kaWYgPSBtb2RpZjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnRfRksgPSBjbGllbnRfRks7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjcsOpZXIgbGUgZm9ybSBhdmVjIGRlcyBibGFuY3Mgb3UgbGVzIHZhbGV1cnMgZGUgbCdldmVuZW1lbnQgY2hlcmNow6lcclxuICAgICAgICB0aGlzLmVkaXRFdmVuZW1lbnRGb3JtID0gdGhpcy5fZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgICAgICBub206IFtub21dLFxyXG4gICAgICAgICAgICBkYXRlRXZlbmVtZW50OiBbZGF0ZUV2ZW5lbWVudF0sXHJcbiAgICAgICAgICAgIGNvbnRhY3Q6IFtjb250YWN0XSxcclxuICAgICAgICAgICAgY2xpZW50OiBbY2xpZW50XSxcclxuICAgICAgICAgICAgc2VsZWN0RXRhdDogW3NlbGVjdEV0YXRdLFxyXG4gICAgICAgICAgICBkYXRlU291bWlzc2lvbjogW2RhdGVTb3VtaXNzaW9uXSxcclxuICAgICAgICAgICAgZGF0ZUNvbmZpcm1hdGlvbjogW2RhdGVDb25maXJtYXRpb25dLFxyXG4gICAgICAgICAgICBub3RlczogW25vdGVzXSxcclxuICAgICAgICAgICAgZGF0ZUZhY3R1cmF0aW9uOiBbZGF0ZUZhY3R1cmF0aW9uXSxcclxuICAgICAgICAgICAgZGF0ZU5vblJldGVudTogW2RhdGVOb25SZXRlbnVdLFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uVGFjaGU6IFt2YWxpZGF0aW9uVGFjaGVdLFxyXG4gICAgICAgICAgICBub0V2ZW5lbWVudDogW25vRXZlbmVtZW50XSxcclxuICAgICAgICAgICAgY3JlZXJQYXI6IFtjcmVlclBhcl0sXHJcbiAgICAgICAgICAgIGRhdGVDcmVlOiBbZGF0ZUNyZWVdLFxyXG4gICAgICAgICAgICBtb2RpZlBhcjogW21vZGlmUGFyXSxcclxuICAgICAgICAgICAgbW9kaWY6IFttb2RpZl0sXHJcbiAgICAgICAgICAgIGRhdGVBbm51bGF0aW9uOiBbZGF0ZUFubnVsYXRpb25dLFxyXG4gICAgICAgICAgICBjbGllbnRfRks6IFtjbGllbnRfRktdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29waWVyRXZ4KCl7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ldmVuZW1lbnRJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub0V2ZW5lbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQ29uZmlybWF0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVGYWN0dXJhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlTm9uUmV0ZW51ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVBbm51bGF0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVTb3VtaXNzaW9uID0gdGhpcy5nZXREYXRlQWN0dWVsbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJtaXQoKXtcclxuICAgICAgICAvL2NoYW5nZSBtb2RlIG1vZGlmaWNhdGlvbiwgZW5hYmxlIGJvdXRvbiBBY3R1YWxpc2VyIGV0IGNvcGllclxyXG4gICAgICAgIC8vdGhpcy5tb2RlU291bWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5mb3JtQWN0dWFsaXNlciA9IGZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5mb3JtQ29waWUgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZhbGV1cnMgZHUgZm9ybSBldnggY3LDqcOpOiBcIiApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdEV2ZW5lbWVudEZvcm0udmFsdWUpO1xyXG4gICAgICAgIC8vIGlmIG5vdXZlYXUsIGFwcGVsIGNyw6nDqSwgc2lub24gYXBwZWwgdXBkYXRlXHJcbiAgICAgICAgaWYodGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbmVtZW50U2VydmljZS5jcmVlckV2ZW5lbWVudCh0aGlzLm15RXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgZHUgc2VydmV1ciA6ICcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQuZGF0ZUV2ZW5lbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1lc3NhZ2Ugc3VjY2VzIGNyZWF0aW9uIGV2eFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdXZlZ2FyZGVFdmVuZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbmVtZW50U2VydmljZS51cGRhdGVFdmVuZW1lbnQodGhpcy5teUV2ZW5lbWVudClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVzZXJMb2d1ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIGxvZ3VlIDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJykpO1xyXG4gICAgICAgIHRoaXMudXNlckxvZ2d1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyTmFtZScpO1xyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY29udGFjdCA9IHRoaXMudXNlckxvZ2d1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGllbnRzKCl7XHJcbiAgICAgICAgdGhpcy5fY2xpZW50U2VydmljZS5nZXRDbGllbnRzKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50cyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGllbnRTZWxlY3QoY2xpZW50OiBDbGllbnQpe1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0ID0gY2xpZW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2VsZWN0ZWQgTGlzdCA6ICcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0KTtcclxuICAgICAgICB0aGlzLm5vQ2xpZW50U2VsZWN0ZWRMaXN0ID0gY2xpZW50Lm5vQ2xpZW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdubyBjbGllbnQgc2VsZWN0ZWQgTGlzdDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub0NsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgLy9hZmZpY2hhZ2UgY2xpZW50IHPDqWxlY3Rpb25uw6kgZGFucyBsYSBib2l0ZSBtb2RhbGUuIChwcmVub20gZXN0IG51bGwgc3VyIGwnb2JqZXQgZXQgdW5kZWZpbmVkIGVuIGFmZmljaGFnZSlcclxuICAgICAgICBpZih0aGlzLmNsaWVudFNlbGVjdGVkTGlzdC5wcmVub20gPT09IG51bGwgfHwgdGhpcy5jbGllbnRTZWxlY3RlZExpc3QucHJlbm9tID09PSBcIlwiIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0LnByZW5vbSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5hdWN1blByZW5vbUNsaWVudFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hdWN1blByZW5vbUNsaWVudFNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUNsaWVudFNlbGVjdGVkKCl7XHJcbiAgICAgICAgLy8gc2F2ZSBjbGllbnRcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xpZW50IGEgc2F2ZXIgOiAnKTtcclxuICAgICAgICB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZSA9IHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0O1xyXG4gICAgICAgIC8vIGlkIG1vbmdvIGR1IGNsaWVudCBzZWxlY3RlZCA6XHJcbiAgICAgICAgdGhpcy5jbGllbnRJZCA9IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLmNsaWVudElkO1xyXG4gICAgICAgIC8vc2F1dmVyIGRhbnMgbGUgZm9ybSBjb250cm9sIGhpZGRlbiBkdSBmb3JtIGVudm95w6kgYXUgc2VydmV1ci5cclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudF9GSyA9IHRoaXMuY2xpZW50SWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnaWQgbW9uZ28gY2xpZW50IHNlbGVjdGVkIDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgaWYodGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tID09PSBudWxsIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLnByZW5vbSA9PT0gXCJcIiB8fCB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5wcmVub20gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUubm9tO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNhdXZlciBsZSBjbGllbnQgc2VsZWN0aW9ubsOpIGRhbnMgbGUgaW5wdXQgY2xpZW50IGR1IGZvcm0uXHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnQgPSB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5ub20gKyAnLCAnICsgdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDbGllbnRTZWxlY3RlZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2VsZWN0ZWQgZGVsZXRlOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub0NsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lkIG1vbmdvIGNsaWVudCBzZWxlY3RlZCAobWVtZSBxdWUgZGFucyBzYXZlKTogNTgxNjU2NmJkODRmZTgyZjE0YWZiMzg4IDU4MTY1NjZiZDg0ZmU4MmYxNGFmYjM4OCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2F2ZSA6IChtZW1lIHF1ZSBkYW5zIHNhdmUpJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUpO1xyXG4gICAgICAgIC8vdGhpcy5jbGllbnRTZWxlY3RlZCA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLm5vQ2xpZW50U2VsZWN0ZWQgPSBudWxsO1xyXG4gICAgICAgIC8vdGhpcy5jbGllbnRJZCA9IG51bGw7XHJcbiAgICAgICAgLy9sZSBub20gZGFucyBsZSBpbnB1dCB0aGlzLm15RXZlbmVtZW50LmNsaWVudCBlc3QgbCdhbmNpZW5cclxuICAgIH1cclxuXHJcbiAgICBhY3R1YWxpc2VyRXZ4KCl7XHJcbiAgICAgICAgaWYodGhpcy5teUV2ZW5lbWVudC5ub0V2ZW5lbWVudCAhPSBudWxsICYmICh0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50KS50b1N0cmluZygpICE9IFwiXCIpe1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLmdldEV2ZW5lbWVudChOdW1iZXIodGhpcy5teUV2ZW5lbWVudC5ub0V2ZW5lbWVudCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmFjdGl2aXRlcyA9IGRhdGEuYWN0aXZpdGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRlQWN0dWVsbGUoKXtcclxuICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkKTsgICAgIFxyXG4gICAgfVxyXG5cclxuIFxyXG59Il19

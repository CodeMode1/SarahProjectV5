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
    function EvenementEditComponent(_formBuilder, _evenementService, _erreurService, _activatedRoute, _clientService) {
        this._formBuilder = _formBuilder;
        this._evenementService = _evenementService;
        this._erreurService = _erreurService;
        this._activatedRoute = _activatedRoute;
        this._clientService = _clientService;
        this.myEvenement = new evenement_1.Evenement();
        this.modeSoumission = true;
        this.formActualiser = false;
        this.formCopie = false;
        this.hiddenFK = true;
        this.aucunPrenomClientSelected = false;
        this.userLogue();
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
                }, function (error) { return _this._erreurService.handleErreur(error); });
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
    EvenementEditComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    EvenementEditComponent.prototype.onSubmit = function () {
        var _this = this;
        //change mode modification, enable bouton Actualiser et copier
        this.modeSoumission = false;
        this.formActualiser = true;
        this.formCopie = true;
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
    EvenementEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-evenement-edit',
            templateUrl: 'evenement-edit.component.html',
            styles: ["\n        #boutonModalOk{\n            float: left;\n            margin: 0 1% 0 0;\n        }\n         .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n\n        .clearDate{\n            clear:both;\n            float:left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .floatLeftDate{\n            float: left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .divFooter{\n            text-align:center;\n        }\n\n        .footer{\n            border-top: 2px solid black;\n        }\n\n        button{  \n            display:block;\n            margin: 0 auto;\n        }\n\n        .space {\n            padding: 2%;\n        }\n\n        textarea{\n            resize: none;\n        }\n\n        .alert-success{\n            text-align:center;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n\n         thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n         tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n        \n    "]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, evenement_service_1.EvenementService, erreur_service_1.ErreurService, router_1.ActivatedRoute, client_service_1.ClientService])
    ], EvenementEditComponent);
    return EvenementEditComponent;
}());
exports.EvenementEditComponent = EvenementEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFFakQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBdUUxRDtJQXVCSSxnQ0FBcUIsWUFBeUIsRUFBVSxpQkFBbUMsRUFDL0UsY0FBNkIsRUFBVSxlQUErQixFQUFVLGNBQTZCO1FBRHBHLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUMvRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQ2pILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVMLHlDQUFRLEdBQVI7UUFBQSxpQkF1QkM7UUF0QkcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ3JELFVBQUMsTUFBVztZQUNSLEVBQUUs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O1lBQzdCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsTUFBTSxFQUFFLENBQUUsaXBDQThEVCxDQUFDO1NBQ0wsQ0FBQzs7OEJBQUE7SUFrT0YsNkJBQUM7QUFBRCxDQWpPQSxBQWlPQyxJQUFBO0FBak9ZLDhCQUFzQix5QkFpT2xDLENBQUEiLCJmaWxlIjoiZXZlbmVtZW50cy9ldmVuZW1lbnQtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudFNlcnZpY2UgfSBmcm9tICcuL2V2ZW5lbWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SWCc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudCB9IGZyb20gJy4vZXZlbmVtZW50JztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi4vY2xpZW50cy9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJy4uL2NsaWVudHMvY2xpZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktZXZlbmVtZW50LWVkaXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdldmVuZW1lbnQtZWRpdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFsgYFxyXG4gICAgICAgICNib3V0b25Nb2RhbE9re1xyXG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDElIDAgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgIC5vdXRlcntcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgcGFkZGluZzogMCAwIDElIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuY2xlYXJEYXRle1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZmxvYXRMZWZ0RGF0ZXtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5kaXZGb290ZXJ7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmZvb3RlcntcclxuICAgICAgICAgICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIGJsYWNrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnV0dG9ueyAgXHJcbiAgICAgICAgICAgIGRpc3BsYXk6YmxvY2s7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNwYWNlIHtcclxuICAgICAgICAgICAgcGFkZGluZzogMiU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0YXJlYXtcclxuICAgICAgICAgICAgcmVzaXplOiBub25lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmFsZXJ0LXN1Y2Nlc3N7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmVzdFNlbGVjdFJhbmdle1xyXG4gICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUxOUJEQjtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgdGhlYWQgPiB0cntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yNWVtIHNvbGlkICMxNTY1YzA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgdGJvZHkgPiB0cjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5ZDRmOTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXZlbmVtZW50RWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIGVkaXRFdmVuZW1lbnRGb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBtb2RlU291bWlzc2lvbjogYm9vbGVhbjtcclxuICAgIHNhdXZlZ2FyZGVFdmVuZW1lbnQ6IGJvb2xlYW47XHJcbiAgICBteUV2ZW5lbWVudDogRXZlbmVtZW50O1xyXG4gICAgZm9ybUFjdHVhbGlzZXI6IGJvb2xlYW47XHJcbiAgICBmb3JtQ29waWU6IGJvb2xlYW47XHJcbiAgICAvLyBpZCBkZSBtb25nbyBkdSBjbGllbnQgc8OpbGVjdC5cclxuICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIGVzdE5vdXZlYXU6IGJvb2xlYW47XHJcbiAgICBub0V2ZW5lbWVudDogbnVtYmVyO1xyXG4gICAgLy8gY2hhbXAgZm9yZWlnbiBrZXkgaGlkZGVuXHJcbiAgICBoaWRkZW5GSzogYm9vbGVhbjtcclxuICAgIC8vdXNlciBsb2d1ZSBwYXIgZMOpZmF1dFxyXG4gICAgdXNlckxvZ2d1ZTogc3RyaW5nO1xyXG4gICAgLy9jbGllbnQgYXJyYXkgcG91ciBjaG9peCBjbGllbnRcclxuICAgIGNsaWVudHM6IENsaWVudFtdO1xyXG4gICAgY2xpZW50U2VsZWN0ZWRMaXN0OiBDbGllbnQ7XHJcbiAgICBub0NsaWVudFNlbGVjdGVkTGlzdDogbnVtYmVyO1xyXG4gICAgY2xpZW50U2VsZWN0ZWRTYXZlOiBDbGllbnQ7XHJcbiAgICBhdWN1blByZW5vbUNsaWVudFNlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9mb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgX2V2ZW5lbWVudFNlcnZpY2U6IEV2ZW5lbWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSwgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9jbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gbmV3IEV2ZW5lbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQWN0dWFsaXNlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1Db3BpZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGRlbkZLID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hdWN1blByZW5vbUNsaWVudFNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckxvZ3VlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyBcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuX2FjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChwYXJhbXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYocGFyYW1zLmhhc093blByb3BlcnR5KCdpZCcpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vRXZlbmVtZW50ID0gK3BhcmFtc1snaWQnXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLmdldEV2ZW5lbWVudCh0aGlzLm5vRXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJldnggYSBtb2RpZmnDqSA6IFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15RXZlbmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lc3ROb3V2ZWF1KTtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgbGUgZm9ybVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVlckZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlZXJGb3JtKCl7XHJcbiAgICAgICAgbGV0IG5vRXZlbmVtZW50ID0gbnVsbDtcclxuICAgICAgICBsZXQgbm9tID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVFdmVuZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWN0ID0gJyc7XHJcbiAgICAgICAgbGV0IGNsaWVudCA9ICcnO1xyXG4gICAgICAgIGxldCBzZWxlY3RFdGF0ID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVTb3VtaXNzaW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZUNvbmZpcm1hdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVGYWN0dXJhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVOb25SZXRlbnUgPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlQW5udWxhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IG5vdGVzID0gJyc7XHJcbiAgICAgICAgbGV0IHZhbGlkYXRpb25UYWNoZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjcmVlclBhciA9ICcnO1xyXG4gICAgICAgIGxldCBkYXRlQ3JlZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1vZGlmUGFyID0gJyc7XHJcbiAgICAgICAgbGV0IG1vZGlmID0gbnVsbDtcclxuICAgICAgICBsZXQgY2xpZW50X0ZLID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgIC8vIHNldHRlciBsYSB2YWxldXIgZGUgbCdldmVuZW1lbnQgYXUgZm9ybSBjb250cm9sXHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQgPSBub0V2ZW5lbWVudDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub20gPSBub207XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUV2ZW5lbWVudCA9IGRhdGVFdmVuZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY29udGFjdCA9IGNvbnRhY3Q7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gY2xpZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LnNlbGVjdEV0YXQgPSBzZWxlY3RFdGF0O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVTb3VtaXNzaW9uID0gZGF0ZVNvdW1pc3Npb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUNvbmZpcm1hdGlvbiA9IGRhdGVDb25maXJtYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUZhY3R1cmF0aW9uID0gZGF0ZUZhY3R1cmF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVOb25SZXRlbnUgPSBkYXRlTm9uUmV0ZW51O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVBbm51bGF0aW9uID0gZGF0ZUFubnVsYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm90ZXMgPSBub3RlcztcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC52YWxpZGF0aW9uVGFjaGUgPSB2YWxpZGF0aW9uVGFjaGU7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY3JlZXJQYXIgPSBjcmVlclBhcjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQ3JlZSA9IGRhdGVDcmVlO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmUGFyID0gbW9kaWZQYXI7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubW9kaWYgPSBtb2RpZjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnRfRksgPSBjbGllbnRfRks7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjcsOpZXIgbGUgZm9ybSBhdmVjIGRlcyBibGFuY3Mgb3UgbGVzIHZhbGV1cnMgZGUgbCdldmVuZW1lbnQgY2hlcmNow6lcclxuICAgICAgICB0aGlzLmVkaXRFdmVuZW1lbnRGb3JtID0gdGhpcy5fZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgICAgICBub206IFtub21dLFxyXG4gICAgICAgICAgICBkYXRlRXZlbmVtZW50OiBbZGF0ZUV2ZW5lbWVudF0sXHJcbiAgICAgICAgICAgIGNvbnRhY3Q6IFtjb250YWN0XSxcclxuICAgICAgICAgICAgY2xpZW50OiBbY2xpZW50XSxcclxuICAgICAgICAgICAgc2VsZWN0RXRhdDogW3NlbGVjdEV0YXRdLFxyXG4gICAgICAgICAgICBkYXRlU291bWlzc2lvbjogW2RhdGVTb3VtaXNzaW9uXSxcclxuICAgICAgICAgICAgZGF0ZUNvbmZpcm1hdGlvbjogW2RhdGVDb25maXJtYXRpb25dLFxyXG4gICAgICAgICAgICBub3RlczogW25vdGVzXSxcclxuICAgICAgICAgICAgZGF0ZUZhY3R1cmF0aW9uOiBbZGF0ZUZhY3R1cmF0aW9uXSxcclxuICAgICAgICAgICAgZGF0ZU5vblJldGVudTogW2RhdGVOb25SZXRlbnVdLFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uVGFjaGU6IFt2YWxpZGF0aW9uVGFjaGVdLFxyXG4gICAgICAgICAgICBub0V2ZW5lbWVudDogW25vRXZlbmVtZW50XSxcclxuICAgICAgICAgICAgY3JlZXJQYXI6IFtjcmVlclBhcl0sXHJcbiAgICAgICAgICAgIGRhdGVDcmVlOiBbZGF0ZUNyZWVdLFxyXG4gICAgICAgICAgICBtb2RpZlBhcjogW21vZGlmUGFyXSxcclxuICAgICAgICAgICAgbW9kaWY6IFttb2RpZl0sXHJcbiAgICAgICAgICAgIGRhdGVBbm51bGF0aW9uOiBbZGF0ZUFubnVsYXRpb25dLFxyXG4gICAgICAgICAgICBjbGllbnRfRks6IFtjbGllbnRfRktdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KCl7XHJcbiAgICAgICAgLy9jaGFuZ2UgbW9kZSBtb2RpZmljYXRpb24sIGVuYWJsZSBib3V0b24gQWN0dWFsaXNlciBldCBjb3BpZXJcclxuICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mb3JtQWN0dWFsaXNlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mb3JtQ29waWUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidmFsZXVycyBkdSBmb3JtIGV2eCBjcsOpw6k6IFwiICk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lZGl0RXZlbmVtZW50Rm9ybS52YWx1ZSk7XHJcbiAgICAgICAgLy8gaWYgbm91dmVhdSwgYXBwZWwgY3LDqcOpLCBzaW5vbiBhcHBlbCB1cGRhdGVcclxuICAgICAgICBpZih0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLmNyZWVyRXZlbmVtZW50KHRoaXMubXlFdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBkdSBzZXJ2ZXVyIDogJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUV2ZW5lbWVudC5kYXRlRXZlbmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWVzc2FnZSBzdWNjZXMgY3JlYXRpb24gZXZ4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F1dmVnYXJkZUV2ZW5lbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLnVwZGF0ZUV2ZW5lbWVudCh0aGlzLm15RXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXNlckxvZ3VlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgbG9ndWUgOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKSk7XHJcbiAgICAgICAgdGhpcy51c2VyTG9nZ3VlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jb250YWN0ID0gdGhpcy51c2VyTG9nZ3VlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENsaWVudHMoKXtcclxuICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmdldENsaWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudHMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWVudFNlbGVjdChjbGllbnQ6IENsaWVudCl7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZWxlY3RlZExpc3QgPSBjbGllbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWVudCBzZWxlY3RlZCBMaXN0IDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZExpc3QpO1xyXG4gICAgICAgIHRoaXMubm9DbGllbnRTZWxlY3RlZExpc3QgPSBjbGllbnQubm9DbGllbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vIGNsaWVudCBzZWxlY3RlZCBMaXN0OiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vQ2xpZW50U2VsZWN0ZWRMaXN0KTtcclxuICAgICAgICAvL2FmZmljaGFnZSBjbGllbnQgc8OpbGVjdGlvbm7DqSBkYW5zIGxhIGJvaXRlIG1vZGFsZS4gKHByZW5vbSBlc3QgbnVsbCBzdXIgbCdvYmpldCBldCB1bmRlZmluZWQgZW4gYWZmaWNoYWdlKVxyXG4gICAgICAgIGlmKHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0LnByZW5vbSA9PT0gbnVsbCB8fCB0aGlzLmNsaWVudFNlbGVjdGVkTGlzdC5wcmVub20gPT09IFwiXCIgfHwgdGhpcy5jbGllbnRTZWxlY3RlZExpc3QucHJlbm9tID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmF1Y3VuUHJlbm9tQ2xpZW50U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmF1Y3VuUHJlbm9tQ2xpZW50U2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hdWN1blByZW5vbUNsaWVudFNlbGVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ2xpZW50U2VsZWN0ZWQoKXtcclxuICAgICAgICAvLyBzYXZlIGNsaWVudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgYSBzYXZlciA6ICcpO1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlID0gdGhpcy5jbGllbnRTZWxlY3RlZExpc3Q7XHJcbiAgICAgICAgLy8gaWQgbW9uZ28gZHUgY2xpZW50IHNlbGVjdGVkIDpcclxuICAgICAgICB0aGlzLmNsaWVudElkID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUuY2xpZW50SWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnaWQgbW9uZ28gY2xpZW50IHNlbGVjdGVkIDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgaWYodGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tID09PSBudWxsIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLnByZW5vbSA9PT0gXCJcIiB8fCB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5wcmVub20gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUubm9tO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNhdXZlciBsZSBjbGllbnQgc2VsZWN0aW9ubsOpIGRhbnMgbGUgaW5wdXQgY2xpZW50IGR1IGZvcm0uXHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnQgPSB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5ub20gKyAnLCAnICsgdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDbGllbnRTZWxlY3RlZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2VsZWN0ZWQgZGVsZXRlOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub0NsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lkIG1vbmdvIGNsaWVudCBzZWxlY3RlZCAobWVtZSBxdWUgZGFucyBzYXZlKTogNTgxNjU2NmJkODRmZTgyZjE0YWZiMzg4IDU4MTY1NjZiZDg0ZmU4MmYxNGFmYjM4OCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgc2F2ZSA6IChtZW1lIHF1ZSBkYW5zIHNhdmUpJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZFNhdmUpO1xyXG4gICAgICAgIC8vdGhpcy5jbGllbnRTZWxlY3RlZCA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLm5vQ2xpZW50U2VsZWN0ZWQgPSBudWxsO1xyXG4gICAgICAgIC8vdGhpcy5jbGllbnRJZCA9IG51bGw7XHJcbiAgICAgICAgLy9sZSBub20gZGFucyBsZSBpbnB1dCB0aGlzLm15RXZlbmVtZW50LmNsaWVudCBlc3QgbCdhbmNpZW5cclxuICAgIH1cclxuXHJcbiBcclxufSJdfQ==

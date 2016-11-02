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
    EvenementEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-evenement-edit',
            templateUrl: 'evenement-edit.component.html',
            styles: ["\n        #boutonModalOk{\n            float: left;\n            margin: 0 1% 0 0;\n        }\n         .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n\n        .clearDate{\n            clear:both;\n            float:left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .floatLeftDate{\n            float: left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .divFooter{\n            text-align:center;\n        }\n\n        .footer{\n            border-top: 2px solid black;\n        }\n\n        button{  \n            display:block;\n            margin: 0 auto;\n        }\n\n        .space {\n            padding: 2%;\n        }\n\n        textarea{\n            resize: none;\n        }\n\n        .alert-success{\n            text-align:center;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n\n         thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n         tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        .styleClientSelected{\n            border: 1px solid #ddd;\n        }\n        \n    "]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, evenement_service_1.EvenementService, erreur_service_1.ErreurService, router_1.ActivatedRoute, client_service_1.ClientService])
    ], EvenementEditComponent);
    return EvenementEditComponent;
}());
exports.EvenementEditComponent = EvenementEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFFakQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBMkUxRDtJQXVCSSxnQ0FBcUIsWUFBeUIsRUFBVSxpQkFBbUMsRUFDL0UsY0FBNkIsRUFBVSxlQUErQixFQUFVLGNBQTZCO1FBRHBHLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUMvRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQ2pILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTCx5Q0FBUSxHQUFSO1FBQUEsaUJBdUJDO1FBdEJHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUNyRCxVQUFDLE1BQVc7WUFDUixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FB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QUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE1BQU0sRUFBRSxDQUFFLGt1Q0FrRVQsQ0FBQztTQUNMLENBQUM7OzhCQUFBO0lBbU9GLDZCQUFDO0FBQUQsQ0FsT0EsQUFrT0MsSUFBQTtBQWxPWSw4QkFBc0IseUJBa09sQyxDQUFBIiwiZmlsZSI6ImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVuZW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9ldmVuZW1lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvUlgnO1xyXG5pbXBvcnQgeyBFdmVuZW1lbnQgfSBmcm9tICcuL2V2ZW5lbWVudCc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gJy4uL2NsaWVudHMvY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICcuLi9jbGllbnRzL2NsaWVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWV2ZW5lbWVudC1lZGl0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnZXZlbmVtZW50LWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAjYm91dG9uTW9kYWxPa3tcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAxJSAwIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAub3V0ZXJ7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAxJSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNsZWFyRGF0ZXtcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmZsb2F0TGVmdERhdGV7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZGl2Rm9vdGVye1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5mb290ZXJ7XHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBibGFjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbnsgIFxyXG4gICAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zcGFjZSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dGFyZWF7XHJcbiAgICAgICAgICAgIHJlc2l6ZTogbm9uZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5hbGVydC1zdWNjZXNze1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5lc3RTZWxlY3RSYW5nZXtcclxuICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1MTlCREI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRoZWFkID4gdHJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMjVlbSBzb2xpZCAjMTU2NWMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3R5bGVDbGllbnRTZWxlY3RlZHtcclxuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXZlbmVtZW50RWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIGVkaXRFdmVuZW1lbnRGb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBtb2RlU291bWlzc2lvbjogYm9vbGVhbjtcclxuICAgIHNhdXZlZ2FyZGVFdmVuZW1lbnQ6IGJvb2xlYW47XHJcbiAgICBteUV2ZW5lbWVudDogRXZlbmVtZW50O1xyXG4gICAgZm9ybUFjdHVhbGlzZXI6IGJvb2xlYW47XHJcbiAgICBmb3JtQ29waWU6IGJvb2xlYW47XHJcbiAgICAvLyBpZCBkZSBtb25nbyBkdSBjbGllbnQgc8OpbGVjdC5cclxuICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIGVzdE5vdXZlYXU6IGJvb2xlYW47XHJcbiAgICBub0V2ZW5lbWVudDogbnVtYmVyO1xyXG4gICAgLy8gY2hhbXAgZm9yZWlnbiBrZXkgaGlkZGVuXHJcbiAgICBoaWRkZW5GSzogYm9vbGVhbjtcclxuICAgIC8vdXNlciBsb2d1ZSBwYXIgZMOpZmF1dFxyXG4gICAgdXNlckxvZ2d1ZTogc3RyaW5nO1xyXG4gICAgLy9jbGllbnQgYXJyYXkgcG91ciBjaG9peCBjbGllbnRcclxuICAgIGNsaWVudHM6IENsaWVudFtdO1xyXG4gICAgY2xpZW50U2VsZWN0ZWRMaXN0OiBDbGllbnQ7XHJcbiAgICBub0NsaWVudFNlbGVjdGVkTGlzdDogbnVtYmVyO1xyXG4gICAgY2xpZW50U2VsZWN0ZWRTYXZlOiBDbGllbnQ7XHJcbiAgICBhdWN1blByZW5vbUNsaWVudFNlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9mb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgX2V2ZW5lbWVudFNlcnZpY2U6IEV2ZW5lbWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSwgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9jbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gbmV3IEV2ZW5lbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQWN0dWFsaXNlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1Db3BpZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGRlbkZLID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51c2VyTG9ndWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IFxyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5fYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHBhcmFtczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJhbXMuaGFzT3duUHJvcGVydHkoJ2lkJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXN0Tm91dmVhdSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9FdmVuZW1lbnQgPSArcGFyYW1zWydpZCddO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UuZ2V0RXZlbmVtZW50KHRoaXMubm9FdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2eCBhIG1vZGlmacOpIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXN0Tm91dmVhdSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVzdE5vdXZlYXUpO1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBsZSBmb3JtXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWVyRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVlckZvcm0oKXtcclxuICAgICAgICBsZXQgbm9FdmVuZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBub20gPSAnJztcclxuICAgICAgICBsZXQgZGF0ZUV2ZW5lbWVudCA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNvbnRhY3QgPSAnJztcclxuICAgICAgICBsZXQgY2xpZW50ID0gJyc7XHJcbiAgICAgICAgbGV0IHNlbGVjdEV0YXQgPSAnJztcclxuICAgICAgICBsZXQgZGF0ZVNvdW1pc3Npb24gPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlQ29uZmlybWF0aW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZUZhY3R1cmF0aW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZU5vblJldGVudSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVBbm51bGF0aW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgbm90ZXMgPSAnJztcclxuICAgICAgICBsZXQgdmFsaWRhdGlvblRhY2hlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNyZWVyUGFyID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVDcmVlID0gbnVsbDtcclxuICAgICAgICBsZXQgbW9kaWZQYXIgPSAnJztcclxuICAgICAgICBsZXQgbW9kaWYgPSBudWxsO1xyXG4gICAgICAgIGxldCBjbGllbnRfRksgPSBudWxsO1xyXG5cclxuICAgICAgICBpZighdGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgLy8gc2V0dGVyIGxhIHZhbGV1ciBkZSBsJ2V2ZW5lbWVudCBhdSBmb3JtIGNvbnRyb2xcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub0V2ZW5lbWVudCA9IG5vRXZlbmVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm5vbSA9IG5vbTtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlRXZlbmVtZW50ID0gZGF0ZUV2ZW5lbWVudDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jb250YWN0ID0gY29udGFjdDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnQgPSBjbGllbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuc2VsZWN0RXRhdCA9IHNlbGVjdEV0YXQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZVNvdW1pc3Npb24gPSBkYXRlU291bWlzc2lvbjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQ29uZmlybWF0aW9uID0gZGF0ZUNvbmZpcm1hdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlRmFjdHVyYXRpb24gPSBkYXRlRmFjdHVyYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZU5vblJldGVudSA9IGRhdGVOb25SZXRlbnU7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUFubnVsYXRpb24gPSBkYXRlQW5udWxhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub3RlcyA9IG5vdGVzO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LnZhbGlkYXRpb25UYWNoZSA9IHZhbGlkYXRpb25UYWNoZTtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jcmVlclBhciA9IGNyZWVyUGFyO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVDcmVlID0gZGF0ZUNyZWU7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubW9kaWZQYXIgPSBtb2RpZlBhcjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5tb2RpZiA9IG1vZGlmO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudF9GSyA9IGNsaWVudF9GSztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNyw6llciBsZSBmb3JtIGF2ZWMgZGVzIGJsYW5jcyBvdSBsZXMgdmFsZXVycyBkZSBsJ2V2ZW5lbWVudCBjaGVyY2jDqVxyXG4gICAgICAgIHRoaXMuZWRpdEV2ZW5lbWVudEZvcm0gPSB0aGlzLl9mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgIG5vbTogW25vbV0sXHJcbiAgICAgICAgICAgIGRhdGVFdmVuZW1lbnQ6IFtkYXRlRXZlbmVtZW50XSxcclxuICAgICAgICAgICAgY29udGFjdDogW2NvbnRhY3RdLFxyXG4gICAgICAgICAgICBjbGllbnQ6IFtjbGllbnRdLFxyXG4gICAgICAgICAgICBzZWxlY3RFdGF0OiBbc2VsZWN0RXRhdF0sXHJcbiAgICAgICAgICAgIGRhdGVTb3VtaXNzaW9uOiBbZGF0ZVNvdW1pc3Npb25dLFxyXG4gICAgICAgICAgICBkYXRlQ29uZmlybWF0aW9uOiBbZGF0ZUNvbmZpcm1hdGlvbl0sXHJcbiAgICAgICAgICAgIG5vdGVzOiBbbm90ZXNdLFxyXG4gICAgICAgICAgICBkYXRlRmFjdHVyYXRpb246IFtkYXRlRmFjdHVyYXRpb25dLFxyXG4gICAgICAgICAgICBkYXRlTm9uUmV0ZW51OiBbZGF0ZU5vblJldGVudV0sXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25UYWNoZTogW3ZhbGlkYXRpb25UYWNoZV0sXHJcbiAgICAgICAgICAgIG5vRXZlbmVtZW50OiBbbm9FdmVuZW1lbnRdLFxyXG4gICAgICAgICAgICBjcmVlclBhcjogW2NyZWVyUGFyXSxcclxuICAgICAgICAgICAgZGF0ZUNyZWU6IFtkYXRlQ3JlZV0sXHJcbiAgICAgICAgICAgIG1vZGlmUGFyOiBbbW9kaWZQYXJdLFxyXG4gICAgICAgICAgICBtb2RpZjogW21vZGlmXSxcclxuICAgICAgICAgICAgZGF0ZUFubnVsYXRpb246IFtkYXRlQW5udWxhdGlvbl0sXHJcbiAgICAgICAgICAgIGNsaWVudF9GSzogW2NsaWVudF9GS11cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJtaXQoKXtcclxuICAgICAgICAvL2NoYW5nZSBtb2RlIG1vZGlmaWNhdGlvbiwgZW5hYmxlIGJvdXRvbiBBY3R1YWxpc2VyIGV0IGNvcGllclxyXG4gICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZvcm1BY3R1YWxpc2VyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZvcm1Db3BpZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2YWxldXJzIGR1IGZvcm0gZXZ4IGNyw6nDqTogXCIgKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVkaXRFdmVuZW1lbnRGb3JtLnZhbHVlKTtcclxuICAgICAgICAvLyBpZiBub3V2ZWF1LCBhcHBlbCBjcsOpw6ksIHNpbm9uIGFwcGVsIHVwZGF0ZVxyXG4gICAgICAgIGlmKHRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UuY3JlZXJFdmVuZW1lbnQodGhpcy5teUV2ZW5lbWVudClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGR1IHNlcnZldXIgOiAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15RXZlbmVtZW50LmRhdGVFdmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtZXNzYWdlIHN1Y2NlcyBjcmVhdGlvbiBldnhcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXV2ZWdhcmRlRXZlbmVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UudXBkYXRlRXZlbmVtZW50KHRoaXMubXlFdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICB1c2VyTG9ndWUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygndXNlciBsb2d1ZSA6ICcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyTmFtZScpKTtcclxuICAgICAgICB0aGlzLnVzZXJMb2dndWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKTtcclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNvbnRhY3QgPSB0aGlzLnVzZXJMb2dndWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xpZW50cygpe1xyXG4gICAgICAgIHRoaXMuX2NsaWVudFNlcnZpY2UuZ2V0Q2xpZW50cygpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWVudHMgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpZW50U2VsZWN0KGNsaWVudDogQ2xpZW50KXtcclxuICAgICAgICB0aGlzLmNsaWVudFNlbGVjdGVkTGlzdCA9IGNsaWVudDtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xpZW50IHNlbGVjdGVkIExpc3QgOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkTGlzdCk7XHJcbiAgICAgICAgdGhpcy5ub0NsaWVudFNlbGVjdGVkTGlzdCA9IGNsaWVudC5ub0NsaWVudDtcclxuICAgICAgICBjb25zb2xlLmxvZygnbm8gY2xpZW50IHNlbGVjdGVkIExpc3Q6ICcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9DbGllbnRTZWxlY3RlZExpc3QpO1xyXG4gICAgICAgIC8vYWZmaWNoYWdlIGNsaWVudCBzw6lsZWN0aW9ubsOpIGRhbnMgbGEgYm9pdGUgbW9kYWxlLiAocHJlbm9tIGVzdCBudWxsIHN1ciBsJ29iamV0IGV0IHVuZGVmaW5lZCBlbiBhZmZpY2hhZ2UpXHJcbiAgICAgICAgaWYodGhpcy5jbGllbnRTZWxlY3RlZExpc3QucHJlbm9tID09PSBudWxsIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0LnByZW5vbSA9PT0gXCJcIiB8fCB0aGlzLmNsaWVudFNlbGVjdGVkTGlzdC5wcmVub20gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmF1Y3VuUHJlbm9tQ2xpZW50U2VsZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDbGllbnRTZWxlY3RlZCgpe1xyXG4gICAgICAgIC8vIHNhdmUgY2xpZW50XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWVudCBhIHNhdmVyIDogJyk7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUgPSB0aGlzLmNsaWVudFNlbGVjdGVkTGlzdDtcclxuICAgICAgICAvLyBpZCBtb25nbyBkdSBjbGllbnQgc2VsZWN0ZWQgOlxyXG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5jbGllbnRJZDtcclxuICAgICAgICAvL3NhdXZlciBkYW5zIGxlIGZvcm0gY29udHJvbCBoaWRkZW4gZHUgZm9ybSBlbnZvecOpIGF1IHNlcnZldXIuXHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnRfRksgPSB0aGlzLmNsaWVudElkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLnByZW5vbSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lkIG1vbmdvIGNsaWVudCBzZWxlY3RlZCA6ICcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIGlmKHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLnByZW5vbSA9PT0gbnVsbCB8fCB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5wcmVub20gPT09IFwiXCIgfHwgdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudCA9IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLm5vbTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzYXV2ZXIgbGUgY2xpZW50IHNlbGVjdGlvbm7DqSBkYW5zIGxlIGlucHV0IGNsaWVudCBkdSBmb3JtLlxyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUubm9tICsgJywgJyArIHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLnByZW5vbTsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQ2xpZW50U2VsZWN0ZWQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xpZW50IHNlbGVjdGVkIGRlbGV0ZTogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZExpc3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9DbGllbnRTZWxlY3RlZExpc3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpZCBtb25nbyBjbGllbnQgc2VsZWN0ZWQgKG1lbWUgcXVlIGRhbnMgc2F2ZSk6IDU4MTY1NjZiZDg0ZmU4MmYxNGFmYjM4OCA1ODE2NTY2YmQ4NGZlODJmMTRhZmIzODgnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudElkKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xpZW50IHNhdmUgOiAobWVtZSBxdWUgZGFucyBzYXZlKScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlKTtcclxuICAgICAgICAvL3RoaXMuY2xpZW50U2VsZWN0ZWQgPSBudWxsO1xyXG4gICAgICAgIC8vdGhpcy5ub0NsaWVudFNlbGVjdGVkID0gbnVsbDtcclxuICAgICAgICAvL3RoaXMuY2xpZW50SWQgPSBudWxsO1xyXG4gICAgICAgIC8vbGUgbm9tIGRhbnMgbGUgaW5wdXQgdGhpcy5teUV2ZW5lbWVudC5jbGllbnQgZXN0IGwnYW5jaWVuXHJcbiAgICB9XHJcblxyXG4gXHJcbn0iXX0=

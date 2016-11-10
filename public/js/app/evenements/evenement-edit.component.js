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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFFakQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBNkUxRDtJQXVCSSxnQ0FBcUIsWUFBeUIsRUFBVSxpQkFBbUMsRUFDL0UsY0FBNkIsRUFBVSxlQUErQixFQUFVLGNBQTZCO1FBRHBHLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUMvRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQ2pILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTCx5Q0FBUSxHQUFSO1FBQUEsaUJBdUJDO1FBdEJHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUNyRCxVQUFDLE1BQVc7WUFDUixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FB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QUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE1BQU0sRUFBRSxDQUFFLGt1Q0FrRVQsQ0FBQztTQUNMLENBQUM7OzhCQUFBO0lBbU9GLDZCQUFDO0FBQUQsQ0FsT0EsQUFrT0MsSUFBQTtBQWxPWSw4QkFBc0IseUJBa09sQyxDQUFBIiwiZmlsZSI6ImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVuZW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9ldmVuZW1lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvUlgnO1xyXG5pbXBvcnQgeyBFdmVuZW1lbnQgfSBmcm9tICcuL2V2ZW5lbWVudCc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gJy4uL2NsaWVudHMvY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICcuLi9jbGllbnRzL2NsaWVudCc7XHJcbmltcG9ydCB7IEFjdGl2aXRlTGlzdENvbXBvbmVudCB9IGZyb20gJy4uL2FjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudCc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1ldmVuZW1lbnQtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2V2ZW5lbWVudC1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgI2JvdXRvbk1vZGFsT2t7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgMSUgMCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5jbGVhckRhdGV7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5mbG9hdExlZnREYXRle1xyXG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmRpdkZvb3RlcntcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZm9vdGVye1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgYmxhY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXR0b257ICBcclxuICAgICAgICAgICAgZGlzcGxheTpibG9jaztcclxuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3BhY2Uge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAyJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHRhcmVhe1xyXG4gICAgICAgICAgICByZXNpemU6IG5vbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYWxlcnQtc3VjY2Vzc3tcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICB0Ym9keSA+IHRyOmhvdmVye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlkNGY5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnN0eWxlQ2xpZW50U2VsZWN0ZWR7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEV2ZW5lbWVudEVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBlZGl0RXZlbmVtZW50Rm9ybTogRm9ybUdyb3VwO1xyXG4gICAgbW9kZVNvdW1pc3Npb246IGJvb2xlYW47XHJcbiAgICBzYXV2ZWdhcmRlRXZlbmVtZW50OiBib29sZWFuO1xyXG4gICAgbXlFdmVuZW1lbnQ6IEV2ZW5lbWVudDtcclxuICAgIGZvcm1BY3R1YWxpc2VyOiBib29sZWFuO1xyXG4gICAgZm9ybUNvcGllOiBib29sZWFuO1xyXG4gICAgLy8gaWQgZGUgbW9uZ28gZHUgY2xpZW50IHPDqWxlY3QuXHJcbiAgICBjbGllbnRJZDogc3RyaW5nO1xyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgbm9FdmVuZW1lbnQ6IG51bWJlcjtcclxuICAgIC8vIGNoYW1wIGZvcmVpZ24ga2V5IGhpZGRlblxyXG4gICAgaGlkZGVuRks6IGJvb2xlYW47XHJcbiAgICAvL3VzZXIgbG9ndWUgcGFyIGTDqWZhdXRcclxuICAgIHVzZXJMb2dndWU6IHN0cmluZztcclxuICAgIC8vY2xpZW50IGFycmF5IHBvdXIgY2hvaXggY2xpZW50XHJcbiAgICBjbGllbnRzOiBDbGllbnRbXTtcclxuICAgIGNsaWVudFNlbGVjdGVkTGlzdDogQ2xpZW50O1xyXG4gICAgbm9DbGllbnRTZWxlY3RlZExpc3Q6IG51bWJlcjtcclxuICAgIGNsaWVudFNlbGVjdGVkU2F2ZTogQ2xpZW50O1xyXG4gICAgYXVjdW5QcmVub21DbGllbnRTZWxlY3RlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIF9ldmVuZW1lbnRTZXJ2aWNlOiBFdmVuZW1lbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2VycmV1clNlcnZpY2U6IEVycmV1clNlcnZpY2UsIHByaXZhdGUgX2FjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBfY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSkgeyBcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudCA9IG5ldyBFdmVuZW1lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RlU291bWlzc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUFjdHVhbGlzZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ29waWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oaWRkZW5GSyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckxvZ3VlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyBcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuX2FjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChwYXJhbXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYocGFyYW1zLmhhc093blByb3BlcnR5KCdpZCcpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vRXZlbmVtZW50ID0gK3BhcmFtc1snaWQnXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLmdldEV2ZW5lbWVudCh0aGlzLm5vRXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJldnggYSBtb2RpZmnDqSA6IFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15RXZlbmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lc3ROb3V2ZWF1KTtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgbGUgZm9ybVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVlckZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlZXJGb3JtKCl7XHJcbiAgICAgICAgbGV0IG5vRXZlbmVtZW50ID0gbnVsbDtcclxuICAgICAgICBsZXQgbm9tID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVFdmVuZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWN0ID0gJyc7XHJcbiAgICAgICAgbGV0IGNsaWVudCA9ICcnO1xyXG4gICAgICAgIGxldCBzZWxlY3RFdGF0ID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVTb3VtaXNzaW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZUNvbmZpcm1hdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVGYWN0dXJhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVOb25SZXRlbnUgPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlQW5udWxhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IG5vdGVzID0gJyc7XHJcbiAgICAgICAgbGV0IHZhbGlkYXRpb25UYWNoZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjcmVlclBhciA9ICcnO1xyXG4gICAgICAgIGxldCBkYXRlQ3JlZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1vZGlmUGFyID0gJyc7XHJcbiAgICAgICAgbGV0IG1vZGlmID0gbnVsbDtcclxuICAgICAgICBsZXQgY2xpZW50X0ZLID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgIC8vIHNldHRlciBsYSB2YWxldXIgZGUgbCdldmVuZW1lbnQgYXUgZm9ybSBjb250cm9sXHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm9FdmVuZW1lbnQgPSBub0V2ZW5lbWVudDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub20gPSBub207XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUV2ZW5lbWVudCA9IGRhdGVFdmVuZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY29udGFjdCA9IGNvbnRhY3Q7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50ID0gY2xpZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LnNlbGVjdEV0YXQgPSBzZWxlY3RFdGF0O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVTb3VtaXNzaW9uID0gZGF0ZVNvdW1pc3Npb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUNvbmZpcm1hdGlvbiA9IGRhdGVDb25maXJtYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUZhY3R1cmF0aW9uID0gZGF0ZUZhY3R1cmF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVOb25SZXRlbnUgPSBkYXRlTm9uUmV0ZW51O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVBbm51bGF0aW9uID0gZGF0ZUFubnVsYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm90ZXMgPSBub3RlcztcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC52YWxpZGF0aW9uVGFjaGUgPSB2YWxpZGF0aW9uVGFjaGU7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY3JlZXJQYXIgPSBjcmVlclBhcjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQ3JlZSA9IGRhdGVDcmVlO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmUGFyID0gbW9kaWZQYXI7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubW9kaWYgPSBtb2RpZjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnRfRksgPSBjbGllbnRfRks7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjcsOpZXIgbGUgZm9ybSBhdmVjIGRlcyBibGFuY3Mgb3UgbGVzIHZhbGV1cnMgZGUgbCdldmVuZW1lbnQgY2hlcmNow6lcclxuICAgICAgICB0aGlzLmVkaXRFdmVuZW1lbnRGb3JtID0gdGhpcy5fZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgICAgICBub206IFtub21dLFxyXG4gICAgICAgICAgICBkYXRlRXZlbmVtZW50OiBbZGF0ZUV2ZW5lbWVudF0sXHJcbiAgICAgICAgICAgIGNvbnRhY3Q6IFtjb250YWN0XSxcclxuICAgICAgICAgICAgY2xpZW50OiBbY2xpZW50XSxcclxuICAgICAgICAgICAgc2VsZWN0RXRhdDogW3NlbGVjdEV0YXRdLFxyXG4gICAgICAgICAgICBkYXRlU291bWlzc2lvbjogW2RhdGVTb3VtaXNzaW9uXSxcclxuICAgICAgICAgICAgZGF0ZUNvbmZpcm1hdGlvbjogW2RhdGVDb25maXJtYXRpb25dLFxyXG4gICAgICAgICAgICBub3RlczogW25vdGVzXSxcclxuICAgICAgICAgICAgZGF0ZUZhY3R1cmF0aW9uOiBbZGF0ZUZhY3R1cmF0aW9uXSxcclxuICAgICAgICAgICAgZGF0ZU5vblJldGVudTogW2RhdGVOb25SZXRlbnVdLFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uVGFjaGU6IFt2YWxpZGF0aW9uVGFjaGVdLFxyXG4gICAgICAgICAgICBub0V2ZW5lbWVudDogW25vRXZlbmVtZW50XSxcclxuICAgICAgICAgICAgY3JlZXJQYXI6IFtjcmVlclBhcl0sXHJcbiAgICAgICAgICAgIGRhdGVDcmVlOiBbZGF0ZUNyZWVdLFxyXG4gICAgICAgICAgICBtb2RpZlBhcjogW21vZGlmUGFyXSxcclxuICAgICAgICAgICAgbW9kaWY6IFttb2RpZl0sXHJcbiAgICAgICAgICAgIGRhdGVBbm51bGF0aW9uOiBbZGF0ZUFubnVsYXRpb25dLFxyXG4gICAgICAgICAgICBjbGllbnRfRks6IFtjbGllbnRfRktdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KCl7XHJcbiAgICAgICAgLy9jaGFuZ2UgbW9kZSBtb2RpZmljYXRpb24sIGVuYWJsZSBib3V0b24gQWN0dWFsaXNlciBldCBjb3BpZXJcclxuICAgICAgICB0aGlzLm1vZGVTb3VtaXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mb3JtQWN0dWFsaXNlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mb3JtQ29waWUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidmFsZXVycyBkdSBmb3JtIGV2eCBjcsOpw6k6IFwiICk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lZGl0RXZlbmVtZW50Rm9ybS52YWx1ZSk7XHJcbiAgICAgICAgLy8gaWYgbm91dmVhdSwgYXBwZWwgY3LDqcOpLCBzaW5vbiBhcHBlbCB1cGRhdGVcclxuICAgICAgICBpZih0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLmNyZWVyRXZlbmVtZW50KHRoaXMubXlFdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBkdSBzZXJ2ZXVyIDogJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUV2ZW5lbWVudC5kYXRlRXZlbmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWVzc2FnZSBzdWNjZXMgY3JlYXRpb24gZXZ4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F1dmVnYXJkZUV2ZW5lbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLnVwZGF0ZUV2ZW5lbWVudCh0aGlzLm15RXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXNlckxvZ3VlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgbG9ndWUgOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKSk7XHJcbiAgICAgICAgdGhpcy51c2VyTG9nZ3VlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jb250YWN0ID0gdGhpcy51c2VyTG9nZ3VlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENsaWVudHMoKXtcclxuICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmdldENsaWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudHMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWVudFNlbGVjdChjbGllbnQ6IENsaWVudCl7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZWxlY3RlZExpc3QgPSBjbGllbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWVudCBzZWxlY3RlZCBMaXN0IDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZExpc3QpO1xyXG4gICAgICAgIHRoaXMubm9DbGllbnRTZWxlY3RlZExpc3QgPSBjbGllbnQubm9DbGllbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vIGNsaWVudCBzZWxlY3RlZCBMaXN0OiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vQ2xpZW50U2VsZWN0ZWRMaXN0KTtcclxuICAgICAgICAvL2FmZmljaGFnZSBjbGllbnQgc8OpbGVjdGlvbm7DqSBkYW5zIGxhIGJvaXRlIG1vZGFsZS4gKHByZW5vbSBlc3QgbnVsbCBzdXIgbCdvYmpldCBldCB1bmRlZmluZWQgZW4gYWZmaWNoYWdlKVxyXG4gICAgICAgIGlmKHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0LnByZW5vbSA9PT0gbnVsbCB8fCB0aGlzLmNsaWVudFNlbGVjdGVkTGlzdC5wcmVub20gPT09IFwiXCIgfHwgdGhpcy5jbGllbnRTZWxlY3RlZExpc3QucHJlbm9tID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmF1Y3VuUHJlbm9tQ2xpZW50U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmF1Y3VuUHJlbm9tQ2xpZW50U2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hdWN1blByZW5vbUNsaWVudFNlbGVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ2xpZW50U2VsZWN0ZWQoKXtcclxuICAgICAgICAvLyBzYXZlIGNsaWVudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQgYSBzYXZlciA6ICcpO1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlID0gdGhpcy5jbGllbnRTZWxlY3RlZExpc3Q7XHJcbiAgICAgICAgLy8gaWQgbW9uZ28gZHUgY2xpZW50IHNlbGVjdGVkIDpcclxuICAgICAgICB0aGlzLmNsaWVudElkID0gdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUuY2xpZW50SWQ7XHJcbiAgICAgICAgLy9zYXV2ZXIgZGFucyBsZSBmb3JtIGNvbnRyb2wgaGlkZGVuIGR1IGZvcm0gZW52b3nDqSBhdSBzZXJ2ZXVyLlxyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50X0ZLID0gdGhpcy5jbGllbnRJZDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5wcmVub20pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpZCBtb25nbyBjbGllbnQgc2VsZWN0ZWQgOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudElkKTtcclxuICAgICAgICBpZih0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5wcmVub20gPT09IG51bGwgfHwgdGhpcy5jbGllbnRTZWxlY3RlZFNhdmUucHJlbm9tID09PSBcIlwiIHx8IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLnByZW5vbSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnQgPSB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5ub207XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2F1dmVyIGxlIGNsaWVudCBzZWxlY3Rpb25uw6kgZGFucyBsZSBpbnB1dCBjbGllbnQgZHUgZm9ybS5cclxuICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudCA9IHRoaXMuY2xpZW50U2VsZWN0ZWRTYXZlLm5vbSArICcsICcgKyB0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZS5wcmVub207ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUNsaWVudFNlbGVjdGVkKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWVudCBzZWxlY3RlZCBkZWxldGU6ICcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50U2VsZWN0ZWRMaXN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vQ2xpZW50U2VsZWN0ZWRMaXN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnaWQgbW9uZ28gY2xpZW50IHNlbGVjdGVkIChtZW1lIHF1ZSBkYW5zIHNhdmUpOiA1ODE2NTY2YmQ4NGZlODJmMTRhZmIzODggNTgxNjU2NmJkODRmZTgyZjE0YWZiMzg4Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWVudCBzYXZlIDogKG1lbWUgcXVlIGRhbnMgc2F2ZSknKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkU2F2ZSk7XHJcbiAgICAgICAgLy90aGlzLmNsaWVudFNlbGVjdGVkID0gbnVsbDtcclxuICAgICAgICAvL3RoaXMubm9DbGllbnRTZWxlY3RlZCA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLmNsaWVudElkID0gbnVsbDtcclxuICAgICAgICAvL2xlIG5vbSBkYW5zIGxlIGlucHV0IHRoaXMubXlFdmVuZW1lbnQuY2xpZW50IGVzdCBsJ2FuY2llblxyXG4gICAgfVxyXG5cclxuIFxyXG59Il19

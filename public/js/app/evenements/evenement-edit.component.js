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
var EvenementEditComponent = (function () {
    function EvenementEditComponent(_formBuilder, _evenementService, _erreurService, _activatedRoute) {
        this._formBuilder = _formBuilder;
        this._evenementService = _evenementService;
        this._erreurService = _erreurService;
        this._activatedRoute = _activatedRoute;
        this.myEvenement = new evenement_1.Evenement();
        this.modeSoumission = true;
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
        //this.formActualiser = true;
        //this.formCopie = true;
        console.log("valeurs du form evx créé: ");
        console.log(this.editEvenementForm.value);
        // if nouveau, appel créé, sinon appel update
        if (this.estNouveau) {
            this._evenementService.creerEvenement(this.myEvenement)
                .subscribe(function (data) {
                console.log('data du serveur : ');
                console.log(data);
                _this.myEvenement = data;
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
    EvenementEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-evenement-edit',
            templateUrl: 'evenement-edit.component.html',
            styles: ["\n         .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n\n        .clearDate{\n            float:left;\n            clear:both;\n            padding: 0;\n        }\n\n        .clearPadding{\n            padding: 0;\n        }\n\n        .divFooter{\n            text-align:center;\n        }\n\n        .footer{\n            border-top: 2px solid black;\n        }\n\n        button{  \n            display:block;\n            margin: 0 auto;\n        }\n\n        .space {\n            padding: 2%;\n        }\n\n        textarea{\n            resize: none;\n        }\n\n        .alert-success{\n            text-align:center;\n        }\n        \n    "]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, evenement_service_1.EvenementService, erreur_service_1.ErreurService, router_1.ActivatedRoute])
    ], EvenementEditComponent);
    return EvenementEditComponent;
}());
exports.EvenementEditComponent = EvenementEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFFakQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBa0QxRDtJQWVJLGdDQUFxQixZQUF5QixFQUFVLGlCQUFtQyxFQUMvRSxjQUE2QixFQUFVLGVBQStCO1FBRDdELGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUMvRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMxRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUwseUNBQVEsR0FBUjtRQUFBLGlCQXVCQztRQXRCRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDckQsVUFBQyxNQUFXO1lBQ1IsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUM7cUJBQ2hELFNBQVMsQ0FDTixVQUFBLElBQUk7b0JBQ0EsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsRUFDRCxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF2QyxDQUF1QyxDQUNuRCxDQUFDO1lBQ1YsQ0FBQztZQUFDLElBQUksQ0FBQSxDQUFDO2dCQUNILEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQzNCLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QixlQUFlO1lBQ2YsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELDBDQUFTLEdBQVQ7UUFDSSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUVyQixFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO1lBQ2pCLGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUNyRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7WUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0MsQ0FBQztRQUVELHNFQUFzRTtRQUN0RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDN0MsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ1YsYUFBYSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQzlCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNsQixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDaEIsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ3hCLGNBQWMsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUNoQyxnQkFBZ0IsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQ3BDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNkLGVBQWUsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUNsQyxhQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDOUIsZUFBZSxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQ2xDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUMxQixRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDcEIsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3BCLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNwQixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDZCxjQUFjLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDaEMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUFBLGlCQTRCQztRQTNCRyw4REFBOEQ7UUFDOUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsNkJBQTZCO1FBQzdCLHdCQUF3QjtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFFLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsNkNBQTZDO1FBQzdDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDbEQsU0FBUyxDQUNOLFVBQUEsSUFBSTtnQkFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4Qiw4QkFBOEI7Z0JBQzlCLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7WUFDcEMsQ0FBQyxFQUNELFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQ25ELENBQUM7UUFDVixDQUFDO1FBQUMsSUFBSSxDQUFBLENBQUM7WUFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7aUJBQ25ELFNBQVMsQ0FDTixVQUFBLElBQUksSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQWpCLENBQWlCLEVBQ3pCLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQ25ELENBQUM7UUFDVixDQUFDO0lBRUwsQ0FBQztJQUVELDBDQUFTLEdBQVQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQy9DLENBQUM7SUF4TUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxNQUFNLEVBQUUsQ0FBRSwwc0JBMENULENBQUM7U0FDTCxDQUFDOzs4QkFBQTtJQTRKRiw2QkFBQztBQUFELENBM0pBLEFBMkpDLElBQUE7QUEzSlksOEJBQXNCLHlCQTJKbEMsQ0FBQSIsImZpbGUiOiJldmVuZW1lbnRzL2V2ZW5lbWVudC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbmVtZW50U2VydmljZSB9IGZyb20gJy4vZXZlbmVtZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1JYJztcclxuaW1wb3J0IHsgRXZlbmVtZW50IH0gZnJvbSAnLi9ldmVuZW1lbnQnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWV2ZW5lbWVudC1lZGl0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnZXZlbmVtZW50LWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5jbGVhckRhdGV7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuY2xlYXJQYWRkaW5ne1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmRpdkZvb3RlcntcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZm9vdGVye1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgYmxhY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXR0b257ICBcclxuICAgICAgICAgICAgZGlzcGxheTpibG9jaztcclxuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3BhY2Uge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAyJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHRhcmVhe1xyXG4gICAgICAgICAgICByZXNpemU6IG5vbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYWxlcnQtc3VjY2Vzc3tcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEV2ZW5lbWVudEVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBlZGl0RXZlbmVtZW50Rm9ybTogRm9ybUdyb3VwO1xyXG4gICAgbW9kZVNvdW1pc3Npb246IGJvb2xlYW47XHJcbiAgICBzYXV2ZWdhcmRlRXZlbmVtZW50OiBib29sZWFuO1xyXG4gICAgbXlFdmVuZW1lbnQ6IEV2ZW5lbWVudDtcclxuICAgIC8vIGlkIGRlIG1vbmdvIGR1IGNsaWVudCBzw6lsZWN0LlxyXG4gICAgY2xpZW50SWQ6IHN0cmluZztcclxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgZXN0Tm91dmVhdTogYm9vbGVhbjtcclxuICAgIG5vRXZlbmVtZW50OiBudW1iZXI7XHJcbiAgICAvLyBjaGFtcCBmb3JlaWduIGtleSBoaWRkZW5cclxuICAgIGhpZGRlbkZLOiBib29sZWFuO1xyXG4gICAgLy91c2VyIGxvZ3VlIHBhciBkw6lmYXV0XHJcbiAgICB1c2VyTG9nZ3VlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX2Zvcm1CdWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfZXZlbmVtZW50U2VydmljZTogRXZlbmVtZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlLCBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHsgXHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQgPSBuZXcgRXZlbmVtZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGRlbkZLID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51c2VyTG9ndWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IFxyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5fYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHBhcmFtczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJhbXMuaGFzT3duUHJvcGVydHkoJ2lkJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXN0Tm91dmVhdSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9FdmVuZW1lbnQgPSArcGFyYW1zWydpZCddO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW5lbWVudFNlcnZpY2UuZ2V0RXZlbmVtZW50KHRoaXMubm9FdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2eCBhIG1vZGlmacOpIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXN0Tm91dmVhdSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVzdE5vdXZlYXUpO1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBsZSBmb3JtXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWVyRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVlckZvcm0oKXtcclxuICAgICAgICBsZXQgbm9FdmVuZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBub20gPSAnJztcclxuICAgICAgICBsZXQgZGF0ZUV2ZW5lbWVudCA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNvbnRhY3QgPSAnJztcclxuICAgICAgICBsZXQgY2xpZW50ID0gJyc7XHJcbiAgICAgICAgbGV0IHNlbGVjdEV0YXQgPSAnJztcclxuICAgICAgICBsZXQgZGF0ZVNvdW1pc3Npb24gPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlQ29uZmlybWF0aW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZUZhY3R1cmF0aW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZU5vblJldGVudSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVBbm51bGF0aW9uID0gbnVsbDtcclxuICAgICAgICBsZXQgbm90ZXMgPSAnJztcclxuICAgICAgICBsZXQgdmFsaWRhdGlvblRhY2hlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNyZWVyUGFyID0gJyc7XHJcbiAgICAgICAgbGV0IGRhdGVDcmVlID0gbnVsbDtcclxuICAgICAgICBsZXQgbW9kaWZQYXIgPSAnJztcclxuICAgICAgICBsZXQgbW9kaWYgPSBudWxsO1xyXG4gICAgICAgIGxldCBjbGllbnRfRksgPSBudWxsO1xyXG5cclxuICAgICAgICBpZighdGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgLy8gc2V0dGVyIGxhIHZhbGV1ciBkZSBsJ2V2ZW5lbWVudCBhdSBmb3JtIGNvbnRyb2xcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub0V2ZW5lbWVudCA9IG5vRXZlbmVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm5vbSA9IG5vbTtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlRXZlbmVtZW50ID0gZGF0ZUV2ZW5lbWVudDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jb250YWN0ID0gY29udGFjdDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jbGllbnQgPSBjbGllbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuc2VsZWN0RXRhdCA9IHNlbGVjdEV0YXQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZVNvdW1pc3Npb24gPSBkYXRlU291bWlzc2lvbjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQ29uZmlybWF0aW9uID0gZGF0ZUNvbmZpcm1hdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlRmFjdHVyYXRpb24gPSBkYXRlRmFjdHVyYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZU5vblJldGVudSA9IGRhdGVOb25SZXRlbnU7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUFubnVsYXRpb24gPSBkYXRlQW5udWxhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5ub3RlcyA9IG5vdGVzO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LnZhbGlkYXRpb25UYWNoZSA9IHZhbGlkYXRpb25UYWNoZTtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jcmVlclBhciA9IGNyZWVyUGFyO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVDcmVlID0gZGF0ZUNyZWU7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubW9kaWZQYXIgPSBtb2RpZlBhcjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5tb2RpZiA9IG1vZGlmO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudF9GSyA9IGNsaWVudF9GSztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNyw6llciBsZSBmb3JtIGF2ZWMgZGVzIGJsYW5jcyBvdSBsZXMgdmFsZXVycyBkZSBsJ2V2ZW5lbWVudCBjaGVyY2jDqVxyXG4gICAgICAgIHRoaXMuZWRpdEV2ZW5lbWVudEZvcm0gPSB0aGlzLl9mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgIG5vbTogW25vbV0sXHJcbiAgICAgICAgICAgIGRhdGVFdmVuZW1lbnQ6IFtkYXRlRXZlbmVtZW50XSxcclxuICAgICAgICAgICAgY29udGFjdDogW2NvbnRhY3RdLFxyXG4gICAgICAgICAgICBjbGllbnQ6IFtjbGllbnRdLFxyXG4gICAgICAgICAgICBzZWxlY3RFdGF0OiBbc2VsZWN0RXRhdF0sXHJcbiAgICAgICAgICAgIGRhdGVTb3VtaXNzaW9uOiBbZGF0ZVNvdW1pc3Npb25dLFxyXG4gICAgICAgICAgICBkYXRlQ29uZmlybWF0aW9uOiBbZGF0ZUNvbmZpcm1hdGlvbl0sXHJcbiAgICAgICAgICAgIG5vdGVzOiBbbm90ZXNdLFxyXG4gICAgICAgICAgICBkYXRlRmFjdHVyYXRpb246IFtkYXRlRmFjdHVyYXRpb25dLFxyXG4gICAgICAgICAgICBkYXRlTm9uUmV0ZW51OiBbZGF0ZU5vblJldGVudV0sXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25UYWNoZTogW3ZhbGlkYXRpb25UYWNoZV0sXHJcbiAgICAgICAgICAgIG5vRXZlbmVtZW50OiBbbm9FdmVuZW1lbnRdLFxyXG4gICAgICAgICAgICBjcmVlclBhcjogW2NyZWVyUGFyXSxcclxuICAgICAgICAgICAgZGF0ZUNyZWU6IFtkYXRlQ3JlZV0sXHJcbiAgICAgICAgICAgIG1vZGlmUGFyOiBbbW9kaWZQYXJdLFxyXG4gICAgICAgICAgICBtb2RpZjogW21vZGlmXSxcclxuICAgICAgICAgICAgZGF0ZUFubnVsYXRpb246IFtkYXRlQW5udWxhdGlvbl0sXHJcbiAgICAgICAgICAgIGNsaWVudF9GSzogW2NsaWVudF9GS11cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJtaXQoKXtcclxuICAgICAgICAvL2NoYW5nZSBtb2RlIG1vZGlmaWNhdGlvbiwgZW5hYmxlIGJvdXRvbiBBY3R1YWxpc2VyIGV0IGNvcGllclxyXG4gICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICAvL3RoaXMuZm9ybUFjdHVhbGlzZXIgPSB0cnVlO1xyXG4gICAgICAgIC8vdGhpcy5mb3JtQ29waWUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidmFsZXVycyBkdSBmb3JtIGV2eCBjcsOpw6k6IFwiICk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lZGl0RXZlbmVtZW50Rm9ybS52YWx1ZSk7XHJcbiAgICAgICAgLy8gaWYgbm91dmVhdSwgYXBwZWwgY3LDqcOpLCBzaW5vbiBhcHBlbCB1cGRhdGVcclxuICAgICAgICBpZih0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLmNyZWVyRXZlbmVtZW50KHRoaXMubXlFdmVuZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBkdSBzZXJ2ZXVyIDogJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWVzc2FnZSBzdWNjZXMgY3JlYXRpb24gZXZ4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F1dmVnYXJkZUV2ZW5lbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVuZW1lbnRTZXJ2aWNlLnVwZGF0ZUV2ZW5lbWVudCh0aGlzLm15RXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXNlckxvZ3VlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgbG9ndWUgOiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKSk7XHJcbiAgICAgICAgdGhpcy51c2VyTG9nZ3VlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5jb250YWN0ID0gdGhpcy51c2VyTG9nZ3VlO1xyXG4gICAgfVxyXG5cclxuIFxyXG59Il19

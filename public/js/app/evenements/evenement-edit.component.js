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
    EvenementEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-evenement-edit',
            templateUrl: 'evenement-edit.component.html',
            styles: ["\n         .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n\n        .clearDate{\n            clear:both;\n            float:left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .floatLeftDate{\n            float: left;\n            padding: 0;\n            margin: 0;\n        }\n\n        .divFooter{\n            text-align:center;\n        }\n\n        .footer{\n            border-top: 2px solid black;\n        }\n\n        button{  \n            display:block;\n            margin: 0 auto;\n        }\n\n        .space {\n            padding: 2%;\n        }\n\n        textarea{\n            resize: none;\n        }\n\n        .alert-success{\n            text-align:center;\n        }\n        \n    "]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, evenement_service_1.EvenementService, erreur_service_1.ErreurService, router_1.ActivatedRoute])
    ], EvenementEditComponent);
    return EvenementEditComponent;
}());
exports.EvenementEditComponent = EvenementEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFFakQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBcUQxRDtJQWlCSSxnQ0FBcUIsWUFBeUIsRUFBVSxpQkFBbUMsRUFDL0UsY0FBNkIsRUFBVSxlQUErQjtRQUQ3RCxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDL0UsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDMUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVMLHlDQUFRLEdBQVI7UUFBQSxpQkF1QkM7UUF0QkcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ3JELFVBQUMsTUFBVztZQUNSLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUM1QixLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsS0FBSSxD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RCxTQUFTLENBQ04sVUFBQSxJQUFJLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFqQixDQUFpQixFQUN6QixVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF2QyxDQUF1QyxDQUNuRCxDQUFDO1FBQ1YsQ0FBQztJQUVMLENBQUM7SUFFRCwwQ0FBUyxHQUFUO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMvQyxDQUFDO0lBaE5MO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsTUFBTSxFQUFFLENBQUUscXhCQTZDVCxDQUFDO1NBQ0wsQ0FBQzs7OEJBQUE7SUFpS0YsNkJBQUM7QUFBRCxDQWhLQSxBQWdLQyxJQUFBO0FBaEtZLDhCQUFzQix5QkFnS2xDLENBQUEiLCJmaWxlIjoiZXZlbmVtZW50cy9ldmVuZW1lbnQtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudFNlcnZpY2UgfSBmcm9tICcuL2V2ZW5lbWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SWCc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudCB9IGZyb20gJy4vZXZlbmVtZW50JztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1ldmVuZW1lbnQtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2V2ZW5lbWVudC1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgIC5vdXRlcntcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgcGFkZGluZzogMCAwIDElIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuY2xlYXJEYXRle1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZmxvYXRMZWZ0RGF0ZXtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5kaXZGb290ZXJ7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmZvb3RlcntcclxuICAgICAgICAgICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIGJsYWNrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnV0dG9ueyAgXHJcbiAgICAgICAgICAgIGRpc3BsYXk6YmxvY2s7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNwYWNlIHtcclxuICAgICAgICAgICAgcGFkZGluZzogMiU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0YXJlYXtcclxuICAgICAgICAgICAgcmVzaXplOiBub25lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmFsZXJ0LXN1Y2Nlc3N7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFdmVuZW1lbnRFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgZWRpdEV2ZW5lbWVudEZvcm06IEZvcm1Hcm91cDtcclxuICAgIG1vZGVTb3VtaXNzaW9uOiBib29sZWFuO1xyXG4gICAgc2F1dmVnYXJkZUV2ZW5lbWVudDogYm9vbGVhbjtcclxuICAgIG15RXZlbmVtZW50OiBFdmVuZW1lbnQ7XHJcbiAgICBmb3JtQWN0dWFsaXNlcjogYm9vbGVhbjtcclxuICAgIGZvcm1Db3BpZTogYm9vbGVhbjtcclxuICAgIC8vIGlkIGRlIG1vbmdvIGR1IGNsaWVudCBzw6lsZWN0LlxyXG4gICAgY2xpZW50SWQ6IHN0cmluZztcclxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgZXN0Tm91dmVhdTogYm9vbGVhbjtcclxuICAgIG5vRXZlbmVtZW50OiBudW1iZXI7XHJcbiAgICAvLyBjaGFtcCBmb3JlaWduIGtleSBoaWRkZW5cclxuICAgIGhpZGRlbkZLOiBib29sZWFuO1xyXG4gICAgLy91c2VyIGxvZ3VlIHBhciBkw6lmYXV0XHJcbiAgICB1c2VyTG9nZ3VlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX2Zvcm1CdWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfZXZlbmVtZW50U2VydmljZTogRXZlbmVtZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlLCBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHsgXHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQgPSBuZXcgRXZlbmVtZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1BY3R1YWxpc2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvcGllID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuRksgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJMb2d1ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgXHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLl9hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocGFyYW1zOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnaWQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lc3ROb3V2ZWF1ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub0V2ZW5lbWVudCA9ICtwYXJhbXNbJ2lkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbmVtZW50U2VydmljZS5nZXRFdmVuZW1lbnQodGhpcy5ub0V2ZW5lbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXZ4IGEgbW9kaWZpw6kgOiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUV2ZW5lbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lc3ROb3V2ZWF1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZXN0Tm91dmVhdSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IGxlIGZvcm1cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlZXJGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWVyRm9ybSgpe1xyXG4gICAgICAgIGxldCBub0V2ZW5lbWVudCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG5vbSA9ICcnO1xyXG4gICAgICAgIGxldCBkYXRlRXZlbmVtZW50ID0gbnVsbDtcclxuICAgICAgICBsZXQgY29udGFjdCA9ICcnO1xyXG4gICAgICAgIGxldCBjbGllbnQgPSAnJztcclxuICAgICAgICBsZXQgc2VsZWN0RXRhdCA9ICcnO1xyXG4gICAgICAgIGxldCBkYXRlU291bWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGVDb25maXJtYXRpb24gPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlRmFjdHVyYXRpb24gPSBudWxsO1xyXG4gICAgICAgIGxldCBkYXRlTm9uUmV0ZW51ID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZUFubnVsYXRpb24gPSBudWxsO1xyXG4gICAgICAgIGxldCBub3RlcyA9ICcnO1xyXG4gICAgICAgIGxldCB2YWxpZGF0aW9uVGFjaGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgY3JlZXJQYXIgPSAnJztcclxuICAgICAgICBsZXQgZGF0ZUNyZWUgPSBudWxsO1xyXG4gICAgICAgIGxldCBtb2RpZlBhciA9ICcnO1xyXG4gICAgICAgIGxldCBtb2RpZiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNsaWVudF9GSyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICAvLyBzZXR0ZXIgbGEgdmFsZXVyIGRlIGwnZXZlbmVtZW50IGF1IGZvcm0gY29udHJvbFxyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm5vRXZlbmVtZW50ID0gbm9FdmVuZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQubm9tID0gbm9tO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVFdmVuZW1lbnQgPSBkYXRlRXZlbmVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNvbnRhY3QgPSBjb250YWN0O1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNsaWVudCA9IGNsaWVudDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5zZWxlY3RFdGF0ID0gc2VsZWN0RXRhdDtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlU291bWlzc2lvbiA9IGRhdGVTb3VtaXNzaW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVDb25maXJtYXRpb24gPSBkYXRlQ29uZmlybWF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmRhdGVGYWN0dXJhdGlvbiA9IGRhdGVGYWN0dXJhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlTm9uUmV0ZW51ID0gZGF0ZU5vblJldGVudTtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5kYXRlQW5udWxhdGlvbiA9IGRhdGVBbm51bGF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm5vdGVzID0gbm90ZXM7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQudmFsaWRhdGlvblRhY2hlID0gdmFsaWRhdGlvblRhY2hlO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50LmNyZWVyUGFyID0gY3JlZXJQYXI7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuZGF0ZUNyZWUgPSBkYXRlQ3JlZTtcclxuICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudC5tb2RpZlBhciA9IG1vZGlmUGFyO1xyXG4gICAgICAgICAgICB0aGlzLm15RXZlbmVtZW50Lm1vZGlmID0gbW9kaWY7XHJcbiAgICAgICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY2xpZW50X0ZLID0gY2xpZW50X0ZLO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY3LDqWVyIGxlIGZvcm0gYXZlYyBkZXMgYmxhbmNzIG91IGxlcyB2YWxldXJzIGRlIGwnZXZlbmVtZW50IGNoZXJjaMOpXHJcbiAgICAgICAgdGhpcy5lZGl0RXZlbmVtZW50Rm9ybSA9IHRoaXMuX2Zvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgICAgICAgbm9tOiBbbm9tXSxcclxuICAgICAgICAgICAgZGF0ZUV2ZW5lbWVudDogW2RhdGVFdmVuZW1lbnRdLFxyXG4gICAgICAgICAgICBjb250YWN0OiBbY29udGFjdF0sXHJcbiAgICAgICAgICAgIGNsaWVudDogW2NsaWVudF0sXHJcbiAgICAgICAgICAgIHNlbGVjdEV0YXQ6IFtzZWxlY3RFdGF0XSxcclxuICAgICAgICAgICAgZGF0ZVNvdW1pc3Npb246IFtkYXRlU291bWlzc2lvbl0sXHJcbiAgICAgICAgICAgIGRhdGVDb25maXJtYXRpb246IFtkYXRlQ29uZmlybWF0aW9uXSxcclxuICAgICAgICAgICAgbm90ZXM6IFtub3Rlc10sXHJcbiAgICAgICAgICAgIGRhdGVGYWN0dXJhdGlvbjogW2RhdGVGYWN0dXJhdGlvbl0sXHJcbiAgICAgICAgICAgIGRhdGVOb25SZXRlbnU6IFtkYXRlTm9uUmV0ZW51XSxcclxuICAgICAgICAgICAgdmFsaWRhdGlvblRhY2hlOiBbdmFsaWRhdGlvblRhY2hlXSxcclxuICAgICAgICAgICAgbm9FdmVuZW1lbnQ6IFtub0V2ZW5lbWVudF0sXHJcbiAgICAgICAgICAgIGNyZWVyUGFyOiBbY3JlZXJQYXJdLFxyXG4gICAgICAgICAgICBkYXRlQ3JlZTogW2RhdGVDcmVlXSxcclxuICAgICAgICAgICAgbW9kaWZQYXI6IFttb2RpZlBhcl0sXHJcbiAgICAgICAgICAgIG1vZGlmOiBbbW9kaWZdLFxyXG4gICAgICAgICAgICBkYXRlQW5udWxhdGlvbjogW2RhdGVBbm51bGF0aW9uXSxcclxuICAgICAgICAgICAgY2xpZW50X0ZLOiBbY2xpZW50X0ZLXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblN1Ym1pdCgpe1xyXG4gICAgICAgIC8vY2hhbmdlIG1vZGUgbW9kaWZpY2F0aW9uLCBlbmFibGUgYm91dG9uIEFjdHVhbGlzZXIgZXQgY29waWVyXHJcbiAgICAgICAgdGhpcy5tb2RlU291bWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZm9ybUFjdHVhbGlzZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZm9ybUNvcGllID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZhbGV1cnMgZHUgZm9ybSBldnggY3LDqcOpOiBcIiApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdEV2ZW5lbWVudEZvcm0udmFsdWUpO1xyXG4gICAgICAgIC8vIGlmIG5vdXZlYXUsIGFwcGVsIGNyw6nDqSwgc2lub24gYXBwZWwgdXBkYXRlXHJcbiAgICAgICAgaWYodGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbmVtZW50U2VydmljZS5jcmVlckV2ZW5lbWVudCh0aGlzLm15RXZlbmVtZW50KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgZHUgc2VydmV1ciA6ICcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teUV2ZW5lbWVudCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlFdmVuZW1lbnQuZGF0ZUV2ZW5lbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1lc3NhZ2Ugc3VjY2VzIGNyZWF0aW9uIGV2eFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdXZlZ2FyZGVFdmVuZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbmVtZW50U2VydmljZS51cGRhdGVFdmVuZW1lbnQodGhpcy5teUV2ZW5lbWVudClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVzZXJMb2d1ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIGxvZ3VlIDogJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJykpO1xyXG4gICAgICAgIHRoaXMudXNlckxvZ2d1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyTmFtZScpO1xyXG4gICAgICAgIHRoaXMubXlFdmVuZW1lbnQuY29udGFjdCA9IHRoaXMudXNlckxvZ2d1ZTtcclxuICAgIH1cclxuXHJcbiBcclxufSJdfQ==

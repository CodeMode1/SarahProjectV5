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
                    //Si URL contient "copie", alors vide les champs du client copié.
                    if (_this.urlCopie.includes("copie")) {
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
            //init form
            _this.creerForm();
        });
        //this.testCP();
    };
    EditClientComponent.prototype.creerForm = function () {
        //creer
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
            //setter la valeur du client au form control
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
        //cree le form avec des blancs ou les valeurs du client cherché.
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
    EditClientComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    EditClientComponent.prototype.formatCP = function (input) {
        //j'enleve les espaces, globalement.
        var chaine = input.value.replace(/\s+/g, "");
        //pour ajouter l'espace au 3eme carac.
        if (chaine.length > 3) {
            //je place l'espace à la bonne place.
            chaine = chaine.substr(0, 3) + " " + chaine.substr(3, 3);
        }
        //transformer le code Postal en majuscule.
        input.value = chaine.toUpperCase();
    };
    EditClientComponent.prototype.formatTP = function (input) {
        // j'enleve tout ce qui n'est pas chiffre, globalement.
        var chaine = input.value.replace(/[^0-9]/g, "");
        console.log(chaine);
        //au 11eme carac tapé, je reconstruis le tel avec ses bons chiffres.
        if (chaine.length > 10) {
            chaine = chaine.substr(1, 3) + chaine.substr(5, 3) + chaine.substr(9, 4);
        }
        //au 10eme carac, je formatte selon (XXX)XXX-XXXX.
        if (chaine.length === 10) {
            chaine = "(" + chaine.substr(0, 3) + ")" + chaine.substr(3, 3) + "-" + chaine.substr(6, 4);
        }
        /* si ces if sont inversés, chaine non-formattée.
           car au 10eme carac :
           chaine.length > 10 et donc la chaine revient non-formattée.
        */
        input.value = chaine;
    };
    EditClientComponent.prototype.estCodePostalOK = function (control) {
        //validation a réussi: pas de valeur tapée
        if (!control.value) {
            return null;
        }
        /*format regex canadien :
            ^ : chaine commence, $ : fin séquence
            lettre : pas de D, F, I, O, Q U
            1er lettre: pas de W, Z, chiffre: \d, lettre, blanc, chiffre, lettre, chiffre
        */
        var regexCP = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ ]\d[ABCEGHJKLMNPRSTVWXYZ]\d$/;
        if (!control.value.match(regexCP)) {
            return { codePostalInvalide: true };
        }
        //validation résussie
        return null;
    };
    EditClientComponent.prototype.estTelephoneOK = function (control) {
        if (!control.value) {
            return null;
        }
        /* format regex canadien:
           ^ : sequence commence, $ : fin sequence
           ( , chiffre(x3), ) , chiffre (x3), - , chiffre (x4)
        */
        var regexTP = /^\u0028\d{3}\u0029\d{3}\u002D\d{4}$/;
        if (!control.value.match(regexTP)) {
            return { telephoneInvalide: true };
        }
        //validation réussie
        return null;
    };
    //validation: retourne null si valide et un boolean si erreur.
    EditClientComponent.prototype.estCourrielOK = function (control) {
        if (control.value) {
            var regexCourriel = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (!control.value.match(regexCourriel))
                return { courrielInvalide: true };
        }
        //validation réussie
        return null;
    };
    EditClientComponent.prototype.onSubmit = function () {
        var _this = this;
        //change mode modification, enable bouton Acutaliser et Copier.
        this.modeSoumission = false;
        this.formActualiser = true;
        this.formCopie = true;
        console.log("cree client : ");
        console.log(this.editClientForm.value);
        //IF NOUVEAU, APPEL CRÉÉ, SINON APPEL UPDATE
        if (this.estNouveau) {
            this._clientService.creerClient(this.myClient)
                .subscribe(function (data) {
                console.log('data du serveur :');
                console.log(data);
                _this.myClient = data;
                //sauver le _id qui revient dans le client créé par Mongo.
                _this.clientId = data.clientId;
                console.log("id de " + data.nom + " : " + _this.clientId);
                console.log("no de client : " + data.noClient);
                //sauver le no de client (no de la sequence)
                _this.myClient.noClient = data.noClient;
                //voir le message de sauvegarde succès
                _this.sauvegardeClient = true;
            }, function (error) { return _this._erreurService.handleErreur(error); });
        }
        else {
            this._clientService.updateClient(this.myClient)
                .subscribe(function (data) { return console.log(data); }, function (error) { return _this._erreurService.handleErreur(error); });
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudHMvY2xpZW50LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0QsK0JBQThCLGtCQUFrQixDQUFDLENBQUE7QUFDakQsc0JBQWdFLGdCQUFnQixDQUFDLENBQUE7QUFDakYsdUJBQXVDLGlCQUFpQixDQUFDLENBQUE7QUFFekQsdUJBQXVCLFVBQVUsQ0FBQyxDQUFBO0FBQ2xDLCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBdUUxRDtJQWVJLDZCQUFvQixZQUF5QixFQUFVLGNBQTZCLEVBQVUsY0FBNkIsRUFDL0csZUFBK0IsRUFBVSxPQUFlO1FBRGhELGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUMvRyxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2hFLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDcEMsQ0FBQztJQUVGLHNDQUFRLEdBQVI7UUFBQSxpQkFxQ0M7UUFwQ0csSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ3JELFVBQUMsTUFBVztZQUNSLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUM1QixLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztn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QUFvRDtRQUNwRCxvREFBb0Q7SUFDNUQsQ0FBQztJQXpXTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUMsNEJBQTRCO1lBQ3hDLE1BQU0sRUFBRSxDQUFDLDYrQkEwRFI7YUFDQTtTQUNKLENBQUM7OzJCQUFBO0lBMFNGLDBCQUFDO0FBQUQsQ0F6U0EsQUF5U0MsSUFBQTtBQXpTWSwyQkFBbUIsc0JBeVMvQixDQUFBIiwiZmlsZSI6ImNsaWVudHMvY2xpZW50LWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SWCc7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJy4vY2xpZW50JztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5cclxuaW50ZXJmYWNlIFJlc3VsdGF0VmFsaWRhdGlvbiB7XHJcbiAgICBbY2xlOiBzdHJpbmddOiBib29sZWFuO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWVkaXQtY2xpZW50JyxcclxuICAgIHRlbXBsYXRlVXJsOidjbGllbnQtZWRpdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLmZvcm0tZ3JvdXB7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZGl2Rm9vdGVye1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5mb290ZXJ7XHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBibGFjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbnsgIFxyXG4gICAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zcGFjZSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOjElO1xyXG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbToyJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC50aXRsZXtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpsZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLm1lbW97XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgcGFkZGluZzogMCAwIDIlIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0YXJlYXtcclxuICAgICAgICAgICAgcmVzaXplOiBub25lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmdlc3Rpb25JbnB1dHN7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5kcm9wZG93bntcclxuICAgICAgICAgICAgcGFkZGluZzowO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuYWxlcnQtc3VjY2Vzc3tcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgYFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRWRpdENsaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIGlkZW50aWZpY2F0aW9uOiBzdHJpbmc7XHJcbiAgICBnZXN0aW9uOiBzdHJpbmc7XHJcbiAgICBlZGl0Q2xpZW50Rm9ybTogRm9ybUdyb3VwO1xyXG4gICAgZm9ybUNvcGllOiBib29sZWFuO1xyXG4gICAgZm9ybUFjdHVhbGlzZXI6IGJvb2xlYW47XHJcbiAgICBtb2RlU291bWlzc2lvbjogYm9vbGVhbjtcclxuICAgIHNhdXZlZ2FyZGVDbGllbnQ6IGJvb2xlYW47XHJcbiAgICBteUNsaWVudCA6IENsaWVudDtcclxuICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIGVzdE5vdXZlYXU6IGJvb2xlYW47XHJcbiAgICBjb2RlQ2xpZW50OiBudW1iZXI7XHJcbiAgICB1cmxDb3BpZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Zvcm1CdWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5pZGVudGlmaWNhdGlvbiA9IFwiSWRlbnRpZmljYXRpb25cIjtcclxuICAgICAgICB0aGlzLmdlc3Rpb24gPSBcIkdlc3Rpb25cIjtcclxuICAgICAgICB0aGlzLm15Q2xpZW50ID0gbmV3IENsaWVudCgpO1xyXG4gICAgICAgIHRoaXMubW9kZVNvdW1pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXJsQ29waWUgPSB0aGlzLl9yb3V0ZXIudXJsO1xyXG4gICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgXHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLl9hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocGFyYW1zOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnaWQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lc3ROb3V2ZWF1ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2RlQ2xpZW50ID0gK3BhcmFtc1snaWQnXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmdldENsaWVudCh0aGlzLmNvZGVDbGllbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15Q2xpZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBhIG1vZGlmOiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5teUNsaWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TaSBVUkwgY29udGllbnQgXCJjb3BpZVwiLCBhbG9ycyB2aWRlIGxlcyBjaGFtcHMgZHUgY2xpZW50IGNvcGnDqS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnVybENvcGllLmluY2x1ZGVzKFwiY29waWVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvcGllckNsaWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCDDoCBjb3BpZXIgdmllcmdlIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlDbGllbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXJsIDogJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3JvdXRlci51cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnVybENvcGllLmluY2x1ZGVzKFwiY29waWVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXQgbW9kZSBjb3BpZVwiKTsgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lc3ROb3V2ZWF1ID0gdHJ1ZTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdE5vdXZlYXUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlc3QgY2UgcXVlIG5vdXZlYXUgOiBcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVzdE5vdXZlYXUpO1xyXG4gICAgICAgICAgICAgICAgLy9pbml0IGZvcm1cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlZXJGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApOyAgICAgIFxyXG4gICAgICAgIC8vdGhpcy50ZXN0Q1AoKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVlckZvcm0oKXtcclxuICAgICAgICAvL2NyZWVyXHJcbiAgICAgICAgbGV0IG5vQ2xpZW50ID0gbnVsbDtcclxuICAgICAgICBsZXQgcHJlbm9tID0gJyc7XHJcbiAgICAgICAgbGV0IG5vbSA9ICcnO1xyXG4gICAgICAgIGxldCBub0NvbXB0ZSA9ICcnO1xyXG4gICAgICAgIGxldCBjb3VycmllbCA9ICcnO1xyXG4gICAgICAgIGxldCBjZWxsID0gJyc7XHJcbiAgICAgICAgbGV0IGNvbXBhZ25pZSA9ICcnO1xyXG4gICAgICAgIGxldCBhZHJlc3NlID0gJyc7XHJcbiAgICAgICAgbGV0IHZpbGxlID0gJyc7XHJcbiAgICAgICAgbGV0IGNvZGVQb3N0YWwgPSAnJztcclxuICAgICAgICBsZXQgdGVsUHJpbmNpcGFsID0gJyc7XHJcbiAgICAgICAgbGV0IHByb3ZpbmNlID0gJyc7XHJcbiAgICAgICAgbGV0IHBheXMgPSAnJztcclxuICAgICAgICBsZXQgZmF4ID0gJyc7XHJcbiAgICAgICAgbGV0IHRlbFNlY29uZGFpcmUgPSAnJztcclxuICAgICAgICBsZXQgbWVtbyA9ICcnO1xyXG4gICAgICAgIGxldCBtZW1vQVZlbmlyID0gJyc7XHJcbiAgICAgICAgbGV0IG5vRXhUYXhlUHJvdiA9ICcnO1xyXG4gICAgICAgIGxldCBub0V4VGF4ZUZlZCA9ICcnO1xyXG4gICAgICAgIGxldCBzZWxlY3RTdGF0dXQgPSAnJztcclxuICAgICAgICBsZXQgc2VsZWN0U291cmNlID0gJyc7XHJcbiAgICAgICAgbGV0IG1vZGlmUGFyID0gJyc7XHJcbiAgICAgICAgbGV0IG1vZGlmID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0ZURlcm5FdiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNyZWVQYXIgPSAnJztcclxuICAgICAgICBsZXQgY3JlZSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICAvL3NldHRlciBsYSB2YWxldXIgZHUgY2xpZW50IGF1IGZvcm0gY29udHJvbFxyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50Lm5vQ2xpZW50ID0gbm9DbGllbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQucHJlbm9tID0gcHJlbm9tO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50Lm5vbSA9IG5vbTtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5ub0NvbXB0ZSA9IG5vQ29tcHRlO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LmNvdXJyaWVsID0gY291cnJpZWw7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQuY2VsbCA9IGNlbGw7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQuY29tcGFnbmllID0gY29tcGFnbmllO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LmFkcmVzc2UgPSBhZHJlc3NlO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LnZpbGxlID0gdmlsbGU7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQuY29kZVBvc3RhbCA9IGNvZGVQb3N0YWw7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQudGVsUHJpbmNpcGFsID0gdGVsUHJpbmNpcGFsO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LnByb3ZpbmNlID0gcHJvdmluY2U7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQucGF5cyA9IHBheXM7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQuZmF4ID0gZmF4O1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LnRlbFNlY29uZGFpcmUgPSB0ZWxTZWNvbmRhaXJlO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50Lm1lbW8gPSBtZW1vO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50Lm1lbW9BVmVuaXIgPSBtZW1vQVZlbmlyO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50Lm5vRXhUYXhlUHJvdiA9IG5vRXhUYXhlUHJvdjtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5ub0V4VGF4ZUZlZCA9IG5vRXhUYXhlRmVkO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LnNlbGVjdFN0YXR1dCA9IHNlbGVjdFN0YXR1dDtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5zZWxlY3RTb3VyY2UgPSBzZWxlY3RTb3VyY2U7XHJcbiAgICAgICAgICAgIHRoaXMubXlDbGllbnQubW9kaWZQYXIgPSBtb2RpZlBhcjtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5tb2RpZiA9IG1vZGlmO1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LmRhdGVEZXJuRXYgPSBkYXRlRGVybkV2O1xyXG4gICAgICAgICAgICB0aGlzLm15Q2xpZW50LmNyZWVyUGFyID0gY3JlZVBhcjtcclxuICAgICAgICAgICAgdGhpcy5teUNsaWVudC5kYXRlQ3JlZSA9IGNyZWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NyZWUgbGUgZm9ybSBhdmVjIGRlcyBibGFuY3Mgb3UgbGVzIHZhbGV1cnMgZHUgY2xpZW50IGNoZXJjaMOpLlxyXG4gICAgICAgICB0aGlzLmVkaXRDbGllbnRGb3JtID0gdGhpcy5fZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgICAgICBub0NsaWVudDogW25vQ2xpZW50XSxcclxuICAgICAgICAgICAgcHJlbm9tOiBbcHJlbm9tXSxcclxuICAgICAgICAgICAgbm9tOiBbbm9tLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgbm9Db21wdGU6IFtub0NvbXB0ZV0sXHJcbiAgICAgICAgICAgIGNvdXJyaWVsOiBbY291cnJpZWwsIHRoaXMuZXN0Q291cnJpZWxPS10sXHJcbiAgICAgICAgICAgIGNlbGw6IFtjZWxsXSxcclxuICAgICAgICAgICAgY29tcGFnbmllOiBbY29tcGFnbmllXSxcclxuICAgICAgICAgICAgYWRyZXNzZTogW2FkcmVzc2VdLFxyXG4gICAgICAgICAgICB2aWxsZTogW3ZpbGxlXSxcclxuICAgICAgICAgICAgY29kZVBvc3RhbDogW2NvZGVQb3N0YWwsIHRoaXMuZXN0Q29kZVBvc3RhbE9LXSxcclxuICAgICAgICAgICAgdGVsUHJpbmNpcGFsOiBbdGVsUHJpbmNpcGFsLCB0aGlzLmVzdFRlbGVwaG9uZU9LXSxcclxuICAgICAgICAgICAgcHJvdmluY2U6IFtwcm92aW5jZV0sXHJcbiAgICAgICAgICAgIHBheXM6IFtwYXlzXSxcclxuICAgICAgICAgICAgZmF4OiBbZmF4XSxcclxuICAgICAgICAgICAgdGVsU2Vjb25kYWlyZTogW3RlbFNlY29uZGFpcmVdLFxyXG4gICAgICAgICAgICBtZW1vOiBbbWVtb10sXHJcbiAgICAgICAgICAgIG1lbW9BVmVuaXI6IFttZW1vQVZlbmlyXSxcclxuICAgICAgICAgICAgbm9FeFRheGVQcm92OiBbbm9FeFRheGVQcm92XSxcclxuICAgICAgICAgICAgbm9FeFRheGVGZWQ6IFtub0V4VGF4ZUZlZF0sXHJcbiAgICAgICAgICAgIHNlbGVjdFN0YXR1dDogW3NlbGVjdFN0YXR1dF0sXHJcbiAgICAgICAgICAgIHNlbGVjdFNvdXJjZTogW3NlbGVjdFNvdXJjZV0sIFxyXG4gICAgICAgICAgICBtb2RpZlBhcjogW21vZGlmUGFyXSxcclxuICAgICAgICAgICAgbW9kaWY6IFttb2RpZl0sXHJcbiAgICAgICAgICAgIGRhdGVEZXJuRXY6IFtkYXRlRGVybkV2XSxcclxuICAgICAgICAgICAgY3JlZVBhcjogW2NyZWVQYXJdLFxyXG4gICAgICAgICAgICBjcmVlOiBbY3JlZV0gICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29waWVyQ2xpZW50KCl7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5jbGllbnRJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5ub0NsaWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5tb2RpZlBhciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5tb2RpZiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5teUNsaWVudC5kYXRlRGVybkV2ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15Q2xpZW50LmNyZWVyUGFyID0gbnVsbDtcclxuICAgICAgICB0aGlzLm15Q2xpZW50LmRhdGVDcmVlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybWF0Q1AoaW5wdXQpe1xyXG4gICAgICAgIC8vaidlbmxldmUgbGVzIGVzcGFjZXMsIGdsb2JhbGVtZW50LlxyXG4gICAgICAgIHZhciBjaGFpbmUgPSBpbnB1dC52YWx1ZS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpO1xyXG4gICAgICAgIC8vcG91ciBham91dGVyIGwnZXNwYWNlIGF1IDNlbWUgY2FyYWMuXHJcbiAgICAgICAgaWYoY2hhaW5lLmxlbmd0aCA+IDMpe1xyXG4gICAgICAgICAgICAvL2plIHBsYWNlIGwnZXNwYWNlIMOgIGxhIGJvbm5lIHBsYWNlLlxyXG4gICAgICAgICAgICBjaGFpbmUgPSBjaGFpbmUuc3Vic3RyKDAsMykgKyBcIiBcIiArIGNoYWluZS5zdWJzdHIoMywzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90cmFuc2Zvcm1lciBsZSBjb2RlIFBvc3RhbCBlbiBtYWp1c2N1bGUuXHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSBjaGFpbmUudG9VcHBlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtYXRUUChpbnB1dCl7XHJcbiAgICAgICAgLy8gaidlbmxldmUgdG91dCBjZSBxdWkgbidlc3QgcGFzIGNoaWZmcmUsIGdsb2JhbGVtZW50LlxyXG4gICAgICAgIHZhciBjaGFpbmUgPSBpbnB1dC52YWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coY2hhaW5lKTtcclxuXHJcbiAgICAgICAgLy9hdSAxMWVtZSBjYXJhYyB0YXDDqSwgamUgcmVjb25zdHJ1aXMgbGUgdGVsIGF2ZWMgc2VzIGJvbnMgY2hpZmZyZXMuXHJcbiAgICAgICAgaWYoY2hhaW5lLmxlbmd0aCA+IDEwKXtcclxuICAgICAgICAgICAgY2hhaW5lID0gY2hhaW5lLnN1YnN0cigxLDMpICsgY2hhaW5lLnN1YnN0cig1LDMpICsgY2hhaW5lLnN1YnN0cig5LDQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hdSAxMGVtZSBjYXJhYywgamUgZm9ybWF0dGUgc2Vsb24gKFhYWClYWFgtWFhYWC5cclxuICAgICAgICBpZihjaGFpbmUubGVuZ3RoID09PSAxMCl7XHJcbiAgICAgICAgICAgIGNoYWluZSA9IFwiKFwiICsgY2hhaW5lLnN1YnN0cigwLDMpICsgXCIpXCIgKyBjaGFpbmUuc3Vic3RyKDMsMykgKyBcIi1cIiArIGNoYWluZS5zdWJzdHIoNiw0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogc2kgY2VzIGlmIHNvbnQgaW52ZXJzw6lzLCBjaGFpbmUgbm9uLWZvcm1hdHTDqWUuXHJcbiAgICAgICAgICAgY2FyIGF1IDEwZW1lIGNhcmFjIDogXHJcbiAgICAgICAgICAgY2hhaW5lLmxlbmd0aCA+IDEwIGV0IGRvbmMgbGEgY2hhaW5lIHJldmllbnQgbm9uLWZvcm1hdHTDqWUuXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpbnB1dC52YWx1ZSA9IGNoYWluZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVzdENvZGVQb3N0YWxPSyhjb250cm9sOiBGb3JtQ29udHJvbCk6IFJlc3VsdGF0VmFsaWRhdGlvbntcclxuICAgICAgICAvL3ZhbGlkYXRpb24gYSByw6l1c3NpOiBwYXMgZGUgdmFsZXVyIHRhcMOpZVxyXG4gICAgICAgIGlmKCFjb250cm9sLnZhbHVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qZm9ybWF0IHJlZ2V4IGNhbmFkaWVuIDpcclxuICAgICAgICAgICAgXiA6IGNoYWluZSBjb21tZW5jZSwgJCA6IGZpbiBzw6lxdWVuY2VcclxuICAgICAgICAgICAgbGV0dHJlIDogcGFzIGRlIEQsIEYsIEksIE8sIFEgVVxyXG4gICAgICAgICAgICAxZXIgbGV0dHJlOiBwYXMgZGUgVywgWiwgY2hpZmZyZTogXFxkLCBsZXR0cmUsIGJsYW5jLCBjaGlmZnJlLCBsZXR0cmUsIGNoaWZmcmVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHZhciByZWdleENQID0gIC9eW0FCQ0VHSEpLTE1OUFJTVFZYWV1cXGRbQUJDRUdISktMTU5QUlNUVldYWVpdWyBdXFxkW0FCQ0VHSEpLTE1OUFJTVFZXWFlaXVxcZCQvO1xyXG4gICAgICAgIGlmKCFjb250cm9sLnZhbHVlLm1hdGNoKHJlZ2V4Q1ApKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtjb2RlUG9zdGFsSW52YWxpZGU6IHRydWV9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy92YWxpZGF0aW9uIHLDqXN1c3NpZVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXN0VGVsZXBob25lT0soY29udHJvbDogRm9ybUNvbnRyb2wpOiBSZXN1bHRhdFZhbGlkYXRpb257XHJcbiAgICAgICAgaWYoIWNvbnRyb2wudmFsdWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogZm9ybWF0IHJlZ2V4IGNhbmFkaWVuOlxyXG4gICAgICAgICAgIF4gOiBzZXF1ZW5jZSBjb21tZW5jZSwgJCA6IGZpbiBzZXF1ZW5jZVxyXG4gICAgICAgICAgICggLCBjaGlmZnJlKHgzKSwgKSAsIGNoaWZmcmUgKHgzKSwgLSAsIGNoaWZmcmUgKHg0KVxyXG4gICAgICAgICovIFxyXG4gICAgICAgIHZhciByZWdleFRQID0gL15cXHUwMDI4XFxkezN9XFx1MDAyOVxcZHszfVxcdTAwMkRcXGR7NH0kLztcclxuICAgICAgICBpZighY29udHJvbC52YWx1ZS5tYXRjaChyZWdleFRQKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB7dGVsZXBob25lSW52YWxpZGU6IHRydWV9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3ZhbGlkYXRpb24gcsOpdXNzaWVcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy92YWxpZGF0aW9uOiByZXRvdXJuZSBudWxsIHNpIHZhbGlkZSBldCB1biBib29sZWFuIHNpIGVycmV1ci5cclxuICAgICBwcml2YXRlIGVzdENvdXJyaWVsT0soY29udHJvbDogRm9ybUNvbnRyb2wpOiBSZXN1bHRhdFZhbGlkYXRpb257XHJcbiAgICAgICAgIGlmIChjb250cm9sLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciByZWdleENvdXJyaWVsID0gL1thLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pPy87XHJcbiAgICAgICAgICAgIGlmKCFjb250cm9sLnZhbHVlLm1hdGNoKHJlZ2V4Q291cnJpZWwpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtjb3VycmllbEludmFsaWRlOiB0cnVlfTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy92YWxpZGF0aW9uIHLDqXVzc2llXHJcbiAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KCl7XHJcbiAgICAgICAgLy9jaGFuZ2UgbW9kZSBtb2RpZmljYXRpb24sIGVuYWJsZSBib3V0b24gQWN1dGFsaXNlciBldCBDb3BpZXIuXHJcbiAgICAgICAgdGhpcy5tb2RlU291bWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZm9ybUFjdHVhbGlzZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZm9ybUNvcGllID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWUgY2xpZW50IDogXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdENsaWVudEZvcm0udmFsdWUpO1xyXG4gICAgICAgIC8vSUYgTk9VVkVBVSwgQVBQRUwgQ1LDicOJLCBTSU5PTiBBUFBFTCBVUERBVEVcclxuICAgICAgICBpZih0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmNyZWVyQ2xpZW50KHRoaXMubXlDbGllbnQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgZHUgc2VydmV1ciA6Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUNsaWVudCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zYXV2ZXIgbGUgX2lkIHF1aSByZXZpZW50IGRhbnMgbGUgY2xpZW50IGNyw6nDqSBwYXIgTW9uZ28uXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRJZCA9IGRhdGEuY2xpZW50SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZCBkZSBcIisgZGF0YS5ub20gKyBcIiA6IFwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyBkZSBjbGllbnQgOiBcIiArIGRhdGEubm9DbGllbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2F1dmVyIGxlIG5vIGRlIGNsaWVudCAobm8gZGUgbGEgc2VxdWVuY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUNsaWVudC5ub0NsaWVudCA9IGRhdGEubm9DbGllbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92b2lyIGxlIG1lc3NhZ2UgZGUgc2F1dmVnYXJkZSBzdWNjw6hzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXV2ZWdhcmRlQ2xpZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fY2xpZW50U2VydmljZS51cGRhdGVDbGllbnQodGhpcy5teUNsaWVudClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubXlDbGllbnQgPSBudWxsO1xyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRlc3RDUCgpe1xyXG4gICAgICAgIC8vcmV0b3VuZSBudWxsICh2YWxpZGUpXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5lc3RDb2RlUG9zdGFsT0soJ0gyUyAwQjUnKSk7IC8vb2tcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVzdENvZGVQb3N0YWxPSygnaDJzIDBiNScpKTsgLy9va1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZXN0Q29kZVBvc3RhbE9LKCdoMnMwYjUnKSk7ICAvL29rXHJcblxyXG4gICAgICAgIC8vcmV0b3VybmUgdHJ1ZSAoZmFpbClcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVzdENvZGVQb3N0YWxPSygnWjNWIEgyUycpKTsgLy9Pa1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZXN0Q29kZVBvc3RhbE9LKCd6M3ZoMnMnKSk7ICAvL29rXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5lc3RDb2RlUG9zdGFsT0soJ0IzViBIMicpKTsgIC8vb2tcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=

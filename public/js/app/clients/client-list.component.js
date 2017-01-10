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
var core_1 = require("@angular/core");
var client_service_1 = require("./client.service");
var erreur_service_1 = require("../erreurs/erreur.service");
var ClientListComponent = (function () {
    function ClientListComponent(_clientService, _erreurService) {
        this._clientService = _clientService;
        this._erreurService = _erreurService;
        this.titre = "Liste des Clients";
        this.noClientTextSearch = "";
        this.noClientFiltreList = "";
        this.boolSearchClient = false;
        this.erreurCodeClient = "";
        this.specialTextSearch = "";
        this.erreurSpecialSearch = "";
        this.boolFullSearch = false;
        //suggere faire apparaitre spinner apres 300 msm ici fait disparaitre apres un multiple du temps
        // de la requete ca requete trop rapide en general.
        this.delai = 500;
        this.estRequete = false;
    }
    ClientListComponent.prototype.ngOnInit = function () {
        console.log('dans on init');
        this.getClients();
    };
    ClientListComponent.prototype.getClients = function () {
        var _this = this;
        this._clientService.getClients().subscribe(function (data) {
            _this.clients = data;
            for (var i = 0; i < _this.clients.length; i++) {
                console.log(_this.clients[i]);
            }
        }, function (error) { return _this._erreurService.handleErreur(error); });
    };
    ClientListComponent.prototype.eventModal = function () {
        this.titreModal = "Suppression";
    };
    ClientListComponent.prototype.clientSelect = function (client) {
        this.clientSelected = client;
        console.log(this.clientSelected);
        console.log(this.clientSelected.noClient);
        this.noClient = this.clientSelected.noClient;
    };
    ClientListComponent.prototype.onDelete = function () {
        var _this = this;
        if (this.clientSelected !== null) {
            this._clientService.deleteClient(this.clientSelected)
                .subscribe(function (data) {
                console.log(data);
            }, function (error) { return _this._erreurService.handleErreur(error); });
        }
    };
    // Search sur le numéro client
    ClientListComponent.prototype.onSearchNoClient = function () {
        var _this = this;
        this.estRequete = true;
        var start = new Date().getTime();
        this.boolSearchClient = false;
        console.log("contenu input: ");
        console.log(this.noClientTextSearch);
        if (this.noClientTextSearch === null || (this.noClientTextSearch).toString() === "") {
            this.estRequete = false;
            this.noClientFiltreList = "";
            return;
        }
        else if (isNaN(Number(this.noClientTextSearch))) {
            this.estRequete = false;
            this.erreurCodeClient = "Invalide. Code Client doit être un nombre.";
            this.boolSearchClient = true;
            return;
        }
        else if (this.noClientTextSearch.toString().length > 10) {
            this.estRequete = false;
            this.erreurCodeClient = "Invalide. Code Client dépasse la longueur acceptée.";
            this.boolSearchClient = true;
            return;
        }
        this._clientService.getClient(Number(this.noClientTextSearch))
            .subscribe(function (data) {
            _this.noClientFiltreList = (data.noClient).toString();
            console.log(_this.noClientFiltreList);
            var end = new Date().getTime();
            _this.delai = _this.getDelai(start, end);
            _this.setTimeOut();
        }, function (error) {
            _this.boolSearchClient = true;
            _this._erreurService.handleErreur(error);
        });
    };
    ClientListComponent.prototype.cancelTime = function () {
        console.log("in cancel time");
        this.estRequete = false;
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
        console.log(this.currentTimeout);
    };
    ClientListComponent.prototype.setTimeOut = function () {
        var _this = this;
        this.currentTimeout = setTimeout(function () {
            _this.cancelTime();
        }, this.delai);
    };
    ClientListComponent.prototype.getDelai = function (start, end, diff2) {
        var diff = end - start;
        diff *= 15;
        console.log(diff);
        if (diff2) {
            return diff2 *= 5;
        }
        return diff;
    };
    // Full text search serveur sur le client (champs clients indexés)
    ClientListComponent.prototype.onSpecialSearch = function () {
        var _this = this;
        this.estRequete = true;
        var start = new Date().getTime();
        this.boolFullSearch = false;
        if (this.specialTextSearch === null || (this.specialTextSearch).toString() === "") {
            this.estRequete = false;
            this.getClients();
            return;
        }
        else if (this.specialTextSearch.toString().length > 150) {
            this.estRequete = false;
            this.erreurSpecialSearch = "Invalide. Ne pas dépasser 150 caractères.";
            this.boolFullSearch = true;
            return;
        }
        this._clientService.getClientsSpecialSearch(this.specialTextSearch)
            .subscribe(function (data) {
            _this.clients = data;
            console.log(_this.clients);
            var end = new Date().getTime();
            _this.delai = _this.getDelai(start, end);
            _this.setTimeOut();
        }, function (error) {
            _this._erreurService.handleErreur(error);
        });
    };
    ClientListComponent.prototype.actualiser = function () {
        var _this = this;
        this.estRequete = true;
        this.boolSearchClient = false;
        var start = new Date().getTime();
        if (this.noClientTextSearch !== null && (this.noClientTextSearch).toString() !== "") {
            this._clientService.getClient(Number(this.noClientTextSearch))
                .subscribe(function (data) {
                _this.noClientFiltreList = (data.noClient).toString();
                console.log(_this.noClientFiltreList);
                var end = new Date().getTime();
                _this.delai = _this.getDelai(start, end);
                console.log(_this.delai);
                _this.setTimeOut();
            }, function (error) {
                _this.boolSearchClient = true;
                _this._erreurService.handleErreur(error);
            });
            return;
        }
        else {
            this.noClientFiltreList = "";
            this.getClients();
            var end = new Date().getTime();
            this.delai = this.getDelai(start, end, 100);
            console.log(this.delai);
            this.setTimeOut();
        }
    };
    ClientListComponent.prototype.logInput = function (value) {
        console.log(value);
    };
    return ClientListComponent;
}());
ClientListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-client-list',
        templateUrl: 'client-list.component.html',
        styles: ["\n        #pagerClient{\n            text-align: center;\n        }\n\n        section{\n            padding: 2% 0 0 0;\n        }\n\n        td{\n            text-align: left;\n            padding-bottom: 0;\n            font-size: 14px;\n            max-width: 300px;\n            word-wrap: break-word;\n        }\n\n        th{\n            font-size: 14px;\n            white-space: pre; \n        }\n\n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n\n        h3{\n            padding: 0.5% 0 0.5% 0;\n            margin:0;\n            font-size: 1.3vw;\n        }\n\n        .panel-heading{\n            text-align:center;\n        }\n\n        .bg-danger{\n            text-align: center;\n            color: #CC0000;\n            font-weight: bolder;\n            font-size: 1vw;\n        }\n\n        #searchLabel{\n            margin-bottom:0;\n            text-align:left;\n        }\n\n        #erreurCode{\n            text-align: center;\n            padding: 0 5% 0 0;\n        } \n\n        #erreurFullSearch {\n            clear: both;\n            float: left;\n        }\n\n        .size{\n            font-size:1vw;\n            text-align:center;\n        }\n\n        .disableA{\n            pointer-events: none;\n            cursor: default;\n            color: #ddd;\n        }\n\n        .erreurSearchClient, .erreurSpecialSearch{\n            background: #ff8080;\n        }\n\n        #boutonSearchNoClient{\n            background: #519BDB;\n        }\n\n        a{\n            color: #000;\n            display: block;\n            clear: both;\n            position: relative;\n        }\n\n        a span{\n            position: absolute;\n            display:none;\n            background: rgba(20, 20, 31, 0.84);\n            text-align: center;\n            border-left: 1px solid #111;\n            border-top: 1px solid #111;\n            border-right: 1px solid #333;\n            border-bottom: 1px solid #333;\n            border-radius: 3px;\n            color: #fff;\n            font-size: 0.7em;\n            text-indent: 0;\n            width: auto;\n            height:auto;\n        }\n\n        a span:after{\n            content: ' ';\n\t        height: 0;\n\t        position: absolute;\n\t        width: 0;\n            border: 10px solid transparent;\n\t        border-top-color: #333;\n            top: 100%;\n\t        left: 10px;\n        }\n\n        a:hover span{\n            display: block;\n            bottom: 1vw;\n            left:75%;\n            z-index: 9999;\n            -moz-animation: moveTooltip .25s linear;\n            -webkit-animation: moveTooltip .25s linear;\n        }\n\n        a:hover{\n            color: #337ab7;\n        }\n\n        .widgets{\n            display: inline-block;\n            padding-right: 5%;\n        }\n\n        #specialSearch{\n            padding: 0;\n        }\n\n        #boutonSpecialSearch{\n            clear: both;\n            float: left;\n            background: #519BDB;\n        }\n\n        .divFooter{\n            text-align:center;\n        }\n\n        .col-md-12 {\n            padding: 2%;\n        }\n\n        @-moz-keyframes moveTooltip {\n            0% {\n                -moz-transform: scale(0,0);\n                opacity: 0;\n            }\n        \n            45% {\n                -moz-transform: scale(0.4,0.4);\n                opacity: 0.7;\n            }\n        \n            75% {\n                -moz-transform: scale(1.3,1.3);\n                opacity: 0.4;\n            }\n        \n            100% {\n                -moz-transform: scale(1,1);\n                opacity: 1;\n            };\n}\n\n@-webkit-keyframes moveTooltip {\n    0% {\n        -webkit-transform: scale(0,0);\n        opacity: 0;\n    }\n\n    45% {\n        -webkit-transform: scale(0.4,0.4);\n        opacity: 0.7;\n    }\n\n    75% {\n        -webkit-transform: scale(1.3,1.3);\n        opacity: 0.4;\n    }\n\n    100% {\n        -webkit-transform: scale(1,1);\n        opacity: 1;\n    };\n}\n\n    "]
    }),
    __metadata("design:paramtypes", [client_service_1.ClientService, erreur_service_1.ErreurService])
], ClientListComponent);
exports.ClientListComponent = ClientListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvY2xpZW50cy9jbGllbnQtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUdsRCxtREFBaUQ7QUFDakQsNERBQTBEO0FBeU4xRCxJQUFhLG1CQUFtQjtJQXFCNUIsNkJBQW9CLGNBQTZCLEVBQVUsY0FBNkI7UUFBcEUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNwRixJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBRTVCLGdHQUFnRztRQUNoRyxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsd0NBQVUsR0FBVjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQ3RDLFVBQUEsSUFBSTtZQUNBLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lB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QUNMLDBCQUFDO0FBQUQsQ0FoTkEsQUFnTkMsSUFBQTtBQWhOWSxtQkFBbUI7SUFwTi9CLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLE1BQU0sRUFBRSxDQUFDLDJ4SUE4TVIsQ0FBQztLQUNMLENBQUM7cUNBc0JzQyw4QkFBYSxFQUEwQiw4QkFBYTtHQXJCL0UsbUJBQW1CLENBZ04vQjtBQWhOWSxrREFBbUIiLCJmaWxlIjoiY2xpZW50cy9jbGllbnQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnLi9jbGllbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2FwaXRhbGl6ZVBpcGUgfSBmcm9tICcuLi9waXBlcy9jYXBpdGFsaXplLnBpcGUnO1xyXG5pbXBvcnQgeyBOb0NsaWVudFBpcGUgfSBmcm9tICcuLi9waXBlcy9ub0NsaWVudC5waXBlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4uL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1jbGllbnQtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2NsaWVudC1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAjcGFnZXJDbGllbnR7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlY3Rpb257XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIlIDAgMCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGR7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgIG1heC13aWR0aDogMzAwcHg7XHJcbiAgICAgICAgICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoe1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBwcmU7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhlYWQgPiB0cntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yNWVtIHNvbGlkICMxNTY1YzA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRyOmhvdmVye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlkNGY5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGJvZHkgPiB0cntcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yZW0gc29saWQgI2RkZDtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmVzdFNlbGVjdFJhbmdle1xyXG4gICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUxOUJEQjtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICBoM3tcclxuICAgICAgICAgICAgcGFkZGluZzogMC41JSAwIDAuNSUgMDtcclxuICAgICAgICAgICAgbWFyZ2luOjA7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMS4zdnc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAucGFuZWwtaGVhZGluZ3tcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYmctZGFuZ2Vye1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjQ0MwMDAwO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDF2dztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNzZWFyY2hMYWJlbHtcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTowO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmxlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZXJyZXVyQ29kZXtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDUlIDAgMDtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICAjZXJyZXVyRnVsbFNlYXJjaCB7XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zaXple1xyXG4gICAgICAgICAgICBmb250LXNpemU6MXZ3O1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5kaXNhYmxlQXtcclxuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcclxuICAgICAgICAgICAgY29sb3I6ICNkZGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZXJyZXVyU2VhcmNoQ2xpZW50LCAuZXJyZXVyU3BlY2lhbFNlYXJjaHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmODA4MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNib3V0b25TZWFyY2hOb0NsaWVudHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogIzUxOUJEQjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGEgc3BhbntcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICBkaXNwbGF5Om5vbmU7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjAsIDIwLCAzMSwgMC44NCk7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMTExO1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgIzExMTtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzMzMztcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzMzM7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgICAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgICAgICAgICAgIHRleHQtaW5kZW50OiAwO1xyXG4gICAgICAgICAgICB3aWR0aDogYXV0bztcclxuICAgICAgICAgICAgaGVpZ2h0OmF1dG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhIHNwYW46YWZ0ZXJ7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcgJztcclxuXHQgICAgICAgIGhlaWdodDogMDtcclxuXHQgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHQgICAgICAgIHdpZHRoOiAwO1xyXG4gICAgICAgICAgICBib3JkZXI6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcblx0ICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAjMzMzO1xyXG4gICAgICAgICAgICB0b3A6IDEwMCU7XHJcblx0ICAgICAgICBsZWZ0OiAxMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYTpob3ZlciBzcGFue1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgYm90dG9tOiAxdnc7XHJcbiAgICAgICAgICAgIGxlZnQ6NzUlO1xyXG4gICAgICAgICAgICB6LWluZGV4OiA5OTk5O1xyXG4gICAgICAgICAgICAtbW96LWFuaW1hdGlvbjogbW92ZVRvb2x0aXAgLjI1cyBsaW5lYXI7XHJcbiAgICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBtb3ZlVG9vbHRpcCAuMjVzIGxpbmVhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGE6aG92ZXJ7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMzM3YWI3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLndpZGdldHN7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogNSU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjc3BlY2lhbFNlYXJjaHtcclxuICAgICAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNib3V0b25TcGVjaWFsU2VhcmNoe1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICM1MTlCREI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZGl2Rm9vdGVye1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5jb2wtbWQtMTIge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAyJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEAtbW96LWtleWZyYW1lcyBtb3ZlVG9vbHRpcCB7XHJcbiAgICAgICAgICAgIDAlIHtcclxuICAgICAgICAgICAgICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwLDApO1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICA0NSUge1xyXG4gICAgICAgICAgICAgICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDAuNCwwLjQpO1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC43O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIDc1JSB7XHJcbiAgICAgICAgICAgICAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMS4zLDEuMyk7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgMTAwJSB7XHJcbiAgICAgICAgICAgICAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMSwxKTtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgICAgIH07XHJcbn1cclxuXHJcbkAtd2Via2l0LWtleWZyYW1lcyBtb3ZlVG9vbHRpcCB7XHJcbiAgICAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAsMCk7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgIH1cclxuXHJcbiAgICA0NSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjQsMC40KTtcclxuICAgICAgICBvcGFjaXR5OiAwLjc7XHJcbiAgICB9XHJcblxyXG4gICAgNzUlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4zLDEuMyk7XHJcbiAgICAgICAgb3BhY2l0eTogMC40O1xyXG4gICAgfVxyXG5cclxuICAgIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLDEpO1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICB9O1xyXG59XHJcblxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENsaWVudExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdGl0cmU6IHN0cmluZztcclxuICAgIGNsaWVudHM6IENsaWVudFtdO1xyXG4gICAgY2xpZW50U2VsZWN0ZWQ6IENsaWVudDtcclxuICAgIG5vQ2xpZW50OiBudW1iZXI7XHJcbiAgICB0aXRyZU1vZGFsOiBzdHJpbmc7XHJcbiAgICAvLyBubyBjbGllbnRcclxuICAgIG5vQ2xpZW50VGV4dFNlYXJjaDogc3RyaW5nO1xyXG4gICAgbm9DbGllbnRGaWx0cmVMaXN0OiBzdHJpbmc7XHJcbiAgICBib29sU2VhcmNoQ2xpZW50OiBib29sZWFuO1xyXG4gICAgZXJyZXVyQ29kZUNsaWVudDogc3RyaW5nO1xyXG4gICAgLy8gZnVsbCB0ZXh0IHNlYXJjaFxyXG4gICAgc3BlY2lhbFRleHRTZWFyY2g6IHN0cmluZztcclxuICAgIGJvb2xGdWxsU2VhcmNoOiBib29sZWFuO1xyXG4gICAgZXJyZXVyU3BlY2lhbFNlYXJjaDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICAvL3NwaW5uZXJcclxuICAgIGVzdFJlcXVldGU6IGJvb2xlYW47XHJcbiAgICBkZWxhaTogbnVtYmVyO1xyXG4gICAgY3VycmVudFRpbWVvdXQ6IG51bWJlcjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSkgeyBcclxuICAgICAgICB0aGlzLnRpdHJlID0gXCJMaXN0ZSBkZXMgQ2xpZW50c1wiO1xyXG4gICAgICAgIHRoaXMubm9DbGllbnRUZXh0U2VhcmNoID0gXCJcIjtcclxuICAgICAgICB0aGlzLm5vQ2xpZW50RmlsdHJlTGlzdCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5ib29sU2VhcmNoQ2xpZW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lcnJldXJDb2RlQ2xpZW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNwZWNpYWxUZXh0U2VhcmNoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmVycmV1clNwZWNpYWxTZWFyY2ggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYm9vbEZ1bGxTZWFyY2ggPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy9zdWdnZXJlIGZhaXJlIGFwcGFyYWl0cmUgc3Bpbm5lciBhcHJlcyAzMDAgbXNtIGljaSBmYWl0IGRpc3BhcmFpdHJlIGFwcmVzIHVuIG11bHRpcGxlIGR1IHRlbXBzXHJcbiAgICAgICAgLy8gZGUgbGEgcmVxdWV0ZSBjYSByZXF1ZXRlIHRyb3AgcmFwaWRlIGVuIGdlbmVyYWwuXHJcbiAgICAgICAgdGhpcy5kZWxhaSA9IDUwMDtcclxuICAgICAgICB0aGlzLmVzdFJlcXVldGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGFucyBvbiBpbml0Jyk7XHJcbiAgICAgICAgdGhpcy5nZXRDbGllbnRzKCk7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xpZW50cygpe1xyXG4gICAgICAgIHRoaXMuX2NsaWVudFNlcnZpY2UuZ2V0Q2xpZW50cygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudHMgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNsaWVudHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRNb2RhbCgpe1xyXG4gICAgICAgIHRoaXMudGl0cmVNb2RhbD0gXCJTdXBwcmVzc2lvblwiOyBcclxuICAgIH1cclxuXHJcbiAgICBjbGllbnRTZWxlY3QoY2xpZW50OiBDbGllbnQpe1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VsZWN0ZWQgPSBjbGllbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRTZWxlY3RlZC5ub0NsaWVudCk7XHJcbiAgICAgICAgdGhpcy5ub0NsaWVudCA9IHRoaXMuY2xpZW50U2VsZWN0ZWQubm9DbGllbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZWxldGUoKXtcclxuICAgICAgICBpZih0aGlzLmNsaWVudFNlbGVjdGVkICE9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fY2xpZW50U2VydmljZS5kZWxldGVDbGllbnQodGhpcy5jbGllbnRTZWxlY3RlZClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBTZWFyY2ggc3VyIGxlIG51bcOpcm8gY2xpZW50XHJcbiAgICBvblNlYXJjaE5vQ2xpZW50KCl7XHJcbiAgICAgICAgdGhpcy5lc3RSZXF1ZXRlID0gdHJ1ZTtcclxuICAgICAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLmJvb2xTZWFyY2hDbGllbnQgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNvbnRlbnUgaW5wdXQ6IFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vQ2xpZW50VGV4dFNlYXJjaCk7XHJcbiAgICAgICAgaWYodGhpcy5ub0NsaWVudFRleHRTZWFyY2ggPT09IG51bGwgfHwgKHRoaXMubm9DbGllbnRUZXh0U2VhcmNoKS50b1N0cmluZygpID09PSBcIlwiKXtcclxuICAgICAgICAgICAgdGhpcy5lc3RSZXF1ZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9DbGllbnRGaWx0cmVMaXN0ID0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGlzTmFOKE51bWJlcih0aGlzLm5vQ2xpZW50VGV4dFNlYXJjaCkpKXtcclxuICAgICAgICAgICAgdGhpcy5lc3RSZXF1ZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyZXVyQ29kZUNsaWVudCA9IFwiSW52YWxpZGUuIENvZGUgQ2xpZW50IGRvaXQgw6p0cmUgdW4gbm9tYnJlLlwiO1xyXG4gICAgICAgICAgICB0aGlzLmJvb2xTZWFyY2hDbGllbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5ub0NsaWVudFRleHRTZWFyY2gudG9TdHJpbmcoKS5sZW5ndGggPiAxMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZXN0UmVxdWV0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVycmV1ckNvZGVDbGllbnQgPSBcIkludmFsaWRlLiBDb2RlIENsaWVudCBkw6lwYXNzZSBsYSBsb25ndWV1ciBhY2NlcHTDqWUuXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYm9vbFNlYXJjaENsaWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2xpZW50U2VydmljZS5nZXRDbGllbnQoTnVtYmVyKHRoaXMubm9DbGllbnRUZXh0U2VhcmNoKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9DbGllbnRGaWx0cmVMaXN0ID0gKGRhdGEubm9DbGllbnQpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ub0NsaWVudEZpbHRyZUxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGFpID0gdGhpcy5nZXREZWxhaShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVPdXQoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib29sU2VhcmNoQ2xpZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAgY2FuY2VsVGltZSgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluIGNhbmNlbCB0aW1lXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmVzdFJlcXVldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY3VycmVudFRpbWVvdXQpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lb3V0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRUaW1lb3V0KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0VGltZU91dCgpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxUaW1lKCk7XHJcbiAgICAgICAgfSwgdGhpcy5kZWxhaSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVsYWkoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGRpZmYyPzogbnVtYmVyKTogbnVtYmVye1xyXG4gICAgICAgIHZhciBkaWZmID0gZW5kIC0gc3RhcnQ7XHJcbiAgICAgICAgZGlmZiAqPSAxNTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkaWZmKTtcclxuICAgICAgICBpZihkaWZmMil7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWZmMiAqPSA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGlmZjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGdWxsIHRleHQgc2VhcmNoIHNlcnZldXIgc3VyIGxlIGNsaWVudCAoY2hhbXBzIGNsaWVudHMgaW5kZXjDqXMpXHJcbiAgICBvblNwZWNpYWxTZWFyY2goKXtcclxuICAgICAgICB0aGlzLmVzdFJlcXVldGUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMuYm9vbEZ1bGxTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLnNwZWNpYWxUZXh0U2VhcmNoID09PSBudWxsICB8fCAodGhpcy5zcGVjaWFsVGV4dFNlYXJjaCkudG9TdHJpbmcoKSA9PT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZXN0UmVxdWV0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmdldENsaWVudHMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuc3BlY2lhbFRleHRTZWFyY2gudG9TdHJpbmcoKS5sZW5ndGggPiAxNTApe1xyXG4gICAgICAgICAgICB0aGlzLmVzdFJlcXVldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lcnJldXJTcGVjaWFsU2VhcmNoID0gXCJJbnZhbGlkZS4gTmUgcGFzIGTDqXBhc3NlciAxNTAgY2FyYWN0w6hyZXMuXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYm9vbEZ1bGxTZWFyY2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NsaWVudFNlcnZpY2UuZ2V0Q2xpZW50c1NwZWNpYWxTZWFyY2godGhpcy5zcGVjaWFsVGV4dFNlYXJjaClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50cyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxhaSA9IHRoaXMuZ2V0RGVsYWkoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lT3V0KCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFjdHVhbGlzZXIoKXtcclxuICAgICAgICB0aGlzLmVzdFJlcXVldGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9vbFNlYXJjaENsaWVudCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGlmKHRoaXMubm9DbGllbnRUZXh0U2VhcmNoICE9PSBudWxsICYmICh0aGlzLm5vQ2xpZW50VGV4dFNlYXJjaCkudG9TdHJpbmcoKSAhPT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWVudFNlcnZpY2UuZ2V0Q2xpZW50KE51bWJlcih0aGlzLm5vQ2xpZW50VGV4dFNlYXJjaCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vQ2xpZW50RmlsdHJlTGlzdCA9IChkYXRhLm5vQ2xpZW50KS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9DbGllbnRGaWx0cmVMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxhaSA9IHRoaXMuZ2V0RGVsYWkoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kZWxhaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lT3V0KCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9vbFNlYXJjaENsaWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5ub0NsaWVudEZpbHRyZUxpc3QgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmdldENsaWVudHMoKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGFpID0gdGhpcy5nZXREZWxhaShzdGFydCwgZW5kLCAxMDApO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRlbGFpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaW1lT3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGxvZ0lucHV0KHZhbHVlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XHJcbiAgICB9XHJcbn0iXX0=

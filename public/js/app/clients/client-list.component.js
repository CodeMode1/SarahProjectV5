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
var erreur_service_1 = require('../erreurs/erreur.service');
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
    ClientListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-client-list',
            templateUrl: 'client-list.component.html',
            styles: ["\n        #pagerClient{\n            text-align: center;\n        }\n\n        section{\n            padding: 2% 0 0 0;\n        }\n\n        td{\n            text-align: left;\n            padding-bottom: 0;\n            font-size: 14px;\n            max-width: 300px;\n            word-wrap: break-word;\n        }\n\n        th{\n            font-size: 14px;\n            white-space: pre; \n        }\n\n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n\n        h3{\n            padding: 0.5% 0 0.5% 0;\n            margin:0;\n            font-size: 1.3vw;\n        }\n\n        .panel-heading{\n            text-align:center;\n        }\n\n        .bg-danger{\n            text-align: center;\n            color: #CC0000;\n            font-weight: bolder;\n            font-size: 1vw;\n        }\n\n        #searchLabel{\n            margin-bottom:0;\n            text-align:left;\n        }\n\n        #erreurCode{\n            text-align: center;\n            padding: 0 5% 0 0;\n        } \n\n        #erreurFullSearch {\n            clear: both;\n            float: left;\n        }\n\n        .size{\n            font-size:1vw;\n            text-align:center;\n        }\n\n        .disableA{\n            pointer-events: none;\n            cursor: default;\n            color: #ddd;\n        }\n\n        .erreurSearchClient, .erreurSpecialSearch{\n            background: #ff8080;\n        }\n\n        #boutonSearchNoClient{\n            background: #519BDB;\n        }\n\n        a{\n            color: #000;\n            display: block;\n            clear: both;\n            position: relative;\n        }\n\n        a span{\n            position: absolute;\n            display:none;\n            background: rgba(20, 20, 31, 0.84);\n            text-align: center;\n            border-left: 1px solid #111;\n            border-top: 1px solid #111;\n            border-right: 1px solid #333;\n            border-bottom: 1px solid #333;\n            border-radius: 3px;\n            color: #fff;\n            font-size: 0.7em;\n            text-indent: 0;\n            width: auto;\n            height:auto;\n        }\n\n        a span:after{\n            content: ' ';\n\t        height: 0;\n\t        position: absolute;\n\t        width: 0;\n            border: 10px solid transparent;\n\t        border-top-color: #333;\n            top: 100%;\n\t        left: 10px;\n        }\n\n        a:hover span{\n            display: block;\n            bottom: 1vw;\n            left:75%;\n            z-index: 9999;\n            -moz-animation: moveTooltip .25s linear;\n            -webkit-animation: moveTooltip .25s linear;\n        }\n\n        a:hover{\n            color: #337ab7;\n        }\n\n        .widgets{\n            display: inline-block;\n            padding-right: 5%;\n        }\n\n        #specialSearch{\n            padding: 0;\n        }\n\n        #boutonSpecialSearch{\n            clear: both;\n            float: left;\n            background: #519BDB;\n        }\n\n        .divFooter{\n            text-align:center;\n        }\n\n        .col-md-12 {\n            padding: 2%;\n        }\n\n        @-moz-keyframes moveTooltip {\n            0% {\n                -moz-transform: scale(0,0);\n                opacity: 0;\n            }\n        \n            45% {\n                -moz-transform: scale(0.4,0.4);\n                opacity: 0.7;\n            }\n        \n            75% {\n                -moz-transform: scale(1.3,1.3);\n                opacity: 0.4;\n            }\n        \n            100% {\n                -moz-transform: scale(1,1);\n                opacity: 1;\n            };\n}\n\n@-webkit-keyframes moveTooltip {\n    0% {\n        -webkit-transform: scale(0,0);\n        opacity: 0;\n    }\n\n    45% {\n        -webkit-transform: scale(0.4,0.4);\n        opacity: 0.7;\n    }\n\n    75% {\n        -webkit-transform: scale(1.3,1.3);\n        opacity: 0.4;\n    }\n\n    100% {\n        -webkit-transform: scale(1,1);\n        opacity: 1;\n    };\n}\n\n    "]
        }), 
        __metadata('design:paramtypes', [client_service_1.ClientService, erreur_service_1.ErreurService])
    ], ClientListComponent);
    return ClientListComponent;
}());
exports.ClientListComponent = ClientListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudHMvY2xpZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFHbEQsK0JBQThCLGtCQUFrQixDQUFDLENBQUE7QUFDakQsK0JBQThCLDJCQUEyQixDQUFDLENBQUE7QUF5TjFEO0lBcUJJLDZCQUFvQixjQUE2QixFQUFVLGNBQTZCO1FBQXBFLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDcEYsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUU1QixnR0FBZ0c7UUFDaEcsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELHdDQUFVLEdBQVY7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUN0QyxVQUFBLElBQUk7WUFDQSxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FB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QUM7SUFuYUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxNQUFNLEVBQUUsQ0FBQywyeElBOE1SLENBQUM7U0FDTCxDQUFDOzsyQkFBQTtJQWlORiwwQkFBQztBQUFELENBaE5BLEFBZ05DLElBQUE7QUFoTlksMkJBQW1CLHNCQWdOL0IsQ0FBQSIsImZpbGUiOiJjbGllbnRzL2NsaWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICcuL2NsaWVudCc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuL2NsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDYXBpdGFsaXplUGlwZSB9IGZyb20gJy4uL3BpcGVzL2NhcGl0YWxpemUucGlwZSc7XHJcbmltcG9ydCB7IE5vQ2xpZW50UGlwZSB9IGZyb20gJy4uL3BpcGVzL25vQ2xpZW50LnBpcGUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vc3Bpbm5lci9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWNsaWVudC1saXN0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnY2xpZW50LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgICNwYWdlckNsaWVudHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VjdGlvbntcclxuICAgICAgICAgICAgcGFkZGluZzogMiUgMCAwIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDA7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgICAgbWF4LXdpZHRoOiAzMDBweDtcclxuICAgICAgICAgICAgd29yZC13cmFwOiBicmVhay13b3JkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGh7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRye1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgIGgze1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwLjUlIDAgMC41JSAwO1xyXG4gICAgICAgICAgICBtYXJnaW46MDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxLjN2dztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5wYW5lbC1oZWFkaW5ne1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5iZy1kYW5nZXJ7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgY29sb3I6ICNDQzAwMDA7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMXZ3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3NlYXJjaExhYmVse1xyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOjA7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246bGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlcnJldXJDb2Rle1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgNSUgMCAwO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgICNlcnJldXJGdWxsU2VhcmNoIHtcclxuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNpemV7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZToxdnc7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmRpc2FibGVBe1xyXG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgICAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gICAgICAgICAgICBjb2xvcjogI2RkZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5lcnJldXJTZWFyY2hDbGllbnQsIC5lcnJldXJTcGVjaWFsU2VhcmNoe1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmY4MDgwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2JvdXRvblNlYXJjaE5vQ2xpZW50e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNTE5QkRCO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXtcclxuICAgICAgICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYSBzcGFue1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6bm9uZTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyMCwgMjAsIDMxLCAwLjg0KTtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMxMTE7XHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMTExO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMzMzO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMzMztcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAwLjdlbTtcclxuICAgICAgICAgICAgdGV4dC1pbmRlbnQ6IDA7XHJcbiAgICAgICAgICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgICAgICAgICBoZWlnaHQ6YXV0bztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGEgc3BhbjphZnRlcntcclxuICAgICAgICAgICAgY29udGVudDogJyAnO1xyXG5cdCAgICAgICAgaGVpZ2h0OiAwO1xyXG5cdCAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG5cdCAgICAgICAgd2lkdGg6IDA7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuXHQgICAgICAgIGJvcmRlci10b3AtY29sb3I6ICMzMzM7XHJcbiAgICAgICAgICAgIHRvcDogMTAwJTtcclxuXHQgICAgICAgIGxlZnQ6IDEwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhOmhvdmVyIHNwYW57XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICBib3R0b206IDF2dztcclxuICAgICAgICAgICAgbGVmdDo3NSU7XHJcbiAgICAgICAgICAgIHotaW5kZXg6IDk5OTk7XHJcbiAgICAgICAgICAgIC1tb3otYW5pbWF0aW9uOiBtb3ZlVG9vbHRpcCAuMjVzIGxpbmVhcjtcclxuICAgICAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IG1vdmVUb29sdGlwIC4yNXMgbGluZWFyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYTpob3ZlcntcclxuICAgICAgICAgICAgY29sb3I6ICMzMzdhYjc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAud2lkZ2V0c3tcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA1JTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNzcGVjaWFsU2VhcmNoe1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2JvdXRvblNwZWNpYWxTZWFyY2h7XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogIzUxOUJEQjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5kaXZGb290ZXJ7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNvbC1tZC0xMiB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQC1tb3ota2V5ZnJhbWVzIG1vdmVUb29sdGlwIHtcclxuICAgICAgICAgICAgMCUge1xyXG4gICAgICAgICAgICAgICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDAsMCk7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIDQ1JSB7XHJcbiAgICAgICAgICAgICAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMC40LDAuNCk7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgNzUlIHtcclxuICAgICAgICAgICAgICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxLjMsMS4zKTtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAxMDAlIHtcclxuICAgICAgICAgICAgICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxLDEpO1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgICAgICAgfTtcclxufVxyXG5cclxuQC13ZWJraXQta2V5ZnJhbWVzIG1vdmVUb29sdGlwIHtcclxuICAgIDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCwwKTtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgfVxyXG5cclxuICAgIDQ1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNCwwLjQpO1xyXG4gICAgICAgIG9wYWNpdHk6IDAuNztcclxuICAgIH1cclxuXHJcbiAgICA3NSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjMsMS4zKTtcclxuICAgICAgICBvcGFjaXR5OiAwLjQ7XHJcbiAgICB9XHJcblxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEsMSk7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgIH07XHJcbn1cclxuXHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xpZW50TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB0aXRyZTogc3RyaW5nO1xyXG4gICAgY2xpZW50czogQ2xpZW50W107XHJcbiAgICBjbGllbnRTZWxlY3RlZDogQ2xpZW50O1xyXG4gICAgbm9DbGllbnQ6IG51bWJlcjtcclxuICAgIHRpdHJlTW9kYWw6IHN0cmluZztcclxuICAgIC8vIG5vIGNsaWVudFxyXG4gICAgbm9DbGllbnRUZXh0U2VhcmNoOiBzdHJpbmc7XHJcbiAgICBub0NsaWVudEZpbHRyZUxpc3Q6IHN0cmluZztcclxuICAgIGJvb2xTZWFyY2hDbGllbnQ6IGJvb2xlYW47XHJcbiAgICBlcnJldXJDb2RlQ2xpZW50OiBzdHJpbmc7XHJcbiAgICAvLyBmdWxsIHRleHQgc2VhcmNoXHJcbiAgICBzcGVjaWFsVGV4dFNlYXJjaDogc3RyaW5nO1xyXG4gICAgYm9vbEZ1bGxTZWFyY2g6IGJvb2xlYW47XHJcbiAgICBlcnJldXJTcGVjaWFsU2VhcmNoOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIC8vc3Bpbm5lclxyXG4gICAgZXN0UmVxdWV0ZTogYm9vbGVhbjtcclxuICAgIGRlbGFpOiBudW1iZXI7XHJcbiAgICBjdXJyZW50VGltZW91dDogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlKSB7IFxyXG4gICAgICAgIHRoaXMudGl0cmUgPSBcIkxpc3RlIGRlcyBDbGllbnRzXCI7XHJcbiAgICAgICAgdGhpcy5ub0NsaWVudFRleHRTZWFyY2ggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubm9DbGllbnRGaWx0cmVMaXN0ID0gXCJcIjtcclxuICAgICAgICB0aGlzLmJvb2xTZWFyY2hDbGllbnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVycmV1ckNvZGVDbGllbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3BlY2lhbFRleHRTZWFyY2ggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZXJyZXVyU3BlY2lhbFNlYXJjaCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5ib29sRnVsbFNlYXJjaCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL3N1Z2dlcmUgZmFpcmUgYXBwYXJhaXRyZSBzcGlubmVyIGFwcmVzIDMwMCBtc20gaWNpIGZhaXQgZGlzcGFyYWl0cmUgYXByZXMgdW4gbXVsdGlwbGUgZHUgdGVtcHNcclxuICAgICAgICAvLyBkZSBsYSByZXF1ZXRlIGNhIHJlcXVldGUgdHJvcCByYXBpZGUgZW4gZ2VuZXJhbC5cclxuICAgICAgICB0aGlzLmRlbGFpID0gNTAwO1xyXG4gICAgICAgIHRoaXMuZXN0UmVxdWV0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkYW5zIG9uIGluaXQnKTtcclxuICAgICAgICB0aGlzLmdldENsaWVudHMoKTsgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGllbnRzKCl7XHJcbiAgICAgICAgdGhpcy5fY2xpZW50U2VydmljZS5nZXRDbGllbnRzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50cyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2xpZW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGllbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBldmVudE1vZGFsKCl7XHJcbiAgICAgICAgdGhpcy50aXRyZU1vZGFsPSBcIlN1cHByZXNzaW9uXCI7IFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWVudFNlbGVjdChjbGllbnQ6IENsaWVudCl7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZWxlY3RlZCA9IGNsaWVudDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFNlbGVjdGVkLm5vQ2xpZW50KTtcclxuICAgICAgICB0aGlzLm5vQ2xpZW50ID0gdGhpcy5jbGllbnRTZWxlY3RlZC5ub0NsaWVudDtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlbGV0ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuY2xpZW50U2VsZWN0ZWQgIT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmRlbGV0ZUNsaWVudCh0aGlzLmNsaWVudFNlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlYXJjaCBzdXIgbGUgbnVtw6lybyBjbGllbnRcclxuICAgIG9uU2VhcmNoTm9DbGllbnQoKXtcclxuICAgICAgICB0aGlzLmVzdFJlcXVldGUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMuYm9vbFNlYXJjaENsaWVudCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29udGVudSBpbnB1dDogXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9DbGllbnRUZXh0U2VhcmNoKTtcclxuICAgICAgICBpZih0aGlzLm5vQ2xpZW50VGV4dFNlYXJjaCA9PT0gbnVsbCB8fCAodGhpcy5ub0NsaWVudFRleHRTZWFyY2gpLnRvU3RyaW5nKCkgPT09IFwiXCIpe1xyXG4gICAgICAgICAgICB0aGlzLmVzdFJlcXVldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub0NsaWVudEZpbHRyZUxpc3QgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaXNOYU4oTnVtYmVyKHRoaXMubm9DbGllbnRUZXh0U2VhcmNoKSkpe1xyXG4gICAgICAgICAgICB0aGlzLmVzdFJlcXVldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lcnJldXJDb2RlQ2xpZW50ID0gXCJJbnZhbGlkZS4gQ29kZSBDbGllbnQgZG9pdCDDqnRyZSB1biBub21icmUuXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYm9vbFNlYXJjaENsaWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLm5vQ2xpZW50VGV4dFNlYXJjaC50b1N0cmluZygpLmxlbmd0aCA+IDEwKXtcclxuICAgICAgICAgICAgdGhpcy5lc3RSZXF1ZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyZXVyQ29kZUNsaWVudCA9IFwiSW52YWxpZGUuIENvZGUgQ2xpZW50IGTDqXBhc3NlIGxhIGxvbmd1ZXVyIGFjY2VwdMOpZS5cIjtcclxuICAgICAgICAgICAgdGhpcy5ib29sU2VhcmNoQ2xpZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jbGllbnRTZXJ2aWNlLmdldENsaWVudChOdW1iZXIodGhpcy5ub0NsaWVudFRleHRTZWFyY2gpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub0NsaWVudEZpbHRyZUxpc3QgPSAoZGF0YS5ub0NsaWVudCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vQ2xpZW50RmlsdHJlTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYWkgPSB0aGlzLmdldERlbGFpKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvb2xTZWFyY2hDbGllbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgICBjYW5jZWxUaW1lKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW4gY2FuY2VsIHRpbWVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZXN0UmVxdWV0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jdXJyZW50VGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRpbWVvdXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFRpbWVvdXQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRUaW1lT3V0KCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFRpbWUoKTtcclxuICAgICAgICB9LCB0aGlzLmRlbGFpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZWxhaShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgZGlmZjI/OiBudW1iZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgdmFyIGRpZmYgPSBlbmQgLSBzdGFydDtcclxuICAgICAgICBkaWZmICo9IDE1O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRpZmYpO1xyXG4gICAgICAgIGlmKGRpZmYyKXtcclxuICAgICAgICAgICAgcmV0dXJuIGRpZmYyICo9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkaWZmO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZ1bGwgdGV4dCBzZWFyY2ggc2VydmV1ciBzdXIgbGUgY2xpZW50IChjaGFtcHMgY2xpZW50cyBpbmRleMOpcylcclxuICAgIG9uU3BlY2lhbFNlYXJjaCgpe1xyXG4gICAgICAgIHRoaXMuZXN0UmVxdWV0ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5ib29sRnVsbFNlYXJjaCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuc3BlY2lhbFRleHRTZWFyY2ggPT09IG51bGwgIHx8ICh0aGlzLnNwZWNpYWxUZXh0U2VhcmNoKS50b1N0cmluZygpID09PSBcIlwiKXtcclxuICAgICAgICAgICAgdGhpcy5lc3RSZXF1ZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xpZW50cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5zcGVjaWFsVGV4dFNlYXJjaC50b1N0cmluZygpLmxlbmd0aCA+IDE1MCl7XHJcbiAgICAgICAgICAgIHRoaXMuZXN0UmVxdWV0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVycmV1clNwZWNpYWxTZWFyY2ggPSBcIkludmFsaWRlLiBOZSBwYXMgZMOpcGFzc2VyIDE1MCBjYXJhY3TDqHJlcy5cIjtcclxuICAgICAgICAgICAgdGhpcy5ib29sRnVsbFNlYXJjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2xpZW50U2VydmljZS5nZXRDbGllbnRzU3BlY2lhbFNlYXJjaCh0aGlzLnNwZWNpYWxUZXh0U2VhcmNoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGFpID0gdGhpcy5nZXREZWxhaShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVPdXQoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWN0dWFsaXNlcigpe1xyXG4gICAgICAgIHRoaXMuZXN0UmVxdWV0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ib29sU2VhcmNoQ2xpZW50ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgaWYodGhpcy5ub0NsaWVudFRleHRTZWFyY2ggIT09IG51bGwgJiYgKHRoaXMubm9DbGllbnRUZXh0U2VhcmNoKS50b1N0cmluZygpICE9PSBcIlwiKXtcclxuICAgICAgICAgICAgdGhpcy5fY2xpZW50U2VydmljZS5nZXRDbGllbnQoTnVtYmVyKHRoaXMubm9DbGllbnRUZXh0U2VhcmNoKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9DbGllbnRGaWx0cmVMaXN0ID0gKGRhdGEubm9DbGllbnQpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ub0NsaWVudEZpbHRyZUxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGFpID0gdGhpcy5nZXREZWxhaShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRlbGFpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVPdXQoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib29sU2VhcmNoQ2xpZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5vQ2xpZW50RmlsdHJlTGlzdCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xpZW50cygpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsYWkgPSB0aGlzLmdldERlbGFpKHN0YXJ0LCBlbmQsIDEwMCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGVsYWkpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpbWVPdXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbG9nSW5wdXQodmFsdWUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcclxuICAgIH1cclxufSJdfQ==

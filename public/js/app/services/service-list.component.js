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
var service_1 = require('./service');
var ServiceListComponent = (function () {
    function ServiceListComponent() {
        this.indexNom = 0;
        this.titre = "Services";
        this.services = [];
        this.selectedService = new service_1.Service();
        this.selectedService.modifie = "";
        this.selectedService.modifiePar = "";
        this.selectedService.total = 0;
    }
    ServiceListComponent.prototype.ngOnInit = function () {
        console.log("nb changes service init : ");
        if (this.compteurChanges == 2) {
            this.selectedService = null;
        }
    };
    ServiceListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.compteurChanges != null) {
            console.log("nb changes services onchanges : ");
            console.log(this.compteurChanges);
            if (this.compteurChanges > 2) {
                this.selectedService = this.services[0];
            }
        }
    };
    ServiceListComponent.prototype.ngAfterViewChecked = function () {
        //modifier la date et modifié par seulement lorsqu'on est en mode edition.
        if (!this.estNouveau) {
            this.selectedService.modifie = this.getDateModif();
            this.selectedService.modifiePar = localStorage.getItem('userName');
        }
        if (this.services == null || this.services.length < 1) {
            this.selectedService.modifie = null;
            this.selectedService.modifiePar = "";
        }
        this.calculServices();
    };
    ServiceListComponent.prototype.ajouteService = function () {
        var nouveauService;
        this.indexNom += 1;
        nouveauService = new service_1.Service();
        nouveauService.nom = "Nouveau" + this.indexNom;
        nouveauService.temps = this.getDateActuelle();
        this.services.push(nouveauService);
    };
    ServiceListComponent.prototype.supprimeService = function () {
        this.services.splice(this.services.indexOf(this.selectedService), 1);
    };
    ServiceListComponent.prototype.selectService = function (service) {
        this.selectedService = service;
    };
    ServiceListComponent.prototype.getDateActuelle = function () {
        var date = new Date().toLocaleDateString();
        var yyyy = date.substring(6, 10);
        var mm = date.substring(3, 5);
        var dd = date.substring(0, 2);
        return (yyyy + "-" + mm + "-" + dd);
    };
    ServiceListComponent.prototype.getDateModif = function () {
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6, 10);
        var mm = date.substring(3, 5);
        var dd = date.substring(0, 2);
        var hh = date.substring(12, 14);
        var mm = date.substring(15, 17);
        var ss = date.substring(18, 20);
        return (yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mm + ":" + ss);
    };
    ServiceListComponent.prototype.calculServices = function () {
        this.selectedService.sousTotal = Number(((this.selectedService.quantite * this.selectedService.prixUnitaire) * (1 - (this.selectedService.escompte / 100))).toFixed(2));
        this.selectedService.fraisServiceTotal = Number((this.selectedService.sousTotal * (this.selectedService.fraisService / 100)).toFixed(2));
        if (!isNaN(this.selectedService.sousTotal) && !isNaN(this.selectedService.fraisServiceTotal)) {
            this.selectedService.total = Number((this.selectedService.sousTotal + this.selectedService.fraisServiceTotal).toFixed(2));
        }
        else {
            this.selectedService.total = 0;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ServiceListComponent.prototype, "services", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ServiceListComponent.prototype, "estNouveau", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ServiceListComponent.prototype, "compteurChanges", void 0);
    ServiceListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-service-list',
            templateUrl: 'service-list.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: ["\n        .header{\n            padding-left: 30px;\n        }\n    \n        .form-group{\n            float: left;\n        }\n\n        section{\n            clear: both;\n            float: left;\n        }\n    \n        .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n        h2{\n            color: #337ab7;\n        }\n    \n        .space{\n            margin: 0 1% 0 1%;\n        }\n    \n            td, th{\n            text-align: center;\n            font-size: 1vw;\n        }\n    \n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n    \n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n    \n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n    \n        .estSelectRange{\n                background-color: #519BDB;\n            }       \n    "
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ServiceListComponent);
    return ServiceListComponent;
}());
exports.ServiceListComponent = ServiceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NlcnZpY2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErRixlQUFlLENBQUMsQ0FBQTtBQUMvRyx3QkFBd0IsV0FBVyxDQUFDLENBQUE7QUEyRHBDO0lBUUk7UUFIQSxhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBSWpCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQVcsR0FBWCxVQUFZLE9BQVk7UUFDcEIsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcs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QyxJQUFJLENBQUEsQ0FBQztZQUNILElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBRUwsQ0FBQztJQTNGRDtRQUFDLFlBQUssRUFBRTs7MERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7aUVBQUE7SUE1RFo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxlQUFlLEVBQUMsOEJBQXVCLENBQUMsTUFBTTtZQUM5QyxNQUFNLEVBQUUsQ0FBRSxpOUJBaURUO2FBQ0E7U0FDSixDQUFDOzs0QkFBQTtJQThGRiwyQkFBQztBQUFELENBN0ZBLEFBNkZDLElBQUE7QUE3RlksNEJBQW9CLHVCQTZGaEMsQ0FBQSIsImZpbGUiOiJzZXJ2aWNlcy9zZXJ2aWNlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25DaGFuZ2VzLCBBZnRlclZpZXdDaGVja2VkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1zZXJ2aWNlLWxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdzZXJ2aWNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOkNoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgLmhlYWRlcntcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC5mb3JtLWdyb3Vwe1xyXG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlY3Rpb257XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAub3V0ZXJ7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAxJSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoMntcclxuICAgICAgICAgICAgY29sb3I6ICMzMzdhYjc7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLnNwYWNle1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgMSUgMCAxJTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgdGQsIHRoe1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMXZ3O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHRoZWFkID4gdHJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMjVlbSBzb2xpZCAjMTU2NWMwO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdGJvZHkgPiB0cntcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yZW0gc29saWQgI2RkZDtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC5lc3RTZWxlY3RSYW5nZXtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1MTlCREI7XHJcbiAgICAgICAgICAgIH0gICAgICAgXHJcbiAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdDaGVja2VkIHtcclxuICAgIEBJbnB1dCgpIHNlcnZpY2VzOiBTZXJ2aWNlW107XHJcbiAgICBASW5wdXQoKSBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgY29tcHRldXJDaGFuZ2VzOiBudW1iZXI7XHJcbiAgICBzZWxlY3RlZFNlcnZpY2U6IFNlcnZpY2U7XHJcbiAgICBpbmRleE5vbTogbnVtYmVyID0gMDtcclxuICAgIHRpdHJlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IFxyXG4gICAgICAgIHRoaXMudGl0cmUgPSBcIlNlcnZpY2VzXCI7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlID0gbmV3IFNlcnZpY2UoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllUGFyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS50b3RhbCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuYiBjaGFuZ2VzIHNlcnZpY2UgaW5pdCA6IFwiKTtcclxuICAgICAgICBpZih0aGlzLmNvbXB0ZXVyQ2hhbmdlcyA9PSAyKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpe1xyXG4gICAgICAgIGlmKGNoYW5nZXMuY29tcHRldXJDaGFuZ2VzICE9IG51bGwpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5iIGNoYW5nZXMgc2VydmljZXMgb25jaGFuZ2VzIDogXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbXB0ZXVyQ2hhbmdlcyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29tcHRldXJDaGFuZ2VzID4gMil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZSA9IHRoaXMuc2VydmljZXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCl7XHJcbiAgICAgICAgLy9tb2RpZmllciBsYSBkYXRlIGV0IG1vZGlmacOpIHBhciBzZXVsZW1lbnQgbG9yc3F1J29uIGVzdCBlbiBtb2RlIGVkaXRpb24uXHJcbiAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLm1vZGlmaWUgPSB0aGlzLmdldERhdGVNb2RpZigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllUGFyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc2VydmljZXMgPT0gbnVsbCB8fCB0aGlzLnNlcnZpY2VzLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UubW9kaWZpZVBhciA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsY3VsU2VydmljZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBham91dGVTZXJ2aWNlKCl7XHJcbiAgICAgICAgdmFyIG5vdXZlYXVTZXJ2aWNlOiBTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuaW5kZXhOb20gKz0gMTtcclxuICAgICAgICBub3V2ZWF1U2VydmljZSA9IG5ldyBTZXJ2aWNlKCk7XHJcbiAgICAgICAgbm91dmVhdVNlcnZpY2Uubm9tID0gXCJOb3V2ZWF1XCIgKyB0aGlzLmluZGV4Tm9tO1xyXG4gICAgICAgIG5vdXZlYXVTZXJ2aWNlLnRlbXBzID0gdGhpcy5nZXREYXRlQWN0dWVsbGUoKTtcclxuICAgICAgICB0aGlzLnNlcnZpY2VzLnB1c2gobm91dmVhdVNlcnZpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cHByaW1lU2VydmljZSgpe1xyXG4gICAgICAgIHRoaXMuc2VydmljZXMuc3BsaWNlKHRoaXMuc2VydmljZXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkU2VydmljZSksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFNlcnZpY2Uoc2VydmljZTogU2VydmljZSl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UgPSBzZXJ2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVBY3R1ZWxsZSgpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICB2YXIgeXl5eSA9IGRhdGUuc3Vic3RyaW5nKDYsMTApO1xyXG4gICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgICByZXR1cm4gKHl5eXkgKyBcIi1cIiArIG1tICsgXCItXCIgKyBkZCk7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRlTW9kaWYoKXtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgICB2YXIgeXl5eSA9IGRhdGUuc3Vic3RyaW5nKDYsMTApO1xyXG4gICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgICB2YXIgaGggPSBkYXRlLnN1YnN0cmluZygxMiwxNCk7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMTUsMTcpO1xyXG4gICAgICAgIHZhciBzcyA9IGRhdGUuc3Vic3RyaW5nKDE4LDIwKTtcclxuICAgICAgICByZXR1cm4gKHl5eXkgKyBcIi1cIiArIG1tICsgXCItXCIgKyBkZCArIFwiIFwiICsgaGggKyBcIjpcIiArIG1tICsgXCI6XCIgKyBzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsU2VydmljZXMoKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5zb3VzVG90YWwgPSBOdW1iZXIoKCh0aGlzLnNlbGVjdGVkU2VydmljZS5xdWFudGl0ZSAqIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnByaXhVbml0YWlyZSkgKiAoMS0gKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmVzY29tcHRlLzEwMCkpKS50b0ZpeGVkKDIpKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5mcmFpc1NlcnZpY2VUb3RhbCA9IE51bWJlcigodGhpcy5zZWxlY3RlZFNlcnZpY2Uuc291c1RvdGFsICogKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmZyYWlzU2VydmljZS8xMDApKS50b0ZpeGVkKDIpKTtcclxuICAgICAgICBpZighaXNOYU4odGhpcy5zZWxlY3RlZFNlcnZpY2Uuc291c1RvdGFsKSAmJiAhaXNOYU4odGhpcy5zZWxlY3RlZFNlcnZpY2UuZnJhaXNTZXJ2aWNlVG90YWwpKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UudG90YWwgPSBOdW1iZXIoKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnNvdXNUb3RhbCArIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmZyYWlzU2VydmljZVRvdGFsKS50b0ZpeGVkKDIpKTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnRvdGFsID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9ICBcclxufSJdfQ==

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
        this.selectedService.total = Number((this.selectedService.sousTotal + this.selectedService.fraisServiceTotal).toFixed(2));
    }
    ServiceListComponent.prototype.ngOnInit = function () {
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
        this.selectedService.total = Number((this.selectedService.sousTotal + this.selectedService.fraisServiceTotal).toFixed(2));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ServiceListComponent.prototype, "services", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ServiceListComponent.prototype, "estNouveau", void 0);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NlcnZpY2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFvRixlQUFlLENBQUMsQ0FBQTtBQUNwRyx3QkFBd0IsV0FBVyxDQUFDLENBQUE7QUEyRHBDO0lBT0k7UUFIQSxhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBSWpCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUgsQ0FBQztJQUVELHVDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsaURBQWtCLEdBQWxCO1FBQ0ksMEVBQTBFO1FBQzFFLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUNELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FB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QUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckssSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkksSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlILENBQUM7SUF2RUQ7UUFBQyxZQUFLLEVBQUU7OzBEQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBM0RaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsZUFBZSxFQUFDLDhCQUF1QixDQUFDLE1BQU07WUFDOUMsTUFBTSxFQUFFLENBQUUsaTlCQWlEVDthQUNBO1NBQ0osQ0FBQzs7NEJBQUE7SUEwRUYsMkJBQUM7QUFBRCxDQXpFQSxBQXlFQyxJQUFBO0FBekVZLDRCQUFvQix1QkF5RWhDLENBQUEiLCJmaWxlIjoic2VydmljZXMvc2VydmljZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEFmdGVyVmlld0NoZWNrZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LXNlcnZpY2UtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3NlcnZpY2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAuaGVhZGVye1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLmZvcm0tZ3JvdXB7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VjdGlvbntcclxuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC5vdXRlcntcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgcGFkZGluZzogMCAwIDElIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGgye1xyXG4gICAgICAgICAgICBjb2xvcjogIzMzN2FiNztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAuc3BhY2V7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAxJSAwIDElO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICB0ZCwgdGh7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxdnc7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdGhlYWQgPiB0cntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yNWVtIHNvbGlkICMxNTY1YzA7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdGJvZHkgPiB0cjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5ZDRmOTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0Ym9keSA+IHRye1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLmVzdFNlbGVjdFJhbmdle1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUxOUJEQjtcclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgIGBcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkIHtcclxuICAgIEBJbnB1dCgpIHNlcnZpY2VzOiBTZXJ2aWNlW107XHJcbiAgICBASW5wdXQoKSBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgc2VsZWN0ZWRTZXJ2aWNlOiBTZXJ2aWNlO1xyXG4gICAgaW5kZXhOb206IG51bWJlciA9IDA7XHJcbiAgICB0aXRyZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuICAgICAgICB0aGlzLnRpdHJlID0gXCJTZXJ2aWNlc1wiO1xyXG4gICAgICAgIHRoaXMuc2VydmljZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZSA9IG5ldyBTZXJ2aWNlKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UubW9kaWZpZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UubW9kaWZpZVBhciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UudG90YWwgPSBOdW1iZXIoKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnNvdXNUb3RhbCArIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmZyYWlzU2VydmljZVRvdGFsKS50b0ZpeGVkKDIpKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKXtcclxuICAgICAgICAvL21vZGlmaWVyIGxhIGRhdGUgZXQgbW9kaWZpw6kgcGFyIHNldWxlbWVudCBsb3JzcXUnb24gZXN0IGVuIG1vZGUgZWRpdGlvbi5cclxuICAgICAgICBpZighdGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UubW9kaWZpZSA9IHRoaXMuZ2V0RGF0ZU1vZGlmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLm1vZGlmaWVQYXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zZXJ2aWNlcyA9PSBudWxsIHx8IHRoaXMuc2VydmljZXMubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLm1vZGlmaWUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllUGFyID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxjdWxTZXJ2aWNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGFqb3V0ZVNlcnZpY2UoKXtcclxuICAgICAgICB2YXIgbm91dmVhdVNlcnZpY2U6IFNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5pbmRleE5vbSArPSAxO1xyXG4gICAgICAgIG5vdXZlYXVTZXJ2aWNlID0gbmV3IFNlcnZpY2UoKTtcclxuICAgICAgICBub3V2ZWF1U2VydmljZS5ub20gPSBcIk5vdXZlYXVcIiArIHRoaXMuaW5kZXhOb207XHJcbiAgICAgICAgbm91dmVhdVNlcnZpY2UudGVtcHMgPSB0aGlzLmdldERhdGVBY3R1ZWxsZSgpO1xyXG4gICAgICAgIHRoaXMuc2VydmljZXMucHVzaChub3V2ZWF1U2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcHJpbWVTZXJ2aWNlKCl7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcy5zcGxpY2UodGhpcy5zZXJ2aWNlcy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0U2VydmljZShzZXJ2aWNlOiBTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZSA9IHNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZUFjdHVlbGxlKCl7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkKTsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVNb2RpZigpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygxNSwxNyk7XHJcbiAgICAgICAgdmFyIHNzID0gZGF0ZS5zdWJzdHJpbmcoMTgsMjApO1xyXG4gICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkICsgXCIgXCIgKyBoaCArIFwiOlwiICsgbW0gKyBcIjpcIiArIHNzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxTZXJ2aWNlcygpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnNvdXNUb3RhbCA9IE51bWJlcigoKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnF1YW50aXRlICogdGhpcy5zZWxlY3RlZFNlcnZpY2UucHJpeFVuaXRhaXJlKSAqICgxLSAodGhpcy5zZWxlY3RlZFNlcnZpY2UuZXNjb21wdGUvMTAwKSkpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmZyYWlzU2VydmljZVRvdGFsID0gTnVtYmVyKCh0aGlzLnNlbGVjdGVkU2VydmljZS5zb3VzVG90YWwgKiAodGhpcy5zZWxlY3RlZFNlcnZpY2UuZnJhaXNTZXJ2aWNlLzEwMCkpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnRvdGFsID0gTnVtYmVyKCh0aGlzLnNlbGVjdGVkU2VydmljZS5zb3VzVG90YWwgKyB0aGlzLnNlbGVjdGVkU2VydmljZS5mcmFpc1NlcnZpY2VUb3RhbCkudG9GaXhlZCgyKSk7XHJcbiAgICB9ICBcclxufSJdfQ==

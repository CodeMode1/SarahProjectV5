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
        this.recalcTrigger = new core_1.EventEmitter();
        this.enableSave = new core_1.EventEmitter();
        this.indexNom = 0;
        this.titre = "Services";
        this.services = [];
        this.selectedService = new service_1.Service();
        this.selectedService.modifie = "";
        this.selectedService.modifiePar = "";
        this.selectedService.total = 0;
    }
    ServiceListComponent.prototype.ngOnChanges = function () {
        if (this.services[0] != null && this.services[0] != undefined) {
            this.selectedService = this.services[0];
        }
    };
    /* Réagir au changement usager, cet evenement est applique sur tous les inputs du form.
        selon la syntax: (ngModelChange)="onUserChange($event)" */
    ServiceListComponent.prototype.onUserChange = function ($event) {
        console.log("ACT-onUserChange: " + $event);
        // Enable Enregistrer bouton.
        this.enableSave.emit(true);
        // Tag Activites avec le user et le timestamp du changement.
        if (!this.estNouveau) {
            this.selectedService.modifie = this.getDateModif();
            this.selectedService.modifiePar = localStorage.getItem('userName');
        }
    };
    // Change event sur tous les inputs qui affectent le total.
    ServiceListComponent.prototype.onCalcChange = function ($event) {
        this.calculServices();
        this.onUserChange($event);
        // Fire event emitter pour trigger la recalculation dans Activite parent.
        this.recalcTrigger.emit(true);
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ServiceListComponent.prototype, "recalcTrigger", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ServiceListComponent.prototype, "enableSave", void 0);
    ServiceListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-service-list',
            templateUrl: 'service-list.component.html',
            styles: ["\n        .header{\n            padding-left: 30px;\n        }\n    \n        .form-group{\n            float: left;\n        }\n\n        section{\n            clear: both;\n            float: left;\n        }\n    \n        .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n        h2{\n            color: #337ab7;\n        }\n    \n        .space{\n            margin: 0 1% 0 1%;\n        }\n    \n            td, th{\n            text-align: center;\n            font-size: 1vw;\n        }\n    \n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n    \n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n    \n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n    \n        .estSelectRange{\n                background-color: #519BDB;\n            }       \n    "
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ServiceListComponent);
    return ServiceListComponent;
}());
exports.ServiceListComponent = ServiceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NlcnZpY2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrRSxlQUFlLENBQUMsQ0FBQTtBQUNsRix3QkFBd0IsV0FBVyxDQUFDLENBQUE7QUEwRHBDO0lBVUk7UUFOVSxrQkFBYSxHQUEwQixJQUFJLG1CQUFZLEVBQVcsQ0FBQztRQUNuRSxlQUFVLEdBQTBCLElBQUksbUJBQVksRUFBVyxDQUFDO1FBRTFFLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFJakIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztZQUMxRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNMLENBQUM7SUFFQTtrRUFDOEQ7SUFDOUQsMkNBQVksR0FBWixVQUFhLE1BQU07UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRTNDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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QUFFOzs0REFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOztpRUFBQTtJQUNSO1FBQUMsYUFBTSxFQUFFOzsrREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzs0REFBQTtJQTdEYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLE1BQU0sRUFBRSxDQUFFLGk5QkFpRFQ7YUFDQTtTQUNKLENBQUM7OzRCQUFBO0lBaUdGLDJCQUFDO0FBQUQsQ0FoR0EsQUFnR0MsSUFBQTtBQWhHWSw0QkFBb0IsdUJBZ0doQyxDQUFBIiwiZmlsZSI6InNlcnZpY2VzL3NlcnZpY2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1zZXJ2aWNlLWxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdzZXJ2aWNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAuaGVhZGVye1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLmZvcm0tZ3JvdXB7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VjdGlvbntcclxuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XHJcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC5vdXRlcntcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgcGFkZGluZzogMCAwIDElIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGgye1xyXG4gICAgICAgICAgICBjb2xvcjogIzMzN2FiNztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAuc3BhY2V7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAxJSAwIDElO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICB0ZCwgdGh7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxdnc7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdGhlYWQgPiB0cntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yNWVtIHNvbGlkICMxNTY1YzA7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdGJvZHkgPiB0cjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5ZDRmOTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0Ym9keSA+IHRye1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLmVzdFNlbGVjdFJhbmdle1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUxOUJEQjtcclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgIGBcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICAgIEBJbnB1dCgpIHNlcnZpY2VzOiBTZXJ2aWNlW107XHJcbiAgICBASW5wdXQoKSBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgY29tcHRldXJDaGFuZ2VzOiBudW1iZXI7XHJcbiAgICBAT3V0cHV0KCkgcmVjYWxjVHJpZ2dlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gICAgQE91dHB1dCgpIGVuYWJsZVNhdmU6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAgIHNlbGVjdGVkU2VydmljZTogU2VydmljZTtcclxuICAgIGluZGV4Tm9tOiBudW1iZXIgPSAwO1xyXG4gICAgdGl0cmU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgdGhpcy50aXRyZSA9IFwiU2VydmljZXNcIjtcclxuICAgICAgICB0aGlzLnNlcnZpY2VzID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UgPSBuZXcgU2VydmljZSgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLm1vZGlmaWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLm1vZGlmaWVQYXIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnRvdGFsID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcygpe1xyXG4gICAgICAgIGlmKHRoaXMuc2VydmljZXNbMF0gIT0gbnVsbCAmJiB0aGlzLnNlcnZpY2VzWzBdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlc1swXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8qIFLDqWFnaXIgYXUgY2hhbmdlbWVudCB1c2FnZXIsIGNldCBldmVuZW1lbnQgZXN0IGFwcGxpcXVlIHN1ciB0b3VzIGxlcyBpbnB1dHMgZHUgZm9ybS5cclxuICAgICAgICAgc2Vsb24gbGEgc3ludGF4OiAobmdNb2RlbENoYW5nZSk9XCJvblVzZXJDaGFuZ2UoJGV2ZW50KVwiICovXHJcbiAgICAgb25Vc2VyQ2hhbmdlKCRldmVudCl7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiQUNULW9uVXNlckNoYW5nZTogXCIgKyAkZXZlbnQpO1xyXG5cclxuICAgICAgICAgLy8gRW5hYmxlIEVucmVnaXN0cmVyIGJvdXRvbi5cclxuICAgICAgICAgdGhpcy5lbmFibGVTYXZlLmVtaXQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAvLyBUYWcgQWN0aXZpdGVzIGF2ZWMgbGUgdXNlciBldCBsZSB0aW1lc3RhbXAgZHUgY2hhbmdlbWVudC5cclxuICAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllID0gdGhpcy5nZXREYXRlTW9kaWYoKTtcclxuICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLm1vZGlmaWVQYXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKTtcclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgICAgLy8gQ2hhbmdlIGV2ZW50IHN1ciB0b3VzIGxlcyBpbnB1dHMgcXVpIGFmZmVjdGVudCBsZSB0b3RhbC5cclxuICAgICBvbkNhbGNDaGFuZ2UoJGV2ZW50KXtcclxuICAgICAgICAgdGhpcy5jYWxjdWxTZXJ2aWNlcygpO1xyXG5cclxuICAgICAgICAgdGhpcy5vblVzZXJDaGFuZ2UoJGV2ZW50KTtcclxuXHJcbiAgICAgICAgIC8vIEZpcmUgZXZlbnQgZW1pdHRlciBwb3VyIHRyaWdnZXIgbGEgcmVjYWxjdWxhdGlvbiBkYW5zIEFjdGl2aXRlIHBhcmVudC5cclxuICAgICAgICAgdGhpcy5yZWNhbGNUcmlnZ2VyLmVtaXQodHJ1ZSk7XHJcbiAgICAgfVxyXG5cclxuICAgIGFqb3V0ZVNlcnZpY2UoKXtcclxuICAgICAgICB2YXIgbm91dmVhdVNlcnZpY2U6IFNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5pbmRleE5vbSArPSAxO1xyXG4gICAgICAgIG5vdXZlYXVTZXJ2aWNlID0gbmV3IFNlcnZpY2UoKTtcclxuICAgICAgICBub3V2ZWF1U2VydmljZS5ub20gPSBcIk5vdXZlYXVcIiArIHRoaXMuaW5kZXhOb207XHJcbiAgICAgICAgbm91dmVhdVNlcnZpY2UudGVtcHMgPSB0aGlzLmdldERhdGVBY3R1ZWxsZSgpO1xyXG4gICAgICAgIHRoaXMuc2VydmljZXMucHVzaChub3V2ZWF1U2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcHJpbWVTZXJ2aWNlKCl7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcy5zcGxpY2UodGhpcy5zZXJ2aWNlcy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0U2VydmljZShzZXJ2aWNlOiBTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZSA9IHNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZUFjdHVlbGxlKCl7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkKTsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVNb2RpZigpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygxNSwxNyk7XHJcbiAgICAgICAgdmFyIHNzID0gZGF0ZS5zdWJzdHJpbmcoMTgsMjApO1xyXG4gICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkICsgXCIgXCIgKyBoaCArIFwiOlwiICsgbW0gKyBcIjpcIiArIHNzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxTZXJ2aWNlcygpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnNvdXNUb3RhbCA9IE51bWJlcigoKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnF1YW50aXRlICogdGhpcy5zZWxlY3RlZFNlcnZpY2UucHJpeFVuaXRhaXJlKSAqICgxLSAodGhpcy5zZWxlY3RlZFNlcnZpY2UuZXNjb21wdGUvMTAwKSkpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmZyYWlzU2VydmljZVRvdGFsID0gTnVtYmVyKCh0aGlzLnNlbGVjdGVkU2VydmljZS5zb3VzVG90YWwgKiAodGhpcy5zZWxlY3RlZFNlcnZpY2UuZnJhaXNTZXJ2aWNlLzEwMCkpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIGlmKCFpc05hTih0aGlzLnNlbGVjdGVkU2VydmljZS5zb3VzVG90YWwpICYmICFpc05hTih0aGlzLnNlbGVjdGVkU2VydmljZS5mcmFpc1NlcnZpY2VUb3RhbCkpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS50b3RhbCA9IE51bWJlcigodGhpcy5zZWxlY3RlZFNlcnZpY2Uuc291c1RvdGFsICsgdGhpcy5zZWxlY3RlZFNlcnZpY2UuZnJhaXNTZXJ2aWNlVG90YWwpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UudG90YWwgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0gIFxyXG59Il19

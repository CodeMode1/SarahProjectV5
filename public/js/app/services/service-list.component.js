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
        this.selectedService.modifie = null;
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
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6, 10);
        var MM = date.substring(3, 5);
        var dd = date.substring(0, 2);
        var hh = date.substring(12, 14);
        var mm = date.substring(15, 17);
        return (yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm);
    };
    ServiceListComponent.prototype.getDateModif = function () {
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6, 10);
        var MM = date.substring(3, 5);
        var dd = date.substring(0, 2);
        var hh = date.substring(12, 14);
        var mm = date.substring(15, 17);
        var ss = date.substring(18, 20);
        return (yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss);
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
            styles: ["\n        .header{\n            padding-left: 30px;\n        }\n    \n        .form-group{\n            float: left;\n        }\n\n        section{\n            clear: both;\n            float: left;\n        }\n    \n        .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n\n        h2{\n            color: #337ab7;\n        }\n    \n        .space{\n            margin: 0 1% 0 1%;\n        }\n    \n        td, th{\n            text-align: center;\n            font-size: 14px;\n        }\n    \n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n    \n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n    \n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n    \n        .estSelectRange{\n            background-color: #519BDB;\n        }       \n    "
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ServiceListComponent);
    return ServiceListComponent;
}());
exports.ServiceListComponent = ServiceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NlcnZpY2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrRSxlQUFlLENBQUMsQ0FBQTtBQUNsRix3QkFBd0IsV0FBVyxDQUFDLENBQUE7QUEyRHBDO0lBVUk7UUFOVSxrQkFBYSxHQUEwQixJQUFJLG1CQUFZLEVBQVcsQ0FBQztRQUNuRSxlQUFVLEdBQTBCLElBQUksbUJBQVksRUFBVyxDQUFDO1FBRTFFLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFJakIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztZQUMxRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNMLENBQUM7SUFFQTtrRUFDOEQ7SUFDOUQsMkNBQVksR0FBWixVQUFhLE1BQU07UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRTNDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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QUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5SCxDQUFDO1FBQUMsSUFBSSxDQUFBLENBQUM7WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztJQUVMLENBQUM7SUFoR0Q7UUFBQyxZQUFLLEVBQUU7OzBEQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7O2lFQUFBO0lBQ1I7UUFBQyxhQUFNLEVBQUU7OytEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OzREQUFBO0lBOURiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsTUFBTSxFQUFFLENBQUUsdzhCQWtEVDthQUNBO1NBQ0osQ0FBQzs7NEJBQUE7SUFtR0YsMkJBQUM7QUFBRCxDQWxHQSxBQWtHQyxJQUFBO0FBbEdZLDRCQUFvQix1QkFrR2hDLENBQUEiLCJmaWxlIjoic2VydmljZXMvc2VydmljZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LXNlcnZpY2UtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3NlcnZpY2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFsgYFxyXG4gICAgICAgIC5oZWFkZXJ7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMzBweDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAuZm9ybS1ncm91cHtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWN0aW9ue1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGgye1xyXG4gICAgICAgICAgICBjb2xvcjogIzMzN2FiNztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAuc3BhY2V7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAxJSAwIDElO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHRkLCB0aHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdGhlYWQgPiB0cntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yNWVtIHNvbGlkICMxNTY1YzA7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdGJvZHkgPiB0cjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5ZDRmOTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0Ym9keSA+IHRye1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLmVzdFNlbGVjdFJhbmdle1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgICBASW5wdXQoKSBzZXJ2aWNlczogU2VydmljZVtdO1xyXG4gICAgQElucHV0KCkgZXN0Tm91dmVhdTogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGNvbXB0ZXVyQ2hhbmdlczogbnVtYmVyO1xyXG4gICAgQE91dHB1dCgpIHJlY2FsY1RyaWdnZXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAgIEBPdXRwdXQoKSBlbmFibGVTYXZlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgICBzZWxlY3RlZFNlcnZpY2U6IFNlcnZpY2U7XHJcbiAgICBpbmRleE5vbTogbnVtYmVyID0gMDtcclxuICAgIHRpdHJlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IFxyXG4gICAgICAgIHRoaXMudGl0cmUgPSBcIlNlcnZpY2VzXCI7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlID0gbmV3IFNlcnZpY2UoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllUGFyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS50b3RhbCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoKXtcclxuICAgICAgICBpZih0aGlzLnNlcnZpY2VzWzBdICE9IG51bGwgJiYgdGhpcy5zZXJ2aWNlc1swXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZSA9IHRoaXMuc2VydmljZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAvKiBSw6lhZ2lyIGF1IGNoYW5nZW1lbnQgdXNhZ2VyLCBjZXQgZXZlbmVtZW50IGVzdCBhcHBsaXF1ZSBzdXIgdG91cyBsZXMgaW5wdXRzIGR1IGZvcm0uXHJcbiAgICAgICAgIHNlbG9uIGxhIHN5bnRheDogKG5nTW9kZWxDaGFuZ2UpPVwib25Vc2VyQ2hhbmdlKCRldmVudClcIiAqL1xyXG4gICAgIG9uVXNlckNoYW5nZSgkZXZlbnQpe1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIkFDVC1vblVzZXJDaGFuZ2U6IFwiICsgJGV2ZW50KTtcclxuXHJcbiAgICAgICAgIC8vIEVuYWJsZSBFbnJlZ2lzdHJlciBib3V0b24uXHJcbiAgICAgICAgIHRoaXMuZW5hYmxlU2F2ZS5lbWl0KHRydWUpO1xyXG5cclxuICAgICAgICAgLy8gVGFnIEFjdGl2aXRlcyBhdmVjIGxlIHVzZXIgZXQgbGUgdGltZXN0YW1wIGR1IGNoYW5nZW1lbnQuXHJcbiAgICAgICAgIGlmKCF0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UubW9kaWZpZSA9IHRoaXMuZ2V0RGF0ZU1vZGlmKCk7XHJcbiAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllUGFyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgIC8vIENoYW5nZSBldmVudCBzdXIgdG91cyBsZXMgaW5wdXRzIHF1aSBhZmZlY3RlbnQgbGUgdG90YWwuXHJcbiAgICAgb25DYWxjQ2hhbmdlKCRldmVudCl7XHJcbiAgICAgICAgIHRoaXMuY2FsY3VsU2VydmljZXMoKTtcclxuXHJcbiAgICAgICAgIHRoaXMub25Vc2VyQ2hhbmdlKCRldmVudCk7XHJcblxyXG4gICAgICAgICAvLyBGaXJlIGV2ZW50IGVtaXR0ZXIgcG91ciB0cmlnZ2VyIGxhIHJlY2FsY3VsYXRpb24gZGFucyBBY3Rpdml0ZSBwYXJlbnQuXHJcbiAgICAgICAgIHRoaXMucmVjYWxjVHJpZ2dlci5lbWl0KHRydWUpO1xyXG4gICAgIH1cclxuXHJcbiAgICBham91dGVTZXJ2aWNlKCl7XHJcbiAgICAgICAgdmFyIG5vdXZlYXVTZXJ2aWNlOiBTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuaW5kZXhOb20gKz0gMTtcclxuICAgICAgICBub3V2ZWF1U2VydmljZSA9IG5ldyBTZXJ2aWNlKCk7XHJcbiAgICAgICAgbm91dmVhdVNlcnZpY2Uubm9tID0gXCJOb3V2ZWF1XCIgKyB0aGlzLmluZGV4Tm9tO1xyXG4gICAgICAgIG5vdXZlYXVTZXJ2aWNlLnRlbXBzID0gdGhpcy5nZXREYXRlQWN0dWVsbGUoKTtcclxuICAgICAgICB0aGlzLnNlcnZpY2VzLnB1c2gobm91dmVhdVNlcnZpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cHByaW1lU2VydmljZSgpe1xyXG4gICAgICAgIHRoaXMuc2VydmljZXMuc3BsaWNlKHRoaXMuc2VydmljZXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkU2VydmljZSksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFNlcnZpY2Uoc2VydmljZTogU2VydmljZSl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UgPSBzZXJ2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVBY3R1ZWxsZSgpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICAgdmFyIE1NID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygxNSwxNyk7XHJcbiAgICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBNTSArIFwiLVwiICsgZGQgKyBcIlRcIiArIGhoICsgXCI6XCIgKyBtbSk7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRlTW9kaWYoKXtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgICB2YXIgeXl5eSA9IGRhdGUuc3Vic3RyaW5nKDYsMTApO1xyXG4gICAgICAgIHZhciBNTSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgICB2YXIgaGggPSBkYXRlLnN1YnN0cmluZygxMiwxNCk7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMTUsMTcpO1xyXG4gICAgICAgIHZhciBzcyA9IGRhdGUuc3Vic3RyaW5nKDE4LDIwKTtcclxuICAgICAgICByZXR1cm4gKHl5eXkgKyBcIi1cIiArIE1NICsgXCItXCIgKyBkZCArIFwiIFwiICsgaGggKyBcIjpcIiArIG1tICsgXCI6XCIgKyBzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsU2VydmljZXMoKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5zb3VzVG90YWwgPSBOdW1iZXIoKCh0aGlzLnNlbGVjdGVkU2VydmljZS5xdWFudGl0ZSAqIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnByaXhVbml0YWlyZSkgKiAoMS0gKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmVzY29tcHRlLzEwMCkpKS50b0ZpeGVkKDIpKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5mcmFpc1NlcnZpY2VUb3RhbCA9IE51bWJlcigodGhpcy5zZWxlY3RlZFNlcnZpY2Uuc291c1RvdGFsICogKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmZyYWlzU2VydmljZS8xMDApKS50b0ZpeGVkKDIpKTtcclxuICAgICAgICBpZighaXNOYU4odGhpcy5zZWxlY3RlZFNlcnZpY2Uuc291c1RvdGFsKSAmJiAhaXNOYU4odGhpcy5zZWxlY3RlZFNlcnZpY2UuZnJhaXNTZXJ2aWNlVG90YWwpKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UudG90YWwgPSBOdW1iZXIoKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnNvdXNUb3RhbCArIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmZyYWlzU2VydmljZVRvdGFsKS50b0ZpeGVkKDIpKTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnRvdGFsID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9ICBcclxufSJdfQ==

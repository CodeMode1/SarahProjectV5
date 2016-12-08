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
            styles: ["\n        .header{\n            padding-left: 30px;\n        }\n    \n        .form-group{\n            float: left;\n        }\n\n        section{\n            clear: both;\n            float: left;\n        }\n    \n        .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n        h2{\n            color: #337ab7;\n        }\n    \n        .space{\n            margin: 0 1% 0 1%;\n        }\n    \n            td, th{\n            text-align: center;\n            font-size: 1vw;\n        }\n    \n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n    \n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n    \n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n    \n        .estSelectRange{\n                background-color: #519BDB;\n            }       \n    "
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ServiceListComponent);
    return ServiceListComponent;
}());
exports.ServiceListComponent = ServiceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NlcnZpY2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrRSxlQUFlLENBQUMsQ0FBQTtBQUNsRix3QkFBd0IsV0FBVyxDQUFDLENBQUE7QUEwRHBDO0lBVUk7UUFOVSxrQkFBYSxHQUEwQixJQUFJLG1CQUFZLEVBQVcsQ0FBQztRQUNuRSxlQUFVLEdBQTBCLElBQUksbUJBQVksRUFBVyxDQUFDO1FBRTFFLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFJakIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztZQUMxRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNMLENBQUM7SUFFQTtrRUFDOEQ7SUFDOUQsMkNBQVksR0FBWixVQUFhLE1BQU07UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRTNDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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QUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5SCxDQUFDO1FBQUMsSUFBSSxDQUFBLENBQUM7WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztJQUVMLENBQUM7SUFoR0Q7UUFBQyxZQUFLLEVBQUU7OzBEQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7O2lFQUFBO0lBQ1I7UUFBQyxhQUFNLEVBQUU7OytEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OzREQUFBO0lBN0RiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsTUFBTSxFQUFFLENBQUUsaTlCQWlEVDthQUNBO1NBQ0osQ0FBQzs7NEJBQUE7SUFtR0YsMkJBQUM7QUFBRCxDQWxHQSxBQWtHQyxJQUFBO0FBbEdZLDRCQUFvQix1QkFrR2hDLENBQUEiLCJmaWxlIjoic2VydmljZXMvc2VydmljZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LXNlcnZpY2UtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3NlcnZpY2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFsgYFxyXG4gICAgICAgIC5oZWFkZXJ7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMzBweDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAuZm9ybS1ncm91cHtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWN0aW9ue1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMzM3YWI3O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC5zcGFjZXtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDElIDAgMSU7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIHRkLCB0aHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDF2dztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0Ym9keSA+IHRyOmhvdmVye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlkNGY5O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHRib2R5ID4gdHJ7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMmVtIHNvbGlkICNkZGQ7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICAgICB9ICAgICAgIFxyXG4gICAgYFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VydmljZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gICAgQElucHV0KCkgc2VydmljZXM6IFNlcnZpY2VbXTtcclxuICAgIEBJbnB1dCgpIGVzdE5vdXZlYXU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBjb21wdGV1ckNoYW5nZXM6IG51bWJlcjtcclxuICAgIEBPdXRwdXQoKSByZWNhbGNUcmlnZ2VyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgICBAT3V0cHV0KCkgZW5hYmxlU2F2ZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gICAgc2VsZWN0ZWRTZXJ2aWNlOiBTZXJ2aWNlO1xyXG4gICAgaW5kZXhOb206IG51bWJlciA9IDA7XHJcbiAgICB0aXRyZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuICAgICAgICB0aGlzLnRpdHJlID0gXCJTZXJ2aWNlc1wiO1xyXG4gICAgICAgIHRoaXMuc2VydmljZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZSA9IG5ldyBTZXJ2aWNlKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UubW9kaWZpZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UubW9kaWZpZVBhciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UudG90YWwgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKCl7XHJcbiAgICAgICAgaWYodGhpcy5zZXJ2aWNlc1swXSAhPSBudWxsICYmIHRoaXMuc2VydmljZXNbMF0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UgPSB0aGlzLnNlcnZpY2VzWzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgLyogUsOpYWdpciBhdSBjaGFuZ2VtZW50IHVzYWdlciwgY2V0IGV2ZW5lbWVudCBlc3QgYXBwbGlxdWUgc3VyIHRvdXMgbGVzIGlucHV0cyBkdSBmb3JtLlxyXG4gICAgICAgICBzZWxvbiBsYSBzeW50YXg6IChuZ01vZGVsQ2hhbmdlKT1cIm9uVXNlckNoYW5nZSgkZXZlbnQpXCIgKi9cclxuICAgICBvblVzZXJDaGFuZ2UoJGV2ZW50KXtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJBQ1Qtb25Vc2VyQ2hhbmdlOiBcIiArICRldmVudCk7XHJcblxyXG4gICAgICAgICAvLyBFbmFibGUgRW5yZWdpc3RyZXIgYm91dG9uLlxyXG4gICAgICAgICB0aGlzLmVuYWJsZVNhdmUuZW1pdCh0cnVlKTtcclxuXHJcbiAgICAgICAgIC8vIFRhZyBBY3Rpdml0ZXMgYXZlYyBsZSB1c2VyIGV0IGxlIHRpbWVzdGFtcCBkdSBjaGFuZ2VtZW50LlxyXG4gICAgICAgICBpZighdGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLm1vZGlmaWUgPSB0aGlzLmdldERhdGVNb2RpZigpO1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UubW9kaWZpZVBhciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyTmFtZScpO1xyXG4gICAgICAgICB9XHJcbiAgICAgfVxyXG5cclxuICAgICAvLyBDaGFuZ2UgZXZlbnQgc3VyIHRvdXMgbGVzIGlucHV0cyBxdWkgYWZmZWN0ZW50IGxlIHRvdGFsLlxyXG4gICAgIG9uQ2FsY0NoYW5nZSgkZXZlbnQpe1xyXG4gICAgICAgICB0aGlzLmNhbGN1bFNlcnZpY2VzKCk7XHJcblxyXG4gICAgICAgICB0aGlzLm9uVXNlckNoYW5nZSgkZXZlbnQpO1xyXG5cclxuICAgICAgICAgLy8gRmlyZSBldmVudCBlbWl0dGVyIHBvdXIgdHJpZ2dlciBsYSByZWNhbGN1bGF0aW9uIGRhbnMgQWN0aXZpdGUgcGFyZW50LlxyXG4gICAgICAgICB0aGlzLnJlY2FsY1RyaWdnZXIuZW1pdCh0cnVlKTtcclxuICAgICB9XHJcblxyXG4gICAgYWpvdXRlU2VydmljZSgpe1xyXG4gICAgICAgIHZhciBub3V2ZWF1U2VydmljZTogU2VydmljZTtcclxuICAgICAgICB0aGlzLmluZGV4Tm9tICs9IDE7XHJcbiAgICAgICAgbm91dmVhdVNlcnZpY2UgPSBuZXcgU2VydmljZSgpO1xyXG4gICAgICAgIG5vdXZlYXVTZXJ2aWNlLm5vbSA9IFwiTm91dmVhdVwiICsgdGhpcy5pbmRleE5vbTtcclxuICAgICAgICBub3V2ZWF1U2VydmljZS50ZW1wcyA9IHRoaXMuZ2V0RGF0ZUFjdHVlbGxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcy5wdXNoKG5vdXZlYXVTZXJ2aWNlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdXBwcmltZVNlcnZpY2UoKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2VzLnNwbGljZSh0aGlzLnNlcnZpY2VzLmluZGV4T2YodGhpcy5zZWxlY3RlZFNlcnZpY2UpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RTZXJ2aWNlKHNlcnZpY2U6IFNlcnZpY2Upe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlID0gc2VydmljZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRlQWN0dWVsbGUoKXtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgICB2YXIgeXl5eSA9IGRhdGUuc3Vic3RyaW5nKDYsMTApO1xyXG4gICAgICAgIHZhciBNTSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgICB2YXIgaGggPSBkYXRlLnN1YnN0cmluZygxMiwxNCk7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMTUsMTcpO1xyXG4gICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgTU0gKyBcIi1cIiArIGRkICsgXCJUXCIgKyBoaCArIFwiOlwiICsgbW0pOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZU1vZGlmKCl7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIHl5eXkgPSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgICB2YXIgTU0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgIHZhciBkZCA9IGRhdGUuc3Vic3RyaW5nKDAsMik7XHJcbiAgICAgICAgdmFyIGhoID0gZGF0ZS5zdWJzdHJpbmcoMTIsMTQpO1xyXG4gICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDE1LDE3KTtcclxuICAgICAgICB2YXIgc3MgPSBkYXRlLnN1YnN0cmluZygxOCwyMCk7XHJcbiAgICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBNTSArIFwiLVwiICsgZGQgKyBcIiBcIiArIGhoICsgXCI6XCIgKyBtbSArIFwiOlwiICsgc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bFNlcnZpY2VzKCl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2Uuc291c1RvdGFsID0gTnVtYmVyKCgodGhpcy5zZWxlY3RlZFNlcnZpY2UucXVhbnRpdGUgKiB0aGlzLnNlbGVjdGVkU2VydmljZS5wcml4VW5pdGFpcmUpICogKDEtICh0aGlzLnNlbGVjdGVkU2VydmljZS5lc2NvbXB0ZS8xMDApKSkudG9GaXhlZCgyKSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UuZnJhaXNTZXJ2aWNlVG90YWwgPSBOdW1iZXIoKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnNvdXNUb3RhbCAqICh0aGlzLnNlbGVjdGVkU2VydmljZS5mcmFpc1NlcnZpY2UvMTAwKSkudG9GaXhlZCgyKSk7XHJcbiAgICAgICAgaWYoIWlzTmFOKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnNvdXNUb3RhbCkgJiYgIWlzTmFOKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmZyYWlzU2VydmljZVRvdGFsKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnRvdGFsID0gTnVtYmVyKCh0aGlzLnNlbGVjdGVkU2VydmljZS5zb3VzVG90YWwgKyB0aGlzLnNlbGVjdGVkU2VydmljZS5mcmFpc1NlcnZpY2VUb3RhbCkudG9GaXhlZCgyKSk7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS50b3RhbCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSAgXHJcbn0iXX0=

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
        this.indexNom = 0;
        this.titre = "Services";
        this.services = [];
        this.selectedService = new service_1.Service();
        this.selectedService.modifie = "";
        this.selectedService.modifiePar = "";
        this.selectedService.total = 0;
    }
    // React to user change, this event must be applied to all input fields of the form
    //     using this syntax: (ngModelChange)="onUserChange($event)"
    ServiceListComponent.prototype.onUserChange = function ($event) {
        console.log("ACT-onUserChange: " + $event);
        // Enable Enregistrer buttons.
        // TODO this.boutonChanges.emit(true);
        // Tag the Activite with the user and timestamp of the change.
        if (!this.estNouveau) {
            this.selectedService.modifie = this.getDateModif();
            this.selectedService.modifiePar = localStorage.getItem('userName');
        }
    };
    // Change event on all fields that affect to total.
    ServiceListComponent.prototype.onCalcChange = function ($event) {
        this.calculServices();
        this.onUserChange($event);
        // Fire event emitter to trigger recalculate in parent Activity.
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NlcnZpY2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF1RCxlQUFlLENBQUMsQ0FBQTtBQUN2RSx3QkFBd0IsV0FBVyxDQUFDLENBQUE7QUEwRHBDO0lBU0k7UUFMVSxrQkFBYSxHQUEwQixJQUFJLG1CQUFZLEVBQVcsQ0FBQztRQUU3RSxhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBSWpCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVBLG1GQUFtRjtJQUNuRixnRUFBZ0U7SUFDaEUsMkNBQVksR0FBWixVQUFhLE1BQU07UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRTNDLDhCQUE4QjtRQUM5QixzQ0FBc0M7UUFFdEMsOERBQThEO1FBQzlELEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkUsQ0FBQztJQUNMLENBQUM7SUFFRCxtREFBbUQ7SUFDbkQsMkNBQVksR0FBWixVQUFhLE1BQU07UUFDZixJQUFJLENBQUMs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OiJzZXJ2aWNlcy9zZXJ2aWNlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LXNlcnZpY2UtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3NlcnZpY2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFsgYFxyXG4gICAgICAgIC5oZWFkZXJ7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMzBweDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAuZm9ybS1ncm91cHtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWN0aW9ue1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMzM3YWI3O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC5zcGFjZXtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDElIDAgMSU7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIHRkLCB0aHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDF2dztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0Ym9keSA+IHRyOmhvdmVye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlkNGY5O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHRib2R5ID4gdHJ7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMmVtIHNvbGlkICNkZGQ7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICAgICB9ICAgICAgIFxyXG4gICAgYFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VydmljZUxpc3RDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgc2VydmljZXM6IFNlcnZpY2VbXTtcclxuICAgIEBJbnB1dCgpIGVzdE5vdXZlYXU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBjb21wdGV1ckNoYW5nZXM6IG51bWJlcjtcclxuICAgIEBPdXRwdXQoKSByZWNhbGNUcmlnZ2VyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgICBzZWxlY3RlZFNlcnZpY2U6IFNlcnZpY2U7XHJcbiAgICBpbmRleE5vbTogbnVtYmVyID0gMDtcclxuICAgIHRpdHJlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IFxyXG4gICAgICAgIHRoaXMudGl0cmUgPSBcIlNlcnZpY2VzXCI7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlID0gbmV3IFNlcnZpY2UoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS5tb2RpZmllUGFyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS50b3RhbCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgIC8vIFJlYWN0IHRvIHVzZXIgY2hhbmdlLCB0aGlzIGV2ZW50IG11c3QgYmUgYXBwbGllZCB0byBhbGwgaW5wdXQgZmllbGRzIG9mIHRoZSBmb3JtXHJcbiAgICAgLy8gICAgIHVzaW5nIHRoaXMgc3ludGF4OiAobmdNb2RlbENoYW5nZSk9XCJvblVzZXJDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgb25Vc2VyQ2hhbmdlKCRldmVudCl7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiQUNULW9uVXNlckNoYW5nZTogXCIgKyAkZXZlbnQpO1xyXG5cclxuICAgICAgICAgLy8gRW5hYmxlIEVucmVnaXN0cmVyIGJ1dHRvbnMuXHJcbiAgICAgICAgIC8vIFRPRE8gdGhpcy5ib3V0b25DaGFuZ2VzLmVtaXQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAvLyBUYWcgdGhlIEFjdGl2aXRlIHdpdGggdGhlIHVzZXIgYW5kIHRpbWVzdGFtcCBvZiB0aGUgY2hhbmdlLlxyXG4gICAgICAgICBpZighdGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLm1vZGlmaWUgPSB0aGlzLmdldERhdGVNb2RpZigpO1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UubW9kaWZpZVBhciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyTmFtZScpO1xyXG4gICAgICAgICB9XHJcbiAgICAgfVxyXG5cclxuICAgICAvLyBDaGFuZ2UgZXZlbnQgb24gYWxsIGZpZWxkcyB0aGF0IGFmZmVjdCB0byB0b3RhbC5cclxuICAgICBvbkNhbGNDaGFuZ2UoJGV2ZW50KXtcclxuICAgICAgICAgdGhpcy5jYWxjdWxTZXJ2aWNlcygpO1xyXG5cclxuICAgICAgICAgdGhpcy5vblVzZXJDaGFuZ2UoJGV2ZW50KTtcclxuXHJcbiAgICAgICAgIC8vIEZpcmUgZXZlbnQgZW1pdHRlciB0byB0cmlnZ2VyIHJlY2FsY3VsYXRlIGluIHBhcmVudCBBY3Rpdml0eS5cclxuICAgICAgICAgdGhpcy5yZWNhbGNUcmlnZ2VyLmVtaXQodHJ1ZSk7XHJcbiAgICAgfVxyXG5cclxuICAgIGFqb3V0ZVNlcnZpY2UoKXtcclxuICAgICAgICB2YXIgbm91dmVhdVNlcnZpY2U6IFNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5pbmRleE5vbSArPSAxO1xyXG4gICAgICAgIG5vdXZlYXVTZXJ2aWNlID0gbmV3IFNlcnZpY2UoKTtcclxuICAgICAgICBub3V2ZWF1U2VydmljZS5ub20gPSBcIk5vdXZlYXVcIiArIHRoaXMuaW5kZXhOb207XHJcbiAgICAgICAgbm91dmVhdVNlcnZpY2UudGVtcHMgPSB0aGlzLmdldERhdGVBY3R1ZWxsZSgpO1xyXG4gICAgICAgIHRoaXMuc2VydmljZXMucHVzaChub3V2ZWF1U2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcHJpbWVTZXJ2aWNlKCl7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcy5zcGxpY2UodGhpcy5zZXJ2aWNlcy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0U2VydmljZShzZXJ2aWNlOiBTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZSA9IHNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZUFjdHVlbGxlKCl7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkKTsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVNb2RpZigpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygxNSwxNyk7XHJcbiAgICAgICAgdmFyIHNzID0gZGF0ZS5zdWJzdHJpbmcoMTgsMjApO1xyXG4gICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkICsgXCIgXCIgKyBoaCArIFwiOlwiICsgbW0gKyBcIjpcIiArIHNzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxTZXJ2aWNlcygpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnNvdXNUb3RhbCA9IE51bWJlcigoKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLnF1YW50aXRlICogdGhpcy5zZWxlY3RlZFNlcnZpY2UucHJpeFVuaXRhaXJlKSAqICgxLSAodGhpcy5zZWxlY3RlZFNlcnZpY2UuZXNjb21wdGUvMTAwKSkpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmZyYWlzU2VydmljZVRvdGFsID0gTnVtYmVyKCh0aGlzLnNlbGVjdGVkU2VydmljZS5zb3VzVG90YWwgKiAodGhpcy5zZWxlY3RlZFNlcnZpY2UuZnJhaXNTZXJ2aWNlLzEwMCkpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIGlmKCFpc05hTih0aGlzLnNlbGVjdGVkU2VydmljZS5zb3VzVG90YWwpICYmICFpc05hTih0aGlzLnNlbGVjdGVkU2VydmljZS5mcmFpc1NlcnZpY2VUb3RhbCkpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZS50b3RhbCA9IE51bWJlcigodGhpcy5zZWxlY3RlZFNlcnZpY2Uuc291c1RvdGFsICsgdGhpcy5zZWxlY3RlZFNlcnZpY2UuZnJhaXNTZXJ2aWNlVG90YWwpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2UudG90YWwgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0gIFxyXG59Il19

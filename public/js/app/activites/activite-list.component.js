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
var activite_1 = require("./activite");
var ActiviteListComponent = (function () {
    function ActiviteListComponent() {
        this.boutonChanges = new core_1.EventEmitter();
        this.indexNom = 0;
        this.titre = "Activités";
        this.activites = [];
        this.selectedActivite = new activite_1.Activite();
        this.selectedActivite.modifie = null;
        this.selectedActivite.modifiePar = "";
        this.selectedActivite.serviceTotal = 0;
        this.selectedActivite.fraisServiceTotal = 0;
        this.ressources = [];
    }
    /* Select la 1er activite à chaque fois que le Input d'activite change.
       Le 1er OnChanges est execute avant le 1er OnInit.
            Est-ce que ça marche après actualiser ? : oui */
    ActiviteListComponent.prototype.ngOnChanges = function () {
        if (this.activites[0] != null && this.activites[0] != undefined) {
            this.selectActivite(this.activites[0]);
        }
    };
    ActiviteListComponent.prototype.ngOnInit = function () {
    };
    ActiviteListComponent.prototype.ressourceClick = function (inputRessource) {
        var indexRessource = this.selectedActivite.ressourcesCheck.indexOf(inputRessource.id);
        console.log(indexRessource);
        if (inputRessource.checked == true) {
            console.log("Mongo id ressource clicker : ");
            console.log(inputRessource.id);
            // Vérifier que la valeur nest pas deja dans le array.   
            if (indexRessource < 0) {
                this.selectedActivite.ressourcesCheck.push(inputRessource.id);
            }
        }
        else {
            console.log("not checked");
            if (indexRessource >= 0) {
                this.selectedActivite.ressourcesCheck.splice(indexRessource, 1);
            }
        }
        console.log("ressources pour l'act : " + this.selectedActivite.ressourcesCheck);
    };
    ActiviteListComponent.prototype.calculServiceTotal = function () {
        var total = 0;
        for (var i = 0; i < this.selectedActivite.services.length; i++) {
            if (!isNaN(this.selectedActivite.services[i].sousTotal)) {
                total += this.selectedActivite.services[i].sousTotal;
            }
        }
        return Number(total.toFixed(2));
    };
    ActiviteListComponent.prototype.calculFraisServiceTotal = function () {
        var total = 0;
        for (var i = 0; i < this.selectedActivite.services.length; i++) {
            if (!isNaN(this.selectedActivite.services[i].fraisServiceTotal)) {
                total += this.selectedActivite.services[i].fraisServiceTotal;
            }
        }
        return Number(total.toFixed(2));
    };
    ActiviteListComponent.prototype.setTotauxActivite = function ($event) {
        if (this.selectedActivite.services !== null || this.selectedActivite.services.length > 0) {
            this.selectedActivite.serviceTotal = this.calculServiceTotal();
            this.selectedActivite.fraisServiceTotal = this.calculFraisServiceTotal();
        }
    };
    /* Réagir au changement usager, cet evenement est applique sur tous les inputs du form.
        selon la syntax: (ngModelChange)="onUserChange($event)" */
    ActiviteListComponent.prototype.onUserChange = function ($event) {
        console.log("ACT-onUserChange: " + $event);
        // Enable Enregistrer bouton.
        this.boutonChanges.emit(true);
        // Tag Activites avec le user et le timestamp du changement.
        if (!this.estNouveau) {
            this.selectedActivite.modifie = this.getDateModif();
            this.selectedActivite.modifiePar = localStorage.getItem('userName');
        }
    };
    ActiviteListComponent.prototype.enableSave = function ($event) {
        //Activite emit au Evx le changement dans Service.
        this.boutonChanges.emit($event);
    };
    ActiviteListComponent.prototype.ajouteActivite = function () {
        var nouvelleActivite;
        this.indexNom += 1;
        nouvelleActivite = new activite_1.Activite();
        nouvelleActivite.nom = "Nouveau" + this.indexNom;
        nouvelleActivite.debut = this.getDateActuelle();
        nouvelleActivite.etat = "Soumission";
        this.activites.push(nouvelleActivite);
    };
    ActiviteListComponent.prototype.supprimeActivite = function () {
        // Supprime l'activité au index de l'activité sélectionnée.
        this.activites.splice(this.activites.indexOf(this.selectedActivite), 1);
    };
    ActiviteListComponent.prototype.selectActivite = function (activite) {
        this.selectedActivite = activite;
        console.log("selectActivite");
        for (var i = 0; i < this.ressources.length; i++) {
            var indexRessourceAssigne = this.selectedActivite.ressourcesCheck.indexOf(this.ressources[i].ressourceId);
            console.log("index resID: " + this.ressources[i].ressourceId + " --> " + indexRessourceAssigne);
            if (indexRessourceAssigne < 0) {
                this.ressources[i].checked = false;
            }
            else {
                this.ressources[i].checked = true;
            }
        }
        console.log(this.ressources);
    };
    ActiviteListComponent.prototype.getDateActuelle = function () {
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6, 10);
        var MM = date.substring(3, 5);
        var dd = date.substring(0, 2);
        var hh = date.substring(12, 14);
        var mm = date.substring(15, 17);
        console.log("format désirable : ");
        console.log(date);
        return (yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm);
    };
    ActiviteListComponent.prototype.getDateModif = function () {
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6, 10);
        var MM = date.substring(3, 5);
        var dd = date.substring(0, 2);
        var hh = date.substring(12, 14);
        var mm = date.substring(15, 17);
        var ss = date.substring(18, 20);
        return (yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss);
    };
    return ActiviteListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ActiviteListComponent.prototype, "activites", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ActiviteListComponent.prototype, "estNouveau", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ActiviteListComponent.prototype, "ressources", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ActiviteListComponent.prototype, "boutonChanges", void 0);
ActiviteListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-activite-list',
        templateUrl: 'activite-list.component.html',
        styles: ["\n        .header{\n            padding-left: 30px;\n        }\n\n        .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n        h2{\n            color: #337ab7;\n        }\n\n        .space{\n            margin: 0 1% 0 1%;\n        }\n\n         td, th{\n            text-align: center;\n            font-size: 14px;\n        }\n\n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n\n         .checkbox{\n             margin-bottom: 9%;\n         }\n\n        \n    "
        ]
    }),
    __metadata("design:paramtypes", [])
], ActiviteListComponent);
exports.ActiviteListComponent = ActiviteListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvYWN0aXZpdGVzL2FjdGl2aXRlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEY7QUFDMUYsdUNBQXNDO0FBNER0QyxJQUFhLHFCQUFxQjtJQVM5QjtRQUxVLGtCQUFhLEdBQTBCLElBQUksbUJBQVksRUFBVyxDQUFDO1FBRzdFLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHakIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs0REFFd0Q7SUFDeEQsMkNBQVcsR0FBWDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztZQUM1RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsOENBQWMsR0FBZCxVQUFlLGNBQWM7UUFDekIs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LEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0F2SkEsQUF1SkMsSUFBQTtBQXRKWTtJQUFSLFlBQUssRUFBRTs7d0RBQXVCO0FBQ3RCO0lBQVIsWUFBSyxFQUFFOzt5REFBcUI7QUFDcEI7SUFBUixZQUFLLEVBQUU7O3lEQUF5QjtBQUN2QjtJQUFULGFBQU0sRUFBRTs4QkFBZ0IsbUJBQVk7NERBQXdDO0FBSnBFLHFCQUFxQjtJQXJEakMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsTUFBTSxFQUFFLENBQUUsazJCQThDVDtTQUNBO0tBQ0osQ0FBQzs7R0FDVyxxQkFBcUIsQ0F1SmpDO0FBdkpZLHNEQUFxQiIsImZpbGUiOiJhY3Rpdml0ZXMvYWN0aXZpdGUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZpdGUgfSBmcm9tICcuL2FjdGl2aXRlJztcclxuaW1wb3J0IHsgT3JkZXJCeVBpcGUgfSBmcm9tICcuLi9waXBlcy9vcmRlckJ5LnBpcGUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SWCc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZSB9IGZyb20gJy4uL3Jlc3NvdXJjZXMvcmVzc291cmNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWFjdGl2aXRlLWxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdhY3Rpdml0ZS1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgLmhlYWRlcntcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMzM3YWI3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNwYWNle1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgMSUgMCAxJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICB0ZCwgdGh7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhlYWQgPiB0cntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yNWVtIHNvbGlkICMxNTY1YzA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRyOmhvdmVye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlkNGY5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGJvZHkgPiB0cntcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yZW0gc29saWQgI2RkZDtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmVzdFNlbGVjdFJhbmdle1xyXG4gICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUxOUJEQjtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLmNoZWNrYm94e1xyXG4gICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogOSU7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY3Rpdml0ZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBhY3Rpdml0ZXM6IEFjdGl2aXRlW107XHJcbiAgICBASW5wdXQoKSBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgcmVzc291cmNlczogUmVzc291cmNlW107XHJcbiAgICBAT3V0cHV0KCkgYm91dG9uQ2hhbmdlczogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gICAgdGl0cmU6IHN0cmluZzsgXHJcbiAgICBzZWxlY3RlZEFjdGl2aXRlOiBBY3Rpdml0ZTtcclxuICAgIGluZGV4Tm9tOiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgdGhpcy50aXRyZSA9IFwiQWN0aXZpdMOpc1wiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlID0gbmV3IEFjdGl2aXRlKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllUGFyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZVRvdGFsID0gMDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuZnJhaXNTZXJ2aWNlVG90YWwgPSAwO1xyXG4gICAgICAgIHRoaXMucmVzc291cmNlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFNlbGVjdCBsYSAxZXIgYWN0aXZpdGUgw6AgY2hhcXVlIGZvaXMgcXVlIGxlIElucHV0IGQnYWN0aXZpdGUgY2hhbmdlLlxyXG4gICAgICAgTGUgMWVyIE9uQ2hhbmdlcyBlc3QgZXhlY3V0ZSBhdmFudCBsZSAxZXIgT25Jbml0LlxyXG4gICAgICAgICAgICBFc3QtY2UgcXVlIMOnYSBtYXJjaGUgYXByw6hzIGFjdHVhbGlzZXIgPyA6IG91aSAqLyBcclxuICAgIG5nT25DaGFuZ2VzKCl7XHJcbiAgICAgICAgaWYodGhpcy5hY3Rpdml0ZXNbMF0gIT0gbnVsbCAmJiB0aGlzLmFjdGl2aXRlc1swXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFjdGl2aXRlKHRoaXMuYWN0aXZpdGVzWzBdKTtcclxuICAgICAgICB9ICBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpe1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3NvdXJjZUNsaWNrKGlucHV0UmVzc291cmNlKXtcclxuICAgICAgICB2YXIgaW5kZXhSZXNzb3VyY2UgPSB0aGlzLnNlbGVjdGVkQWN0aXZpdGUucmVzc291cmNlc0NoZWNrLmluZGV4T2YoaW5wdXRSZXNzb3VyY2UuaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4UmVzc291cmNlKTtcclxuICAgICAgICBpZihpbnB1dFJlc3NvdXJjZS5jaGVja2VkID09IHRydWUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1vbmdvIGlkIHJlc3NvdXJjZSBjbGlja2VyIDogXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dFJlc3NvdXJjZS5pZCk7XHJcbiAgICAgICAgICAgIC8vIFbDqXJpZmllciBxdWUgbGEgdmFsZXVyIG5lc3QgcGFzIGRlamEgZGFucyBsZSBhcnJheS4gICBcclxuICAgICAgICAgICAgaWYoaW5kZXhSZXNzb3VyY2UgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5yZXNzb3VyY2VzQ2hlY2sucHVzaChpbnB1dFJlc3NvdXJjZS5pZCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBjaGVja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhSZXNzb3VyY2UgPj0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUucmVzc291cmNlc0NoZWNrLnNwbGljZShpbmRleFJlc3NvdXJjZSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2VzIHBvdXIgbCdhY3QgOiBcIiArIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5yZXNzb3VyY2VzQ2hlY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bFNlcnZpY2VUb3RhbCgpe1xyXG4gICAgICAgIHZhciB0b3RhbCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKCFpc05hTih0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uc291c1RvdGFsKSl7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCArPSB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uc291c1RvdGFsO1xyXG4gICAgICAgICAgICB9ICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcih0b3RhbC50b0ZpeGVkKDIpKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxGcmFpc1NlcnZpY2VUb3RhbCgpe1xyXG4gICAgICAgIHZhciB0b3RhbCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKCFpc05hTih0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uZnJhaXNTZXJ2aWNlVG90YWwpKXtcclxuICAgICAgICAgICAgdG90YWwgKz0gdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzW2ldLmZyYWlzU2VydmljZVRvdGFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIodG90YWwudG9GaXhlZCgyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG90YXV4QWN0aXZpdGUoJGV2ZW50KXtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXMgIT09IG51bGwgfHwgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZVRvdGFsID0gdGhpcy5jYWxjdWxTZXJ2aWNlVG90YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLmZyYWlzU2VydmljZVRvdGFsID0gdGhpcy5jYWxjdWxGcmFpc1NlcnZpY2VUb3RhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgLyogUsOpYWdpciBhdSBjaGFuZ2VtZW50IHVzYWdlciwgY2V0IGV2ZW5lbWVudCBlc3QgYXBwbGlxdWUgc3VyIHRvdXMgbGVzIGlucHV0cyBkdSBmb3JtLlxyXG4gICAgICAgICBzZWxvbiBsYSBzeW50YXg6IChuZ01vZGVsQ2hhbmdlKT1cIm9uVXNlckNoYW5nZSgkZXZlbnQpXCIgKi9cclxuICAgICBvblVzZXJDaGFuZ2UoJGV2ZW50KXtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJBQ1Qtb25Vc2VyQ2hhbmdlOiBcIiArICRldmVudCk7XHJcblxyXG4gICAgICAgICAvLyBFbmFibGUgRW5yZWdpc3RyZXIgYm91dG9uLlxyXG4gICAgICAgICB0aGlzLmJvdXRvbkNoYW5nZXMuZW1pdCh0cnVlKTtcclxuXHJcbiAgICAgICAgIC8vIFRhZyBBY3Rpdml0ZXMgYXZlYyBsZSB1c2VyIGV0IGxlIHRpbWVzdGFtcCBkdSBjaGFuZ2VtZW50LlxyXG4gICAgICAgICBpZighdGhpcy5lc3ROb3V2ZWF1KXtcclxuICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllID0gdGhpcy5nZXREYXRlTW9kaWYoKTtcclxuICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllUGFyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJOYW1lJyk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgIGVuYWJsZVNhdmUoJGV2ZW50KXtcclxuICAgICAgICAgLy9BY3Rpdml0ZSBlbWl0IGF1IEV2eCBsZSBjaGFuZ2VtZW50IGRhbnMgU2VydmljZS5cclxuICAgICAgICAgdGhpcy5ib3V0b25DaGFuZ2VzLmVtaXQoJGV2ZW50KTtcclxuICAgICB9XHJcblxyXG4gICAgYWpvdXRlQWN0aXZpdGUoKXtcclxuICAgICAgICB2YXIgbm91dmVsbGVBY3Rpdml0ZTogQWN0aXZpdGU7XHJcbiAgICAgICAgdGhpcy5pbmRleE5vbSArPSAxO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUgPSBuZXcgQWN0aXZpdGUoKTtcclxuICAgICAgICBub3V2ZWxsZUFjdGl2aXRlLm5vbSA9IFwiTm91dmVhdVwiICsgdGhpcy5pbmRleE5vbTtcclxuICAgICAgICBub3V2ZWxsZUFjdGl2aXRlLmRlYnV0ID0gdGhpcy5nZXREYXRlQWN0dWVsbGUoKTtcclxuICAgICAgICBub3V2ZWxsZUFjdGl2aXRlLmV0YXQgPSBcIlNvdW1pc3Npb25cIjtcclxuICAgICAgICB0aGlzLmFjdGl2aXRlcy5wdXNoKG5vdXZlbGxlQWN0aXZpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cHByaW1lQWN0aXZpdGUoKXtcclxuICAgICAgICAvLyBTdXBwcmltZSBsJ2FjdGl2aXTDqSBhdSBpbmRleCBkZSBsJ2FjdGl2aXTDqSBzw6lsZWN0aW9ubsOpZS5cclxuICAgICAgICB0aGlzLmFjdGl2aXRlcy5zcGxpY2UodGhpcy5hY3Rpdml0ZXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkQWN0aXZpdGUpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBY3Rpdml0ZShhY3Rpdml0ZTogQWN0aXZpdGUpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSA9IGFjdGl2aXRlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0QWN0aXZpdGVcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgdGhpcy5yZXNzb3VyY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIGluZGV4UmVzc291cmNlQXNzaWduZSA9IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5yZXNzb3VyY2VzQ2hlY2suaW5kZXhPZih0aGlzLnJlc3NvdXJjZXNbaV0ucmVzc291cmNlSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluZGV4IHJlc0lEOiBcIiArIHRoaXMucmVzc291cmNlc1tpXS5yZXNzb3VyY2VJZCArIFwiIC0tPiBcIiArIGluZGV4UmVzc291cmNlQXNzaWduZSk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4UmVzc291cmNlQXNzaWduZSA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzW2ldLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzc291cmNlc1tpXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVBY3R1ZWxsZSgpe1xyXG4gICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICB2YXIgeXl5eT0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgTU0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDE1LDE3KTtcclxuICAgICAgIGNvbnNvbGUubG9nKFwiZm9ybWF0IGTDqXNpcmFibGUgOiBcIik7XHJcbiAgICAgICBjb25zb2xlLmxvZyhkYXRlKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgTU0gKyBcIi1cIiArIGRkICsgXCJUXCIgKyBoaCArIFwiOlwiICsgbW0pOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZU1vZGlmKCl7XHJcbiAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgTU0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDE1LDE3KTtcclxuICAgICAgIHZhciBzcyA9IGRhdGUuc3Vic3RyaW5nKDE4LDIwKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgTU0gKyBcIi1cIiArIGRkICsgXCIgXCIgKyBoaCArIFwiOlwiICsgbW0gKyBcIjpcIiArIHNzKTtcclxuICAgIH0gICAgICBcclxufSJdfQ==

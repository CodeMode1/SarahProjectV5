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
var activite_1 = require('./activite');
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ActiviteListComponent.prototype, "activites", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ActiviteListComponent.prototype, "estNouveau", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ActiviteListComponent.prototype, "ressources", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ActiviteListComponent.prototype, "boutonChanges", void 0);
    ActiviteListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-activite-list',
            templateUrl: 'activite-list.component.html',
            styles: ["\n        .header{\n            padding-left: 30px;\n        }\n\n        .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n        h2{\n            color: #337ab7;\n        }\n\n        .space{\n            margin: 0 1% 0 1%;\n        }\n\n         td, th{\n            text-align: center;\n            font-size: 1vw;\n        }\n\n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n\n         .checkbox{\n             margin-bottom: 9%;\n         }\n\n        \n    "
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActiviteListComponent);
    return ActiviteListComponent;
}());
exports.ActiviteListComponent = ActiviteListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBFLGVBQWUsQ0FBQyxDQUFBO0FBQzFGLHlCQUF5QixZQUFZLENBQUMsQ0FBQTtBQTREdEM7SUFTSTtRQUxVLGtCQUFhLEdBQTBCLElBQUksbUJBQVksRUFBVyxDQUFDO1FBRzdFLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHakIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs0REFFd0Q7SUFDeEQsMkNBQVcsR0FBWDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztZQUM1RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsOENBQWMsR0FBZCxVQUFlLGNBQWM7UUFDekIsSUFBSSxjQUFjLEdBQUcs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LENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQXJKRDtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7Z0VBQUE7SUF6RGI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxNQUFNLEVBQUUsQ0FBRSxpMkJBOENUO2FBQ0E7U0FDSixDQUFDOzs2QkFBQTtJQXdKRiw0QkFBQztBQUFELENBdkpBLEFBdUpDLElBQUE7QUF2SlksNkJBQXFCLHdCQXVKakMsQ0FBQSIsImZpbGUiOiJhY3Rpdml0ZXMvYWN0aXZpdGUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZpdGUgfSBmcm9tICcuL2FjdGl2aXRlJztcclxuaW1wb3J0IHsgT3JkZXJCeVBpcGUgfSBmcm9tICcuLi9waXBlcy9vcmRlckJ5LnBpcGUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SWCc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZSB9IGZyb20gJy4uL3Jlc3NvdXJjZXMvcmVzc291cmNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWFjdGl2aXRlLWxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdhY3Rpdml0ZS1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgLmhlYWRlcntcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMzM3YWI3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNwYWNle1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgMSUgMCAxJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICB0ZCwgdGh7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxdnc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRye1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAuY2hlY2tib3h7XHJcbiAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA5JTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIGBcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGl2aXRlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIGFjdGl2aXRlczogQWN0aXZpdGVbXTtcclxuICAgIEBJbnB1dCgpIGVzdE5vdXZlYXU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSByZXNzb3VyY2VzOiBSZXNzb3VyY2VbXTtcclxuICAgIEBPdXRwdXQoKSBib3V0b25DaGFuZ2VzOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgICB0aXRyZTogc3RyaW5nOyBcclxuICAgIHNlbGVjdGVkQWN0aXZpdGU6IEFjdGl2aXRlO1xyXG4gICAgaW5kZXhOb206IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuICAgICAgICB0aGlzLnRpdHJlID0gXCJBY3Rpdml0w6lzXCI7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUgPSBuZXcgQWN0aXZpdGUoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUubW9kaWZpZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlVG90YWwgPSAwO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5mcmFpc1NlcnZpY2VUb3RhbCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2VsZWN0IGxhIDFlciBhY3Rpdml0ZSDDoCBjaGFxdWUgZm9pcyBxdWUgbGUgSW5wdXQgZCdhY3Rpdml0ZSBjaGFuZ2UuXHJcbiAgICAgICBMZSAxZXIgT25DaGFuZ2VzIGVzdCBleGVjdXRlIGF2YW50IGxlIDFlciBPbkluaXQuXHJcbiAgICAgICAgICAgIEVzdC1jZSBxdWUgw6dhIG1hcmNoZSBhcHLDqHMgYWN0dWFsaXNlciA/IDogb3VpICovIFxyXG4gICAgbmdPbkNoYW5nZXMoKXtcclxuICAgICAgICBpZih0aGlzLmFjdGl2aXRlc1swXSAhPSBudWxsICYmIHRoaXMuYWN0aXZpdGVzWzBdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QWN0aXZpdGUodGhpcy5hY3Rpdml0ZXNbMF0pO1xyXG4gICAgICAgIH0gIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzc291cmNlQ2xpY2soaW5wdXRSZXNzb3VyY2Upe1xyXG4gICAgICAgIHZhciBpbmRleFJlc3NvdXJjZSA9IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5yZXNzb3VyY2VzQ2hlY2suaW5kZXhPZihpbnB1dFJlc3NvdXJjZS5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXhSZXNzb3VyY2UpO1xyXG4gICAgICAgIGlmKGlucHV0UmVzc291cmNlLmNoZWNrZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTW9uZ28gaWQgcmVzc291cmNlIGNsaWNrZXIgOiBcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0UmVzc291cmNlLmlkKTtcclxuICAgICAgICAgICAgLy8gVsOpcmlmaWVyIHF1ZSBsYSB2YWxldXIgbmVzdCBwYXMgZGVqYSBkYW5zIGxlIGFycmF5LiAgIFxyXG4gICAgICAgICAgICBpZihpbmRleFJlc3NvdXJjZSA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnJlc3NvdXJjZXNDaGVjay5wdXNoKGlucHV0UmVzc291cmNlLmlkKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChpbmRleFJlc3NvdXJjZSA+PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5yZXNzb3VyY2VzQ2hlY2suc3BsaWNlKGluZGV4UmVzc291cmNlLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3NvdXJjZXMgcG91ciBsJ2FjdCA6IFwiICsgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnJlc3NvdXJjZXNDaGVjayk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsU2VydmljZVRvdGFsKCl7XHJcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoIWlzTmFOKHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlc1tpXS5zb3VzVG90YWwpKXtcclxuICAgICAgICAgICAgICAgIHRvdGFsICs9IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlc1tpXS5zb3VzVG90YWw7XHJcbiAgICAgICAgICAgIH0gICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTnVtYmVyKHRvdGFsLnRvRml4ZWQoMikpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bEZyYWlzU2VydmljZVRvdGFsKCl7XHJcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoIWlzTmFOKHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlc1tpXS5mcmFpc1NlcnZpY2VUb3RhbCkpe1xyXG4gICAgICAgICAgICB0b3RhbCArPSB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uZnJhaXNTZXJ2aWNlVG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcih0b3RhbC50b0ZpeGVkKDIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb3RhdXhBY3Rpdml0ZSgkZXZlbnQpe1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcyAhPT0gbnVsbCB8fCB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlVG90YWwgPSB0aGlzLmNhbGN1bFNlcnZpY2VUb3RhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuZnJhaXNTZXJ2aWNlVG90YWwgPSB0aGlzLmNhbGN1bEZyYWlzU2VydmljZVRvdGFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAvKiBSw6lhZ2lyIGF1IGNoYW5nZW1lbnQgdXNhZ2VyLCBjZXQgZXZlbmVtZW50IGVzdCBhcHBsaXF1ZSBzdXIgdG91cyBsZXMgaW5wdXRzIGR1IGZvcm0uXHJcbiAgICAgICAgIHNlbG9uIGxhIHN5bnRheDogKG5nTW9kZWxDaGFuZ2UpPVwib25Vc2VyQ2hhbmdlKCRldmVudClcIiAqL1xyXG4gICAgIG9uVXNlckNoYW5nZSgkZXZlbnQpe1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIkFDVC1vblVzZXJDaGFuZ2U6IFwiICsgJGV2ZW50KTtcclxuXHJcbiAgICAgICAgIC8vIEVuYWJsZSBFbnJlZ2lzdHJlciBib3V0b24uXHJcbiAgICAgICAgIHRoaXMuYm91dG9uQ2hhbmdlcy5lbWl0KHRydWUpO1xyXG5cclxuICAgICAgICAgLy8gVGFnIEFjdGl2aXRlcyBhdmVjIGxlIHVzZXIgZXQgbGUgdGltZXN0YW1wIGR1IGNoYW5nZW1lbnQuXHJcbiAgICAgICAgIGlmKCF0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWUgPSB0aGlzLmdldERhdGVNb2RpZigpO1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKTtcclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgICAgZW5hYmxlU2F2ZSgkZXZlbnQpe1xyXG4gICAgICAgICAvL0FjdGl2aXRlIGVtaXQgYXUgRXZ4IGxlIGNoYW5nZW1lbnQgZGFucyBTZXJ2aWNlLlxyXG4gICAgICAgICB0aGlzLmJvdXRvbkNoYW5nZXMuZW1pdCgkZXZlbnQpO1xyXG4gICAgIH1cclxuXHJcbiAgICBham91dGVBY3Rpdml0ZSgpe1xyXG4gICAgICAgIHZhciBub3V2ZWxsZUFjdGl2aXRlOiBBY3Rpdml0ZTtcclxuICAgICAgICB0aGlzLmluZGV4Tm9tICs9IDE7XHJcbiAgICAgICAgbm91dmVsbGVBY3Rpdml0ZSA9IG5ldyBBY3Rpdml0ZSgpO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUubm9tID0gXCJOb3V2ZWF1XCIgKyB0aGlzLmluZGV4Tm9tO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZGVidXQgPSB0aGlzLmdldERhdGVBY3R1ZWxsZSgpO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZXRhdCA9IFwiU291bWlzc2lvblwiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzLnB1c2gobm91dmVsbGVBY3Rpdml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcHJpbWVBY3Rpdml0ZSgpe1xyXG4gICAgICAgIC8vIFN1cHByaW1lIGwnYWN0aXZpdMOpIGF1IGluZGV4IGRlIGwnYWN0aXZpdMOpIHPDqWxlY3Rpb25uw6llLlxyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzLnNwbGljZSh0aGlzLmFjdGl2aXRlcy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEFjdGl2aXRlKGFjdGl2aXRlOiBBY3Rpdml0ZSl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlID0gYWN0aXZpdGU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RBY3Rpdml0ZVwiKTtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCB0aGlzLnJlc3NvdXJjZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB2YXIgaW5kZXhSZXNzb3VyY2VBc3NpZ25lID0gdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnJlc3NvdXJjZXNDaGVjay5pbmRleE9mKHRoaXMucmVzc291cmNlc1tpXS5yZXNzb3VyY2VJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5kZXggcmVzSUQ6IFwiICsgdGhpcy5yZXNzb3VyY2VzW2ldLnJlc3NvdXJjZUlkICsgXCIgLS0+IFwiICsgaW5kZXhSZXNzb3VyY2VBc3NpZ25lKTtcclxuICAgICAgICAgICAgaWYoaW5kZXhSZXNzb3VyY2VBc3NpZ25lIDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXNbaV0uY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzW2ldLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzc291cmNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZUFjdHVlbGxlKCl7XHJcbiAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5PSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgIHZhciBNTSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgdmFyIGhoID0gZGF0ZS5zdWJzdHJpbmcoMTIsMTQpO1xyXG4gICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMTUsMTcpO1xyXG4gICAgICAgY29uc29sZS5sb2coXCJmb3JtYXQgZMOpc2lyYWJsZSA6IFwiKTtcclxuICAgICAgIGNvbnNvbGUubG9nKGRhdGUpO1xyXG4gICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBNTSArIFwiLVwiICsgZGQgKyBcIlRcIiArIGhoICsgXCI6XCIgKyBtbSk7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRlTW9kaWYoKXtcclxuICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgdmFyIHl5eXkgPSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgIHZhciBNTSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgdmFyIGhoID0gZGF0ZS5zdWJzdHJpbmcoMTIsMTQpO1xyXG4gICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMTUsMTcpO1xyXG4gICAgICAgdmFyIHNzID0gZGF0ZS5zdWJzdHJpbmcoMTgsMjApO1xyXG4gICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBNTSArIFwiLVwiICsgZGQgKyBcIiBcIiArIGhoICsgXCI6XCIgKyBtbSArIFwiOlwiICsgc3MpO1xyXG4gICAgfSAgICAgIFxyXG59Il19

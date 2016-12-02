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
        this.selectedActivite.modifie = "";
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
            //this.selectedActivite = this.activites[0];
            this.selectActivite(this.activites[0]);
        }
    };
    ActiviteListComponent.prototype.ngOnInit = function () {
    };
    ActiviteListComponent.prototype.estClicke = function (inputRessource) {
        var indexRessource = this.selectedActivite.ressourcesCheck.indexOf(inputRessource.id);
        console.log(indexRessource);
        if (indexRessource < 0) {
            return false;
        }
        else {
            return true;
        }
    };
    ActiviteListComponent.prototype.ressourceClick = function (inputRessource) {
        var indexRessource = this.selectedActivite.ressourcesCheck.indexOf(inputRessource.id);
        console.log(indexRessource);
        if (inputRessource.checked == true) {
            console.log("Mongo id ressource clicker : ");
            console.log(inputRessource.id);
            //checker que la valeur nest pas deja dans le array  
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
        //Enable Enregistrer bouton.
        this.boutonChanges.emit(true);
        //Tag Activites avec le user et le timestamp du changement.
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
        //supprime le dernier activiter de la liste.
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
        // TODO force refresh de l'affichage !!
    };
    ActiviteListComponent.prototype.getDateActuelle = function () {
        var date = new Date().toLocaleDateString();
        var yyyy = date.substring(6, 10);
        var mm = date.substring(3, 5);
        var dd = date.substring(0, 2);
        return (yyyy + "-" + mm + "-" + dd);
    };
    ActiviteListComponent.prototype.getDateModif = function () {
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6, 10);
        var mm = date.substring(3, 5);
        var dd = date.substring(0, 2);
        var hh = date.substring(12, 14);
        var mm = date.substring(15, 17);
        var ss = date.substring(18, 20);
        return (yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mm + ":" + ss);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBFLGVBQWUsQ0FBQyxDQUFBO0FBQzFGLHlCQUF5QixZQUFZLENBQUMsQ0FBQTtBQTREdEM7SUFTSTtRQUxVLGtCQUFhLEdBQTBCLElBQUksbUJBQVksRUFBVyxDQUFDO1FBRzdFLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHakIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs0REFFd0Q7SUFDeEQsMkNBQVcsR0FBWDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztZQUM1RCw0Q0FBNEM7WUFDNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNMLENBQUM7SUFFRCx3Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHlDQUFTLEdBQVQsVUFBVSxjQUFjO1FBQ3BCLElB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LEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQTlKRDtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7Z0VBQUE7SUF6RGI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxNQUFNLEVBQUUsQ0FBRSxpMkJBOENUO2FBQ0E7U0FDSixDQUFDOzs2QkFBQTtJQWlLRiw0QkFBQztBQUFELENBaEtBLEFBZ0tDLElBQUE7QUFoS1ksNkJBQXFCLHdCQWdLakMsQ0FBQSIsImZpbGUiOiJhY3Rpdml0ZXMvYWN0aXZpdGUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZpdGUgfSBmcm9tICcuL2FjdGl2aXRlJztcclxuaW1wb3J0IHsgT3JkZXJCeVBpcGUgfSBmcm9tICcuLi9waXBlcy9vcmRlckJ5LnBpcGUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SWCc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZSB9IGZyb20gJy4uL3Jlc3NvdXJjZXMvcmVzc291cmNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWFjdGl2aXRlLWxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdhY3Rpdml0ZS1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgLmhlYWRlcntcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMzM3YWI3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNwYWNle1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgMSUgMCAxJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICB0ZCwgdGh7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxdnc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRye1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAuY2hlY2tib3h7XHJcbiAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA5JTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIGBcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGl2aXRlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIGFjdGl2aXRlczogQWN0aXZpdGVbXTtcclxuICAgIEBJbnB1dCgpIGVzdE5vdXZlYXU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSByZXNzb3VyY2VzOiBSZXNzb3VyY2VbXTtcclxuICAgIEBPdXRwdXQoKSBib3V0b25DaGFuZ2VzOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgICB0aXRyZTogc3RyaW5nOyBcclxuICAgIHNlbGVjdGVkQWN0aXZpdGU6IEFjdGl2aXRlO1xyXG4gICAgaW5kZXhOb206IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuICAgICAgICB0aGlzLnRpdHJlID0gXCJBY3Rpdml0w6lzXCI7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUgPSBuZXcgQWN0aXZpdGUoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUubW9kaWZpZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlVG90YWwgPSAwO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5mcmFpc1NlcnZpY2VUb3RhbCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2VsZWN0IGxhIDFlciBhY3Rpdml0ZSDDoCBjaGFxdWUgZm9pcyBxdWUgbGUgSW5wdXQgZCdhY3Rpdml0ZSBjaGFuZ2UuXHJcbiAgICAgICBMZSAxZXIgT25DaGFuZ2VzIGVzdCBleGVjdXRlIGF2YW50IGxlIDFlciBPbkluaXQuXHJcbiAgICAgICAgICAgIEVzdC1jZSBxdWUgw6dhIG1hcmNoZSBhcHLDqHMgYWN0dWFsaXNlciA/IDogb3VpICovIFxyXG4gICAgbmdPbkNoYW5nZXMoKXtcclxuICAgICAgICBpZih0aGlzLmFjdGl2aXRlc1swXSAhPSBudWxsICYmIHRoaXMuYWN0aXZpdGVzWzBdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZEFjdGl2aXRlID0gdGhpcy5hY3Rpdml0ZXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QWN0aXZpdGUodGhpcy5hY3Rpdml0ZXNbMF0pO1xyXG4gICAgICAgIH0gIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICB9XHJcblxyXG4gICAgZXN0Q2xpY2tlKGlucHV0UmVzc291cmNlKXtcclxuICAgICAgICB2YXIgaW5kZXhSZXNzb3VyY2UgPSB0aGlzLnNlbGVjdGVkQWN0aXZpdGUucmVzc291cmNlc0NoZWNrLmluZGV4T2YoaW5wdXRSZXNzb3VyY2UuaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4UmVzc291cmNlKTtcclxuICAgICAgICBpZihpbmRleFJlc3NvdXJjZSA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzc291cmNlQ2xpY2soaW5wdXRSZXNzb3VyY2Upe1xyXG4gICAgICAgIHZhciBpbmRleFJlc3NvdXJjZSA9IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5yZXNzb3VyY2VzQ2hlY2suaW5kZXhPZihpbnB1dFJlc3NvdXJjZS5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXhSZXNzb3VyY2UpO1xyXG4gICAgICAgIGlmKGlucHV0UmVzc291cmNlLmNoZWNrZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTW9uZ28gaWQgcmVzc291cmNlIGNsaWNrZXIgOiBcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0UmVzc291cmNlLmlkKTtcclxuICAgICAgICAgICAgLy9jaGVja2VyIHF1ZSBsYSB2YWxldXIgbmVzdCBwYXMgZGVqYSBkYW5zIGxlIGFycmF5ICBcclxuICAgICAgICAgICAgaWYoaW5kZXhSZXNzb3VyY2UgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5yZXNzb3VyY2VzQ2hlY2sucHVzaChpbnB1dFJlc3NvdXJjZS5pZCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBjaGVja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhSZXNzb3VyY2UgPj0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUucmVzc291cmNlc0NoZWNrLnNwbGljZShpbmRleFJlc3NvdXJjZSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2VzIHBvdXIgbCdhY3QgOiBcIiArIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5yZXNzb3VyY2VzQ2hlY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bFNlcnZpY2VUb3RhbCgpe1xyXG4gICAgICAgIHZhciB0b3RhbCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKCFpc05hTih0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uc291c1RvdGFsKSl7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCArPSB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uc291c1RvdGFsO1xyXG4gICAgICAgICAgICB9ICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcih0b3RhbC50b0ZpeGVkKDIpKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxGcmFpc1NlcnZpY2VUb3RhbCgpe1xyXG4gICAgICAgIHZhciB0b3RhbCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKCFpc05hTih0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uZnJhaXNTZXJ2aWNlVG90YWwpKXtcclxuICAgICAgICAgICAgdG90YWwgKz0gdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzW2ldLmZyYWlzU2VydmljZVRvdGFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIodG90YWwudG9GaXhlZCgyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG90YXV4QWN0aXZpdGUoJGV2ZW50KXtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXMgIT09IG51bGwgfHwgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZVRvdGFsID0gdGhpcy5jYWxjdWxTZXJ2aWNlVG90YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLmZyYWlzU2VydmljZVRvdGFsID0gdGhpcy5jYWxjdWxGcmFpc1NlcnZpY2VUb3RhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgIC8qIFLDqWFnaXIgYXUgY2hhbmdlbWVudCB1c2FnZXIsIGNldCBldmVuZW1lbnQgZXN0IGFwcGxpcXVlIHN1ciB0b3VzIGxlcyBpbnB1dHMgZHUgZm9ybS5cclxuICAgICAgICAgc2Vsb24gbGEgc3ludGF4OiAobmdNb2RlbENoYW5nZSk9XCJvblVzZXJDaGFuZ2UoJGV2ZW50KVwiICovXHJcbiAgICAgb25Vc2VyQ2hhbmdlKCRldmVudCl7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiQUNULW9uVXNlckNoYW5nZTogXCIgKyAkZXZlbnQpO1xyXG5cclxuICAgICAgICAgLy9FbmFibGUgRW5yZWdpc3RyZXIgYm91dG9uLlxyXG4gICAgICAgICB0aGlzLmJvdXRvbkNoYW5nZXMuZW1pdCh0cnVlKTtcclxuXHJcbiAgICAgICAgIC8vVGFnIEFjdGl2aXRlcyBhdmVjIGxlIHVzZXIgZXQgbGUgdGltZXN0YW1wIGR1IGNoYW5nZW1lbnQuXHJcbiAgICAgICAgIGlmKCF0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWUgPSB0aGlzLmdldERhdGVNb2RpZigpO1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKTtcclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgICAgZW5hYmxlU2F2ZSgkZXZlbnQpe1xyXG4gICAgICAgICAvL0FjdGl2aXRlIGVtaXQgYXUgRXZ4IGxlIGNoYW5nZW1lbnQgZGFucyBTZXJ2aWNlLlxyXG4gICAgICAgICB0aGlzLmJvdXRvbkNoYW5nZXMuZW1pdCgkZXZlbnQpO1xyXG4gICAgIH1cclxuXHJcbiAgICBham91dGVBY3Rpdml0ZSgpe1xyXG4gICAgICAgIHZhciBub3V2ZWxsZUFjdGl2aXRlOiBBY3Rpdml0ZTtcclxuICAgICAgICB0aGlzLmluZGV4Tm9tICs9IDE7XHJcbiAgICAgICAgbm91dmVsbGVBY3Rpdml0ZSA9IG5ldyBBY3Rpdml0ZSgpO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUubm9tID0gXCJOb3V2ZWF1XCIgKyB0aGlzLmluZGV4Tm9tO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZGVidXQgPSB0aGlzLmdldERhdGVBY3R1ZWxsZSgpO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZXRhdCA9IFwiU291bWlzc2lvblwiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzLnB1c2gobm91dmVsbGVBY3Rpdml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcHJpbWVBY3Rpdml0ZSgpe1xyXG4gICAgICAgIC8vc3VwcHJpbWUgbGUgZGVybmllciBhY3Rpdml0ZXIgZGUgbGEgbGlzdGUuXHJcbiAgICAgICAgdGhpcy5hY3Rpdml0ZXMuc3BsaWNlKHRoaXMuYWN0aXZpdGVzLmluZGV4T2YodGhpcy5zZWxlY3RlZEFjdGl2aXRlKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0QWN0aXZpdGUoYWN0aXZpdGU6IEFjdGl2aXRlKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUgPSBhY3Rpdml0ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdEFjdGl2aXRlXCIpO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IHRoaXMucmVzc291cmNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHZhciBpbmRleFJlc3NvdXJjZUFzc2lnbmUgPSB0aGlzLnNlbGVjdGVkQWN0aXZpdGUucmVzc291cmNlc0NoZWNrLmluZGV4T2YodGhpcy5yZXNzb3VyY2VzW2ldLnJlc3NvdXJjZUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbmRleCByZXNJRDogXCIgKyB0aGlzLnJlc3NvdXJjZXNbaV0ucmVzc291cmNlSWQgKyBcIiAtLT4gXCIgKyBpbmRleFJlc3NvdXJjZUFzc2lnbmUpO1xyXG4gICAgICAgICAgICBpZihpbmRleFJlc3NvdXJjZUFzc2lnbmUgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzc291cmNlc1tpXS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXNbaV0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXNzb3VyY2VzKTtcclxuICAgICAgICAvLyBUT0RPIGZvcmNlIHJlZnJlc2ggZGUgbCdhZmZpY2hhZ2UgISFcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRlQWN0dWVsbGUoKXtcclxuICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkKTsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVNb2RpZigpe1xyXG4gICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICB2YXIgeXl5eSA9IGRhdGUuc3Vic3RyaW5nKDYsMTApO1xyXG4gICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgIHZhciBkZCA9IGRhdGUuc3Vic3RyaW5nKDAsMik7XHJcbiAgICAgICB2YXIgaGggPSBkYXRlLnN1YnN0cmluZygxMiwxNCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygxNSwxNyk7XHJcbiAgICAgICB2YXIgc3MgPSBkYXRlLnN1YnN0cmluZygxOCwyMCk7XHJcbiAgICAgICByZXR1cm4gKHl5eXkgKyBcIi1cIiArIG1tICsgXCItXCIgKyBkZCArIFwiIFwiICsgaGggKyBcIjpcIiArIG1tICsgXCI6XCIgKyBzcyk7XHJcbiAgICB9ICAgICAgXHJcbn0iXX0=

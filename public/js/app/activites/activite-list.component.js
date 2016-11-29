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
        this.indexNom = 0;
        this.titre = "Activités";
        this.activites = [];
        this.selectedActivite = new activite_1.Activite();
        this.selectedActivite.modifie = "";
        this.selectedActivite.modifiePar = "";
        this.selectedActivite.serviceTotal = 0;
        this.selectedActivite.fraisServiceTotal = 0;
    }
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
    ActiviteListComponent.prototype.setTotauxActivite = function () {
        this.selectedActivite.serviceTotal = this.calculServiceTotal();
        this.selectedActivite.fraisServiceTotal = this.calculFraisServiceTotal();
    };
    ActiviteListComponent.prototype.ngOnInit = function () {
        //this.selectedActivite.nom = this.activites[0].nom;
    };
    ActiviteListComponent.prototype.ngAfterViewChecked = function () {
        //modifier la date et modifié par seulement lorsqu'on est en mode edition.
        if (!this.estNouveau && this.selectedActivite.modifiePar != "") {
            this.selectedActivite.modifie = this.getDateModif();
            this.selectedActivite.modifiePar = localStorage.getItem('userName');
        }
        if (this.selectedActivite.services !== null || this.selectedActivite.services.length > 0) {
            this.setTotauxActivite();
        }
    };
    ActiviteListComponent.prototype.ajouteActivite = function () {
        var nouvelleActivite;
        this.indexNom += 1;
        nouvelleActivite = new activite_1.Activite();
        nouvelleActivite.nom = "Nouveau" + this.indexNom;
        //this.nouvelleActivite.debut = new Date().toLocaleString().substring(0,10);
        nouvelleActivite.debut = this.getDateActuelle();
        nouvelleActivite.etat = "Soumission";
        this.activites.push(nouvelleActivite);
    };
    ActiviteListComponent.prototype.supprimeActivite = function () {
        // supprime le dernier activiter de la liste
        //this.activites.pop();
        this.activites.splice(this.activites.indexOf(this.selectedActivite), 1);
    };
    ActiviteListComponent.prototype.selectActivite = function (activite) {
        this.selectedActivite = activite;
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
    ActiviteListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-activite-list',
            templateUrl: 'activite-list.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: ["\n        .header{\n            padding-left: 30px;\n        }\n\n        .outer{\n            float:left;\n            clear:both;\n            padding: 0 0 1% 0;\n        }\n        h2{\n            color: #337ab7;\n        }\n\n        .space{\n            margin: 0 1% 0 1%;\n        }\n\n         td, th{\n            text-align: center;\n            font-size: 1vw;\n        }\n\n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n\n         .checkbox{\n             margin-bottom: 9%;\n         }\n\n        \n    "
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActiviteListComponent);
    return ActiviteListComponent;
}());
exports.ActiviteListComponent = ActiviteListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQW9GLGVBQWUsQ0FBQyxDQUFBO0FBQ3BHLHlCQUF5QixZQUFZLENBQUMsQ0FBQTtBQXlEdEM7SUFPSTtRQUZBLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHakIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFFaEQsQ0FBQztJQUVELGtEQUFrQixHQUFsQjtRQUNJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUMzRCxFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDcEQsS0FBSyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3pELENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1B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eEUsQ0FBQztJQS9GRDtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUF4RFo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxlQUFlLEVBQUMsOEJBQXVCLENBQUMsTUFBTTtZQUM5QyxNQUFNLEVBQUUsQ0FBRSxpMkJBOENUO2FBQ0E7U0FDSixDQUFDOzs2QkFBQTtJQWtHRiw0QkFBQztBQUFELENBakdBLEFBaUdDLElBQUE7QUFqR1ksNkJBQXFCLHdCQWlHakMsQ0FBQSIsImZpbGUiOiJhY3Rpdml0ZXMvYWN0aXZpdGUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBBZnRlclZpZXdDaGVja2VkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2aXRlIH0gZnJvbSAnLi9hY3Rpdml0ZSc7XHJcbmltcG9ydCB7IE9yZGVyQnlQaXBlIH0gZnJvbSAnLi4vcGlwZXMvb3JkZXJCeS5waXBlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktYWN0aXZpdGUtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2FjdGl2aXRlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOkNoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgLmhlYWRlcntcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLm91dGVye1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMSUgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMzM3YWI3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNwYWNle1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgMSUgMCAxJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICB0ZCwgdGh7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxdnc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRye1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAuY2hlY2tib3h7XHJcbiAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA5JTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIGBcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGl2aXRlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XHJcbiAgICBASW5wdXQoKSBhY3Rpdml0ZXM6IEFjdGl2aXRlW107XHJcbiAgICBASW5wdXQoKSBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgdGl0cmU6IHN0cmluZzsgXHJcbiAgICBzZWxlY3RlZEFjdGl2aXRlOiBBY3Rpdml0ZTtcclxuICAgIGluZGV4Tm9tOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuICAgICAgICB0aGlzLnRpdHJlID0gXCJBY3Rpdml0w6lzXCI7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUgPSBuZXcgQWN0aXZpdGUoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUubW9kaWZpZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlVG90YWwgPSAwO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5mcmFpc1NlcnZpY2VUb3RhbCA9IDA7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bFNlcnZpY2VUb3RhbCgpe1xyXG4gICAgICAgIHZhciB0b3RhbCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKCFpc05hTih0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uc291c1RvdGFsKSl7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCArPSB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uc291c1RvdGFsO1xyXG4gICAgICAgICAgICB9ICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcih0b3RhbC50b0ZpeGVkKDIpKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxGcmFpc1NlcnZpY2VUb3RhbCgpe1xyXG4gICAgICAgIHZhciB0b3RhbCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKCFpc05hTih0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uZnJhaXNTZXJ2aWNlVG90YWwpKXtcclxuICAgICAgICAgICAgdG90YWwgKz0gdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzW2ldLmZyYWlzU2VydmljZVRvdGFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIodG90YWwudG9GaXhlZCgyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG90YXV4QWN0aXZpdGUoKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZVRvdGFsID0gdGhpcy5jYWxjdWxTZXJ2aWNlVG90YWwoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuZnJhaXNTZXJ2aWNlVG90YWwgPSB0aGlzLmNhbGN1bEZyYWlzU2VydmljZVRvdGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy90aGlzLnNlbGVjdGVkQWN0aXZpdGUubm9tID0gdGhpcy5hY3Rpdml0ZXNbMF0ubm9tO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpe1xyXG4gICAgICAgIC8vbW9kaWZpZXIgbGEgZGF0ZSBldCBtb2RpZmnDqSBwYXIgc2V1bGVtZW50IGxvcnNxdSdvbiBlc3QgZW4gbW9kZSBlZGl0aW9uLlxyXG4gICAgICAgIGlmKCF0aGlzLmVzdE5vdXZlYXUgJiYgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllID0gdGhpcy5nZXREYXRlTW9kaWYoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzICE9PSBudWxsIHx8IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRUb3RhdXhBY3Rpdml0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0gIFxyXG5cclxuICAgIGFqb3V0ZUFjdGl2aXRlKCl7XHJcbiAgICAgICAgdmFyIG5vdXZlbGxlQWN0aXZpdGU6IEFjdGl2aXRlO1xyXG4gICAgICAgIHRoaXMuaW5kZXhOb20gKz0gMTtcclxuICAgICAgICBub3V2ZWxsZUFjdGl2aXRlID0gbmV3IEFjdGl2aXRlKCk7XHJcbiAgICAgICAgbm91dmVsbGVBY3Rpdml0ZS5ub20gPSBcIk5vdXZlYXVcIiArIHRoaXMuaW5kZXhOb207XHJcbiAgICAgICAgLy90aGlzLm5vdXZlbGxlQWN0aXZpdGUuZGVidXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCkuc3Vic3RyaW5nKDAsMTApO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZGVidXQgPSB0aGlzLmdldERhdGVBY3R1ZWxsZSgpO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZXRhdCA9IFwiU291bWlzc2lvblwiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzLnB1c2gobm91dmVsbGVBY3Rpdml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcHJpbWVBY3Rpdml0ZSgpe1xyXG4gICAgICAgIC8vIHN1cHByaW1lIGxlIGRlcm5pZXIgYWN0aXZpdGVyIGRlIGxhIGxpc3RlXHJcbiAgICAgICAgLy90aGlzLmFjdGl2aXRlcy5wb3AoKTtcclxuICAgICAgICB0aGlzLmFjdGl2aXRlcy5zcGxpY2UodGhpcy5hY3Rpdml0ZXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkQWN0aXZpdGUpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBY3Rpdml0ZShhY3Rpdml0ZTogQWN0aXZpdGUpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSA9IGFjdGl2aXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVBY3R1ZWxsZSgpe1xyXG4gICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgdmFyIHl5eXkgPSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBtbSArIFwiLVwiICsgZGQpOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZU1vZGlmKCl7XHJcbiAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDE1LDE3KTtcclxuICAgICAgIHZhciBzcyA9IGRhdGUuc3Vic3RyaW5nKDE4LDIwKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkICsgXCIgXCIgKyBoaCArIFwiOlwiICsgbW0gKyBcIjpcIiArIHNzKTtcclxuICAgIH0gICAgICBcclxufSJdfQ==

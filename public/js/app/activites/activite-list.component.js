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
    }
    ActiviteListComponent.prototype.ngOnInit = function () {
    };
    ActiviteListComponent.prototype.ngAfterViewChecked = function () {
        //modifier la date et modifié par seulement lorsqu'on est en mode edition.
        if (!this.estNouveau) {
            this.selectedActivite.modifie = this.getDateModif();
            this.selectedActivite.modifiePar = localStorage.getItem('userName');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQW9GLGVBQWUsQ0FBQyxDQUFBO0FBQ3BHLHlCQUF5QixZQUFZLENBQUMsQ0FBQTtBQXlEdEM7SUFPSTtRQUZBLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHakIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCx3Q0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELGtEQUFrQixHQUFsQjtRQUNJLDBFQUEwRTtRQUMxRSxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RSxDQUFDO0lBQ0wsQ0FBQztJQUVELDhDQUFjLEdBQWQ7UUFDSSxJQUFJLGdCQUEwQixDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQ25CLGdCQUFnQixHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ2xDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqRCw0RUFBNEU7UUFDNUUsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNoRCxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELGdEQUFnQixHQUFoQjtRQUNJLDRDQUE0QztRQUM1Qyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxRQUFrQjtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQ0csSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsNENBQVksR0FBWjtRQUNHLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFoRUQ7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7OzZEQUFBO0lBeERaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsZUFBZSxFQUFDLDhCQUF1QixDQUFDLE1BQU07WUFDOUMsTUFBTSxFQUFFLENBQUUsaTJCQThDVDthQUNBO1NBQ0osQ0FBQzs7NkJBQUE7SUFtRUYsNEJBQUM7QUFBRCxDQWxFQSxBQWtFQyxJQUFBO0FBbEVZLDZCQUFxQix3QkFrRWpDLENBQUEiLCJmaWxlIjoiYWN0aXZpdGVzL2FjdGl2aXRlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQWZ0ZXJWaWV3Q2hlY2tlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3Rpdml0ZSB9IGZyb20gJy4vYWN0aXZpdGUnO1xyXG5pbXBvcnQgeyBPcmRlckJ5UGlwZSB9IGZyb20gJy4uL3BpcGVzL29yZGVyQnkucGlwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWFjdGl2aXRlLWxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdhY3Rpdml0ZS1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIGNoYW5nZURldGVjdGlvbjpDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBzdHlsZXM6IFsgYFxyXG4gICAgICAgIC5oZWFkZXJ7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMzBweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5vdXRlcntcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgcGFkZGluZzogMCAwIDElIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGgye1xyXG4gICAgICAgICAgICBjb2xvcjogIzMzN2FiNztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zcGFjZXtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDElIDAgMSU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgdGQsIHRoe1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMXZ3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhlYWQgPiB0cntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yNWVtIHNvbGlkICMxNTY1YzA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRyOmhvdmVye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlkNGY5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGJvZHkgPiB0cntcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yZW0gc29saWQgI2RkZDtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmVzdFNlbGVjdFJhbmdle1xyXG4gICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUxOUJEQjtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLmNoZWNrYm94e1xyXG4gICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogOSU7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY3Rpdml0ZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQge1xyXG4gICAgQElucHV0KCkgYWN0aXZpdGVzOiBBY3Rpdml0ZVtdO1xyXG4gICAgQElucHV0KCkgZXN0Tm91dmVhdTogYm9vbGVhbjtcclxuICAgIHRpdHJlOiBzdHJpbmc7IFxyXG4gICAgc2VsZWN0ZWRBY3Rpdml0ZTogQWN0aXZpdGU7XHJcbiAgICBpbmRleE5vbTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgdGhpcy50aXRyZSA9IFwiQWN0aXZpdMOpc1wiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlID0gbmV3IEFjdGl2aXRlKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllUGFyID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCl7XHJcbiAgICAgICAgLy9tb2RpZmllciBsYSBkYXRlIGV0IG1vZGlmacOpIHBhciBzZXVsZW1lbnQgbG9yc3F1J29uIGVzdCBlbiBtb2RlIGVkaXRpb24uXHJcbiAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllID0gdGhpcy5nZXREYXRlTW9kaWYoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9ICBcclxuXHJcbiAgICBham91dGVBY3Rpdml0ZSgpe1xyXG4gICAgICAgIHZhciBub3V2ZWxsZUFjdGl2aXRlOiBBY3Rpdml0ZTtcclxuICAgICAgICB0aGlzLmluZGV4Tm9tICs9IDE7XHJcbiAgICAgICAgbm91dmVsbGVBY3Rpdml0ZSA9IG5ldyBBY3Rpdml0ZSgpO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUubm9tID0gXCJOb3V2ZWF1XCIgKyB0aGlzLmluZGV4Tm9tO1xyXG4gICAgICAgIC8vdGhpcy5ub3V2ZWxsZUFjdGl2aXRlLmRlYnV0ID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpLnN1YnN0cmluZygwLDEwKTtcclxuICAgICAgICBub3V2ZWxsZUFjdGl2aXRlLmRlYnV0ID0gdGhpcy5nZXREYXRlQWN0dWVsbGUoKTtcclxuICAgICAgICBub3V2ZWxsZUFjdGl2aXRlLmV0YXQgPSBcIlNvdW1pc3Npb25cIjtcclxuICAgICAgICB0aGlzLmFjdGl2aXRlcy5wdXNoKG5vdXZlbGxlQWN0aXZpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cHByaW1lQWN0aXZpdGUoKXtcclxuICAgICAgICAvLyBzdXBwcmltZSBsZSBkZXJuaWVyIGFjdGl2aXRlciBkZSBsYSBsaXN0ZVxyXG4gICAgICAgIC8vdGhpcy5hY3Rpdml0ZXMucG9wKCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0ZXMuc3BsaWNlKHRoaXMuYWN0aXZpdGVzLmluZGV4T2YodGhpcy5zZWxlY3RlZEFjdGl2aXRlKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0QWN0aXZpdGUoYWN0aXZpdGU6IEFjdGl2aXRlKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUgPSBhY3Rpdml0ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRlQWN0dWVsbGUoKXtcclxuICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkKTsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVNb2RpZigpe1xyXG4gICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICB2YXIgeXl5eSA9IGRhdGUuc3Vic3RyaW5nKDYsMTApO1xyXG4gICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgIHZhciBkZCA9IGRhdGUuc3Vic3RyaW5nKDAsMik7XHJcbiAgICAgICB2YXIgaGggPSBkYXRlLnN1YnN0cmluZygxMiwxNCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygxNSwxNyk7XHJcbiAgICAgICB2YXIgc3MgPSBkYXRlLnN1YnN0cmluZygxOCwyMCk7XHJcbiAgICAgICByZXR1cm4gKHl5eXkgKyBcIi1cIiArIG1tICsgXCItXCIgKyBkZCArIFwiIFwiICsgaGggKyBcIjpcIiArIG1tICsgXCI6XCIgKyBzcyk7XHJcbiAgICB9ICAgICAgXHJcbn0iXX0=

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
    //defaultActivite: Observable<Activite>;
    //subscription: Subscription;
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
    ActiviteListComponent.prototype.setTotauxActivite = function ($event) {
        if (this.selectedActivite.services !== null || this.selectedActivite.services.length > 0) {
            this.selectedActivite.serviceTotal = this.calculServiceTotal();
            this.selectedActivite.fraisServiceTotal = this.calculFraisServiceTotal();
        }
    };
    /* infos : service injection pour detect change :
        http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html
        https://angular.io/docs/js/latest/api/core/index/ChangeDetectorRef-class.html
    */
    // React to user change, this event must be applied to all input fields of the form
    //     using this syntax: (ngModelChange)="onUserChange($event)"
    ActiviteListComponent.prototype.onUserChange = function ($event) {
        console.log("ACT-onUserChange: " + $event);
        // Enable Enregistrer buttons.
        this.boutonChanges.emit(true);
        // Tag the Activite with the user and timestamp of the change.
        if (!this.estNouveau) {
            this.selectedActivite.modifie = this.getDateModif();
            this.selectedActivite.modifiePar = localStorage.getItem('userName');
        }
    };
    // TODO Select first activité after view displays. 
    //      Does it work after Actualiser?
    ActiviteListComponent.prototype.todoDelete = function (changes) {
        alert("ngOnChanges");
        this.selectedActivite = this.activites[0];
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXVELGVBQWUsQ0FBQyxDQUFBO0FBQ3ZFLHlCQUF5QixZQUFZLENBQUMsQ0FBQTtBQTBEdEM7SUFPSSx3Q0FBd0M7SUFDeEMsNkJBQTZCO0lBRTdCO1FBUFUsa0JBQWEsR0FBMEIsSUFBSSxtQkFBWSxFQUFXLENBQUM7UUFHN0UsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUtqQixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsa0RBQWtCLEdBQWxCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNwRCxLQUFLLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDekQsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsdURBQXVCLEdBQXZCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2hFLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQzdELENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELGlEQUFpQixHQUFqQixVQUFrQixNQUFNO1FBQ3BCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDckYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMvRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDN0UsQ0FBQztJQUNMLENBQUM7SUFFRDs7O01BR0U7SUFFRCxtRkFBbUY7SUFDbkYsZ0VBQWdFO0lBQ2hFLDRDQUFZLEdBQVosVUFBYSxNQUFNO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUUzQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUIsOERBQThEO1FBQzlELEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDTCxDQUFDO0lBRUQsbURBQW1EO0lBQ25ELHNDQUFzQztJQUN0QywwQ0FBVSxHQUFWLFVBQVcsT0FBWTtRQUNwQixLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVGLDhDQUFjLEdBQWQ7UUFDSSxJQUFJLGdCQUEwQixDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQ25CLGdCQUFnQixHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ2xDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqRCxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ2hELGdCQUFnQixDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCO1FBQ0ksNENBQTRDO1FBQzVDLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsOENBQWMsR0FBZCxVQUFlLFFBQWtCO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFDRyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw0Q0FBWSxHQUFaO1FBQ0csSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQTlHRDtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7Z0VBQUE7SUF4RGI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxNQUFNLEVBQUUsQ0FBRSxpMkJBOENUO2FBQ0E7U0FDSixDQUFDOzs2QkFBQTtJQWlIRiw0QkFBQztBQUFELENBaEhBLEFBZ0hDLElBQUE7QUFoSFksNkJBQXFCLHdCQWdIakMsQ0FBQSIsImZpbGUiOiJhY3Rpdml0ZXMvYWN0aXZpdGUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3Rpdml0ZSB9IGZyb20gJy4vYWN0aXZpdGUnO1xyXG5pbXBvcnQgeyBPcmRlckJ5UGlwZSB9IGZyb20gJy4uL3BpcGVzL29yZGVyQnkucGlwZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1JYJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktYWN0aXZpdGUtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2FjdGl2aXRlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAuaGVhZGVye1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAub3V0ZXJ7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAxJSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoMntcclxuICAgICAgICAgICAgY29sb3I6ICMzMzdhYjc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3BhY2V7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAxJSAwIDElO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRkLCB0aHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDF2dztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoZWFkID4gdHJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMjVlbSBzb2xpZCAjMTU2NWMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGJvZHkgPiB0cjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5ZDRmOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHJ7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMmVtIHNvbGlkICNkZGQ7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5lc3RTZWxlY3RSYW5nZXtcclxuICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1MTlCREI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC5jaGVja2JveHtcclxuICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDklO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgYFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aXZpdGVMaXN0Q29tcG9uZW50ICB7XHJcbiAgICBASW5wdXQoKSBhY3Rpdml0ZXM6IEFjdGl2aXRlW107XHJcbiAgICBASW5wdXQoKSBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgQE91dHB1dCgpIGJvdXRvbkNoYW5nZXM6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAgIHRpdHJlOiBzdHJpbmc7IFxyXG4gICAgc2VsZWN0ZWRBY3Rpdml0ZTogQWN0aXZpdGU7XHJcbiAgICBpbmRleE5vbTogbnVtYmVyID0gMDtcclxuICAgIC8vZGVmYXVsdEFjdGl2aXRlOiBPYnNlcnZhYmxlPEFjdGl2aXRlPjtcclxuICAgIC8vc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IFxyXG4gICAgICAgIHRoaXMudGl0cmUgPSBcIkFjdGl2aXTDqXNcIjtcclxuICAgICAgICB0aGlzLmFjdGl2aXRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSA9IG5ldyBBY3Rpdml0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUubW9kaWZpZVBhciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VUb3RhbCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLmZyYWlzU2VydmljZVRvdGFsID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxTZXJ2aWNlVG90YWwoKXtcclxuICAgICAgICB2YXIgdG90YWwgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZighaXNOYU4odGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzW2ldLnNvdXNUb3RhbCkpe1xyXG4gICAgICAgICAgICAgICAgdG90YWwgKz0gdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzW2ldLnNvdXNUb3RhbDtcclxuICAgICAgICAgICAgfSAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIodG90YWwudG9GaXhlZCgyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsRnJhaXNTZXJ2aWNlVG90YWwoKXtcclxuICAgICAgICB2YXIgdG90YWwgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZighaXNOYU4odGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzW2ldLmZyYWlzU2VydmljZVRvdGFsKSl7XHJcbiAgICAgICAgICAgIHRvdGFsICs9IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlc1tpXS5mcmFpc1NlcnZpY2VUb3RhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTnVtYmVyKHRvdGFsLnRvRml4ZWQoMikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRvdGF1eEFjdGl2aXRlKCRldmVudCl7XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzICE9PSBudWxsIHx8IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VUb3RhbCA9IHRoaXMuY2FsY3VsU2VydmljZVRvdGFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5mcmFpc1NlcnZpY2VUb3RhbCA9IHRoaXMuY2FsY3VsRnJhaXNTZXJ2aWNlVG90YWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogaW5mb3MgOiBzZXJ2aWNlIGluamVjdGlvbiBwb3VyIGRldGVjdCBjaGFuZ2UgOiBcclxuICAgICAgICBodHRwOi8vYmxvZy50aG91Z2h0cmFtLmlvL2FuZ3VsYXIvMjAxNi8wMi8yMi9hbmd1bGFyLTItY2hhbmdlLWRldGVjdGlvbi1leHBsYWluZWQuaHRtbFxyXG4gICAgICAgIGh0dHBzOi8vYW5ndWxhci5pby9kb2NzL2pzL2xhdGVzdC9hcGkvY29yZS9pbmRleC9DaGFuZ2VEZXRlY3RvclJlZi1jbGFzcy5odG1sXHJcbiAgICAqL1xyXG5cclxuICAgICAvLyBSZWFjdCB0byB1c2VyIGNoYW5nZSwgdGhpcyBldmVudCBtdXN0IGJlIGFwcGxpZWQgdG8gYWxsIGlucHV0IGZpZWxkcyBvZiB0aGUgZm9ybVxyXG4gICAgIC8vICAgICB1c2luZyB0aGlzIHN5bnRheDogKG5nTW9kZWxDaGFuZ2UpPVwib25Vc2VyQ2hhbmdlKCRldmVudClcIlxyXG4gICAgIG9uVXNlckNoYW5nZSgkZXZlbnQpe1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIkFDVC1vblVzZXJDaGFuZ2U6IFwiICsgJGV2ZW50KTtcclxuXHJcbiAgICAgICAgIC8vIEVuYWJsZSBFbnJlZ2lzdHJlciBidXR0b25zLlxyXG4gICAgICAgICB0aGlzLmJvdXRvbkNoYW5nZXMuZW1pdCh0cnVlKTtcclxuXHJcbiAgICAgICAgIC8vIFRhZyB0aGUgQWN0aXZpdGUgd2l0aCB0aGUgdXNlciBhbmQgdGltZXN0YW1wIG9mIHRoZSBjaGFuZ2UuXHJcbiAgICAgICAgIGlmKCF0aGlzLmVzdE5vdXZlYXUpe1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWUgPSB0aGlzLmdldERhdGVNb2RpZigpO1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKTtcclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgICAgLy8gVE9ETyBTZWxlY3QgZmlyc3QgYWN0aXZpdMOpIGFmdGVyIHZpZXcgZGlzcGxheXMuIFxyXG4gICAgIC8vICAgICAgRG9lcyBpdCB3b3JrIGFmdGVyIEFjdHVhbGlzZXI/XHJcbiAgICAgdG9kb0RlbGV0ZShjaGFuZ2VzOiBhbnkpe1xyXG4gICAgICAgIGFsZXJ0KFwibmdPbkNoYW5nZXNcIik7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlID0gdGhpcy5hY3Rpdml0ZXNbMF07XHJcbiAgICAgfVxyXG5cclxuICAgIGFqb3V0ZUFjdGl2aXRlKCl7XHJcbiAgICAgICAgdmFyIG5vdXZlbGxlQWN0aXZpdGU6IEFjdGl2aXRlO1xyXG4gICAgICAgIHRoaXMuaW5kZXhOb20gKz0gMTtcclxuICAgICAgICBub3V2ZWxsZUFjdGl2aXRlID0gbmV3IEFjdGl2aXRlKCk7XHJcbiAgICAgICAgbm91dmVsbGVBY3Rpdml0ZS5ub20gPSBcIk5vdXZlYXVcIiArIHRoaXMuaW5kZXhOb207XHJcbiAgICAgICAgbm91dmVsbGVBY3Rpdml0ZS5kZWJ1dCA9IHRoaXMuZ2V0RGF0ZUFjdHVlbGxlKCk7XHJcbiAgICAgICAgbm91dmVsbGVBY3Rpdml0ZS5ldGF0ID0gXCJTb3VtaXNzaW9uXCI7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0ZXMucHVzaChub3V2ZWxsZUFjdGl2aXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdXBwcmltZUFjdGl2aXRlKCl7XHJcbiAgICAgICAgLy8gc3VwcHJpbWUgbGUgZGVybmllciBhY3Rpdml0ZXIgZGUgbGEgbGlzdGVcclxuICAgICAgICAvL3RoaXMuYWN0aXZpdGVzLnBvcCgpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzLnNwbGljZSh0aGlzLmFjdGl2aXRlcy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEFjdGl2aXRlKGFjdGl2aXRlOiBBY3Rpdml0ZSl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlID0gYWN0aXZpdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZUFjdHVlbGxlKCl7XHJcbiAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XHJcbiAgICAgICB2YXIgeXl5eSA9IGRhdGUuc3Vic3RyaW5nKDYsMTApO1xyXG4gICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMyw1KTtcclxuICAgICAgIHZhciBkZCA9IGRhdGUuc3Vic3RyaW5nKDAsMik7XHJcbiAgICAgICByZXR1cm4gKHl5eXkgKyBcIi1cIiArIG1tICsgXCItXCIgKyBkZCk7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRlTW9kaWYoKXtcclxuICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgdmFyIHl5eXkgPSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgdmFyIGhoID0gZGF0ZS5zdWJzdHJpbmcoMTIsMTQpO1xyXG4gICAgICAgdmFyIG1tID0gZGF0ZS5zdWJzdHJpbmcoMTUsMTcpO1xyXG4gICAgICAgdmFyIHNzID0gZGF0ZS5zdWJzdHJpbmcoMTgsMjApO1xyXG4gICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBtbSArIFwiLVwiICsgZGQgKyBcIiBcIiArIGhoICsgXCI6XCIgKyBtbSArIFwiOlwiICsgc3MpO1xyXG4gICAgfSAgICAgIFxyXG59Il19

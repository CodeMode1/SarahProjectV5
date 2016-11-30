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
var Observable_1 = require('rxjs/Observable');
var ActiviteListComponent = (function () {
    function ActiviteListComponent(cd) {
        this.cd = cd;
        this.indexNom = 0;
        this.titre = "Activités";
        this.activites = [];
        this.selectedActivite = new activite_1.Activite();
        this.selectedActivite.modifie = "";
        this.selectedActivite.modifiePar = "";
        this.selectedActivite.serviceTotal = 0;
        this.selectedActivite.fraisServiceTotal = 0;
        this.nbChanges = 0;
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
        var _this = this;
        console.log(this.nbChanges);
        if (this.nbChanges == 2) {
            alert("change ready");
            this.defaultActivite.subscribe(function () {
                // application state changed    
                _this.selectedActivite = null;
                // marks path,  the following is required, otherwise the view will not be updated
                _this.cd.markForCheck();
            });
        }
    };
    // run avant OnInit dans le life cycle 
    ActiviteListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.activites != null && changes.activites != undefined) {
            this.nbChanges++;
            alert("on change");
            console.log(this.nbChanges);
            console.log(changes.activites.currentValue);
            this.defaultActivite = Observable_1.Observable.of(changes.activites.currentValue[0]);
            console.log("default ac :");
            console.log(this.defaultActivite);
        }
        if (this.nbChanges > 2) {
            this.selectedActivite = this.activites[0];
        }
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
    ActiviteListComponent.prototype.ngOnDestroy = function () {
        this.nbChanges = 0;
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
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], ActiviteListComponent);
    return ActiviteListComponent;
}());
exports.ActiviteListComponent = ActiviteListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZILGVBQWUsQ0FBQyxDQUFBO0FBQzdJLHlCQUF5QixZQUFZLENBQUMsQ0FBQTtBQUV0QywyQkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQXdEN0M7SUFTSSwrQkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFKekMsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUtqQixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsa0RBQWtCLEdBQWxCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNw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QUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBbElEO1FBQUMsWUFBSyxFQUFFOzs0REFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs2REFBQTtJQXhEWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLGVBQWUsRUFBQyw4QkFBdUIsQ0FBQyxNQUFNO1lBQzlDLE1BQU0sRUFBRSxDQUFFLGkyQkE4Q1Q7YUFDQTtTQUNKLENBQUM7OzZCQUFBO0lBcUlGLDRCQUFDO0FBQUQsQ0FwSUEsQUFvSUMsSUFBQTtBQXBJWSw2QkFBcUIsd0JBb0lqQyxDQUFBIiwiZmlsZSI6ImFjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEFmdGVyVmlld0NoZWNrZWQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3Rpdml0ZSB9IGZyb20gJy4vYWN0aXZpdGUnO1xyXG5pbXBvcnQgeyBPcmRlckJ5UGlwZSB9IGZyb20gJy4uL3BpcGVzL29yZGVyQnkucGlwZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1hY3Rpdml0ZS1saXN0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnYWN0aXZpdGUtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAuaGVhZGVye1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAub3V0ZXJ7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAxJSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoMntcclxuICAgICAgICAgICAgY29sb3I6ICMzMzdhYjc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3BhY2V7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAxJSAwIDElO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRkLCB0aHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDF2dztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoZWFkID4gdHJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMjVlbSBzb2xpZCAjMTU2NWMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGJvZHkgPiB0cjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5ZDRmOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHJ7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMmVtIHNvbGlkICNkZGQ7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5lc3RTZWxlY3RSYW5nZXtcclxuICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1MTlCREI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC5jaGVja2JveHtcclxuICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDklO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgYFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aXZpdGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKSBhY3Rpdml0ZXM6IEFjdGl2aXRlW107XHJcbiAgICBASW5wdXQoKSBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgdGl0cmU6IHN0cmluZzsgXHJcbiAgICBzZWxlY3RlZEFjdGl2aXRlOiBBY3Rpdml0ZTtcclxuICAgIGluZGV4Tm9tOiBudW1iZXIgPSAwO1xyXG4gICAgZGVmYXVsdEFjdGl2aXRlOiBPYnNlcnZhYmxlPEFjdGl2aXRlPjtcclxuICAgIG5iQ2hhbmdlczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IFxyXG4gICAgICAgIHRoaXMudGl0cmUgPSBcIkFjdGl2aXTDqXNcIjtcclxuICAgICAgICB0aGlzLmFjdGl2aXRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSA9IG5ldyBBY3Rpdml0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUubW9kaWZpZVBhciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VUb3RhbCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLmZyYWlzU2VydmljZVRvdGFsID0gMDtcclxuICAgICAgICB0aGlzLm5iQ2hhbmdlcyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsU2VydmljZVRvdGFsKCl7XHJcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoIWlzTmFOKHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlc1tpXS5zb3VzVG90YWwpKXtcclxuICAgICAgICAgICAgICAgIHRvdGFsICs9IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlc1tpXS5zb3VzVG90YWw7XHJcbiAgICAgICAgICAgIH0gICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTnVtYmVyKHRvdGFsLnRvRml4ZWQoMikpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bEZyYWlzU2VydmljZVRvdGFsKCl7XHJcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoIWlzTmFOKHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlc1tpXS5mcmFpc1NlcnZpY2VUb3RhbCkpe1xyXG4gICAgICAgICAgICB0b3RhbCArPSB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXNbaV0uZnJhaXNTZXJ2aWNlVG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcih0b3RhbC50b0ZpeGVkKDIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb3RhdXhBY3Rpdml0ZSgpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlVG90YWwgPSB0aGlzLmNhbGN1bFNlcnZpY2VUb3RhbCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5mcmFpc1NlcnZpY2VUb3RhbCA9IHRoaXMuY2FsY3VsRnJhaXNTZXJ2aWNlVG90YWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmJDaGFuZ2VzKTtcclxuICAgICAgICBpZih0aGlzLm5iQ2hhbmdlcyA9PSAyKXtcclxuICAgICAgICAgICAgYWxlcnQoXCJjaGFuZ2UgcmVhZHlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEFjdGl2aXRlLnN1YnNjcmliZSggKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gYXBwbGljYXRpb24gc3RhdGUgY2hhbmdlZCAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSA9IG51bGw7ICBcclxuICAgICAgICAgICAgICAgIC8vIG1hcmtzIHBhdGgsICB0aGUgZm9sbG93aW5nIGlzIHJlcXVpcmVkLCBvdGhlcndpc2UgdGhlIHZpZXcgd2lsbCBub3QgYmUgdXBkYXRlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTsgICAgICAgICBcclxuICAgICAgICAgICAgfSkgICAgXHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gcnVuIGF2YW50IE9uSW5pdCBkYW5zIGxlIGxpZmUgY3ljbGUgXHJcbiAgICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KXtcclxuICAgICAgICBpZihjaGFuZ2VzLmFjdGl2aXRlcyAhPSBudWxsICYmIGNoYW5nZXMuYWN0aXZpdGVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubmJDaGFuZ2VzKys7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwib24gY2hhbmdlXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5iQ2hhbmdlcyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZXMuYWN0aXZpdGVzLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEFjdGl2aXRlID0gT2JzZXJ2YWJsZS5vZihjaGFuZ2VzLmFjdGl2aXRlcy5jdXJyZW50VmFsdWVbMF0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmF1bHQgYWMgOlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kZWZhdWx0QWN0aXZpdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5uYkNoYW5nZXMgPiAyKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlID0gdGhpcy5hY3Rpdml0ZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgIH1cclxuXHJcblxyXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCl7XHJcbiAgICAgICAgLy9tb2RpZmllciBsYSBkYXRlIGV0IG1vZGlmacOpIHBhciBzZXVsZW1lbnQgbG9yc3F1J29uIGVzdCBlbiBtb2RlIGVkaXRpb24uXHJcbiAgICAgICAgaWYoIXRoaXMuZXN0Tm91dmVhdSAmJiB0aGlzLnNlbGVjdGVkQWN0aXZpdGUubW9kaWZpZVBhciAhPSBcIlwiKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWUgPSB0aGlzLmdldERhdGVNb2RpZigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUubW9kaWZpZVBhciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyTmFtZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXMgIT09IG51bGwgfHwgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvdGF1eEFjdGl2aXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMubmJDaGFuZ2VzID0gMDtcclxuICAgIH0gIFxyXG5cclxuICAgIGFqb3V0ZUFjdGl2aXRlKCl7XHJcbiAgICAgICAgdmFyIG5vdXZlbGxlQWN0aXZpdGU6IEFjdGl2aXRlO1xyXG4gICAgICAgIHRoaXMuaW5kZXhOb20gKz0gMTtcclxuICAgICAgICBub3V2ZWxsZUFjdGl2aXRlID0gbmV3IEFjdGl2aXRlKCk7XHJcbiAgICAgICAgbm91dmVsbGVBY3Rpdml0ZS5ub20gPSBcIk5vdXZlYXVcIiArIHRoaXMuaW5kZXhOb207XHJcbiAgICAgICAgLy90aGlzLm5vdXZlbGxlQWN0aXZpdGUuZGVidXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCkuc3Vic3RyaW5nKDAsMTApO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZGVidXQgPSB0aGlzLmdldERhdGVBY3R1ZWxsZSgpO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZXRhdCA9IFwiU291bWlzc2lvblwiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzLnB1c2gobm91dmVsbGVBY3Rpdml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcHJpbWVBY3Rpdml0ZSgpe1xyXG4gICAgICAgIC8vIHN1cHByaW1lIGxlIGRlcm5pZXIgYWN0aXZpdGVyIGRlIGxhIGxpc3RlXHJcbiAgICAgICAgLy90aGlzLmFjdGl2aXRlcy5wb3AoKTtcclxuICAgICAgICB0aGlzLmFjdGl2aXRlcy5zcGxpY2UodGhpcy5hY3Rpdml0ZXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkQWN0aXZpdGUpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBY3Rpdml0ZShhY3Rpdml0ZTogQWN0aXZpdGUpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSA9IGFjdGl2aXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVBY3R1ZWxsZSgpe1xyXG4gICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgdmFyIHl5eXkgPSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBtbSArIFwiLVwiICsgZGQpOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZU1vZGlmKCl7XHJcbiAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDE1LDE3KTtcclxuICAgICAgIHZhciBzcyA9IGRhdGUuc3Vic3RyaW5nKDE4LDIwKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkICsgXCIgXCIgKyBoaCArIFwiOlwiICsgbW0gKyBcIjpcIiArIHNzKTtcclxuICAgIH0gICAgICBcclxufSJdfQ==

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
        this.compteurChanges = 0;
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
        console.log("nb changes dans OnInit :");
        console.log(this.compteurChanges);
        if (this.compteurChanges == 2) {
            this.subscription = this.defaultActivite.subscribe(function () {
                //état application change. 
                _this.selectedActivite = null;
                //marque chemin, est nécessaire pour que la vue soit updatée.
                _this.cd.markForCheck();
            });
        }
    };
    // run avant OnInit dans le life cycle 
    ActiviteListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.activites != null && changes.activites != undefined) {
            this.compteurChanges++;
            alert("on change");
            console.log("nb changes dans ngOnChanges :");
            console.log(this.compteurChanges);
            this.defaultActivite = Observable_1.Observable.of(changes.activites.currentValue[0]);
        }
        if (this.compteurChanges > 2) {
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
        this.compteurChanges = 0;
        this.subscription.unsubscribe();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZILGVBQWUsQ0FBQyxDQUFBO0FBQzdJLHlCQUF5QixZQUFZLENBQUMsQ0FBQTtBQUV0QywyQkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQXlEN0M7SUFVSSwrQkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFMekMsYUFBUSxHQUFXLENBQUMsQ0FBQztRQU1qQixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsa0RBQWtCLEdBQWxCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNw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SSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFqSUQ7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7OzZEQUFBO0lBeERaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsZUFBZSxFQUFDLDhCQUF1QixDQUFDLE1BQU07WUFDOUMsTUFBTSxFQUFFLENBQUUsaTJCQThDVDthQUNBO1NBQ0osQ0FBQzs7NkJBQUE7SUFvSUYsNEJBQUM7QUFBRCxDQW5JQSxBQW1JQyxJQUFBO0FBbklZLDZCQUFxQix3QkFtSWpDLENBQUEiLCJmaWxlIjoiYWN0aXZpdGVzL2FjdGl2aXRlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2aXRlIH0gZnJvbSAnLi9hY3Rpdml0ZSc7XHJcbmltcG9ydCB7IE9yZGVyQnlQaXBlIH0gZnJvbSAnLi4vcGlwZXMvb3JkZXJCeS5waXBlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvUlgnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1hY3Rpdml0ZS1saXN0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnYWN0aXZpdGUtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAuaGVhZGVye1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAub3V0ZXJ7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAxJSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoMntcclxuICAgICAgICAgICAgY29sb3I6ICMzMzdhYjc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3BhY2V7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAxJSAwIDElO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRkLCB0aHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDF2dztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoZWFkID4gdHJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMjVlbSBzb2xpZCAjMTU2NWMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGJvZHkgPiB0cjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5ZDRmOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHJ7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMmVtIHNvbGlkICNkZGQ7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5lc3RTZWxlY3RSYW5nZXtcclxuICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1MTlCREI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC5jaGVja2JveHtcclxuICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDklO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgYFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aXZpdGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKSBhY3Rpdml0ZXM6IEFjdGl2aXRlW107XHJcbiAgICBASW5wdXQoKSBlc3ROb3V2ZWF1OiBib29sZWFuO1xyXG4gICAgdGl0cmU6IHN0cmluZzsgXHJcbiAgICBzZWxlY3RlZEFjdGl2aXRlOiBBY3Rpdml0ZTtcclxuICAgIGluZGV4Tm9tOiBudW1iZXIgPSAwO1xyXG4gICAgZGVmYXVsdEFjdGl2aXRlOiBPYnNlcnZhYmxlPEFjdGl2aXRlPjtcclxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgY29tcHRldXJDaGFuZ2VzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgXHJcbiAgICAgICAgdGhpcy50aXRyZSA9IFwiQWN0aXZpdMOpc1wiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlID0gbmV3IEFjdGl2aXRlKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllUGFyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZVRvdGFsID0gMDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuZnJhaXNTZXJ2aWNlVG90YWwgPSAwO1xyXG4gICAgICAgIHRoaXMuY29tcHRldXJDaGFuZ2VzID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxTZXJ2aWNlVG90YWwoKXtcclxuICAgICAgICB2YXIgdG90YWwgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZighaXNOYU4odGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzW2ldLnNvdXNUb3RhbCkpe1xyXG4gICAgICAgICAgICAgICAgdG90YWwgKz0gdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzW2ldLnNvdXNUb3RhbDtcclxuICAgICAgICAgICAgfSAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIodG90YWwudG9GaXhlZCgyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsRnJhaXNTZXJ2aWNlVG90YWwoKXtcclxuICAgICAgICB2YXIgdG90YWwgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkQWN0aXZpdGUuc2VydmljZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZighaXNOYU4odGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzW2ldLmZyYWlzU2VydmljZVRvdGFsKSl7XHJcbiAgICAgICAgICAgIHRvdGFsICs9IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlc1tpXS5mcmFpc1NlcnZpY2VUb3RhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTnVtYmVyKHRvdGFsLnRvRml4ZWQoMikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRvdGF1eEFjdGl2aXRlKCl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VUb3RhbCA9IHRoaXMuY2FsY3VsU2VydmljZVRvdGFsKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLmZyYWlzU2VydmljZVRvdGFsID0gdGhpcy5jYWxjdWxGcmFpc1NlcnZpY2VUb3RhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5iIGNoYW5nZXMgZGFucyBPbkluaXQgOlwiKTsgXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb21wdGV1ckNoYW5nZXMpO1xyXG4gICAgICAgIGlmKHRoaXMuY29tcHRldXJDaGFuZ2VzID09IDIpe1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZGVmYXVsdEFjdGl2aXRlLnN1YnNjcmliZSggKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/DqXRhdCBhcHBsaWNhdGlvbiBjaGFuZ2UuIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlID0gbnVsbDsgIFxyXG4gICAgICAgICAgICAgICAgLy9tYXJxdWUgY2hlbWluLCBlc3QgbsOpY2Vzc2FpcmUgcG91ciBxdWUgbGEgdnVlIHNvaXQgdXBkYXTDqWUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpOyAgICAgICAgIFxyXG4gICAgICAgICAgICB9KSAgICBcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJ1biBhdmFudCBPbkluaXQgZGFucyBsZSBsaWZlIGN5Y2xlIFxyXG4gICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSl7XHJcbiAgICAgICAgaWYoY2hhbmdlcy5hY3Rpdml0ZXMgIT0gbnVsbCAmJiBjaGFuZ2VzLmFjdGl2aXRlcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbXB0ZXVyQ2hhbmdlcysrO1xyXG4gICAgICAgICAgICBhbGVydChcIm9uIGNoYW5nZVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYiBjaGFuZ2VzIGRhbnMgbmdPbkNoYW5nZXMgOlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb21wdGV1ckNoYW5nZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRBY3Rpdml0ZSA9IE9ic2VydmFibGUub2YoY2hhbmdlcy5hY3Rpdml0ZXMuY3VycmVudFZhbHVlWzBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29tcHRldXJDaGFuZ2VzID4gMil7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSA9IHRoaXMuYWN0aXZpdGVzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICB9XHJcblxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpe1xyXG4gICAgICAgIC8vbW9kaWZpZXIgbGEgZGF0ZSBldCBtb2RpZmnDqSBwYXIgc2V1bGVtZW50IGxvcnNxdSdvbiBlc3QgZW4gbW9kZSBlZGl0aW9uLlxyXG4gICAgICAgIGlmKCF0aGlzLmVzdE5vdXZlYXUgJiYgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5tb2RpZmllID0gdGhpcy5nZXREYXRlTW9kaWYoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdGl2aXRlLm1vZGlmaWVQYXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlck5hbWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZEFjdGl2aXRlLnNlcnZpY2VzICE9PSBudWxsIHx8IHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZS5zZXJ2aWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRUb3RhdXhBY3Rpdml0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLmNvbXB0ZXVyQ2hhbmdlcyA9IDA7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH0gIFxyXG5cclxuICAgIGFqb3V0ZUFjdGl2aXRlKCl7XHJcbiAgICAgICAgdmFyIG5vdXZlbGxlQWN0aXZpdGU6IEFjdGl2aXRlO1xyXG4gICAgICAgIHRoaXMuaW5kZXhOb20gKz0gMTtcclxuICAgICAgICBub3V2ZWxsZUFjdGl2aXRlID0gbmV3IEFjdGl2aXRlKCk7XHJcbiAgICAgICAgbm91dmVsbGVBY3Rpdml0ZS5ub20gPSBcIk5vdXZlYXVcIiArIHRoaXMuaW5kZXhOb207XHJcbiAgICAgICAgLy90aGlzLm5vdXZlbGxlQWN0aXZpdGUuZGVidXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCkuc3Vic3RyaW5nKDAsMTApO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZGVidXQgPSB0aGlzLmdldERhdGVBY3R1ZWxsZSgpO1xyXG4gICAgICAgIG5vdXZlbGxlQWN0aXZpdGUuZXRhdCA9IFwiU291bWlzc2lvblwiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdGVzLnB1c2gobm91dmVsbGVBY3Rpdml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcHJpbWVBY3Rpdml0ZSgpe1xyXG4gICAgICAgIC8vIHN1cHByaW1lIGxlIGRlcm5pZXIgYWN0aXZpdGVyIGRlIGxhIGxpc3RlXHJcbiAgICAgICAgLy90aGlzLmFjdGl2aXRlcy5wb3AoKTtcclxuICAgICAgICB0aGlzLmFjdGl2aXRlcy5zcGxpY2UodGhpcy5hY3Rpdml0ZXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkQWN0aXZpdGUpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBY3Rpdml0ZShhY3Rpdml0ZTogQWN0aXZpdGUpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpdml0ZSA9IGFjdGl2aXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGVBY3R1ZWxsZSgpe1xyXG4gICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgdmFyIHl5eXkgPSBkYXRlLnN1YnN0cmluZyg2LDEwKTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDMsNSk7XHJcbiAgICAgICB2YXIgZGQgPSBkYXRlLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgcmV0dXJuICh5eXl5ICsgXCItXCIgKyBtbSArIFwiLVwiICsgZGQpOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZU1vZGlmKCl7XHJcbiAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgIHZhciB5eXl5ID0gZGF0ZS5zdWJzdHJpbmcoNiwxMCk7XHJcbiAgICAgICB2YXIgbW0gPSBkYXRlLnN1YnN0cmluZygzLDUpO1xyXG4gICAgICAgdmFyIGRkID0gZGF0ZS5zdWJzdHJpbmcoMCwyKTtcclxuICAgICAgIHZhciBoaCA9IGRhdGUuc3Vic3RyaW5nKDEyLDE0KTtcclxuICAgICAgIHZhciBtbSA9IGRhdGUuc3Vic3RyaW5nKDE1LDE3KTtcclxuICAgICAgIHZhciBzcyA9IGRhdGUuc3Vic3RyaW5nKDE4LDIwKTtcclxuICAgICAgIHJldHVybiAoeXl5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkICsgXCIgXCIgKyBoaCArIFwiOlwiICsgbW0gKyBcIjpcIiArIHNzKTtcclxuICAgIH0gICAgICBcclxufSJdfQ==

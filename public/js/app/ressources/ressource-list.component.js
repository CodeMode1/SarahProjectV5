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
var ressource_service_1 = require('./ressource.service');
var erreur_service_1 = require('../erreurs/erreur.service');
var RessourceListComponent = (function () {
    function RessourceListComponent(_ressourceService, _erreurService) {
        this._ressourceService = _ressourceService;
        this._erreurService = _erreurService;
        this.selectedRessource = null;
    }
    RessourceListComponent.prototype.ngOnInit = function () {
        this.getRessources();
    };
    RessourceListComponent.prototype.getRessources = function () {
        var _this = this;
        this._ressourceService.getRessources().subscribe(function (data) {
            _this.ressources = data;
            console.log("ressource du serveur pour afficher dans la liste : ");
            for (var i = 0; i < _this.ressources.length; i++) {
                console.log(_this.ressources[i]);
                console.log(_this.ressources[i].nom);
            }
        }, function (error) { return _this._erreurService.handleErreur(error); });
    };
    RessourceListComponent.prototype.selectRessource = function (ressource) {
        this.selectedRessource = ressource;
        console.log(this.selectedRessource);
        this.idSelected = this.selectedRessource.ressourceId;
    };
    RessourceListComponent.prototype.clear = function ($event) {
        this.selectedRessource = null;
    };
    RessourceListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-ressource-list',
            templateUrl: 'ressource-list.component.html',
            styles: ["\n        h2{\n            padding: 2% 0 2% 0;\n            color: #519BDB;\n        }\n\n        td, th{\n            text-align: center;\n            font-size: 1vw;\n        }\n\n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n    "]
        }), 
        __metadata('design:paramtypes', [ressource_service_1.RessourceService, erreur_service_1.ErreurService])
    ], RessourceListComponent);
    return RessourceListComponent;
}());
exports.RessourceListComponent = RessourceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3NvdXJjZXMvcmVzc291cmNlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFDbEQsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFFdkQsK0JBQThCLDJCQUEyQixDQUFDLENBQUE7QUFvQzFEO0lBS0ksZ0NBQXFCLGlCQUFtQyxFQUFVLGNBQTZCO1FBQTFFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUgvRixzQkFBaUIsR0FBYyxJQUFJLENBQUM7SUFJcEMsQ0FBQztJQUVELHlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDhDQUFhLEdBQWI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQzVDLFVBQUEsSUFBSTtZQUNBLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMscURBQXFELENBQUMsQ0FBQztZQUNuRSxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsQ0FBQztRQUNMLENBQUMsRUFDRCxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF2QyxDQUF1QyxDQUNuRCxDQUFDO0lBQ04sQ0FBQztJQUVELGdEQUFlLEdBQWYsVUFBZ0IsU0FBb0I7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztJQUN6RCxDQUFDO0lBRUQsc0NBQUssR0FBTCxVQUFNLE1BQVc7UUFDYixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFwRUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxNQUFNLEVBQUUsQ0FBRSxxa0JBNEJULENBQUM7U0FDTCxDQUFDOzs4QkFBQTtJQW9DRiw2QkFBQztBQUFELENBbkNBLEFBbUNDLElBQUE7QUFuQ1ksOEJBQXNCLHlCQW1DbEMsQ0FBQSIsImZpbGUiOiJyZXNzb3VyY2VzL3Jlc3NvdXJjZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3Jlc3NvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzc291cmNlIH0gZnJvbSAnLi9yZXNzb3VyY2UnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LXJlc3NvdXJjZS1saXN0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAncmVzc291cmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICBoMntcclxuICAgICAgICAgICAgcGFkZGluZzogMiUgMCAyJSAwO1xyXG4gICAgICAgICAgICBjb2xvcjogIzUxOUJEQjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRkLCB0aHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDF2dztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoZWFkID4gdHJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMjVlbSBzb2xpZCAjMTU2NWMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGJvZHkgPiB0cjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5ZDRmOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHJ7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuMmVtIHNvbGlkICNkZGQ7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5lc3RTZWxlY3RSYW5nZXtcclxuICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1MTlCREI7XHJcbiAgICAgICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZXNzb3VyY2VMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHJlc3NvdXJjZXM6IFJlc3NvdXJjZVtdO1xyXG4gICAgc2VsZWN0ZWRSZXNzb3VyY2U6IFJlc3NvdXJjZSA9IG51bGw7XHJcbiAgICBpZFNlbGVjdGVkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX3Jlc3NvdXJjZVNlcnZpY2U6IFJlc3NvdXJjZVNlcnZpY2UsIHByaXZhdGUgX2VycmV1clNlcnZpY2U6IEVycmV1clNlcnZpY2UpIHsgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSZXNzb3VyY2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVzc291cmNlcygpe1xyXG4gICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UuZ2V0UmVzc291cmNlcygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXMgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2UgZHUgc2VydmV1ciBwb3VyIGFmZmljaGVyIGRhbnMgbGEgbGlzdGUgOiBcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMucmVzc291cmNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXNzb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0ubm9tKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RSZXNzb3VyY2UocmVzc291cmNlOiBSZXNzb3VyY2Upe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSZXNzb3VyY2UgPSByZXNzb3VyY2U7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFJlc3NvdXJjZSk7XHJcbiAgICAgICAgdGhpcy5pZFNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZFJlc3NvdXJjZS5yZXNzb3VyY2VJZDtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigkZXZlbnQ6IGFueSl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJlc3NvdXJjZSA9IG51bGw7XHJcbiAgICB9XHJcbn0iXX0=

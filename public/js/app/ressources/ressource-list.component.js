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
            //print données pour chaque ressource
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
        this.nomSelected = this.selectedRessource.nom;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3NvdXJjZXMvcmVzc291cmNlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFDbEQsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFFdkQsK0JBQThCLDJCQUEyQixDQUFDLENBQUE7QUFvQzFEO0lBS0ksZ0NBQXFCLGlCQUFtQyxFQUFVLGNBQTZCO1FBQTFFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUgvRixzQkFBaUIsR0FBYyxJQUFJLENBQUM7SUFJcEMsQ0FBQztJQUVELHlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDhDQUFhLEdBQWI7UUFBQSxpQkFhQztRQVpHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQzVDLFVBQUEsSUFBSTtZQUNBLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLHFDQUFxQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDbkUsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7UUFDTCxDQUFDLEVBQ0QsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBdkMsQ0FBdUMsQ0FDbkQsQ0FBQztJQUNOLENBQUM7SUFFRCxnREFBZSxHQUFmLFVBQWdCLFNBQW9CO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUM7SUFDbEQsQ0FBQztJQUVELHNDQUFLLEdBQUwsVUFBTSxNQUFXO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBckVMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsTUFBTSxFQUFFLENBQUUscWtCQTRCVCxDQUFDO1NBQ0wsQ0FBQzs7OEJBQUE7SUFxQ0YsNkJBQUM7QUFBRCxDQXBDQSxBQW9DQyxJQUFBO0FBcENZLDhCQUFzQix5QkFvQ2xDLENBQUEiLCJmaWxlIjoicmVzc291cmNlcy9yZXNzb3VyY2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9yZXNzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZSB9IGZyb20gJy4vcmVzc291cmNlJztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1yZXNzb3VyY2UtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3Jlc3NvdXJjZS1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIlIDAgMiUgMDtcclxuICAgICAgICAgICAgY29sb3I6ICM1MTlCREI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZCwgdGh7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxdnc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRye1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVzc291cmNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICByZXNzb3VyY2VzOiBSZXNzb3VyY2VbXTtcclxuICAgIHNlbGVjdGVkUmVzc291cmNlOiBSZXNzb3VyY2UgPSBudWxsO1xyXG4gICAgbm9tU2VsZWN0ZWQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfcmVzc291cmNlU2VydmljZTogUmVzc291cmNlU2VydmljZSwgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSkgeyBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldFJlc3NvdXJjZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXNzb3VyY2VzKCl7XHJcbiAgICAgICAgdGhpcy5fcmVzc291cmNlU2VydmljZS5nZXRSZXNzb3VyY2VzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzc291cmNlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAvL3ByaW50IGRvbm7DqWVzIHBvdXIgY2hhcXVlIHJlc3NvdXJjZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2UgZHUgc2VydmV1ciBwb3VyIGFmZmljaGVyIGRhbnMgbGEgbGlzdGUgOiBcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMucmVzc291cmNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXNzb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0ubm9tKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RSZXNzb3VyY2UocmVzc291cmNlOiBSZXNzb3VyY2Upe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSZXNzb3VyY2UgPSByZXNzb3VyY2U7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFJlc3NvdXJjZSk7XHJcbiAgICAgICAgdGhpcy5ub21TZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRSZXNzb3VyY2Uubm9tO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCRldmVudDogYW55KXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUmVzc291cmNlID0gbnVsbDtcclxuICAgIH1cclxufSJdfQ==

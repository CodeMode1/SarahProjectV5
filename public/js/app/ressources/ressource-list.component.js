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
    };
    RessourceListComponent.prototype.clear = function ($event) {
        this.selectedRessource = null;
    };
    RessourceListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-ressource-list',
            templateUrl: 'ressource-list.component.html',
            styles: ["\n        h2{\n            padding: 2% 0 2% 0;\n            color: #519BDB;\n        }\n\n         td, th{\n            text-align: center;\n            font-size: 1vw;\n        }\n\n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n    "]
        }), 
        __metadata('design:paramtypes', [ressource_service_1.RessourceService, erreur_service_1.ErreurService])
    ], RessourceListComponent);
    return RessourceListComponent;
}());
exports.RessourceListComponent = RessourceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3NvdXJjZXMvcmVzc291cmNlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFDbEQsa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFFdkQsK0JBQThCLDJCQUEyQixDQUFDLENBQUE7QUFvQzFEO0lBSUksZ0NBQXFCLGlCQUFtQyxFQUFVLGNBQTZCO1FBQTFFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUYvRixzQkFBaUIsR0FBYyxJQUFJLENBQUM7SUFHcEMsQ0FBQztJQUVELHlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDhDQUFhLEdBQWI7UUFBQSxpQkFhQztRQVpHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQzVDLFVBQUEsSUFBSTtZQUNBLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLHFDQUFxQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDbkUsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7UUFDTCxDQUFDLEVBQ0QsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBdkMsQ0FBdUMsQ0FDbkQsQ0FBQztJQUNOLENBQUM7SUFFRCxnREFBZSxHQUFmLFVBQWdCLFNBQW9CO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsc0NBQUssR0FBTCxVQUFNLE1BQVc7UUFDYixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFuRUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxNQUFNLEVBQUUsQ0FBRSxza0JBNEJULENBQUM7U0FDTCxDQUFDOzs4QkFBQTtJQW1DRiw2QkFBQztBQUFELENBbENBLEFBa0NDLElBQUE7QUFsQ1ksOEJBQXNCLHlCQWtDbEMsQ0FBQSIsImZpbGUiOiJyZXNzb3VyY2VzL3Jlc3NvdXJjZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3Jlc3NvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzc291cmNlIH0gZnJvbSAnLi9yZXNzb3VyY2UnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LXJlc3NvdXJjZS1saXN0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAncmVzc291cmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICBoMntcclxuICAgICAgICAgICAgcGFkZGluZzogMiUgMCAyJSAwO1xyXG4gICAgICAgICAgICBjb2xvcjogIzUxOUJEQjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICB0ZCwgdGh7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxdnc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGVhZCA+IHRye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjI1ZW0gc29saWQgIzE1NjVjMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRib2R5ID4gdHI6aG92ZXJ7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWQ0Zjk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRye1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZXN0U2VsZWN0UmFuZ2V7XHJcbiAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVzc291cmNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICByZXNzb3VyY2VzOiBSZXNzb3VyY2VbXTtcclxuICAgIHNlbGVjdGVkUmVzc291cmNlOiBSZXNzb3VyY2UgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9yZXNzb3VyY2VTZXJ2aWNlOiBSZXNzb3VyY2VTZXJ2aWNlLCBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlKSB7IFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UmVzc291cmNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc3NvdXJjZXMoKXtcclxuICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmdldFJlc3NvdXJjZXMoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vcHJpbnQgZG9ubsOpZXMgcG91ciBjaGFxdWUgcmVzc291cmNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3NvdXJjZSBkdSBzZXJ2ZXVyIHBvdXIgYWZmaWNoZXIgZGFucyBsYSBsaXN0ZSA6IFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5yZXNzb3VyY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzc291cmNlc1tpXS5ub20pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFJlc3NvdXJjZShyZXNzb3VyY2U6IFJlc3NvdXJjZSl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJlc3NvdXJjZSA9IHJlc3NvdXJjZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkUmVzc291cmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigkZXZlbnQ6IGFueSl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJlc3NvdXJjZSA9IG51bGw7XHJcbiAgICB9XHJcbn0iXX0=

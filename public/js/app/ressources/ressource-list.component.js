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
var core_1 = require("@angular/core");
var ressource_service_1 = require("./ressource.service");
var erreur_service_1 = require("../erreurs/erreur.service");
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
                console.log(_this.ressources[i].couleur);
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
    return RessourceListComponent;
}());
RessourceListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-ressource-list',
        templateUrl: 'ressource-list.component.html',
        styles: ["\n        h2{\n            padding: 2% 0 2% 0;\n            color: #519BDB;\n        }\n\n        table{\n        }\n\n        td, th{\n            text-align: center;\n            font-size: 14px;\n        }\n\n        thead > tr{\n            background-color: #fafafa;\n            border-bottom: 0.25em solid #1565c0;\n        }\n\n        tbody > tr:hover{\n            background-color: #a9d4f9;\n        }\n\n        tbody > tr{\n            border-bottom: 0.2em solid #ddd;\n            cursor: pointer;\n        }\n\n        .estSelectRange{\n             background-color: #519BDB;\n         }\n    "]
    }),
    __metadata("design:paramtypes", [ressource_service_1.RessourceService, erreur_service_1.ErreurService])
], RessourceListComponent);
exports.RessourceListComponent = RessourceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvcmVzc291cmNlcy9yZXNzb3VyY2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCx5REFBdUQ7QUFFdkQsNERBQTBEO0FBdUMxRCxJQUFhLHNCQUFzQjtJQUsvQixnQ0FBcUIsaUJBQW1DLEVBQVUsY0FBNkI7UUFBMUUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBSC9GLHNCQUFpQixHQUFjLElBQUksQ0FBQztJQUlwQyxDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsOENBQWEsR0FBYjtRQUFBLGlCQWFDO1FBWkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FDNUMsVUFBQSxJQUFJO1lBQ0EsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBQ25FLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLENBQUM7UUFDTCxDQUFDLEVBQ0QsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBdkMsQ0FBdUMsQ0FDbkQsQ0FBQztJQUNOLENBQUM7SUFFRCxnREFBZSxHQUFmLFVBQWdCLFNBQW9CO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7SUFDekQsQ0FBQztJQUVELHNDQUFLLEdBQUwsVUFBTSxNQUFXO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQXBDQSxBQW9DQyxJQUFBO0FBcENZLHNCQUFzQjtJQXJDbEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUMsTUFBTSxFQUFFLENBQUUsbW1CQStCVCxDQUFDO0tBQ0wsQ0FBQztxQ0FNMEMsb0NBQWdCLEVBQTBCLDhCQUFhO0dBTHRGLHNCQUFzQixDQW9DbEM7QUFwQ1ksd0RBQXNCIiwiZmlsZSI6InJlc3NvdXJjZXMvcmVzc291cmNlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVzc291cmNlU2VydmljZSB9IGZyb20gJy4vcmVzc291cmNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2UgfSBmcm9tICcuL3Jlc3NvdXJjZSc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktcmVzc291cmNlLWxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdyZXNzb3VyY2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFsgYFxyXG4gICAgICAgIGgye1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAyJSAwIDIlIDA7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNTE5QkRCO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFibGV7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZCwgdGh7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhlYWQgPiB0cntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yNWVtIHNvbGlkICMxNTY1YzA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0Ym9keSA+IHRyOmhvdmVye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlkNGY5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGJvZHkgPiB0cntcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMC4yZW0gc29saWQgI2RkZDtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmVzdFNlbGVjdFJhbmdle1xyXG4gICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUxOUJEQjtcclxuICAgICAgICAgfVxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlc3NvdXJjZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcmVzc291cmNlczogUmVzc291cmNlW107XHJcbiAgICBzZWxlY3RlZFJlc3NvdXJjZTogUmVzc291cmNlID0gbnVsbDtcclxuICAgIGlkU2VsZWN0ZWQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfcmVzc291cmNlU2VydmljZTogUmVzc291cmNlU2VydmljZSwgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSkgeyBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldFJlc3NvdXJjZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXNzb3VyY2VzKCl7XHJcbiAgICAgICAgdGhpcy5fcmVzc291cmNlU2VydmljZS5nZXRSZXNzb3VyY2VzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzc291cmNlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3NvdXJjZSBkdSBzZXJ2ZXVyIHBvdXIgYWZmaWNoZXIgZGFucyBsYSBsaXN0ZSA6IFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5yZXNzb3VyY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzc291cmNlc1tpXS5ub20pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzc291cmNlc1tpXS5jb3VsZXVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RSZXNzb3VyY2UocmVzc291cmNlOiBSZXNzb3VyY2Upe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSZXNzb3VyY2UgPSByZXNzb3VyY2U7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFJlc3NvdXJjZSk7XHJcbiAgICAgICAgdGhpcy5pZFNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZFJlc3NvdXJjZS5yZXNzb3VyY2VJZDtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigkZXZlbnQ6IGFueSl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJlc3NvdXJjZSA9IG51bGw7XHJcbiAgICB9XHJcbn0iXX0=

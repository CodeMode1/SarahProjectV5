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
var ressource_1 = require('./ressource');
var ressource_service_1 = require('./ressource.service');
var erreur_service_1 = require('../erreurs/erreur.service');
var RessourceEditComponent = (function () {
    function RessourceEditComponent(_ressourceService, _erreurService) {
        this._ressourceService = _ressourceService;
        this._erreurService = _erreurService;
        this.vider = new core_1.EventEmitter();
        this.sauvegardeRessource = false;
        this.estAjout = true;
    }
    RessourceEditComponent.prototype.ngOnInit = function () {
    };
    RessourceEditComponent.prototype.ngOnChanges = function (changes) {
        if (changes.myRessource.currentValue === null) {
            this.estAjout = true;
            this.myRessource = { ressourceId: null, nom: null };
        }
        else {
            console.log(this.myRessource);
            this.estAjout = false;
        }
    };
    RessourceEditComponent.prototype.supprimerRessource = function () {
        var _this = this;
        if (this.myRessource !== null) {
            this._ressourceService.deleteRessource(this.myRessource)
                .subscribe(function (data) {
                console.log(data);
            }, function (error) { return _this._erreurService.handleErreur(error); });
        }
    };
    RessourceEditComponent.prototype.viderRessource = function () {
        this.estAjout = true;
        this.vider.emit(null);
    };
    RessourceEditComponent.prototype.onSubmit = function (ressource) {
        var _this = this;
        console.log(ressource);
        // if nouveau, appel créé, sinon appel update
        if (this.estAjout) {
            console.log("ressource a sauvegarder : ");
            this.myRessource = ressource;
            this._ressourceService.creerRessource(this.myRessource)
                .subscribe(function (data) {
                _this._ressourceService.ressources.push(data);
                // message succes creation evx
                _this.sauvegardeRessource = true;
            }, function (error) { return _this._erreurService.handleErreur(error); });
        }
        else {
            this._ressourceService.updateRessource(this.myRessource)
                .subscribe(function (data) {
                console.log("edit SUCCES : ");
                console.log(data);
            }, function (error) { return _this._erreurService.handleErreur(error); });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ressource_1.Ressource)
    ], RessourceEditComponent.prototype, "myRessource", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RessourceEditComponent.prototype, "vider", void 0);
    RessourceEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-ressource-edit',
            templateUrl: 'ressource-edit.component.html'
        }), 
        __metadata('design:paramtypes', [ressource_service_1.RessourceService, erreur_service_1.ErreurService])
    ], RessourceEditComponent);
    return RessourceEditComponent;
}());
exports.RessourceEditComponent = RessourceEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3NvdXJjZXMvcmVzc291cmNlLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkUsZUFBZSxDQUFDLENBQUE7QUFDM0YsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLGtDQUFpQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3ZELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBTzFEO0lBTUksZ0NBQW9CLGlCQUFtQyxFQUFVLGNBQTZCO1FBQTFFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUhwRixVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFJbEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUwseUNBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCw0Q0FBVyxHQUFYLFVBQVksT0FBTztRQUNmLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDO1FBQ3RELENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7SUFDTCxDQUFDO0lBRUQsbURBQWtCLEdBQWxCO1FBQUEsaUJBVUM7UUFURyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2lCQUNuRCxTQUFTLENBQ04sVUFBQSxJQUFJO2dCQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxFQUNELFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQ25ELENBQUM7UUFDVixDQUFDO0lBQ0wsQ0FBQztJQUVELCtDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQseUNBQVEsR0FBUixVQUFTLFNBQW9CO1FBQTdCLGlCQXlCQztRQXhCRyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLDZDQUE2QztRQUM3QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7aUJBQ2xELFNBQVMsQ0FDTixVQUFBLElBQUk7Z0JBQ0EsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLDhCQUE4QjtnQkFDOUIsS0FBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNwQyxDQUFDLEVBQ0QsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBdkMsQ0FBdUMsQ0FDbkQsQ0FBQztRQUNWLENBQUM7UUFBQyxJQUFJLENBQUEsQ0FBQztZQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDbkQsU0FBUyxDQUNOLFVBQUEsSUFBSTtnQkFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxFQUNELFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQ25ELENBQUM7UUFDVixDQUFDO0lBQ0wsQ0FBQztJQWhFRDtRQUFDLFlBQUssRUFBRTs7K0RBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7eURBQUE7SUFSYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUsK0JBQStCO1NBQy9DLENBQUM7OzhCQUFBO0lBb0VGLDZCQUFDO0FBQUQsQ0FuRUEsQUFtRUMsSUFBQTtBQW5FWSw4QkFBc0IseUJBbUVsQyxDQUFBIiwiZmlsZSI6InJlc3NvdXJjZXMvcmVzc291cmNlLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2UgfSBmcm9tICcuL3Jlc3NvdXJjZSc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3Jlc3NvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1yZXNzb3VyY2UtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3Jlc3NvdXJjZS1lZGl0LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVzc291cmNlRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICAgIGVzdEFqb3V0OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgbXlSZXNzb3VyY2U6IFJlc3NvdXJjZTtcclxuICAgIEBPdXRwdXQoKSB2aWRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgc2F1dmVnYXJkZVJlc3NvdXJjZTogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZXNzb3VyY2VTZXJ2aWNlOiBSZXNzb3VyY2VTZXJ2aWNlLCBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLnNhdXZlZ2FyZGVSZXNzb3VyY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKXtcclxuICAgICAgICBpZihjaGFuZ2VzLm15UmVzc291cmNlLmN1cnJlbnRWYWx1ZSA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuZXN0QWpvdXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm15UmVzc291cmNlID0ge3Jlc3NvdXJjZUlkOiBudWxsLCBub206IG51bGx9O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15UmVzc291cmNlKTtcclxuICAgICAgICAgICAgdGhpcy5lc3RBam91dCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdXBwcmltZXJSZXNzb3VyY2UoKXtcclxuICAgICAgICBpZih0aGlzLm15UmVzc291cmNlICE9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fcmVzc291cmNlU2VydmljZS5kZWxldGVSZXNzb3VyY2UodGhpcy5teVJlc3NvdXJjZSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2aWRlclJlc3NvdXJjZSgpe1xyXG4gICAgICAgIHRoaXMuZXN0QWpvdXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmlkZXIuZW1pdChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBvblN1Ym1pdChyZXNzb3VyY2U6IFJlc3NvdXJjZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzc291cmNlKTtcclxuICAgICAgICAvLyBpZiBub3V2ZWF1LCBhcHBlbCBjcsOpw6ksIHNpbm9uIGFwcGVsIHVwZGF0ZVxyXG4gICAgICAgIGlmKHRoaXMuZXN0QWpvdXQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3NvdXJjZSBhIHNhdXZlZ2FyZGVyIDogXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm15UmVzc291cmNlID0gcmVzc291cmNlO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmNyZWVyUmVzc291cmNlKHRoaXMubXlSZXNzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLnJlc3NvdXJjZXMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWVzc2FnZSBzdWNjZXMgY3JlYXRpb24gZXZ4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F1dmVnYXJkZVJlc3NvdXJjZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLnVwZGF0ZVJlc3NvdXJjZSh0aGlzLm15UmVzc291cmNlKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlZGl0IFNVQ0NFUyA6IFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19

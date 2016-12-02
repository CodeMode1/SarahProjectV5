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
        this.etatUserMessage = false;
        this.estAjout = true;
        this.activeBoutons = false;
    }
    RessourceEditComponent.prototype.ngOnInit = function () {
    };
    RessourceEditComponent.prototype.ngOnChanges = function (changes) {
        if (changes.myRessource.currentValue === null) {
            this.estAjout = true;
            this.myRessource = { ressourceId: null, nom: null, checked: false };
        }
        else {
            console.log(this.myRessource);
            this.estAjout = false;
            this.etatUserMessage = false;
        }
    };
    RessourceEditComponent.prototype.supprimerRessource = function () {
        var _this = this;
        if (this.myRessource !== null) {
            this._ressourceService.deleteRessource(this.myRessource)
                .subscribe(function (data) {
                _this.etatUserMessage = true;
                _this.userMessage = "Ressource Supprimée: " + _this.myRessource.nom;
                _this.myRessource.nom = "";
                console.log(data);
            }, function (error) { return _this._erreurService.handleErreur(error); });
        }
    };
    RessourceEditComponent.prototype.viderRessource = function () {
        this.estAjout = true;
        this.vider.emit(null);
    };
    RessourceEditComponent.prototype.nomInput = function (item) {
        if (item.value.length > 0) {
            this.activeBoutons = true;
        }
        else {
            this.activeBoutons = false;
        }
    };
    RessourceEditComponent.prototype.onSubmit = function (ressource) {
        var _this = this;
        console.log(ressource);
        // if nouveau, appel créé, sinon appel update
        if (ressource.nom !== null && ressource.nom !== "") {
            if (this.estAjout) {
                console.log("ressource a sauvegarder : ");
                this.myRessource = ressource;
                this._ressourceService.creerRessource(this.myRessource)
                    .subscribe(function (data) {
                    _this._ressourceService.ressources.push(data);
                    // message succes creation ressource
                    _this.etatUserMessage = true;
                    _this.userMessage = "Ressource Crée: " + _this.myRessource.nom;
                    _this.myRessource.nom = "";
                }, function (error) { return _this._erreurService.handleErreur(error); });
            }
            else {
                this._ressourceService.updateRessource(this.myRessource)
                    .subscribe(function (data) {
                    console.log("edit SUCCES : ");
                    console.log(data);
                    _this.etatUserMessage = true;
                    _this.userMessage = "Ressource Sauvegardée: " + _this.myRessource.nom;
                    _this.viderRessource();
                }, function (error) { return _this._erreurService.handleErreur(error); });
            }
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
            templateUrl: 'ressource-edit.component.html',
            styles: ["\n        .boutonsRessources{\n            padding: 1% 0 1% 0;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [ressource_service_1.RessourceService, erreur_service_1.ErreurService])
    ], RessourceEditComponent);
    return RessourceEditComponent;
}());
exports.RessourceEditComponent = RessourceEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3NvdXJjZXMvcmVzc291cmNlLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkUsZUFBZSxDQUFDLENBQUE7QUFDM0YsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLGtDQUFpQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3ZELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBWTFEO0lBUUksZ0NBQW9CLGlCQUFtQyxFQUFVLGNBQTZCO1FBQTFFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUxwRixVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFNbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVMLHlDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsNENBQVcsR0FBWCxVQUFZLE9BQU87UUFDZixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDO1FBQ3RFLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLENBQUM7SUFDTCxDQUFDO0lBRUQsbURB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VyxHQUFHLHlCQUF5QixHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO29CQUNwRSxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzFCLENBQUMsRUFDRCxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF2QyxDQUF1QyxDQUNuRCxDQUFDO1lBQ1YsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBdEZEO1FBQUMsWUFBSyxFQUFFOzsrREFBQTtJQUNSO1FBQUMsYUFBTSxFQUFFOzt5REFBQTtJQWJiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsTUFBTSxFQUFFLENBQUMsaUZBSVIsQ0FBQztTQUNMLENBQUM7OzhCQUFBO0lBMEZGLDZCQUFDO0FBQUQsQ0F6RkEsQUF5RkMsSUFBQTtBQXpGWSw4QkFBc0IseUJBeUZsQyxDQUFBIiwiZmlsZSI6InJlc3NvdXJjZXMvcmVzc291cmNlLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2UgfSBmcm9tICcuL3Jlc3NvdXJjZSc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3Jlc3NvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1yZXNzb3VyY2UtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3Jlc3NvdXJjZS1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuYm91dG9uc1Jlc3NvdXJjZXN7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDElIDAgMSUgMDtcclxuICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVzc291cmNlRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICAgIGVzdEFqb3V0OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgbXlSZXNzb3VyY2U6IFJlc3NvdXJjZTtcclxuICAgIEBPdXRwdXQoKSB2aWRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgZXRhdFVzZXJNZXNzYWdlOiBib29sZWFuO1xyXG4gICAgdXNlck1lc3NhZ2U6IHN0cmluZztcclxuICAgIGFjdGl2ZUJvdXRvbnM6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVzc291cmNlU2VydmljZTogUmVzc291cmNlU2VydmljZSwgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSkgeyBcclxuICAgICAgICAgICAgdGhpcy5ldGF0VXNlck1lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQm91dG9ucyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcyl7XHJcbiAgICAgICAgaWYoY2hhbmdlcy5teVJlc3NvdXJjZS5jdXJyZW50VmFsdWUgPT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmVzdEFqb3V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZSA9IHtyZXNzb3VyY2VJZDogbnVsbCwgbm9tOiBudWxsLCBjaGVja2VkOiBmYWxzZX07XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlSZXNzb3VyY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmVzdEFqb3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZXRhdFVzZXJNZXNzYWdlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN1cHByaW1lclJlc3NvdXJjZSgpe1xyXG4gICAgICAgIGlmKHRoaXMubXlSZXNzb3VyY2UgIT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmRlbGV0ZVJlc3NvdXJjZSh0aGlzLm15UmVzc291cmNlKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldGF0VXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJNZXNzYWdlID0gXCJSZXNzb3VyY2UgU3VwcHJpbcOpZTogXCIgKyB0aGlzLm15UmVzc291cmNlLm5vbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZS5ub20gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmlkZXJSZXNzb3VyY2UoKXtcclxuICAgICAgICB0aGlzLmVzdEFqb3V0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnZpZGVyLmVtaXQobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9tSW5wdXQoaXRlbSl7XHJcbiAgICAgICAgaWYoaXRlbS52YWx1ZS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVCb3V0b25zID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVCb3V0b25zID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KHJlc3NvdXJjZTogUmVzc291cmNlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNzb3VyY2UpO1xyXG4gICAgICAgIC8vIGlmIG5vdXZlYXUsIGFwcGVsIGNyw6nDqSwgc2lub24gYXBwZWwgdXBkYXRlXHJcbiAgICAgICAgaWYocmVzc291cmNlLm5vbSAhPT0gbnVsbCAmJiByZXNzb3VyY2Uubm9tICE9PSBcIlwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5lc3RBam91dCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3NvdXJjZSBhIHNhdXZlZ2FyZGVyIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZSA9IHJlc3NvdXJjZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UuY3JlZXJSZXNzb3VyY2UodGhpcy5teVJlc3NvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UucmVzc291cmNlcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWVzc2FnZSBzdWNjZXMgY3JlYXRpb24gcmVzc291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV0YXRVc2VyTWVzc2FnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJNZXNzYWdlID0gXCJSZXNzb3VyY2UgQ3LDqWU6IFwiICsgdGhpcy5teVJlc3NvdXJjZS5ub207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15UmVzc291cmNlLm5vbSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UudXBkYXRlUmVzc291cmNlKHRoaXMubXlSZXNzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkaXQgU1VDQ0VTIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV0YXRVc2VyTWVzc2FnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJNZXNzYWdlID0gXCJSZXNzb3VyY2UgU2F1dmVnYXJkw6llOiBcIiArIHRoaXMubXlSZXNzb3VyY2Uubm9tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlclJlc3NvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19

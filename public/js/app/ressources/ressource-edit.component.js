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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3NvdXJjZXMvcmVzc291cmNlLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkUsZUFBZSxDQUFDLENBQUE7QUFDM0YsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLGtDQUFpQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3ZELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBWTFEO0lBT0ksZ0NBQW9CLGlCQUFtQyxFQUFVLGNBQTZCO1FBQTFFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUpwRixVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFLbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVMLHlDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsNENBQVcsR0FBWCxVQUFZLE9BQU87UUFDZixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUNqQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1EQUFrQixHQUFsQjtRQUFBLGlCQVlDO1FBWEcsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcs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Q0E1RUEsQUE0RUMsSUFBQTtBQTVFWSw4QkFBc0IseUJBNEVsQyxDQUFBIiwiZmlsZSI6InJlc3NvdXJjZXMvcmVzc291cmNlLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2UgfSBmcm9tICcuL3Jlc3NvdXJjZSc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3Jlc3NvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1yZXNzb3VyY2UtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3Jlc3NvdXJjZS1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuYm91dG9uc1Jlc3NvdXJjZXN7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDElIDAgMSUgMDtcclxuICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVzc291cmNlRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICAgIGVzdEFqb3V0OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgbXlSZXNzb3VyY2U6IFJlc3NvdXJjZTtcclxuICAgIEBPdXRwdXQoKSB2aWRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgZXRhdFVzZXJNZXNzYWdlOiBib29sZWFuO1xyXG4gICAgdXNlck1lc3NhZ2U6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZXNzb3VyY2VTZXJ2aWNlOiBSZXNzb3VyY2VTZXJ2aWNlLCBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLmV0YXRVc2VyTWVzc2FnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVzdEFqb3V0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXMpe1xyXG4gICAgICAgIGlmKGNoYW5nZXMubXlSZXNzb3VyY2UuY3VycmVudFZhbHVlID09PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubXlSZXNzb3VyY2UgPSB7cmVzc291cmNlSWQ6IG51bGwsIG5vbTogbnVsbH07XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlSZXNzb3VyY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmVzdEFqb3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZXRhdFVzZXJNZXNzYWdlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN1cHByaW1lclJlc3NvdXJjZSgpe1xyXG4gICAgICAgIGlmKHRoaXMubXlSZXNzb3VyY2UgIT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmRlbGV0ZVJlc3NvdXJjZSh0aGlzLm15UmVzc291cmNlKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldGF0VXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJNZXNzYWdlID0gXCJSZXNzb3VyY2UgU3VwcHJpbcOpZTogXCIgKyB0aGlzLm15UmVzc291cmNlLm5vbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZpZGVyUmVzc291cmNlKCl7XHJcbiAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52aWRlci5lbWl0KG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KHJlc3NvdXJjZTogUmVzc291cmNlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNzb3VyY2UpO1xyXG4gICAgICAgIC8vIGlmIG5vdXZlYXUsIGFwcGVsIGNyw6nDqSwgc2lub24gYXBwZWwgdXBkYXRlXHJcbiAgICAgICAgaWYodGhpcy5lc3RBam91dCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzc291cmNlIGEgc2F1dmVnYXJkZXIgOiBcIik7XHJcbiAgICAgICAgICAgIHRoaXMubXlSZXNzb3VyY2UgPSByZXNzb3VyY2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UuY3JlZXJSZXNzb3VyY2UodGhpcy5teVJlc3NvdXJjZSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UucmVzc291cmNlcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtZXNzYWdlIHN1Y2NlcyBjcmVhdGlvbiByZXNzb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldGF0VXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJNZXNzYWdlID0gXCJSZXNzb3VyY2UgQ3LDqWU6IFwiICsgdGhpcy5teVJlc3NvdXJjZS5ub207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlSZXNzb3VyY2Uubm9tID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UudXBkYXRlUmVzc291cmNlKHRoaXMubXlSZXNzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkaXQgU1VDQ0VTIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldGF0VXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJNZXNzYWdlID0gXCJSZXNzb3VyY2UgU2F1dmVnYXJkw6llOiBcIiArIHRoaXMubXlSZXNzb3VyY2Uubm9tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVyUmVzc291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19

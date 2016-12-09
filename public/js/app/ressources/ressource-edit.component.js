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
        this.succesUserMessage = false;
        this.erreurUserMessage = false;
        this.estAjout = true;
        this.activeBoutons = false;
    }
    RessourceEditComponent.prototype.ngOnInit = function () {
    };
    RessourceEditComponent.prototype.ngOnChanges = function (changes) {
        if (changes.myRessource.currentValue === null) {
            this.estAjout = true;
            this.myRessource = { ressourceId: null, nom: null, couleur: null, checked: false };
        }
        else {
            console.log(this.myRessource);
            this.estAjout = false;
            this.succesUserMessage = false;
            this.activeBoutons = false;
        }
    };
    RessourceEditComponent.prototype.supprimerRessource = function () {
        var _this = this;
        if (this.myRessource !== null) {
            this._ressourceService.deleteRessource(this.myRessource)
                .subscribe(function (data) {
                _this.succesUserMessage = true;
                _this.userMessage = "Ressource Supprimée: " + _this.myRessource.nom + _this.myRessource.couleur;
                _this.myRessource.nom = "";
                _this.myRessource.couleur = "";
                console.log(data);
            }, function (error) { return _this._erreurService.handleErreur(error); });
            this.estAjout = true;
        }
    };
    RessourceEditComponent.prototype.viderRessource = function () {
        this.estAjout = true;
        this.vider.emit(null);
    };
    RessourceEditComponent.prototype.inputChange = function ($event) {
        if ($event == "" || $event == null) {
            this.activeBoutons = false;
        }
        else {
            this.activeBoutons = true;
        }
    };
    RessourceEditComponent.prototype.couleurChange = function ($event) {
        if ($event == "#ffffff" || $event == "#000000" || $event == "" || $event == null) {
            this.activeBoutons = false;
            this.erreurUserMessage = true;
            this.erreurMessage = "Choissisez une couleur autre que blanc/noir";
        }
        else {
            this.activeBoutons = true;
            this.erreurUserMessage = false;
        }
    };
    RessourceEditComponent.prototype.onSubmit = function (ressource) {
        var _this = this;
        console.log(ressource);
        // If nouveau, appel créé, sinon appel update.
        if ((ressource.nom !== null && ressource.nom !== "") && (ressource.couleur !== "" && ressource.couleur !== null)) {
            if (this.estAjout) {
                console.log("ressource a sauvegarder : ");
                this.myRessource = ressource;
                this._ressourceService.creerRessource(this.myRessource)
                    .subscribe(function (data) {
                    _this._ressourceService.ressources.push(data);
                    // Message succes creation ressource.
                    _this.succesUserMessage = true;
                    _this.userMessage = "Ressource Crée: " + _this.myRessource.nom;
                    _this.myRessource.nom = "";
                    _this.myRessource.couleur = null;
                }, function (error) { return _this._erreurService.handleErreur(error); });
            }
            else {
                this._ressourceService.updateRessource(this.myRessource)
                    .subscribe(function (data) {
                    console.log("edit SUCCES : ");
                    console.log(data);
                    _this.succesUserMessage = true;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3NvdXJjZXMvcmVzc291cmNlLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkUsZUFBZSxDQUFDLENBQUE7QUFDM0YsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLGtDQUFpQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3ZELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBWTFEO0lBVUksZ0NBQW9CLGlCQUFtQyxFQUFVLGNBQTZCO1FBQTFFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQVBwRixVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFRbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFTCx5Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDRDQUFXLEdBQVgsVUFBWSxPQUFPO1FBQ2YsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUEsQ0FBQztZQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDO1FBQ3JGLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RC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QUNWLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQXpHRDtRQUFDLFlBQUssRUFBRTs7K0RBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7eURBQUE7SUFiYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE1BQU0sRUFBRSxDQUFDLGlGQUlSLENBQUM7U0FDTCxDQUFDOzs4QkFBQTtJQTZHRiw2QkFBQztBQUFELENBNUdBLEFBNEdDLElBQUE7QUE1R1ksOEJBQXNCLHlCQTRHbEMsQ0FBQSIsImZpbGUiOiJyZXNzb3VyY2VzL3Jlc3NvdXJjZS1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcyAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVzc291cmNlIH0gZnJvbSAnLi9yZXNzb3VyY2UnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9yZXNzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktcmVzc291cmNlLWVkaXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdyZXNzb3VyY2UtZWRpdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmJvdXRvbnNSZXNzb3VyY2Vze1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxJSAwIDElIDA7XHJcbiAgICAgICAgfVxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlc3NvdXJjZUVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgICBlc3RBam91dDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIG15UmVzc291cmNlOiBSZXNzb3VyY2U7XHJcbiAgICBAT3V0cHV0KCkgdmlkZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIHN1Y2Nlc1VzZXJNZXNzYWdlOiBib29sZWFuO1xyXG4gICAgZXJyZXVyVXNlck1lc3NhZ2U6IGJvb2xlYW47XHJcbiAgICB1c2VyTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgZXJyZXVyTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgYWN0aXZlQm91dG9uczogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZXNzb3VyY2VTZXJ2aWNlOiBSZXNzb3VyY2VTZXJ2aWNlLCBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc1VzZXJNZXNzYWdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyZXVyVXNlck1lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQm91dG9ucyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcyl7XHJcbiAgICAgICAgaWYoY2hhbmdlcy5teVJlc3NvdXJjZS5jdXJyZW50VmFsdWUgPT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmVzdEFqb3V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZSA9IHtyZXNzb3VyY2VJZDogbnVsbCwgbm9tOiBudWxsLCBjb3VsZXVyOiBudWxsLCBjaGVja2VkOiBmYWxzZX07XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlSZXNzb3VyY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmVzdEFqb3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2VzVXNlck1lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVCb3V0b25zID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN1cHByaW1lclJlc3NvdXJjZSgpe1xyXG4gICAgICAgIGlmKHRoaXMubXlSZXNzb3VyY2UgIT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmRlbGV0ZVJlc3NvdXJjZSh0aGlzLm15UmVzc291cmNlKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNVc2VyTWVzc2FnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlck1lc3NhZ2UgPSBcIlJlc3NvdXJjZSBTdXBwcmltw6llOiBcIiArIHRoaXMubXlSZXNzb3VyY2Uubm9tICsgdGhpcy5teVJlc3NvdXJjZS5jb3VsZXVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15UmVzc291cmNlLm5vbSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlSZXNzb3VyY2UuY291bGV1ciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZpZGVyUmVzc291cmNlKCl7XHJcbiAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52aWRlci5lbWl0KG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2hhbmdlKCRldmVudCl7XHJcbiAgICAgICAgaWYoJGV2ZW50ID09IFwiXCIgfHwgJGV2ZW50ID09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJvdXRvbnMgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVCb3V0b25zID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY291bGV1ckNoYW5nZSgkZXZlbnQpe1xyXG4gICAgICAgIGlmKCRldmVudCA9PSBcIiNmZmZmZmZcIiB8fCAkZXZlbnQgPT0gXCIjMDAwMDAwXCIgfHwgJGV2ZW50ID09IFwiXCIgfHwgJGV2ZW50ID09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJvdXRvbnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lcnJldXJVc2VyTWVzc2FnZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyZXVyTWVzc2FnZSA9IFwiQ2hvaXNzaXNleiB1bmUgY291bGV1ciBhdXRyZSBxdWUgYmxhbmMvbm9pclwiO1xyXG4gICAgICAgIH1lbHNleyBcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVCb3V0b25zID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lcnJldXJVc2VyTWVzc2FnZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblN1Ym1pdChyZXNzb3VyY2U6IFJlc3NvdXJjZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzc291cmNlKTtcclxuICAgICAgICAvLyBJZiBub3V2ZWF1LCBhcHBlbCBjcsOpw6ksIHNpbm9uIGFwcGVsIHVwZGF0ZS5cclxuICAgICAgICBpZigocmVzc291cmNlLm5vbSAhPT0gbnVsbCAmJiByZXNzb3VyY2Uubm9tICE9PSBcIlwiKSAmJiAocmVzc291cmNlLmNvdWxldXIgIT09IFwiXCIgJiYgcmVzc291cmNlLmNvdWxldXIgIT09IG51bGwpKXtcclxuICAgICAgICAgICAgaWYodGhpcy5lc3RBam91dCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3NvdXJjZSBhIHNhdXZlZ2FyZGVyIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZSA9IHJlc3NvdXJjZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UuY3JlZXJSZXNzb3VyY2UodGhpcy5teVJlc3NvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UucmVzc291cmNlcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWVzc2FnZSBzdWNjZXMgY3JlYXRpb24gcmVzc291cmNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNVc2VyTWVzc2FnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJNZXNzYWdlID0gXCJSZXNzb3VyY2UgQ3LDqWU6IFwiICsgdGhpcy5teVJlc3NvdXJjZS5ub207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15UmVzc291cmNlLm5vbSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15UmVzc291cmNlLmNvdWxldXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLnVwZGF0ZVJlc3NvdXJjZSh0aGlzLm15UmVzc291cmNlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlZGl0IFNVQ0NFUyA6IFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNVc2VyTWVzc2FnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJNZXNzYWdlID0gXCJSZXNzb3VyY2UgU2F1dmVnYXJkw6llOiBcIiArIHRoaXMubXlSZXNzb3VyY2Uubm9tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlclJlc3NvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19

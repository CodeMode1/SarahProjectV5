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
        }
    };
    RessourceEditComponent.prototype.viderRessource = function () {
        this.estAjout = true;
        this.vider.emit(null);
    };
    RessourceEditComponent.prototype.inputChange = function ($event) {
        if ($event.length > 0) {
            this.activeBoutons = true;
        }
        else {
            this.activeBoutons = false;
        }
    };
    RessourceEditComponent.prototype.couleurChange = function ($event) {
        if ($event !== "#ffffff" && $event !== "#000000") {
            this.activeBoutons = true;
        }
        else {
            this.activeBoutons = false;
            this.erreurUserMessage = true;
            this.erreurMessage = "Choissisez une couleur autre que blanc/noir";
        }
    };
    RessourceEditComponent.prototype.onSubmit = function (ressource) {
        var _this = this;
        console.log(ressource);
        // If nouveau, appel créé, sinon appel update.
        if (ressource.nom !== null && ressource.nom !== "") {
            if (this.estAjout) {
                console.log("ressource a sauvegarder : ");
                this.myRessource = ressource;
                this._ressourceService.creerRessource(this.myRessource)
                    .subscribe(function (data) {
                    _this._ressourceService.ressources.push(data);
                    // Message succes creation ressource.
                    _this.succesUserMessage = true;
                    _this.userMessage = "Ressource Crée: " + _this.myRessource.nom + _this.myRessource.couleur;
                    _this.myRessource.nom = "";
                    _this.myRessource.couleur = "";
                }, function (error) { return _this._erreurService.handleErreur(error); });
            }
            else {
                this._ressourceService.updateRessource(this.myRessource)
                    .subscribe(function (data) {
                    console.log("edit SUCCES : ");
                    console.log(data);
                    _this.succesUserMessage = true;
                    _this.userMessage = "Ressource Sauvegardée: " + _this.myRessource.nom + _this.myRessource.couleur;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3NvdXJjZXMvcmVzc291cmNlLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkUsZUFBZSxDQUFDLENBQUE7QUFDM0YsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLGtDQUFpQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3ZELCtCQUE4QiwyQkFBMkIsQ0FBQyxDQUFBO0FBWTFEO0lBVUksZ0NBQW9CLGlCQUFtQyxFQUFVLGNBQTZCO1FBQTFFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQVBwRixVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFRbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFTCx5Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDRDQUFXLEdBQVgsVUFBWSxPQUFPO1FBQ2YsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUEsQ0FBQztZQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDO1FBQ3JGLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RC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O1lBQzVDLE1BQU0sRUFBRSxDQUFDLGlGQUlSLENBQUM7U0FDTCxDQUFDOzs4QkFBQTtJQTBHRiw2QkFBQztBQUFELENBekdBLEFBeUdDLElBQUE7QUF6R1ksOEJBQXNCLHlCQXlHbEMsQ0FBQSIsImZpbGUiOiJyZXNzb3VyY2VzL3Jlc3NvdXJjZS1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcyAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVzc291cmNlIH0gZnJvbSAnLi9yZXNzb3VyY2UnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9yZXNzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktcmVzc291cmNlLWVkaXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdyZXNzb3VyY2UtZWRpdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmJvdXRvbnNSZXNzb3VyY2Vze1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxJSAwIDElIDA7XHJcbiAgICAgICAgfVxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlc3NvdXJjZUVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgICBlc3RBam91dDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIG15UmVzc291cmNlOiBSZXNzb3VyY2U7XHJcbiAgICBAT3V0cHV0KCkgdmlkZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIHN1Y2Nlc1VzZXJNZXNzYWdlOiBib29sZWFuO1xyXG4gICAgZXJyZXVyVXNlck1lc3NhZ2U6IGJvb2xlYW47XHJcbiAgICB1c2VyTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgZXJyZXVyTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgYWN0aXZlQm91dG9uczogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZXNzb3VyY2VTZXJ2aWNlOiBSZXNzb3VyY2VTZXJ2aWNlLCBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc1VzZXJNZXNzYWdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyZXVyVXNlck1lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQm91dG9ucyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcyl7XHJcbiAgICAgICAgaWYoY2hhbmdlcy5teVJlc3NvdXJjZS5jdXJyZW50VmFsdWUgPT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmVzdEFqb3V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZSA9IHtyZXNzb3VyY2VJZDogbnVsbCwgbm9tOiBudWxsLCBjb3VsZXVyOiBudWxsLCBjaGVja2VkOiBmYWxzZX07XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlSZXNzb3VyY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmVzdEFqb3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2VzVXNlck1lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcHJpbWVyUmVzc291cmNlKCl7XHJcbiAgICAgICAgaWYodGhpcy5teVJlc3NvdXJjZSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc3NvdXJjZVNlcnZpY2UuZGVsZXRlUmVzc291cmNlKHRoaXMubXlSZXNzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc1VzZXJNZXNzYWdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyTWVzc2FnZSA9IFwiUmVzc291cmNlIFN1cHByaW3DqWU6IFwiICsgdGhpcy5teVJlc3NvdXJjZS5ub20gKyB0aGlzLm15UmVzc291cmNlLmNvdWxldXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlSZXNzb3VyY2Uubm9tID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZS5jb3VsZXVyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZpZGVyUmVzc291cmNlKCl7XHJcbiAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52aWRlci5lbWl0KG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2hhbmdlKCRldmVudCl7XHJcbiAgICAgICAgaWYoJGV2ZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJvdXRvbnMgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJvdXRvbnMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY291bGV1ckNoYW5nZSgkZXZlbnQpe1xyXG4gICAgICAgIGlmKCRldmVudCAhPT0gXCIjZmZmZmZmXCIgJiYgJGV2ZW50ICE9PSBcIiMwMDAwMDBcIil7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQm91dG9ucyA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQm91dG9ucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVycmV1clVzZXJNZXNzYWdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lcnJldXJNZXNzYWdlID0gXCJDaG9pc3Npc2V6IHVuZSBjb3VsZXVyIGF1dHJlIHF1ZSBibGFuYy9ub2lyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KHJlc3NvdXJjZTogUmVzc291cmNlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNzb3VyY2UpO1xyXG4gICAgICAgIC8vIElmIG5vdXZlYXUsIGFwcGVsIGNyw6nDqSwgc2lub24gYXBwZWwgdXBkYXRlLlxyXG4gICAgICAgIGlmKHJlc3NvdXJjZS5ub20gIT09IG51bGwgJiYgcmVzc291cmNlLm5vbSAhPT0gXCJcIil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZXN0QWpvdXQpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2UgYSBzYXV2ZWdhcmRlciA6IFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlSZXNzb3VyY2UgPSByZXNzb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmNyZWVyUmVzc291cmNlKHRoaXMubXlSZXNzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLnJlc3NvdXJjZXMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1lc3NhZ2Ugc3VjY2VzIGNyZWF0aW9uIHJlc3NvdXJjZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzVXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyTWVzc2FnZSA9IFwiUmVzc291cmNlIENyw6llOiBcIiArIHRoaXMubXlSZXNzb3VyY2Uubm9tICsgdGhpcy5teVJlc3NvdXJjZS5jb3VsZXVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZS5ub20gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZS5jb3VsZXVyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzc291cmNlU2VydmljZS51cGRhdGVSZXNzb3VyY2UodGhpcy5teVJlc3NvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWRpdCBTVUNDRVMgOiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzVXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyTWVzc2FnZSA9IFwiUmVzc291cmNlIFNhdXZlZ2FyZMOpZTogXCIgKyB0aGlzLm15UmVzc291cmNlLm5vbSArIHRoaXMubXlSZXNzb3VyY2UuY291bGV1cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZXJSZXNzb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==

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
var ressource_1 = require("./ressource");
var ressource_service_1 = require("./ressource.service");
var erreur_service_1 = require("../erreurs/erreur.service");
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
    return RessourceEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", ressource_1.Ressource)
], RessourceEditComponent.prototype, "myRessource", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RessourceEditComponent.prototype, "vider", void 0);
RessourceEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-ressource-edit',
        templateUrl: 'ressource-edit.component.html',
        styles: ["\n        .boutonsRessources{\n            padding: 1% 0 1% 0;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [ressource_service_1.RessourceService, erreur_service_1.ErreurService])
], RessourceEditComponent);
exports.RessourceEditComponent = RessourceEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvcmVzc291cmNlcy9yZXNzb3VyY2UtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUEyRjtBQUMzRix5Q0FBd0M7QUFDeEMseURBQXVEO0FBQ3ZELDREQUEwRDtBQVkxRCxJQUFhLHNCQUFzQjtJQVUvQixnQ0FBb0IsaUJBQW1DLEVBQVUsY0FBNkI7UUFBMUUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBUHBGLFVBQUssR0FBRyxJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQVFsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVMLHlDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsNENBQVcsR0FBWCxVQUFZLE9BQU87UUFDZixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUM7UUFDckYsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLGlCQUFpQixH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SUFDTCxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQTVHQSxBQTRHQyxJQUFBO0FBMUdZO0lBQVIsWUFBSyxFQUFFOzhCQUFjLHFCQUFTOzJEQUFDO0FBQ3RCO0lBQVQsYUFBTSxFQUFFOztxREFBaUM7QUFIakMsc0JBQXNCO0lBVmxDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixXQUFXLEVBQUUsK0JBQStCO1FBQzVDLE1BQU0sRUFBRSxDQUFDLGlGQUlSLENBQUM7S0FDTCxDQUFDO3FDQVd5QyxvQ0FBZ0IsRUFBMEIsOEJBQWE7R0FWckYsc0JBQXNCLENBNEdsQztBQTVHWSx3REFBc0IiLCJmaWxlIjoicmVzc291cmNlcy9yZXNzb3VyY2UtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlc3NvdXJjZSB9IGZyb20gJy4vcmVzc291cmNlJztcclxuaW1wb3J0IHsgUmVzc291cmNlU2VydmljZSB9IGZyb20gJy4vcmVzc291cmNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LXJlc3NvdXJjZS1lZGl0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAncmVzc291cmNlLWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5ib3V0b25zUmVzc291cmNlc3tcclxuICAgICAgICAgICAgcGFkZGluZzogMSUgMCAxJSAwO1xyXG4gICAgICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZXNzb3VyY2VFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gICAgZXN0QWpvdXQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBteVJlc3NvdXJjZTogUmVzc291cmNlO1xyXG4gICAgQE91dHB1dCgpIHZpZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBzdWNjZXNVc2VyTWVzc2FnZTogYm9vbGVhbjtcclxuICAgIGVycmV1clVzZXJNZXNzYWdlOiBib29sZWFuO1xyXG4gICAgdXNlck1lc3NhZ2U6IHN0cmluZztcclxuICAgIGVycmV1ck1lc3NhZ2U6IHN0cmluZztcclxuICAgIGFjdGl2ZUJvdXRvbnM6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVzc291cmNlU2VydmljZTogUmVzc291cmNlU2VydmljZSwgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSkgeyBcclxuICAgICAgICAgICAgdGhpcy5zdWNjZXNVc2VyTWVzc2FnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVycmV1clVzZXJNZXNzYWdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZXN0QWpvdXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJvdXRvbnMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXMpe1xyXG4gICAgICAgIGlmKGNoYW5nZXMubXlSZXNzb3VyY2UuY3VycmVudFZhbHVlID09PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5lc3RBam91dCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubXlSZXNzb3VyY2UgPSB7cmVzc291cmNlSWQ6IG51bGwsIG5vbTogbnVsbCwgY291bGV1cjogbnVsbCwgY2hlY2tlZDogZmFsc2V9O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15UmVzc291cmNlKTtcclxuICAgICAgICAgICAgdGhpcy5lc3RBam91dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc1VzZXJNZXNzYWdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQm91dG9ucyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdXBwcmltZXJSZXNzb3VyY2UoKXtcclxuICAgICAgICBpZih0aGlzLm15UmVzc291cmNlICE9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fcmVzc291cmNlU2VydmljZS5kZWxldGVSZXNzb3VyY2UodGhpcy5teVJlc3NvdXJjZSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzVXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJNZXNzYWdlID0gXCJSZXNzb3VyY2UgU3VwcHJpbcOpZTogXCIgKyB0aGlzLm15UmVzc291cmNlLm5vbSArIHRoaXMubXlSZXNzb3VyY2UuY291bGV1cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZS5ub20gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15UmVzc291cmNlLmNvdWxldXIgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXN0QWpvdXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2aWRlclJlc3NvdXJjZSgpe1xyXG4gICAgICAgIHRoaXMuZXN0QWpvdXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmlkZXIuZW1pdChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dENoYW5nZSgkZXZlbnQpe1xyXG4gICAgICAgIGlmKCRldmVudCA9PSBcIlwiIHx8ICRldmVudCA9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVCb3V0b25zID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQm91dG9ucyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvdWxldXJDaGFuZ2UoJGV2ZW50KXtcclxuICAgICAgICBpZigkZXZlbnQgPT0gXCIjZmZmZmZmXCIgfHwgJGV2ZW50ID09IFwiIzAwMDAwMFwiIHx8ICRldmVudCA9PSBcIlwiIHx8ICRldmVudCA9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVCb3V0b25zID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyZXVyVXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVycmV1ck1lc3NhZ2UgPSBcIkNob2lzc2lzZXogdW5lIGNvdWxldXIgYXV0cmUgcXVlIGJsYW5jL25vaXJcIjtcclxuICAgICAgICB9ZWxzZXsgXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQm91dG9ucyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyZXVyVXNlck1lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJtaXQocmVzc291cmNlOiBSZXNzb3VyY2Upe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3NvdXJjZSk7XHJcbiAgICAgICAgLy8gSWYgbm91dmVhdSwgYXBwZWwgY3LDqcOpLCBzaW5vbiBhcHBlbCB1cGRhdGUuXHJcbiAgICAgICAgaWYoKHJlc3NvdXJjZS5ub20gIT09IG51bGwgJiYgcmVzc291cmNlLm5vbSAhPT0gXCJcIikgJiYgKHJlc3NvdXJjZS5jb3VsZXVyICE9PSBcIlwiICYmIHJlc3NvdXJjZS5jb3VsZXVyICE9PSBudWxsKSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZXN0QWpvdXQpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2UgYSBzYXV2ZWdhcmRlciA6IFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlSZXNzb3VyY2UgPSByZXNzb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLmNyZWVyUmVzc291cmNlKHRoaXMubXlSZXNzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNzb3VyY2VTZXJ2aWNlLnJlc3NvdXJjZXMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1lc3NhZ2Ugc3VjY2VzIGNyZWF0aW9uIHJlc3NvdXJjZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzVXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyTWVzc2FnZSA9IFwiUmVzc291cmNlIENyw6llOiBcIiArIHRoaXMubXlSZXNzb3VyY2Uubm9tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZS5ub20gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teVJlc3NvdXJjZS5jb3VsZXVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzc291cmNlU2VydmljZS51cGRhdGVSZXNzb3VyY2UodGhpcy5teVJlc3NvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWRpdCBTVUNDRVMgOiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzVXNlck1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyTWVzc2FnZSA9IFwiUmVzc291cmNlIFNhdXZlZ2FyZMOpZTogXCIgKyB0aGlzLm15UmVzc291cmNlLm5vbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZXJSZXNzb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==

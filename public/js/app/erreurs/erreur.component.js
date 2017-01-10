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
var erreur_1 = require("./erreur");
var erreur_service_1 = require("./erreur.service");
var ErreurComponent = (function () {
    function ErreurComponent(_erreurService) {
        this._erreurService = _erreurService;
        this.erreurDisplay = 'none';
        this.erreurData = erreur_1.Erreur;
    }
    ErreurComponent.prototype.onErreurHandled = function () {
        this.erreurDisplay = 'none';
    };
    ErreurComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._erreurService.erreurArrivee.subscribe(function (erreurData) {
            _this.erreurData = erreurData;
            _this.erreurDisplay = 'block';
        });
    };
    return ErreurComponent;
}());
ErreurComponent = __decorate([
    core_1.Component({
        selector: 'my-erreur',
        template: "\n      <div class=\"backdrop\" [ngStyle]=\"{'display': erreurDisplay}\"></div>\n        <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" [ngStyle]=\"{'display': erreurDisplay}\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"onErreurHandled()\"><span aria-hidden=\"true\">&times;</span></button>\n                        <h4 class=\"modal-title\">{{erreurData?.titre}}</h4>\n                    </div>\n                    <div class=\"modal-body\">\n                     <p>{{erreurData?.message}}</p>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-default\" (click)=\"onErreurHandled()\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>   \n    ",
        styles: ["\n        .backdrop {\n            background-color: rgba(0,0,0,0.6);\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100vh;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [erreur_service_1.ErreurService])
], ErreurComponent);
exports.ErreurComponent = ErreurComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvZXJyZXVycy9lcnJldXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsbUNBQWtDO0FBQ2xDLG1EQUFpRDtBQWtDakQsSUFBYSxlQUFlO0lBSXhCLHlCQUFvQixjQUE0QjtRQUE1QixtQkFBYyxHQUFkLGNBQWMsQ0FBYztRQUhoRCxrQkFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixlQUFVLEdBQUcsZUFBTSxDQUFDO0lBRThCLENBQUM7SUFFbkQseUNBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQ3ZDLFVBQUEsVUFBVTtZQUNOLEtBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ2pDLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsSUFBQTtBQWxCWSxlQUFlO0lBaEMzQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLGkrQkFrQlQ7UUFDRCxNQUFNLEVBQUUsQ0FBQyx1TkFTUixDQUFDO0tBQ0wsQ0FBQztxQ0FLcUMsOEJBQWE7R0FKdkMsZUFBZSxDQWtCM0I7QUFsQlksMENBQWUiLCJmaWxlIjoiZXJyZXVycy9lcnJldXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXJyZXVyIH0gZnJvbSAnLi9lcnJldXInO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi9lcnJldXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktZXJyZXVyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrZHJvcFwiIFtuZ1N0eWxlXT1cInsnZGlzcGxheSc6IGVycmV1ckRpc3BsYXl9XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBbbmdTdHlsZV09XCJ7J2Rpc3BsYXknOiBlcnJldXJEaXNwbGF5fVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIChjbGljayk9XCJvbkVycmV1ckhhbmRsZWQoKVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+e3tlcnJldXJEYXRhPy50aXRyZX19PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8cD57e2VycmV1ckRhdGE/Lm1lc3NhZ2V9fTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cIm9uRXJyZXVySGFuZGxlZCgpXCI+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gICBcclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmJhY2tkcm9wIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwwLjYpO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgICAgbGVmdDogMDtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICAgICAgfVxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVycmV1ckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBlcnJldXJEaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgZXJyZXVyRGF0YSA9IEVycmV1cjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lcnJldXJTZXJ2aWNlOkVycmV1clNlcnZpY2Upe31cclxuXHJcbiAgICBvbkVycmV1ckhhbmRsZWQoKXtcclxuICAgICAgICB0aGlzLmVycmV1ckRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKXtcclxuICAgICAgICB0aGlzLl9lcnJldXJTZXJ2aWNlLmVycmV1ckFycml2ZWUuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBlcnJldXJEYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyZXVyRGF0YSA9IGVycmV1ckRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycmV1ckRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSJdfQ==

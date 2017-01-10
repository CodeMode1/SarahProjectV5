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
var LogoComponent = (function () {
    function LogoComponent() {
        this.alt = "Sarah logo";
        this.path = "./img/sarah-logo.png";
    }
    LogoComponent.prototype.ngOnInit = function () { };
    return LogoComponent;
}());
LogoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-logo',
        template: "\n    <div>\n        <img [src]=\"path\" alt=\"{{alt}}\" id=\"sarahLogo\">\n    </div>\n    ",
        styles: ["\n        img {\n            max-width:100%;\n            height:auto;\n            display:inline-block;\n            padding:20%;\n        }\n\n        div{\n            display:block;\n            float:left;\n            background-color: #e7edf5;\n            width:15%;\n            text-align:center;\n        }\n    "
        ]
    }),
    __metadata("design:paramtypes", [])
], LogoComponent);
exports.LogoComponent = LogoComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvaGVhZGVyL2hlYWRlci5sb2dvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBNEJsRCxJQUFhLGFBQWE7SUFHdEI7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO0lBQ3RDLENBQUM7SUFFRixnQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUNsQixvQkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksYUFBYTtJQTFCekIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsU0FBUztRQUNuQixRQUFRLEVBQUUsOEZBSVQ7UUFDRCxNQUFNLEVBQUUsQ0FBQyxzVUFlUjtTQUNBO0tBQ0osQ0FBQzs7R0FDVyxhQUFhLENBU3pCO0FBVFksc0NBQWEiLCJmaWxlIjoiaGVhZGVyL2hlYWRlci5sb2dvLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWxvZ28nLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXY+XHJcbiAgICAgICAgPGltZyBbc3JjXT1cInBhdGhcIiBhbHQ9XCJ7e2FsdH19XCIgaWQ9XCJzYXJhaExvZ29cIj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICBpbWcge1xyXG4gICAgICAgICAgICBtYXgtd2lkdGg6MTAwJTtcclxuICAgICAgICAgICAgaGVpZ2h0OmF1dG87XHJcbiAgICAgICAgICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICBwYWRkaW5nOjIwJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpdntcclxuICAgICAgICAgICAgZGlzcGxheTpibG9jaztcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U3ZWRmNTtcclxuICAgICAgICAgICAgd2lkdGg6MTUlO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICB9XHJcbiAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFsdDogc3RyaW5nO1xyXG4gICAgcGF0aDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hbHQgPSBcIlNhcmFoIGxvZ29cIjtcclxuICAgICAgICB0aGlzLnBhdGggPSBcIi4vaW1nL3NhcmFoLWxvZ28ucG5nXCI7XHJcbiAgICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyB9XHJcbn0iXX0=

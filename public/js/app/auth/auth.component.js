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
var auth_service_1 = require("./auth.service");
var AuthComponent = (function () {
    function AuthComponent(_authService) {
        this._authService = _authService;
    }
    AuthComponent.prototype.ngOnInit = function () { };
    AuthComponent.prototype.estLogIn = function () {
        return this._authService.estLogIn();
    };
    return AuthComponent;
}());
AuthComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-auth',
        template: "\n         <div class=\"row spacing\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li routerLinkActive=\"router-link-active\" *ngIf=\"!estLogIn()\"><a [routerLink]=\"['signup']\">Signup</a></li>\n                    <li routerLinkActive=\"router-link-active\" *ngIf=\"!estLogIn()\"><a [routerLink]=\"['signin']\">Signin</a></li>\n                    <li routerLinkActive=\"router-link-active\" *ngIf=\"estLogIn()\"><a [routerLink]=\"['logout']\">Logout</a></li>\n                </ul>\n            </nav>\n        </div>\n        <div class=\"row spacing\">\n            <router-outlet></router-outlet>\n        </div>\n    ",
        styles: ["\n        .router-link-active, a:active{\n            color:#555;\n            background-color: #fff;\n            border: #px solid #ddd;\n            border-bottom-color: transparent;\n        }\n\n        a{\n            font-size: 1vw;\n        }\n\n    "]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthComponent);
exports.AuthComponent = AuthComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvYXV0aC9hdXRoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELCtDQUE2QztBQWlDN0MsSUFBYSxhQUFhO0lBQ3RCLHVCQUFvQixZQUF5QjtRQUF6QixpQkFBWSxHQUFaLFlBQVksQ0FBYTtJQUFJLENBQUM7SUFFbEQsZ0NBQVEsR0FBUixjQUFhLENBQUM7SUFFZCxnQ0FBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7QUFSWSxhQUFhO0lBL0J6QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFFBQVEsRUFBRSwrckJBYVQ7UUFDRCxNQUFNLEVBQUUsQ0FBQyxxUUFZUixDQUFDO0tBQ0wsQ0FBQztxQ0FFb0MsMEJBQVc7R0FEcEMsYUFBYSxDQVF6QjtBQVJZLHNDQUFhIiwiZmlsZSI6ImF1dGgvYXV0aC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktYXV0aCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHNwYWNpbmdcIj5cclxuICAgICAgICAgICAgPG5hdiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIHJvdXRlckxpbmtBY3RpdmU9XCJyb3V0ZXItbGluay1hY3RpdmVcIiAqbmdJZj1cIiFlc3RMb2dJbigpXCI+PGEgW3JvdXRlckxpbmtdPVwiWydzaWdudXAnXVwiPlNpZ251cDwvYT48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSByb3V0ZXJMaW5rQWN0aXZlPVwicm91dGVyLWxpbmstYWN0aXZlXCIgKm5nSWY9XCIhZXN0TG9nSW4oKVwiPjxhIFtyb3V0ZXJMaW5rXT1cIlsnc2lnbmluJ11cIj5TaWduaW48L2E+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgcm91dGVyTGlua0FjdGl2ZT1cInJvdXRlci1saW5rLWFjdGl2ZVwiICpuZ0lmPVwiZXN0TG9nSW4oKVwiPjxhIFtyb3V0ZXJMaW5rXT1cIlsnbG9nb3V0J11cIj5Mb2dvdXQ8L2E+PC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxyXG4gICAgICAgICAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5yb3V0ZXItbGluay1hY3RpdmUsIGE6YWN0aXZle1xyXG4gICAgICAgICAgICBjb2xvcjojNTU1O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBib3JkZXI6ICNweCBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMXZ3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyB9XHJcblxyXG4gICAgZXN0TG9nSW4oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXV0aFNlcnZpY2UuZXN0TG9nSW4oKTtcclxuICAgIH1cclxufSJdfQ==

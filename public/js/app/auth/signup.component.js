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
var forms_1 = require("@angular/forms");
var user_1 = require("../users/user");
var auth_service_1 = require("./auth.service");
var erreur_service_1 = require("../erreurs/erreur.service");
var router_1 = require("@angular/router");
var SignupComponent = (function () {
    function SignupComponent(_formBuilder, _authService, _erreurService, _router) {
        this._formBuilder = _formBuilder;
        this._authService = _authService;
        this._erreurService = _erreurService;
        this._router = _router;
        this.sauvegardeUser = false;
        this.nomUser = "";
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.signupForm = this._formBuilder.group({
            prenom: ['', forms_1.Validators.required],
            nom: ['', forms_1.Validators.required],
            courriel: ['', [forms_1.Validators.required, this.estCourrielOK]],
            password: ['', forms_1.Validators.required]
        });
    };
    /* retourne 1 juste quand le courriel est valide
       reg exp fiable à 99.9% */
    SignupComponent.prototype.estCourrielOK = function (control) {
        if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"))
            return { courrielInvalide: true };
    };
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.signupForm.value);
        var user = new user_1.User(this.signupForm.value.courriel, this.signupForm.value.password, this.signupForm.value.prenom, this.signupForm.value.nom);
        console.log('sign up: ' + user.courriel + user.password + user.prenom + user.nom);
        this._authService.signUp(user)
            .subscribe(function (data) {
            console.log(data);
            _this.sauvegardeUser = true;
            _this.nomUser = (data.obj.prenom) + " " + (data.obj.nom);
        }, function (error) { return _this._erreurService.handleErreur(error); });
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-signup',
        template: "\n        <div class=\"alert alert-success col-md-12\" role=\"alert\" *ngIf=\"this.sauvegardeUser\">\n            <p>User Sauvegard\u00E9: {{this.nomUser}}</p>\n        </div>\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [formGroup]=\"signupForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"prenom\">Pr\u00E9nom</label>\n                    <input type=\"text\" id=\"prenom\" class=\"form-control\" formControlName=\"prenom\" placeholder=\"firstname\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"nom\">Nom</label>\n                    <input type=\"text\" id=\"nom\" class=\"form-control\" formControlName=\"nom\" placeholder=\"name\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"courriel\">Courriel</label>\n                    <input type=\"email\" id=\"courriel\" class=\"form-control\" formControlName=\"courriel\" placeholder=\"my@email.com\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Mot De Passe</label>\n                    <input type=\"password\" id=\"password\" class=\"form-control\" formControlName=\"password\" placeholder=\"password\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!signupForm.valid\">Sign Up</button>\n            </form>\n        </section>\n    "
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, auth_service_1.AuthService,
        erreur_service_1.ErreurService, router_1.Router])
], SignupComponent);
exports.SignupComponent = SignupComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvYXV0aC9zaWdudXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsd0NBQWlGO0FBQ2pGLHNDQUFxQztBQUNyQywrQ0FBNkM7QUFDN0MsNERBQTBEO0FBQzFELDBDQUF5QztBQWdDekMsSUFBYSxlQUFlO0lBS3hCLHlCQUFvQixZQUF5QixFQUFVLFlBQXlCLEVBQ3BFLGNBQTZCLEVBQVUsT0FBZTtRQUQ5QyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3BFLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUMxRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU4sa0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDdEMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ2pDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUM5QixRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDekQsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3RDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRjtnQ0FDNEI7SUFDbkIsdUNBQWEsR0FBckIsVUFBc0IsT0FBb0I7UUFDdEMsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyx1SUFBdUksQ0FBQyxDQUFDO1lBQzdKLE1BQU0sQ0FBQyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQUEsaUJBYUM7UUFaRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUN6QixTQUFTLENBQ04sVUFBQSxJQUFJO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixLQUFJLENBQUMsT0FBTyxHQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsRUFDQSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF2QyxDQUF1QyxDQUNuRCxDQUFDO0lBQ1YsQ0FBQztJQUNOLHNCQUFDO0FBQUQsQ0F6Q0EsQUF5Q0MsSUFBQTtBQXpDWSxlQUFlO0lBOUIzQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSwrK0NBeUJUO0tBQ0osQ0FBQztxQ0FNb0MsbUJBQVcsRUFBd0IsMEJBQVc7UUFDcEQsOEJBQWEsRUFBbUIsZUFBTTtHQU56RCxlQUFlLENBeUMzQjtBQXpDWSwwQ0FBZSIsImZpbGUiOiJhdXRoL3NpZ251cC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXJzL3VzZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJzsgXHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktc2lnbnVwJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgY29sLW1kLTEyXCIgcm9sZT1cImFsZXJ0XCIgKm5nSWY9XCJ0aGlzLnNhdXZlZ2FyZGVVc2VyXCI+XHJcbiAgICAgICAgICAgIDxwPlVzZXIgU2F1dmVnYXJkw6k6IHt7dGhpcy5ub21Vc2VyfX08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJzaWdudXBGb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByZW5vbVwiPlByw6lub208L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicHJlbm9tXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBmb3JtQ29udHJvbE5hbWU9XCJwcmVub21cIiBwbGFjZWhvbGRlcj1cImZpcnN0bmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJub21cIj5Ob208L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibm9tXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBmb3JtQ29udHJvbE5hbWU9XCJub21cIiBwbGFjZWhvbGRlcj1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY291cnJpZWxcIj5Db3VycmllbDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiY291cnJpZWxcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGZvcm1Db250cm9sTmFtZT1cImNvdXJyaWVsXCIgcGxhY2Vob2xkZXI9XCJteUBlbWFpbC5jb21cIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5Nb3QgRGUgUGFzc2U8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBmb3JtQ29udHJvbE5hbWU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwicGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIXNpZ251cEZvcm0udmFsaWRcIj5TaWduIFVwPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWdudXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgc2lnbnVwRm9ybTogRm9ybUdyb3VwO1xyXG4gICAgc2F1dmVnYXJkZVVzZXI6IGJvb2xlYW47XHJcbiAgICBub21Vc2VyOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Zvcm1CdWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBcclxuICAgICAgICBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNhdXZlZ2FyZGVVc2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9tVXNlciA9IFwiXCI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNpZ251cEZvcm0gPSB0aGlzLl9mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgIHByZW5vbTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgbm9tOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICBjb3VycmllbDogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgdGhpcy5lc3RDb3VycmllbE9LXV0sXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgfVxyXG5cclxuICAgIC8qIHJldG91cm5lIDEganVzdGUgcXVhbmQgbGUgY291cnJpZWwgZXN0IHZhbGlkZSBcclxuICAgICAgIHJlZyBleHAgZmlhYmxlIMOgIDk5LjklICovXHJcbiAgICAgcHJpdmF0ZSBlc3RDb3VycmllbE9LKGNvbnRyb2w6IEZvcm1Db250cm9sKToge1tjaGFpbmU6IHN0cmluZ106IGJvb2xlYW59e1xyXG4gICAgICAgICBpZighY29udHJvbC52YWx1ZS5tYXRjaChcIlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1wiKSlcclxuICAgICAgICAgICAgIHJldHVybiB7IGNvdXJyaWVsSW52YWxpZGU6IHRydWV9O1xyXG4gICAgIH1cclxuXHJcbiAgICAgb25TdWJtaXQoKXtcclxuICAgICAgICAgY29uc29sZS5sb2codGhpcy5zaWdudXBGb3JtLnZhbHVlKTtcclxuICAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHRoaXMuc2lnbnVwRm9ybS52YWx1ZS5jb3VycmllbCwgdGhpcy5zaWdudXBGb3JtLnZhbHVlLnBhc3N3b3JkLCB0aGlzLnNpZ251cEZvcm0udmFsdWUucHJlbm9tLCB0aGlzLnNpZ251cEZvcm0udmFsdWUubm9tKTtcclxuICAgICAgICAgY29uc29sZS5sb2coJ3NpZ24gdXA6ICcgKyB1c2VyLmNvdXJyaWVsICsgdXNlci5wYXNzd29yZCArIHVzZXIucHJlbm9tICsgdXNlci5ub20pO1xyXG4gICAgICAgICB0aGlzLl9hdXRoU2VydmljZS5zaWduVXAodXNlcilcclxuICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXV2ZWdhcmRlVXNlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9tVXNlciA9IDxVc2VyPihkYXRhLm9iai5wcmVub20pICsgXCIgXCIgKyA8VXNlcj4oZGF0YS5vYmoubm9tKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICApO1xyXG4gICAgIH1cclxufSJdfQ==

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
var user_1 = require("../users/user");
var auth_service_1 = require("./auth.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var erreur_service_1 = require("../erreurs/erreur.service");
var SigninComponent = (function () {
    function SigninComponent(_formBuilder, _authService, _router, _erreurService) {
        this._formBuilder = _formBuilder;
        this._authService = _authService;
        this._router = _router;
        this._erreurService = _erreurService;
    }
    SigninComponent.prototype.ngOnInit = function () {
        this.signinForm = this._formBuilder.group({
            courriel: ['', [forms_1.Validators.required, this.estCourrielOK]],
            password: ['', forms_1.Validators.required]
        });
    };
    /* retourne 1 juste quand le courriel est valide
       reg exp fiable à 99.9% */
    SigninComponent.prototype.estCourrielOK = function (control) {
        if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"))
            return { courrielInvalide: true };
    };
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.signinForm.value);
        var user = new user_1.User(this.signinForm.value.courriel, this.signinForm.value.password);
        console.log('sign in: ' + user.courriel + user.password);
        this._authService.signIn(user)
            .subscribe(function (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userName', data.userName);
            // id du logged in user : console.log(localStorage.getItem('userId'));
        }, function (error) { return _this._erreurService.handleErreur(error); });
    };
    return SigninComponent;
}());
SigninComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-signin',
        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [formGroup]=\"signinForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"courriel\">Courriel</label>\n                    <input type=\"email\" id=\"courriel\" class=\"form-control\" formControlName=\"courriel\" placeholder=\"my@email.com\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Mot De Passe</label>\n                    <input type=\"password\" id=\"password\" class=\"form-control\" formControlName=\"password\" placeholder=\"password\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!signinForm.valid\">Sign In</button>\n            </form>\n        </section>\n    "
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, auth_service_1.AuthService, router_1.Router, erreur_service_1.ErreurService])
], SigninComponent);
exports.SigninComponent = SigninComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvYXV0aC9zaWduaW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0NBQXFDO0FBQ3JDLCtDQUE2QztBQUM3QywwQ0FBeUM7QUFDekMsd0NBQWlGO0FBQ2pGLDREQUEwRDtBQXFCMUQsSUFBYSxlQUFlO0lBR3hCLHlCQUFvQixZQUF5QixFQUFVLFlBQXlCLEVBQVUsT0FBZSxFQUFVLGNBQTZCO1FBQTVILGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7SUFBSSxDQUFDO0lBRXJKLGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6RCxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7U0FDdEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEO2dDQUM0QjtJQUNwQix1Q0FBYSxHQUFyQixVQUFzQixPQUFvQjtRQUN0QyxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHVJQUF1SSxDQUFDLENBQUM7WUFDN0osTUFBTSxDQUFDLEVBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFNLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3pCLFNBQVMsQ0FDTixVQUFBLElBQUk7WUFDQSxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxzRUFBc0U7UUFDMUUsQ0FBQyxFQUNELFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQ25ELENBQUM7SUFDVixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQWxDQSxBQWtDQyxJQUFBO0FBbENZLGVBQWU7SUFuQjNCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLHMwQkFjVDtLQUNKLENBQUM7cUNBSW9DLG1CQUFXLEVBQXdCLDBCQUFXLEVBQW1CLGVBQU0sRUFBMEIsOEJBQWE7R0FIdkksZUFBZSxDQWtDM0I7QUFsQ1ksMENBQWUiLCJmaWxlIjoiYXV0aC9zaWduaW4uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXJzL3VzZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktc2lnbmluJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJzaWduaW5Gb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvdXJyaWVsXCI+Q291cnJpZWw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImNvdXJyaWVsXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBmb3JtQ29udHJvbE5hbWU9XCJjb3VycmllbFwiIHBsYWNlaG9sZGVyPVwibXlAZW1haWwuY29tXCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+TW90IERlIFBhc3NlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgZm9ybUNvbnRyb2xOYW1lPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cInBhc3N3b3JkXCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiFzaWduaW5Gb3JtLnZhbGlkXCI+U2lnbiBJbjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2lnbmluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHNpZ25pbkZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgX2F1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX2VycmV1clNlcnZpY2U6IEVycmV1clNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyBcclxuICAgICAgICB0aGlzLnNpZ25pbkZvcm0gPSB0aGlzLl9mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgIGNvdXJyaWVsOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCB0aGlzLmVzdENvdXJyaWVsT0tdXSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiByZXRvdXJuZSAxIGp1c3RlIHF1YW5kIGxlIGNvdXJyaWVsIGVzdCB2YWxpZGUgXHJcbiAgICAgICByZWcgZXhwIGZpYWJsZSDDoCA5OS45JSAqL1xyXG4gICAgcHJpdmF0ZSBlc3RDb3VycmllbE9LKGNvbnRyb2w6IEZvcm1Db250cm9sKToge1tjaGFpbmU6IHN0cmluZ106IGJvb2xlYW59e1xyXG4gICAgICAgIGlmKCFjb250cm9sLnZhbHVlLm1hdGNoKFwiW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlxcLlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSspKkAoPzpbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XFwuKStbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XCIpKVxyXG4gICAgICAgICAgICByZXR1cm4ge2NvdXJyaWVsSW52YWxpZGU6IHRydWV9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zaWduaW5Gb3JtLnZhbHVlKTtcclxuICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodGhpcy5zaWduaW5Gb3JtLnZhbHVlLmNvdXJyaWVsLCB0aGlzLnNpZ25pbkZvcm0udmFsdWUucGFzc3dvcmQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduIGluOiAnICsgdXNlci5jb3VycmllbCArIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgICAgIHRoaXMuX2F1dGhTZXJ2aWNlLnNpZ25Jbih1c2VyKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJJZCcsIGRhdGEudXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlck5hbWUnLCBkYXRhLnVzZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZCBkdSBsb2dnZWQgaW4gdXNlciA6IGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIl19

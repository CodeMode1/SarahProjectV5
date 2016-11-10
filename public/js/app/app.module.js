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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var core_2 = require('@angular/core');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var header_component_1 = require('./header/header.component');
var header_logo_component_1 = require('./header/header.logo.component');
var login_component_1 = require('./login/login.component');
var home_component_1 = require('./login/home.component');
var app_routes_1 = require('./app.routes');
//auth
var auth_component_1 = require('./auth/auth.component');
var signin_component_1 = require('./auth/signin.component');
var logout_component_1 = require('./auth/logout.component');
var signup_component_1 = require('./auth/signup.component');
var auth_service_1 = require('./auth/auth.service');
//erreurs
var erreur_component_1 = require('./erreurs/erreur.component');
var erreur_service_1 = require('./erreurs/erreur.service');
//client
var clients_component_1 = require('./clients/clients.component');
var client_edit_component_1 = require('./clients/client-edit.component');
var client_list_component_1 = require('./clients/client-list.component');
var client_service_1 = require('./clients/client.service');
//pipes
var capitalize_pipe_1 = require('./pipes/capitalize.pipe');
var noClient_pipe_1 = require('./pipes/noClient.pipe');
var noEvenement_pipe_1 = require('./pipes/noEvenement.pipe');
var orderBy_pipe_1 = require('./pipes/orderBy.pipe');
//nouvelles
var nouvelles_component_1 = require('./login/nouvelles.component');
//evenements
var evenements_component_1 = require('./evenements/evenements.component');
var evenement_list_component_1 = require('./evenements/evenement-list.component');
var evenement_edit_component_1 = require('./evenements/evenement-edit.component');
var evenement_service_1 = require('./evenements/evenement.service');
//activites
var activite_list_component_1 = require('./activites/activite-list.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, header_component_1.HeaderComponent, header_logo_component_1.LogoComponent, login_component_1.LoginComponent, home_component_1.HomeComponent, signin_component_1.SigninComponent, logout_component_1.LogoutComponent,
                signup_component_1.SignupComponent, auth_component_1.AuthComponent, erreur_component_1.ErreurComponent, clients_component_1.ClientsComponent, client_edit_component_1.EditClientComponent, client_list_component_1.ClientListComponent, nouvelles_component_1.NouvellesComponent,
                capitalize_pipe_1.CapitalizePipe, noClient_pipe_1.NoClientPipe, evenements_component_1.EvenementsComponent, evenement_list_component_1.EvenementListComponent, evenement_edit_component_1.EvenementEditComponent, noEvenement_pipe_1.NoEvenementPipe, activite_list_component_1.ActiviteListComponent,
                orderBy_pipe_1.OrderByPipe],
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routes_1.routing],
            bootstrap: [app_component_1.AppComponent],
            providers: [core_2.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }), auth_service_1.AuthService, erreur_service_1.ErreurService, client_service_1.ClientService, evenement_service_1.EvenementService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSAgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IExvY2F0aW9uU3RyYXRlZ3ksIEhhc2hMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgcHJvdmlkZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSAgIGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMb2dvQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmxvZ28uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tICcuL2xvZ2luL2hvbWUuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tICcuL2FwcC5yb3V0ZXMnO1xyXG5cclxuLy9hdXRoXHJcbmltcG9ydCB7IEF1dGhDb21wb25lbnQgfSBmcm9tICcuL2F1dGgvYXV0aC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaWduaW5Db21wb25lbnQgfSBmcm9tICcuL2F1dGgvc2lnbmluLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvZ291dENvbXBvbmVudCB9IGZyb20gJy4vYXV0aC9sb2dvdXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lnbnVwQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL3NpZ251cC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC9hdXRoLnNlcnZpY2UnO1xyXG5cclxuLy9lcnJldXJzXHJcbmltcG9ydCB7IEVycmV1ckNvbXBvbmVudCB9IGZyb20gJy4vZXJyZXVycy9lcnJldXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcblxyXG4vL2NsaWVudFxyXG5pbXBvcnQgeyBDbGllbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9jbGllbnRzL2NsaWVudHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRWRpdENsaWVudENvbXBvbmVudCB9IGZyb20gJy4vY2xpZW50cy9jbGllbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jbGllbnRzL2NsaWVudC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuL2NsaWVudHMvY2xpZW50LnNlcnZpY2UnO1xyXG5cclxuLy9waXBlc1xyXG5pbXBvcnQgeyBDYXBpdGFsaXplUGlwZSB9IGZyb20gJy4vcGlwZXMvY2FwaXRhbGl6ZS5waXBlJztcclxuaW1wb3J0IHsgTm9DbGllbnRQaXBlIH0gZnJvbSAnLi9waXBlcy9ub0NsaWVudC5waXBlJztcclxuaW1wb3J0IHsgTm9FdmVuZW1lbnRQaXBlIH0gZnJvbSAnLi9waXBlcy9ub0V2ZW5lbWVudC5waXBlJztcclxuaW1wb3J0IHsgT3JkZXJCeVBpcGUgfSBmcm9tICcuL3BpcGVzL29yZGVyQnkucGlwZSc7XHJcblxyXG4vL25vdXZlbGxlc1xyXG5pbXBvcnQgeyBOb3V2ZWxsZXNDb21wb25lbnQgfSBmcm9tICcuL2xvZ2luL25vdXZlbGxlcy5jb21wb25lbnQnO1xyXG5cclxuLy9ldmVuZW1lbnRzXHJcbmltcG9ydCB7IEV2ZW5lbWVudHNDb21wb25lbnQgfSBmcm9tICcuL2V2ZW5lbWVudHMvZXZlbmVtZW50cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFdmVuZW1lbnRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9ldmVuZW1lbnRzL2V2ZW5lbWVudC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2V2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRXZlbmVtZW50U2VydmljZSB9IGZyb20gJy4vZXZlbmVtZW50cy9ldmVuZW1lbnQuc2VydmljZSc7XHJcblxyXG4vL2FjdGl2aXRlc1xyXG5pbXBvcnQgeyBBY3Rpdml0ZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2FjdGl2aXRlcy9hY3Rpdml0ZS1saXN0LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG5kZWNsYXJhdGlvbnM6IFtBcHBDb21wb25lbnQsIEhlYWRlckNvbXBvbmVudCwgTG9nb0NvbXBvbmVudCwgTG9naW5Db21wb25lbnQsIEhvbWVDb21wb25lbnQsIFNpZ25pbkNvbXBvbmVudCwgTG9nb3V0Q29tcG9uZW50LCBcclxuICAgIFNpZ251cENvbXBvbmVudCwgQXV0aENvbXBvbmVudCwgRXJyZXVyQ29tcG9uZW50LCBDbGllbnRzQ29tcG9uZW50LCBFZGl0Q2xpZW50Q29tcG9uZW50LCBDbGllbnRMaXN0Q29tcG9uZW50LCBOb3V2ZWxsZXNDb21wb25lbnQsXHJcbiAgICBDYXBpdGFsaXplUGlwZSwgTm9DbGllbnRQaXBlLCBFdmVuZW1lbnRzQ29tcG9uZW50LCBFdmVuZW1lbnRMaXN0Q29tcG9uZW50LCBFdmVuZW1lbnRFZGl0Q29tcG9uZW50LCBOb0V2ZW5lbWVudFBpcGUsIEFjdGl2aXRlTGlzdENvbXBvbmVudCxcclxuICAgIE9yZGVyQnlQaXBlXSwgXHJcbmltcG9ydHM6IFtCcm93c2VyTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgSHR0cE1vZHVsZSwgcm91dGluZ10sXHJcbmJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXHJcbnByb3ZpZGVyczogW3Byb3ZpZGUoTG9jYXRpb25TdHJhdGVneSwge3VzZUNsYXNzOiBIYXNoTG9jYXRpb25TdHJhdGVneX0pLCBBdXRoU2VydmljZSwgRXJyZXVyU2VydmljZSwgQ2xpZW50U2VydmljZSwgRXZlbmVtZW50U2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxyXG4iXX0=

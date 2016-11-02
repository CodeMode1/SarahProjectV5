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
//nouvelles
var nouvelles_component_1 = require('./login/nouvelles.component');
//evenements
var evenements_component_1 = require('./evenements/evenements.component');
var evenement_list_component_1 = require('./evenements/evenement-list.component');
var evenement_edit_component_1 = require('./evenements/evenement-edit.component');
var evenement_service_1 = require('./evenements/evenement.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, header_component_1.HeaderComponent, header_logo_component_1.LogoComponent, login_component_1.LoginComponent, home_component_1.HomeComponent, signin_component_1.SigninComponent, logout_component_1.LogoutComponent,
                signup_component_1.SignupComponent, auth_component_1.AuthComponent, erreur_component_1.ErreurComponent, clients_component_1.ClientsComponent, client_edit_component_1.EditClientComponent, client_list_component_1.ClientListComponent, nouvelles_component_1.NouvellesComponent,
                capitalize_pipe_1.CapitalizePipe, noClient_pipe_1.NoClientPipe, evenements_component_1.EvenementsComponent, evenement_list_component_1.EvenementListComponent, evenement_edit_component_1.EvenementEditComponent, noEvenement_pipe_1.NoEvenementPipe],
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routes_1.routing],
            bootstrap: [app_component_1.AppComponent],
            providers: [core_2.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }), auth_service_1.AuthService, erreur_service_1.ErreurService, client_service_1.ClientService, evenement_service_1.EvenementService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6QyxpQ0FBK0IsMkJBQTJCLENBQUMsQ0FBQTtBQUMzRCxzQkFBaUQsZ0JBQWdCLENBQUMsQ0FBQTtBQUNsRSx1QkFBdUQsaUJBQWlCLENBQUMsQ0FBQTtBQUN6RSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBRTNDLDhCQUErQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2pELGlDQUFnQywyQkFBMkIsQ0FBQyxDQUFBO0FBQzVELHNDQUE4QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQy9ELGdDQUErQix5QkFBeUIsQ0FBQyxDQUFBO0FBQ3pELCtCQUE4Qix3QkFBd0IsQ0FBQyxDQUFBO0FBRXZELDJCQUF3QixjQUFjLENBQUMsQ0FBQTtBQUV2QyxNQUFNO0FBQ04sK0JBQThCLHVCQUF1QixDQUFDLENBQUE7QUFDdEQsaUNBQWdDLHlCQUF5QixDQUFDLENBQUE7QUFDMUQsaUNBQWdDLHlCQUF5QixDQUFDLENBQUE7QUFDMUQsaUNBQWdDLHlCQUF5QixDQUFDLENBQUE7QUFDMUQsNkJBQTRCLHFCQUFxQixDQUFDLENBQUE7QUFFbEQsU0FBUztBQUNULGlDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBQzdELCtCQUE4QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXpELFFBQVE7QUFDUixrQ0FBaUMsNkJBQTZCLENBQUMsQ0FBQTtBQUMvRCxzQ0FBb0MsaUNBQWlDLENBQUMsQ0FBQTtBQUN0RSxzQ0FBb0MsaUNBQWlDLENBQUMsQ0FBQTtBQUN0RSwrQkFBOEIsMEJBQTBCLENBQUMsQ0FBQTtBQUV6RCxPQUFPO0FBQ1AsZ0NBQStCLHlCQUF5QixDQUFDLENBQUE7QUFDekQsOEJBQTZCLHVCQUF1QixDQUFDLENBQUE7QUFDckQsaUNBQWdDLDBCQUEwQixDQUFDLENBQUE7QUFFM0QsV0FBVztBQUNYLG9DQUFtQyw2QkFBNkIsQ0FBQyxDQUFBO0FBRWpFLFlBQVk7QUFDWixxQ0FBb0MsbUNBQW1DLENBQUMsQ0FBQTtBQUN4RSx5Q0FBdUMsdUNBQXVDLENBQUMsQ0FBQTtBQUMvRSx5Q0FBdUMsdUNBQXVDLENBQUMsQ0FBQTtBQUMvRSxrQ0FBaUMsZ0NBQWdDLENBQUMsQ0FBQTtBQVVsRTtJQUFBO0lBQXdCLENBQUM7SUFSekI7UUFBQyxlQUFRLENBQUM7WUFDVixZQUFZLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtDQUFlLEVBQUUscUNBQWEsRUFBRSxnQ0FBYyxFQUFFLDhCQUFhLEVBQUUsa0NBQWUsRUFBRSxrQ0FBZTtnQkFDeEgsa0NBQWUsRUFBRSw4QkFBYSxFQUFFLGtDQUFlLEVBQUUsb0NBQWdCLEVBQUUsMkNBQW1CLEVBQUUsMkNBQW1CLEVBQUUsd0NBQWtCO2dCQUMvSCxnQ0FBYyxFQUFFLDRCQUFZLEVBQUUsMENBQW1CLEVBQUUsaURBQXNCLEVBQUUsaURBQXNCLEVBQUUsa0NBQWUsQ0FBQztZQUN2SCxPQUFPLEVBQUUsQ0FBQyxnQ0FBYSxFQUFFLG1CQUFXLEVBQUUsMkJBQW1CLEVBQUUsaUJBQVUsRUFBRSxvQkFBTyxDQUFDO1lBQy9FLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsU0FBUyxFQUFFLENBQUMsY0FBTyxDQUFDLHlCQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLDZCQUFvQixFQUFDLENBQUMsRUFBRSwwQkFBVyxFQUFFLDhCQUFhLEVBQUUsOEJBQWEsRUFBRSxvQ0FBZ0IsQ0FBQztTQUNwSSxDQUFDOztpQkFBQTtJQUNzQixnQkFBQztBQUFELENBQXhCLEFBQXlCLElBQUE7QUFBWixpQkFBUyxZQUFHLENBQUEiLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBMb2NhdGlvblN0cmF0ZWd5LCBIYXNoTG9jYXRpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IHByb3ZpZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gICBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTG9nb0NvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVyL2hlYWRlci5sb2dvLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi9ob21lLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyByb3V0aW5nIH0gZnJvbSAnLi9hcHAucm91dGVzJztcclxuXHJcbi8vYXV0aFxyXG5pbXBvcnQgeyBBdXRoQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL2F1dGguY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lnbmluQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL3NpZ25pbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMb2dvdXRDb21wb25lbnQgfSBmcm9tICcuL2F1dGgvbG9nb3V0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNpZ251cENvbXBvbmVudCB9IGZyb20gJy4vYXV0aC9zaWdudXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuXHJcbi8vZXJyZXVyc1xyXG5pbXBvcnQgeyBFcnJldXJDb21wb25lbnQgfSBmcm9tICcuL2VycmV1cnMvZXJyZXVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5cclxuLy9jbGllbnRcclxuaW1wb3J0IHsgQ2xpZW50c0NvbXBvbmVudCB9IGZyb20gJy4vY2xpZW50cy9jbGllbnRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEVkaXRDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL2NsaWVudHMvY2xpZW50LWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2xpZW50TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY2xpZW50cy9jbGllbnQtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9jbGllbnRzL2NsaWVudC5zZXJ2aWNlJztcclxuXHJcbi8vcGlwZXNcclxuaW1wb3J0IHsgQ2FwaXRhbGl6ZVBpcGUgfSBmcm9tICcuL3BpcGVzL2NhcGl0YWxpemUucGlwZSc7XHJcbmltcG9ydCB7IE5vQ2xpZW50UGlwZSB9IGZyb20gJy4vcGlwZXMvbm9DbGllbnQucGlwZSc7XHJcbmltcG9ydCB7IE5vRXZlbmVtZW50UGlwZSB9IGZyb20gJy4vcGlwZXMvbm9FdmVuZW1lbnQucGlwZSc7XHJcblxyXG4vL25vdXZlbGxlc1xyXG5pbXBvcnQgeyBOb3V2ZWxsZXNDb21wb25lbnQgfSBmcm9tICcuL2xvZ2luL25vdXZlbGxlcy5jb21wb25lbnQnO1xyXG5cclxuLy9ldmVuZW1lbnRzXHJcbmltcG9ydCB7IEV2ZW5lbWVudHNDb21wb25lbnQgfSBmcm9tICcuL2V2ZW5lbWVudHMvZXZlbmVtZW50cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFdmVuZW1lbnRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9ldmVuZW1lbnRzL2V2ZW5lbWVudC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2V2ZW5lbWVudHMvZXZlbmVtZW50LWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRXZlbmVtZW50U2VydmljZSB9IGZyb20gJy4vZXZlbmVtZW50cy9ldmVuZW1lbnQuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG5kZWNsYXJhdGlvbnM6IFtBcHBDb21wb25lbnQsIEhlYWRlckNvbXBvbmVudCwgTG9nb0NvbXBvbmVudCwgTG9naW5Db21wb25lbnQsIEhvbWVDb21wb25lbnQsIFNpZ25pbkNvbXBvbmVudCwgTG9nb3V0Q29tcG9uZW50LCBcclxuICAgIFNpZ251cENvbXBvbmVudCwgQXV0aENvbXBvbmVudCwgRXJyZXVyQ29tcG9uZW50LCBDbGllbnRzQ29tcG9uZW50LCBFZGl0Q2xpZW50Q29tcG9uZW50LCBDbGllbnRMaXN0Q29tcG9uZW50LCBOb3V2ZWxsZXNDb21wb25lbnQsXHJcbiAgICBDYXBpdGFsaXplUGlwZSwgTm9DbGllbnRQaXBlLCBFdmVuZW1lbnRzQ29tcG9uZW50LCBFdmVuZW1lbnRMaXN0Q29tcG9uZW50LCBFdmVuZW1lbnRFZGl0Q29tcG9uZW50LCBOb0V2ZW5lbWVudFBpcGVdLCBcclxuaW1wb3J0czogW0Jyb3dzZXJNb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBIdHRwTW9kdWxlLCByb3V0aW5nXSxcclxuYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XSxcclxucHJvdmlkZXJzOiBbcHJvdmlkZShMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IEhhc2hMb2NhdGlvblN0cmF0ZWd5fSksIEF1dGhTZXJ2aWNlLCBFcnJldXJTZXJ2aWNlLCBDbGllbnRTZXJ2aWNlLCBFdmVuZW1lbnRTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XHJcbiJdfQ==

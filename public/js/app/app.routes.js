"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./login/home.component");
var auth_component_1 = require("./auth/auth.component");
var user_routes_1 = require("./auth/user.routes");
var clients_component_1 = require("./clients/clients.component");
var client_routes_1 = require("./clients/client.routes");
var evenements_component_1 = require("./evenements/evenements.component");
var evenement_routes_1 = require("./evenements/evenement.routes");
var ressource_list_component_1 = require("./ressources/ressource-list.component");
var agenda_component_1 = require("./agenda/agenda.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'auth', component: auth_component_1.AuthComponent, children: user_routes_1.USER_ROUTES },
    { path: 'clients', component: clients_component_1.ClientsComponent, children: client_routes_1.CLIENT_ROUTES },
    { path: 'evenements', component: evenements_component_1.EvenementsComponent, children: evenement_routes_1.EVENEMENT_ROUTES },
    { path: 'ressources', component: ressource_list_component_1.RessourceListComponent },
    { path: 'agenda', component: agenda_component_1.AgendaComponent }
];
exports.routing = router_1.RouterModule.forRoot(routes);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvYXBwLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMENBQXVEO0FBQ3ZELHlEQUF1RDtBQUV2RCx3REFBc0Q7QUFDdEQsa0RBQWlEO0FBRWpELGlFQUErRDtBQUMvRCx5REFBd0Q7QUFFeEQsMEVBQXdFO0FBQ3hFLGtFQUFpRTtBQUVqRSxrRkFBK0U7QUFFL0UsOERBQTREO0FBRTVELElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsOEJBQWEsRUFBQztJQUNyQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLDhCQUFhLEVBQUUsUUFBUSxFQUFFLHlCQUFXLEVBQUU7SUFDakUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRSxRQUFRLEVBQUUsNkJBQWEsRUFBQztJQUN4RSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLDBDQUFtQixFQUFFLFFBQVEsRUFBRSxtQ0FBZ0IsRUFBQztJQUNqRixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGlEQUFzQixFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsa0NBQWUsRUFBRTtDQUNqRCxDQUFDO0FBRVcsUUFBQSxPQUFPLEdBQUcscUJBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoiYXBwLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4vbG9naW4vaG9tZS5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgQXV0aENvbXBvbmVudCB9IGZyb20gJy4vYXV0aC9hdXRoLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFVTRVJfUk9VVEVTIH0gZnJvbSAnLi9hdXRoL3VzZXIucm91dGVzJztcclxuXHJcbmltcG9ydCB7IENsaWVudHNDb21wb25lbnQgfSBmcm9tICcuL2NsaWVudHMvY2xpZW50cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDTElFTlRfUk9VVEVTIH0gZnJvbSAnLi9jbGllbnRzL2NsaWVudC5yb3V0ZXMnO1xyXG5cclxuaW1wb3J0IHsgRXZlbmVtZW50c0NvbXBvbmVudCB9IGZyb20gJy4vZXZlbmVtZW50cy9ldmVuZW1lbnRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEVWRU5FTUVOVF9ST1VURVMgfSBmcm9tICcuL2V2ZW5lbWVudHMvZXZlbmVtZW50LnJvdXRlcyc7XHJcblxyXG5pbXBvcnQgeyBSZXNzb3VyY2VMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9yZXNzb3VyY2VzL3Jlc3NvdXJjZS1saXN0LmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBBZ2VuZGFDb21wb25lbnQgfSBmcm9tICcuL2FnZW5kYS9hZ2VuZGEuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gICAgeyBwYXRoOiAnJywgY29tcG9uZW50OiBIb21lQ29tcG9uZW50fSxcclxuICAgIHsgcGF0aDogJ2F1dGgnLCBjb21wb25lbnQ6IEF1dGhDb21wb25lbnQsIGNoaWxkcmVuOiBVU0VSX1JPVVRFUyB9LFxyXG4gICAgeyBwYXRoOiAnY2xpZW50cycsIGNvbXBvbmVudDogQ2xpZW50c0NvbXBvbmVudCwgY2hpbGRyZW46IENMSUVOVF9ST1VURVN9LFxyXG4gICAgeyBwYXRoOiAnZXZlbmVtZW50cycsIGNvbXBvbmVudDogRXZlbmVtZW50c0NvbXBvbmVudCwgY2hpbGRyZW46IEVWRU5FTUVOVF9ST1VURVN9LFxyXG4gICAgeyBwYXRoOiAncmVzc291cmNlcycsIGNvbXBvbmVudDogUmVzc291cmNlTGlzdENvbXBvbmVudCB9LFxyXG4gICAgeyBwYXRoOiAnYWdlbmRhJywgY29tcG9uZW50OiBBZ2VuZGFDb21wb25lbnQgfVxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRpbmcgPSBSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpOyJdfQ==

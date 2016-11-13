import { RouterConfig, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './login/home.component';

import { AuthComponent } from './auth/auth.component';
import { USER_ROUTES } from './auth/user.routes';

import { ClientsComponent } from './clients/clients.component';
import { CLIENT_ROUTES } from './clients/client.routes';

import { EvenementsComponent } from './evenements/evenements.component';
import { EVENEMENT_ROUTES } from './evenements/evenement.routes';

import { RessourceListComponent } from './ressources/ressource-list.component';



const routes: RouterConfig = ([
    { path: '', component: HomeComponent},
    { path: 'auth', component: AuthComponent, children: USER_ROUTES },
    { path: 'clients', component: ClientsComponent, children: CLIENT_ROUTES},
    { path: 'evenements', component: EvenementsComponent, children: EVENEMENT_ROUTES},
    { path: 'ressources', component: RessourceListComponent }
]);

export const routing = RouterModule.forRoot(routes);
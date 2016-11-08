import { RouterConfig, Routes, RouterModule } from '@angular/router';
import { EditClientComponent } from './client-edit.component';
import { ClientListComponent } from './client-list.component';

export const CLIENT_ROUTES: RouterConfig = [
    { path: '', component: ClientListComponent},
    { path: 'creer', component: EditClientComponent},
    { path: ':id/edit', component: EditClientComponent},
    { path: ':id/copie', component: EditClientComponent}
];


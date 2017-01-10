import { Routes, RouterModule } from '@angular/router';
import { EvenementListComponent } from './evenement-list.component';
import { EvenementEditComponent } from './evenement-edit.component';


export const EVENEMENT_ROUTES: Routes = [
    { path: '', component: EvenementListComponent},
    { path: 'creer', component: EvenementEditComponent},
    { path: ':id/edit', component: EvenementEditComponent},
    { path: ':id/copie', component: EvenementEditComponent}
];

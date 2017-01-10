import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';

export const USER_ROUTES: Routes = [
    { path: '', component: SignupComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'logout', component: LogoutComponent}
];

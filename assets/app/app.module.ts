import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provide } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './header/header.logo.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './login/home.component';

import { routing } from './app.routes';

//auth
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin.component';
import { LogoutComponent } from './auth/logout.component';
import { SignupComponent } from './auth/signup.component';
import { AuthService } from './auth/auth.service';

//erreurs
import { ErreurComponent } from './erreurs/erreur.component';
import { ErreurService } from './erreurs/erreur.service';

//client
import { ClientsComponent } from './clients/clients.component';
import { EditClientComponent } from './clients/client-edit.component';
import { ClientListComponent } from './clients/client-list.component';
import { ClientService } from './clients/client.service';

//pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { NoClientPipe } from './pipes/noClient.pipe';
import { NoEvenementPipe } from './pipes/noEvenement.pipe';
import { OrderByPipe } from './pipes/orderBy.pipe';

//nouvelles
import { NouvellesComponent } from './login/nouvelles.component';

//evenements
import { EvenementsComponent } from './evenements/evenements.component';
import { EvenementListComponent } from './evenements/evenement-list.component';
import { EvenementEditComponent } from './evenements/evenement-edit.component';
import { EvenementService } from './evenements/evenement.service';

//activites
import { ActiviteListComponent } from './activites/activite-list.component';

//ressources
import { RessourceEditComponent } from './ressources/ressource-edit.component';
import { RessourceListComponent } from './ressources/ressource-list.component';
import { RessourceService } from './ressources/ressource.service';

//services
import { ServiceListComponent } from './services/service-list.component';

//agenda
import { AgendaComponent } from './agenda/agenda.component';
import { AgendaService } from './agenda/agenda.service';

//ng2 datetime picker
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

//pagination
import {Ng2PaginationModule} from 'ng2-pagination';

//spinner
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
declarations: [AppComponent, HeaderComponent, LogoComponent, LoginComponent, HomeComponent, SigninComponent, LogoutComponent, 
    SignupComponent, AuthComponent, ErreurComponent, ClientsComponent, EditClientComponent, ClientListComponent, NouvellesComponent,
    CapitalizePipe, NoClientPipe, EvenementsComponent, EvenementListComponent, EvenementEditComponent, NoEvenementPipe, ActiviteListComponent,
    OrderByPipe, RessourceEditComponent, RessourceListComponent, ServiceListComponent, AgendaComponent, SpinnerComponent], 
imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, routing, Ng2DatetimePickerModule, Ng2PaginationModule],
bootstrap: [AppComponent],
providers: [provide(LocationStrategy, {useClass: HashLocationStrategy}), AuthService, ErreurService, ClientService, EvenementService, RessourceService,
    AgendaService]
})
export class AppModule {}

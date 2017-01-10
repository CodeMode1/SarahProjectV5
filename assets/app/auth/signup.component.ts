import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../users/user';
import { AuthService } from './auth.service'; 
import { ErreurService } from '../erreurs/erreur.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-signup',
    template: `
        <div class="alert alert-success col-md-12" role="alert" *ngIf="this.sauvegardeUser">
            <p>User Sauvegardé: {{this.nomUser}}</p>
        </div>
        <section class="col-md-8 col-md-offset-2">
            <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="prenom">Prénom</label>
                    <input type="text" id="prenom" class="form-control" formControlName="prenom" placeholder="firstname">
                </div>
                <div class="form-group">
                    <label for="nom">Nom</label>
                    <input type="text" id="nom" class="form-control" formControlName="nom" placeholder="name">
                </div>
                <div class="form-group">
                    <label for="courriel">Courriel</label>
                    <input type="email" id="courriel" class="form-control" formControlName="courriel" placeholder="my@email.com">
                </div>
                <div class="form-group">
                    <label for="password">Mot De Passe</label>
                    <input type="password" id="password" class="form-control" formControlName="password" placeholder="password">
                </div>
                <button type="submit" class="btn btn-primary" [disabled]="!signupForm.valid">Sign Up</button>
            </form>
        </section>
    `
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    sauvegardeUser: boolean;
    nomUser: string;
    
    constructor(private _formBuilder: FormBuilder, private _authService: AuthService, 
        private _erreurService: ErreurService, private _router: Router) {
            this.sauvegardeUser = false;
            this.nomUser = "";
         }

    ngOnInit() {
        this.signupForm = this._formBuilder.group({
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            courriel: ['', [Validators.required, this.estCourrielOK]],
            password: ['', Validators.required]
        });
     }

    /* retourne 1 juste quand le courriel est valide 
       reg exp fiable à 99.9% */
     private estCourrielOK(control: FormControl): {[chaine: string]: boolean}{
         if(!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"))
             return { courrielInvalide: true};
     }

     onSubmit(){
         console.log(this.signupForm.value);
         const user = new User(this.signupForm.value.courriel, this.signupForm.value.password, this.signupForm.value.prenom, this.signupForm.value.nom);
         console.log('sign up: ' + user.courriel + user.password + user.prenom + user.nom);
         this._authService.signUp(user)
             .subscribe(
                 data => { 
                     console.log(data);
                     this.sauvegardeUser = true;
                     this.nomUser = <User>(data.obj.prenom) + " " + <User>(data.obj.nom);
                },
                 error => this._erreurService.handleErreur(error)
             );
     }
}
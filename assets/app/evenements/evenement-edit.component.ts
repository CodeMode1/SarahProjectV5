import { Component, OnInit, OnDestroy } from '@angular/core';
import { EvenementService } from './evenement.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/RX';
import { Evenement } from './evenement';
import { ErreurService } from '../erreurs/erreur.service';

@Component({
    moduleId: module.id,
    selector: 'my-evenement-edit',
    templateUrl: 'evenement-edit.component.html',
    styles: [ `
         .outer{
            float:left;
            clear:both;
            padding: 0 0 1% 0;
        }

        .clearDate{
            float:left;
            clear:both;
            padding: 0;
        }

        .clearPadding{
            padding: 0;
        }

        .divFooter{
            text-align:center;
        }

        .footer{
            border-top: 2px solid black;
        }

        button{  
            display:block;
            margin: 0 auto;
        }

        .space {
            padding: 2%;
        }

        textarea{
            resize: none;
        }

        .alert-success{
            text-align:center;
        }
        
    `]
})
export class EvenementEditComponent implements OnInit, OnDestroy {
    editEvenementForm: FormGroup;
    modeSoumission: boolean;
    sauvegardeEvenement: boolean;
    myEvenement: Evenement;
    formActualiser: boolean;
    formCopie: boolean;
    // id de mongo du client sélect.
    clientId: string;
    subscription: Subscription;
    estNouveau: boolean;
    noEvenement: number;
    // champ foreign key hidden
    hiddenFK: boolean;
    //user logue par défaut
    userLoggue: string;

    constructor( private _formBuilder: FormBuilder, private _evenementService: EvenementService,
        private _erreurService: ErreurService, private _activatedRoute: ActivatedRoute) { 
            this.myEvenement = new Evenement();
            this.modeSoumission = true;
            this.formActualiser = false;
            this.formCopie = false;
            this.hiddenFK = true;
            this.userLogue();
        }

    ngOnInit() { 
        this.subscription = this._activatedRoute.params.subscribe(
            (params: any) => {
                if(params.hasOwnProperty('id')){
                    this.estNouveau = false;
                    this.noEvenement = +params['id'];
                    this._evenementService.getEvenement(this.noEvenement)
                        .subscribe(
                            data => {
                                this.myEvenement = data;
                                console.log("evx a modifié : ");
                                console.log(this.myEvenement);
                            },
                            error => this._erreurService.handleErreur(error)
                        );
                } else{
                    this.estNouveau = true;
                }
                console.log(this.estNouveau);
                // init le form
                this.creerForm();
            }
        );
    }

    creerForm(){
        let noEvenement = null;
        let nom = '';
        let dateEvenement = null;
        let contact = '';
        let client = '';
        let selectEtat = '';
        let dateSoumission = null;
        let dateConfirmation = null;
        let dateFacturation = null;
        let dateNonRetenu = null;
        let dateAnnulation = null;
        let notes = '';
        let validationTache = false;
        let creerPar = '';
        let dateCree = null;
        let modifPar = '';
        let modif = null;
        let client_FK = null;

        if(!this.estNouveau){
            // setter la valeur de l'evenement au form control
            this.myEvenement.noEvenement = noEvenement;
            this.myEvenement.nom = nom;
            this.myEvenement.dateEvenement = dateEvenement;
            this.myEvenement.contact = contact;
            this.myEvenement.client = client;
            this.myEvenement.selectEtat = selectEtat;
            this.myEvenement.dateSoumission = dateSoumission;
            this.myEvenement.dateConfirmation = dateConfirmation;
            this.myEvenement.dateFacturation = dateFacturation;
            this.myEvenement.dateNonRetenu = dateNonRetenu;
            this.myEvenement.dateAnnulation = dateAnnulation;
            this.myEvenement.notes = notes;
            this.myEvenement.validationTache = validationTache;
            this.myEvenement.creerPar = creerPar;
            this.myEvenement.dateCree = dateCree;
            this.myEvenement.modifPar = modifPar;
            this.myEvenement.modif = modif;
            this.myEvenement.client_FK = client_FK;
        }

        // créer le form avec des blancs ou les valeurs de l'evenement cherché
        this.editEvenementForm = this._formBuilder.group({
            nom: [nom],
            dateEvenement: [dateEvenement],
            contact: [contact],
            client: [client],
            selectEtat: [selectEtat],
            dateSoumission: [dateSoumission],
            dateConfirmation: [dateConfirmation],
            notes: [notes],
            dateFacturation: [dateFacturation],
            dateNonRetenu: [dateNonRetenu],
            validationTache: [validationTache],
            noEvenement: [noEvenement],
            creerPar: [creerPar],
            dateCree: [dateCree],
            modifPar: [modifPar],
            modif: [modif],
            dateAnnulation: [dateAnnulation],
            client_FK: [client_FK]
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    onSubmit(){
        //change mode modification, enable bouton Actualiser et copier
        this.modeSoumission = false;
        this.formActualiser = true;
        this.formCopie = true;
        console.log("valeurs du form evx créé: " );
        console.log(this.editEvenementForm.value);
        // if nouveau, appel créé, sinon appel update
        if(this.estNouveau){
            this._evenementService.creerEvenement(this.myEvenement)
                .subscribe(
                    data => {
                        console.log('data du serveur : ');
                        console.log(data);
                        this.myEvenement = data;
                        console.log(this.myEvenement.dateEvenement);
                        // message succes creation evx
                        this.sauvegardeEvenement = true;
                    },
                    error => this._erreurService.handleErreur(error)
                );
        } else{
            this._evenementService.updateEvenement(this.myEvenement)
                .subscribe(
                    data => console.log(data),
                    error => this._erreurService.handleErreur(error)
                );
        }
        
    }

    userLogue(){
        console.log('user logue : ');
        console.log(localStorage.getItem('userName'));
        this.userLoggue = localStorage.getItem('userName');
        this.myEvenement.contact = this.userLoggue;
    }

 
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EvenementService } from './evenement.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/RX';
import { Evenement } from './evenement';
import { ErreurService } from '../erreurs/erreur.service';
import { ClientService } from '../clients/client.service';
import { Client } from '../clients/client';
import { ActiviteListComponent } from '../activites/activite-list.component';
import { RessourceService } from '../ressources/ressource.service';
import { Ressource } from '../ressources/ressource';


@Component({
    moduleId: module.id,
    selector: 'my-evenement-edit',
    templateUrl: 'evenement-edit.component.html',
    styles: [ `
        #boutonModalOk{
            float: left;
            margin: 0 1% 0 0;
        }
         .outer{
            float:left;
            clear:both;
            padding: 0 0 1% 0;
        }

        .clearDate{
            clear:both;
            float:left;
            padding: 0;
            margin: 0;
        }

        .floatLeftDate{
            float: left;
            padding: 0;
            margin: 0;
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

        .estSelectRange{
             background-color: #519BDB;
         }

         thead > tr{
            background-color: #fafafa;
            border-bottom: 0.25em solid #1565c0;
        }

         tbody > tr:hover{
            background-color: #a9d4f9;
        }

        .styleClientSelected{
            border: 1px solid #ddd;
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
    //client array pour choix client
    clients: Client[];
    clientSelectedList: Client;
    noClientSelectedList: number;
    clientSelectedSave: Client;
    aucunPrenomClientSelected: boolean;
    urlCopie: string;
    ressources: Ressource[];

    constructor( private _formBuilder: FormBuilder, private _evenementService: EvenementService,
        private _erreurService: ErreurService, private _activatedRoute: ActivatedRoute, private _clientService: ClientService,
        private _router: Router, private _ressourceService: RessourceService) { 
            this.myEvenement = new Evenement();
            this.modeSoumission = true;
            this.formActualiser = true;
            this.formCopie = true;
            this.hiddenFK = true;
            this.userLogue();
            this.urlCopie = this._router.url;
            this.ressources = [];
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
                                //Si URL contient "copie", alors vide les champs du evx copié.
                                if(this.urlCopie.includes("copie")){
                                    this.formActualiser = false;
                                    this.copierEvx();
                                }
                            },
                            error => this._erreurService.handleErreur(error)
                        );
                        console.log('url : ');
                        console.log(this._router.url);
                        if(this.urlCopie.includes("copie")){
                            console.log("set mode copie");                       
                            this.estNouveau = true; 
                        }
                } else{
                    this.estNouveau = true;
                }
                console.log(this.estNouveau);
                // init le form
                this.creerForm();
                this.getRessources();
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

    copierEvx(){
        this.myEvenement.evenementId = null;
        this.myEvenement.noEvenement = null;
        this.myEvenement.dateConfirmation = null;
        this.myEvenement.dateFacturation = null;
        this.myEvenement.dateNonRetenu = null;
        this.myEvenement.dateAnnulation = null;
        this.myEvenement.dateSoumission = this.getDateActuelle();
    }

    onSubmit(){
        console.log("valeurs du form evx créé: " );
        console.log(this.editEvenementForm.value);
        // if nouveau, appel créé, sinon appel update
        if(this.estNouveau || !this.formCopie){
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
                 this.formCopie = true;
        } else{
            this._evenementService.updateEvenement(this.myEvenement)
                .subscribe(
                    data => console.log(data),
                    error => this._erreurService.handleErreur(error)
                );
                
        }
        this.modeSoumission = false; 
    }

    boutonSwitch($event){
        this.modeSoumission = $event;
    }

     /* Réagir au changement usager, cet evenement est applique sur tous les inputs du form.
         selon la syntax: (ngModelChange)="onUserChange($event)" */
     onUserChange($event){
         console.log("EVX-onUserChange: " + $event);

         //Enable Enregistrer bouton.
         this.modeSoumission = true;

         //Tag Activites avec le user et le timestamp du changement.
         if(!this.estNouveau){
             this.myEvenement.modif = new Date(this.getDateModif());
             this.myEvenement.modifPar = localStorage.getItem('userName');
         }
     }

    userLogue(){
        console.log('user logue : ');
        console.log(localStorage.getItem('userName'));
        this.userLoggue = localStorage.getItem('userName');
        this.myEvenement.contact = this.userLoggue;
    }

    getClients(){
        this._clientService.getClients()
            .subscribe(
                data => {
                    this.clients = data;
                    console.log(this.clients);
                },
                error => this._erreurService.handleErreur(error)
            );
    }

    getRessources(){
        this._ressourceService.getRessources().subscribe(
            data => {
                this.ressources = data;
                //print données pour chaque ressource
                console.log("ressource du serveur pour afficher dans la liste : ");
                for(let i=0; i < this.ressources.length; i++){
                    console.log(this.ressources[i]);
                    console.log(this.ressources[i].nom);
                }
            },
            error => this._erreurService.handleErreur(error)
        );

    }

    clientSelect(client: Client){
        this.clientSelectedList = client;
        console.log('client selected List : ');
        console.log(this.clientSelectedList);
        this.noClientSelectedList = client.noClient;
        console.log('no client selected List: ');
        console.log(this.noClientSelectedList);
        //affichage client sélectionné dans la boite modale. (prenom est null sur l'objet et undefined en affichage)
        if(this.clientSelectedList.prenom === null || this.clientSelectedList.prenom === "" || this.clientSelectedList.prenom === undefined){
            this.aucunPrenomClientSelected = true;
        }else{
            this.aucunPrenomClientSelected = false;
        }
        console.log(this.aucunPrenomClientSelected);
    }

    saveClientSelected(){
        // save client
        console.log('client a saver : ');
        this.clientSelectedSave = this.clientSelectedList;
        // id mongo du client selected :
        this.clientId = this.clientSelectedSave.clientId;
        //sauver dans le form control hidden du form envoyé au serveur.
        this.myEvenement.client_FK = this.clientId;
        console.log(this.clientSelectedSave.prenom);
        console.log('id mongo client selected : ');
        console.log(this.clientId);
        if(this.clientSelectedSave.prenom === null || this.clientSelectedSave.prenom === "" || this.clientSelectedSave.prenom === undefined){
            this.myEvenement.client = this.clientSelectedSave.nom;
            return;
        }
        // sauver le client selectionné dans le input client du form.
        this.myEvenement.client = this.clientSelectedSave.nom + ', ' + this.clientSelectedSave.prenom;    
    }

    deleteClientSelected(){
        console.log('client selected delete: ');
        console.log(this.clientSelectedList);
        console.log(this.noClientSelectedList);
        console.log('id mongo client selected (meme que dans save): 5816566bd84fe82f14afb388 5816566bd84fe82f14afb388');
        console.log(this.clientId);
        console.log('client save : (meme que dans save)');
        console.log(this.clientSelectedSave);
    }

    actualiserEvx(){
        if(this.myEvenement.noEvenement != null && (this.myEvenement.noEvenement).toString() != ""){
            this._evenementService.getEvenement(Number(this.myEvenement.noEvenement))
            .subscribe(
                data => {
                    console.log(this.myEvenement.noEvenement);
                    this.myEvenement = data;
                    this.myEvenement.activites = data.activites;
                    console.log(this.myEvenement);
                },
                error =>{
                    this._erreurService.handleErreur(error)
                }
            );
        }
    }

    copieCetEvx(){
            this.copierEvx();
            this.formCopie = false;
            this.modeSoumission = true;
    }

    getDateActuelle(){
       var date = new Date().toLocaleDateString();
       var yyyy = date.substring(6,10);
       var mm = date.substring(3,5);
       var dd = date.substring(0,2);
       return (yyyy + "-" + mm + "-" + dd);     
    }

    getDateModif(){
       var date = new Date().toLocaleString();
       var yyyy = date.substring(6,10);
       var mm = date.substring(3,5);
       var dd = date.substring(0,2);
       var hh = date.substring(12,14);
       var mm = date.substring(15,17);
       var ss = date.substring(18,20);
       return (yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mm + ":" + ss);
    }   

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

 
}
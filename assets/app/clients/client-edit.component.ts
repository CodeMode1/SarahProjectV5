import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from './client.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/RX';
import { Client } from './client';
import { ErreurService } from '../erreurs/erreur.service';

interface ResultatValidation {
    [cle: string]: boolean;
}

@Component({
    moduleId: module.id,
    selector: 'my-edit-client',
    templateUrl:'client-edit.component.html',
    styles: [`
        .outer{
            float:left;
            clear:both;
            padding: 0 0 1% 0;
        }
        
        .form-group{
            float:left;
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

        h2{
            padding-top:1%;
            padding-bottom:2%;
        }

        .title{
            text-align:left;
        }

        .memo{
            float: left;
            clear: both;
            padding: 0 0 2% 0;
        }

        textarea{
            resize: none;
        }

        .gestionInputs{
            float: left;
            clear: both;
        }

        .dropdown{
            padding:0;
        }
        .alert-success{
            text-align:center;
        }
    `
    ]
})
export class EditClientComponent implements OnInit, OnDestroy {
    identification: string;
    gestion: string;
    editClientForm: FormGroup;
    formCopie: boolean;
    formActualiser: boolean;
    modeSoumission: boolean;
    sauvegardeClient: boolean;
    myClient : Client;
    clientId: string;
    subscription: Subscription;
    estNouveau: boolean;
    codeClient: number;
    urlCopie: string;

    constructor(private _formBuilder: FormBuilder, private _clientService: ClientService, private _erreurService: ErreurService,
        private _activatedRoute: ActivatedRoute, private _router: Router) {
        this.identification = "Identification";
        this.gestion = "Gestion";
        this.myClient = new Client();
        this.modeSoumission = true;
        this.urlCopie = this._router.url;
     }

    ngOnInit() { 
        this.subscription = this._activatedRoute.params.subscribe(
            (params: any) => {
                if(params.hasOwnProperty('id')){
                    this.estNouveau = false;
                    this.codeClient = +params['id'];
                    this._clientService.getClient(this.codeClient)
                        .subscribe(
                            data => {
                                this.myClient = data;
                                console.log("client a modif: ");
                                console.log(this.myClient);
                                //Si URL contient "copie", alors vide les champs du client copié.
                                if(this.urlCopie.includes("copie")){
                                    this.copierClient();
                                }
                                console.log("client à copier vierge : ");
                                console.log(this.myClient);
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
                console.log("est ce que nouveau : ");
                console.log(this.estNouveau);
                //init form
                this.creerForm();
            }
        );      
        //this.testCP();
    }

    creerForm(){
        //creer
        let noClient = null;
        let prenom = '';
        let nom = '';
        let noCompte = '';
        let courriel = '';
        let cell = '';
        let compagnie = '';
        let adresse = '';
        let ville = '';
        let codePostal = '';
        let telPrincipal = '';
        let province = '';
        let pays = '';
        let fax = '';
        let telSecondaire = '';
        let memo = '';
        let memoAVenir = '';
        let noExTaxeProv = '';
        let noExTaxeFed = '';
        let selectStatut = '';
        let selectSource = '';
        let modifPar = '';
        let modif = null;
        let dateDernEv = null;
        let creePar = '';
        let cree = null;

        if(!this.estNouveau){
            //setter la valeur du client au form control
            this.myClient.noClient = noClient;
            this.myClient.prenom = prenom;
            this.myClient.nom = nom;
            this.myClient.noCompte = noCompte;
            this.myClient.courriel = courriel;
            this.myClient.cell = cell;
            this.myClient.compagnie = compagnie;
            this.myClient.adresse = adresse;
            this.myClient.ville = ville;
            this.myClient.codePostal = codePostal;
            this.myClient.telPrincipal = telPrincipal;
            this.myClient.province = province;
            this.myClient.pays = pays;
            this.myClient.fax = fax;
            this.myClient.telSecondaire = telSecondaire;
            this.myClient.memo = memo;
            this.myClient.memoAVenir = memoAVenir;
            this.myClient.noExTaxeProv = noExTaxeProv;
            this.myClient.noExTaxeFed = noExTaxeFed;
            this.myClient.selectStatut = selectStatut;
            this.myClient.selectSource = selectSource;
            this.myClient.modifPar = modifPar;
            this.myClient.modif = modif;
            this.myClient.dateDernEv = dateDernEv;
            this.myClient.creerPar = creePar;
            this.myClient.dateCree = cree;
        }

        //cree le form avec des blancs ou les valeurs du client cherché.
         this.editClientForm = this._formBuilder.group({
            noClient: [noClient],
            prenom: [prenom],
            nom: [nom, Validators.required],
            noCompte: [noCompte],
            courriel: [courriel, this.estCourrielOK],
            cell: [cell],
            compagnie: [compagnie],
            adresse: [adresse],
            ville: [ville],
            codePostal: [codePostal, this.estCodePostalOK],
            telPrincipal: [telPrincipal, this.estTelephoneOK],
            province: [province],
            pays: [pays],
            fax: [fax],
            telSecondaire: [telSecondaire],
            memo: [memo],
            memoAVenir: [memoAVenir],
            noExTaxeProv: [noExTaxeProv],
            noExTaxeFed: [noExTaxeFed],
            selectStatut: [selectStatut],
            selectSource: [selectSource], 
            modifPar: [modifPar],
            modif: [modif],
            dateDernEv: [dateDernEv],
            creePar: [creePar],
            cree: [cree]    
        });
    }

    copierClient(){
        this.myClient.clientId = null;
        this.myClient.noClient = null;
        this.myClient.modifPar = null;
        this.myClient.modif = null;
        this.myClient.dateDernEv = null;
        this.myClient.creerPar = null;
        this.myClient.dateCree = null;
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    formatCP(input){
        //j'enleve les espaces, globalement.
        var chaine = input.value.replace(/\s+/g, "");
        //pour ajouter l'espace au 3eme carac.
        if(chaine.length > 3){
            //je place l'espace à la bonne place.
            chaine = chaine.substr(0,3) + " " + chaine.substr(3,3);
        }
        //transformer le code Postal en majuscule.
        input.value = chaine.toUpperCase();
    }

    formatTP(input){
        // j'enleve tout ce qui n'est pas chiffre, globalement.
        var chaine = input.value.replace(/[^0-9]/g, "");
        console.log(chaine);

        //au 11eme carac tapé, je reconstruis le tel avec ses bons chiffres.
        if(chaine.length > 10){
            chaine = chaine.substr(1,3) + chaine.substr(5,3) + chaine.substr(9,4);
        }

        //au 10eme carac, je formatte selon (XXX)XXX-XXXX.
        if(chaine.length === 10){
            chaine = "(" + chaine.substr(0,3) + ")" + chaine.substr(3,3) + "-" + chaine.substr(6,4);
        }
        
        /* si ces if sont inversés, chaine non-formattée.
           car au 10eme carac : 
           chaine.length > 10 et donc la chaine revient non-formattée.
        */
        input.value = chaine;
    }

    private estCodePostalOK(control: FormControl): ResultatValidation{
        //validation a réussi: pas de valeur tapée
        if(!control.value){
            return null;
        }
        /*format regex canadien :
            ^ : chaine commence, $ : fin séquence
            lettre : pas de D, F, I, O, Q U
            1er lettre: pas de W, Z, chiffre: \d, lettre, blanc, chiffre, lettre, chiffre
        */
        var regexCP =  /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ ]\d[ABCEGHJKLMNPRSTVWXYZ]\d$/;
        if(!control.value.match(regexCP)){
            return {codePostalInvalide: true};
        }

        //validation résussie
        return null;
    }

    private estTelephoneOK(control: FormControl): ResultatValidation{
        if(!control.value){
            return null;
        }
        /* format regex canadien:
           ^ : sequence commence, $ : fin sequence
           ( , chiffre(x3), ) , chiffre (x3), - , chiffre (x4)
        */ 
        var regexTP = /^\u0028\d{3}\u0029\d{3}\u002D\d{4}$/;
        if(!control.value.match(regexTP)){
            return {telephoneInvalide: true};
        }
        
        //validation réussie
        return null;
    }


    //validation: retourne null si valide et un boolean si erreur.
     private estCourrielOK(control: FormControl): ResultatValidation{
         if (control.value) {
            var regexCourriel = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if(!control.value.match(regexCourriel))
                return {courrielInvalide: true};
         }

         //validation réussie
         return null;
    }

    onSubmit(){
        //change mode modification, enable bouton Acutaliser et Copier.
        this.modeSoumission = false;
        this.formActualiser = true;
        this.formCopie = true;
        console.log("cree client : ");
        console.log(this.editClientForm.value);
        //IF NOUVEAU, APPEL CRÉÉ, SINON APPEL UPDATE
        if(this.estNouveau){
            this._clientService.creerClient(this.myClient)
            .subscribe(
                data => { 
                    console.log('data du serveur :');
                    console.log(data);
                    this.myClient = data;
                    //sauver le _id qui revient dans le client créé par Mongo.
                    this.clientId = data.clientId;
                    console.log("id de "+ data.nom + " : " + this.clientId);
                    console.log("no de client : " + data.noClient);
                    //sauver le no de client (no de la sequence)
                    this.myClient.noClient = data.noClient;
                    //voir le message de sauvegarde succès
                    this.sauvegardeClient = true;
            },
                error => this._erreurService.handleErreur(error)
            );
        } else{
            this._clientService.updateClient(this.myClient)
                .subscribe(
                    data => console.log(data),
                    error => this._erreurService.handleErreur(error)
                );
                //this.myClient = null;
        }   
    }

    private testCP(){
        //retoune null (valide)
            //console.log(this.estCodePostalOK('H2S 0B5')); //ok
            //console.log(this.estCodePostalOK('h2s 0b5')); //ok
            //console.log(this.estCodePostalOK('h2s0b5'));  //ok

        //retourne true (fail)
            //console.log(this.estCodePostalOK('Z3V H2S')); //Ok
            //console.log(this.estCodePostalOK('z3vh2s'));  //ok
            //console.log(this.estCodePostalOK('B3V H2'));  //ok
    }
}










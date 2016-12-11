import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Evenement } from './evenement';
import { ErreurService } from '../erreurs/erreur.service';
import { EvenementService } from './evenement.service';
import { NoEvenementPipe } from '../pipes/noEvenement.pipe';

@Component({
    moduleId: module.id,
    selector: 'my-evenement-list',
    templateUrl: 'evenement-list.component.html',
    styles: [`
        section{
            padding: 2% 0 0 0;
        }

        td{
            text-align: left;
            padding-bottom: 0;
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
        }

        th{
            font-size: 14px;
            white-space: pre; 
        }

        thead > tr{
            background-color: #fafafa;
            border-bottom: 0.25em solid #1565c0;
        }

        tbody > tr:hover{
            background-color: #a9d4f9;
        }

        tbody > tr{
            border-bottom: 0.2em solid #ddd;
            cursor: pointer;
        }

        .estSelectRange{
             background-color: #519BDB;
        }

        h3{
            padding: 0.5% 0 0.5% 0;
            margin:0;
            font-size: 1.3vw;
        }

        .panel-heading{
            text-align:center;
        }

        .bg-danger{
            text-align: center;
            color: #CC0000;
            font-weight: bolder;
            font-size: 1vw;
        }

        #searchLabel{
            margin-bottom:0;
            text-align:left;
            padding: 0;
        }

        #erreurContrat{
            text-align: center;
            padding: 0 5% 0 0;
        }

         #erreurFullSearch {
            clear: both;
            float: left;
        }

        .size{
            font-size:1vw;
            text-align:center;
        }

        .disableA{
            pointer-events: none;
            cursor: default;
            color: #ddd;
        }

        .erreurSearchNoContrat, .erreurSpecialSearch{
            background: #ff8080;
        }

        #boutonSearchNoContrat{
            background: #519BDB;
        }

        #boutonSpecialSearch{
            clear: both;
            float: left;
            background: #519BDB;
        }

        a{
            color: #000;
            display: block;
            clear: both;
            position: relative;
        }

        a span{
            position: absolute;
            display:none;
            background: rgba(20, 20, 31, 0.84);
            text-align: center;
            border-left: 1px solid #111;
            border-top: 1px solid #111;
            border-right: 1px solid #333;
            border-bottom: 1px solid #333;
            border-radius: 3px;
            color: #fff;
            font-size: 0.7em;
            text-indent: 0;
            width: auto;
            height:auto;
        }

        a span:after{
            content: ' ';
	        height: 0;
	        position: absolute;
	        width: 0;
            border: 10px solid transparent;
	        border-top-color: #333;
            top: 100%;
	        left: 10px;
        }

        a:hover span{
            display: block;
            bottom: 1vw;
            left:75%;
            z-index: 9999;
            -moz-animation: moveTooltip .25s linear;
            -webkit-animation: moveTooltip .25s linear;
        }

        a:hover{
            color: #337ab7;
        }

        .widgets{
            display: inline-block;
            padding-right: 5%;
        }

        .divFooter{
            text-align:center;
        }

        .col-md-12 {
            padding: 2%;
        }

        @-moz-keyframes moveTooltip {
            0% {
                -moz-transform: scale(0,0);
                opacity: 0;
            }
        
            45% {
                -moz-transform: scale(0.4,0.4);
                opacity: 0.7;
            }
        
            75% {
                -moz-transform: scale(1.3,1.3);
                opacity: 0.4;
            }
        
            100% {
                -moz-transform: scale(1,1);
                opacity: 1;
            };
}

@-webkit-keyframes moveTooltip {
    0% {
        -webkit-transform: scale(0,0);
        opacity: 0;
    }

    45% {
        -webkit-transform: scale(0.4,0.4);
        opacity: 0.7;
    }

    75% {
        -webkit-transform: scale(1.3,1.3);
        opacity: 0.4;
    }

    100% {
        -webkit-transform: scale(1,1);
        opacity: 1;
    };
} 
    `]
})
export class EvenementListComponent implements OnInit {
    titre: string;
    evenements: Evenement[];
    evenementSelected: Evenement;
    noEvenement: number;
    // Search No Contrat.
    boolSearchContrat: boolean;
    noContratTextSearch: string;
    noContratFiltreList: string;
    erreurNoContrat: string;
    // Search Full Text.
    boolFullSearch: boolean;
    specialTextSearch: string;
    erreurSpecialSearch: string;
    // Fenêtre modal.
    titreModal: string;
    constructor( private _erreurService: ErreurService, private _evenementService: EvenementService) {
        this.titre = "Liste des Évènements";
        this.noContratTextSearch = "";
        this.noContratFiltreList = ""; 
        this.boolSearchContrat = false; 
        this.erreurNoContrat = "";
        this.specialTextSearch = "";
        this.erreurSpecialSearch = "";
        this.boolFullSearch = false;
    }

    ngOnInit() {
        // Get evenements du service.
        this.getEvenements();
     }

    getEvenements(){
        this._evenementService.getEvenements().subscribe(
            data => {
                this.evenements = data;
                for(let i=0; i < this.evenements.length; i++){
                    console.log('evenement du service : ');
                    console.log(this.evenements[i]);
                }
            },
            error => this._erreurService.handleErreur(error)
        );
    }

    evenementSelect(evenement: Evenement){
        this.evenementSelected = evenement;
        console.log("evx select : " + this.evenementSelected);
        this.noEvenement = this.evenementSelected.noEvenement;
    }

    onSearchNoContrat(){
        this.boolSearchContrat = false;
        if(this.noContratTextSearch === null || (this.noContratTextSearch).toString() === ""){
            this.noContratFiltreList = "";
            return;
        }
        else if(isNaN(Number(this.noContratTextSearch))){
            this.erreurNoContrat = "Invalide. No Contrat doit être un nombre.";
            this.boolSearchContrat = true;
            return;
        }
        else if(this.noContratTextSearch.toString().length > 10){
            this.erreurNoContrat = "Invalide. No Contrat dépasse la longueur acceptée.";
            this.boolSearchContrat = true;
            return;
        }
        this._evenementService.getEvenement(Number(this.noContratTextSearch))
            .subscribe(
                data => {
                    this.noContratFiltreList = (data.noEvenement).toString();
                    console.log(this.noContratFiltreList);
                },
                error => {
                    this.boolSearchContrat = true;
                    this._erreurService.handleErreur(error)
                }
            );
    }

    logInput(value){
        console.log(value);
    }

    eventModal(){
        this.titreModal = "Suppression";
    }

    onSpecialSearch(){
        this.boolFullSearch = false;
        if(this.specialTextSearch === null || (this.specialTextSearch).toString() === ""){
            this.getEvenements();
            return;
        }
        else if(this.specialTextSearch.toString().length > 150){
            this.erreurSpecialSearch = "Invalide. Ne pas dépasser 150 caractères.";
            return;
        }
        this._evenementService.getEvenementsSpecialSearch(this.specialTextSearch)
            .subscribe(
                data => {
                    this.evenements = data;
                    console.log('evx affiche table : ');
                    console.log(this.evenements);
                },
                error =>{
                    this._erreurService.handleErreur(error)
                }
            );   
    }

    actualiser(){
        if(this.noContratTextSearch !== null && (this.noContratTextSearch).toString() !== ""){
            this._evenementService.getEvenement(Number(this.noContratTextSearch))
                .subscribe(
                    data => {
                        this.noContratFiltreList = (data.noEvenement).toString();
                        console.log('filtre table no contrat');
                        console.log(this.noContratFiltreList);
                    },
                    error => {
                        this.boolSearchContrat = true;
                        this._erreurService.handleErreur(error)
                    }
                );
                return;
        } else{
            this.noContratFiltreList = "";
            this.getEvenements();
        }
    }

    onDelete(){
        if(this.evenementSelected !== null){
            this._evenementService.deleteEvenement(this.evenementSelected)
                .subscribe(
                    data => console.log(data),
                    error => this._erreurService.handleErreur(error)
                );
        }
    }
}




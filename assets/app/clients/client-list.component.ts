import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Client } from './client';
import { ClientService } from './client.service';
import { ErreurService } from '../erreurs/erreur.service';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { NoClientPipe } from '../pipes/noClient.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
    moduleId: module.id,
    selector: 'my-client-list',
    templateUrl: 'client-list.component.html',
    styles: [`
        #pagerClient{
            text-align: center;
        }

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
        }

        #erreurCode{
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

        .erreurSearchClient, .erreurSpecialSearch{
            background: #ff8080;
        }

        #boutonSearchNoClient{
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

        #specialSearch{
            padding: 0;
        }

        #boutonSpecialSearch{
            clear: both;
            float: left;
            background: #519BDB;
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
export class ClientListComponent implements OnInit {
    titre: string;
    clients: Client[];
    clientSelected: Client;
    noClient: number;
    titreModal: string;
    // no client
    noClientTextSearch: string;
    noClientFiltreList: string;
    boolSearchClient: boolean;
    erreurCodeClient: string;
    // full text search
    specialTextSearch: string;
    boolFullSearch: boolean;
    erreurSpecialSearch: string;
    
    //spinner
    estRequete: boolean;
    delai: number;
    currentTimeout: number;
    
    constructor(private _clientService: ClientService, private _erreurService: ErreurService) { 
        this.titre = "Liste des Clients";
        this.noClientTextSearch = "";
        this.noClientFiltreList = "";
        this.boolSearchClient = false;
        this.erreurCodeClient = "";
        this.specialTextSearch = "";
        this.erreurSpecialSearch = "";
        this.boolFullSearch = false;

        //suggere faire apparaitre spinner apres 300 msm ici fait disparaitre apres un multiple du temps
        // de la requete ca requete trop rapide en general.
        this.delai = 500;
        this.estRequete = false;
    }

    ngOnInit() {
        console.log('dans on init');
        this.getClients();   
    }

    getClients(){
        this._clientService.getClients().subscribe(
            data => {
                this.clients = data;
                for(let i=0; i < this.clients.length; i++){
                    console.log(this.clients[i]);
                }
            },
            error => this._erreurService.handleErreur(error)
        );
    }

    eventModal(){
        this.titreModal= "Suppression"; 
    }

    clientSelect(client: Client){
        this.clientSelected = client;
        console.log(this.clientSelected);
        console.log(this.clientSelected.noClient);
        this.noClient = this.clientSelected.noClient;
    }

    onDelete(){
        if(this.clientSelected !== null){
            this._clientService.deleteClient(this.clientSelected)
                .subscribe(
                    data => {
                        console.log(data);
                    },
                    error => this._erreurService.handleErreur(error)
                );
        }
    }

    // Search sur le numéro client
    onSearchNoClient(){
        this.estRequete = true;
        var start = new Date().getTime();
        this.boolSearchClient = false;
        console.log("contenu input: ");
        console.log(this.noClientTextSearch);
        if(this.noClientTextSearch === null || (this.noClientTextSearch).toString() === ""){
            this.estRequete = false;
            this.noClientFiltreList = "";
            return;
        }
        else if(isNaN(Number(this.noClientTextSearch))){
            this.estRequete = false;
            this.erreurCodeClient = "Invalide. Code Client doit être un nombre.";
            this.boolSearchClient = true;
            return;
        }
        else if(this.noClientTextSearch.toString().length > 10){
            this.estRequete = false;
            this.erreurCodeClient = "Invalide. Code Client dépasse la longueur acceptée.";
            this.boolSearchClient = true;
            return;
        }
        this._clientService.getClient(Number(this.noClientTextSearch))
            .subscribe(
                data => {
                    this.noClientFiltreList = (data.noClient).toString();
                    console.log(this.noClientFiltreList);
                    var end = new Date().getTime();
                    this.delai = this.getDelai(start, end);
                    this.setTimeOut();
                },
                error => {
                    this.boolSearchClient = true;
                    this._erreurService.handleErreur(error)
                }
            );
    }

     cancelTime(){
            console.log("in cancel time");
            this.estRequete = false;
            clearTimeout(this.currentTimeout);
            this.currentTimeout = undefined;
            console.log(this.currentTimeout);
    }
    
    setTimeOut(){
        this.currentTimeout = setTimeout(() => {
            this.cancelTime();
        }, this.delai);
    }

    getDelai(start: number, end: number, diff2?: number): number{
        var diff = end - start;
        diff *= 15;
        console.log(diff);
        if(diff2){
            return diff2 *= 5;
        }
        return diff;
    }

    // Full text search serveur sur le client (champs clients indexés)
    onSpecialSearch(){
        this.estRequete = true;
        var start = new Date().getTime();
        this.boolFullSearch = false;
        if(this.specialTextSearch === null  || (this.specialTextSearch).toString() === ""){
            this.estRequete = false;
            this.getClients();
            return;
        }
        else if(this.specialTextSearch.toString().length > 150){
            this.estRequete = false;
            this.erreurSpecialSearch = "Invalide. Ne pas dépasser 150 caractères.";
            this.boolFullSearch = true;
            return;
        }
        this._clientService.getClientsSpecialSearch(this.specialTextSearch)
            .subscribe(
                data => {
                    this.clients = data;
                    console.log(this.clients);
                    var end = new Date().getTime();
                    this.delai = this.getDelai(start, end);
                    this.setTimeOut();
                },
                error =>{
                    this._erreurService.handleErreur(error)
                }
            );

    }

    actualiser(){
        this.estRequete = true;
        this.boolSearchClient = false;
        var start = new Date().getTime();
        if(this.noClientTextSearch !== null && (this.noClientTextSearch).toString() !== ""){
            this._clientService.getClient(Number(this.noClientTextSearch))
            .subscribe(
                data => {
                    this.noClientFiltreList = (data.noClient).toString();
                    console.log(this.noClientFiltreList);
                    var end = new Date().getTime();
                    this.delai = this.getDelai(start, end);
                    console.log(this.delai);
                    this.setTimeOut();
                },
                error => {
                    this.boolSearchClient = true;
                    this._erreurService.handleErreur(error)
                }
            );
            return;
        }else{
            this.noClientFiltreList = "";
            this.getClients();
            var end = new Date().getTime();
            this.delai = this.getDelai(start, end, 100);
            console.log(this.delai);
            this.setTimeOut();
        }
        
    }

    logInput(value){
        console.log(value);
    }
}
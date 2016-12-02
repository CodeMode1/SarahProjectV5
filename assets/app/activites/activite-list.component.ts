import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Activite } from './activite';
import { OrderByPipe } from '../pipes/orderBy.pipe';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/RX';
import { Ressource } from '../ressources/ressource';


@Component({
    moduleId: module.id,
    selector: 'my-activite-list',
    templateUrl: 'activite-list.component.html',
    styles: [ `
        .header{
            padding-left: 30px;
        }

        .outer{
            float:left;
            clear:both;
            padding: 0 0 1% 0;
        }
        h2{
            color: #337ab7;
        }

        .space{
            margin: 0 1% 0 1%;
        }

         td, th{
            text-align: center;
            font-size: 1vw;
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

         .checkbox{
             margin-bottom: 9%;
         }

        
    `
    ]
})
export class ActiviteListComponent implements OnChanges, OnInit {
    @Input() activites: Activite[];
    @Input() estNouveau: boolean;
    @Input() ressources: Ressource[];
    @Output() boutonChanges: EventEmitter<boolean> = new EventEmitter<boolean>();
    titre: string; 
    selectedActivite: Activite;
    indexNom: number = 0;
    
    constructor() { 
        this.titre = "Activités";
        this.activites = [];
        this.selectedActivite = new Activite();
        this.selectedActivite.modifie = "";
        this.selectedActivite.modifiePar = "";
        this.selectedActivite.serviceTotal = 0;
        this.selectedActivite.fraisServiceTotal = 0;
        this.ressources = [];
    }

    /* Select la 1er activite à chaque fois que le Input d'activite change.
       Le 1er OnChanges est execute avant le 1er OnInit.
            Est-ce que ça marche après actualiser ? : oui */ 
    ngOnChanges(){
        if(this.activites[0] != null && this.activites[0] != undefined){
            //this.selectedActivite = this.activites[0];
            this.selectActivite(this.activites[0]);
        }  
    }

    ngOnInit(){
    }

    estClicke(inputRessource){
        var indexRessource = this.selectedActivite.ressourcesCheck.indexOf(inputRessource.id);
        console.log(indexRessource);
        if(indexRessource < 0){
            return false;
        }
        else {
            return true;
        }
    }

    ressourceClick(inputRessource){
        var indexRessource = this.selectedActivite.ressourcesCheck.indexOf(inputRessource.id);
        console.log(indexRessource);
        if(inputRessource.checked == true){
            console.log("Mongo id ressource clicker : ");
            console.log(inputRessource.id);
            //checker que la valeur nest pas deja dans le array  
            if(indexRessource < 0){
                this.selectedActivite.ressourcesCheck.push(inputRessource.id);
            } 
        } else{
            console.log("not checked");
            if (indexRessource >= 0){
                this.selectedActivite.ressourcesCheck.splice(indexRessource, 1);
            }
        }
        console.log("ressources pour l'act : " + this.selectedActivite.ressourcesCheck);
    }

    calculServiceTotal(){
        var total = 0;
        for(var i = 0; i < this.selectedActivite.services.length; i++){
            if(!isNaN(this.selectedActivite.services[i].sousTotal)){
                total += this.selectedActivite.services[i].sousTotal;
            }     
        }
        return Number(total.toFixed(2));
    }

    calculFraisServiceTotal(){
        var total = 0;
        for(var i = 0; i < this.selectedActivite.services.length; i++){
            if(!isNaN(this.selectedActivite.services[i].fraisServiceTotal)){
            total += this.selectedActivite.services[i].fraisServiceTotal;
            }
        }
        return Number(total.toFixed(2));
    }

    setTotauxActivite($event){
        if(this.selectedActivite.services !== null || this.selectedActivite.services.length > 0){
            this.selectedActivite.serviceTotal = this.calculServiceTotal();
            this.selectedActivite.fraisServiceTotal = this.calculFraisServiceTotal();
        }
    }
    
     /* Réagir au changement usager, cet evenement est applique sur tous les inputs du form.
         selon la syntax: (ngModelChange)="onUserChange($event)" */
     onUserChange($event){
         console.log("ACT-onUserChange: " + $event);

         //Enable Enregistrer bouton.
         this.boutonChanges.emit(true);

         //Tag Activites avec le user et le timestamp du changement.
         if(!this.estNouveau){
             this.selectedActivite.modifie = this.getDateModif();
             this.selectedActivite.modifiePar = localStorage.getItem('userName');
         }
     }

     enableSave($event){
         //Activite emit au Evx le changement dans Service.
         this.boutonChanges.emit($event);
     }

    ajouteActivite(){
        var nouvelleActivite: Activite;
        this.indexNom += 1;
        nouvelleActivite = new Activite();
        nouvelleActivite.nom = "Nouveau" + this.indexNom;
        nouvelleActivite.debut = this.getDateActuelle();
        nouvelleActivite.etat = "Soumission";
        this.activites.push(nouvelleActivite);
    }

    supprimeActivite(){
        //supprime le dernier activiter de la liste.
        this.activites.splice(this.activites.indexOf(this.selectedActivite), 1);
    }

    selectActivite(activite: Activite){
        this.selectedActivite = activite;
        console.log("selectActivite");
        for (let i=0; i < this.ressources.length; i++){
            var indexRessourceAssigne = this.selectedActivite.ressourcesCheck.indexOf(this.ressources[i].ressourceId);
            console.log("index resID: " + this.ressources[i].ressourceId + " --> " + indexRessourceAssigne);
            if(indexRessourceAssigne < 0){
                this.ressources[i].checked = false;
            }
            else {
                this.ressources[i].checked = true;
            }
        }
        console.log(this.ressources);
        // TODO force refresh de l'affichage !!
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
}
import { Component, OnInit } from '@angular/core';
import { Activite } from './activite';

@Component({
    moduleId: module.id,
    selector: 'my-activite-list',
    templateUrl: 'activite-list.component.html',
    styles: [ `
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
export class ActiviteListComponent implements OnInit {
    titre: string;
    activites: Activite[];
    nouvelleActivite: Activite;
    selectedActivite: Activite;
    nom: string;
    indexNom: number = 0;

    constructor() { 
        this.titre = "Activités";
        this.activites = [];
        this.selectedActivite = new Activite();
    }

    ngOnInit() { }

    ajouteActivite(){
        this.indexNom += 1;
        this.nouvelleActivite = new Activite();
        this.nouvelleActivite.nom = "nouveau" + this.indexNom;
        //this.nouvelleActivite.debut = new Date().toLocaleString().substring(0,10);
        this.nouvelleActivite.debut = this.getDateActuelle();
        this.nouvelleActivite.etat = "Soumission";
        this.activites.push(this.nouvelleActivite);
    }

    supprimeActivite(){
        // supprime le dernier activiter de la liste
        //this.activites.pop();
        this.activites.splice(this.activites.indexOf(this.selectedActivite), 1);
    }

    selectActivite(activite: Activite){
        this.selectedActivite = activite;
        this.nom = activite.nom;
    }

    getDateActuelle(){
       var date = new Date().toLocaleDateString();
       var yyyy = date.substring(6,10);
       var mm = date.substring(3,5);
       var dd = date.substring(0,2);
       return (yyyy + "-" + mm + "-" + dd);     
    }        
}
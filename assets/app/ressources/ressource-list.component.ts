import { Component, OnInit } from '@angular/core';
import { RessourceService } from './ressource.service';
import { Ressource } from './ressource';
import { ErreurService } from '../erreurs/erreur.service';

@Component({
    moduleId: module.id,
    selector: 'my-ressource-list',
    templateUrl: 'ressource-list.component.html',
    styles: [ `
        h2{
            padding: 2% 0 2% 0;
            color: #519BDB;
        }

        table{
        }

        td, th{
            text-align: center;
            font-size: 14px;
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
    `]
})
export class RessourceListComponent implements OnInit {
    ressources: Ressource[];
    selectedRessource: Ressource = null;
    idSelected: string;

    constructor( private _ressourceService: RessourceService, private _erreurService: ErreurService) { 
    }

    ngOnInit() {
        this.getRessources();
    }

    getRessources(){
        this._ressourceService.getRessources().subscribe(
            data => {
                this.ressources = data;
                console.log("ressource du serveur pour afficher dans la liste : ");
                for(let i=0; i < this.ressources.length; i++){
                    console.log(this.ressources[i]);
                    console.log(this.ressources[i].nom);
                    console.log(this.ressources[i].couleur);
                }
            },
            error => this._erreurService.handleErreur(error)
        );
    }

    selectRessource(ressource: Ressource){
        this.selectedRessource = ressource;
        console.log(this.selectedRessource);
        this.idSelected = this.selectedRessource.ressourceId;
    }

    clear($event: any){
        this.selectedRessource = null;
    }
}
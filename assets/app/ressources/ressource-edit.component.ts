import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';
import { Ressource } from './ressource';
import { RessourceService } from './ressource.service';
import { ErreurService } from '../erreurs/erreur.service';

@Component({
    moduleId: module.id,
    selector: 'my-ressource-edit',
    templateUrl: 'ressource-edit.component.html',
    styles: [`
        .boutonsRessources{
            padding: 1% 0 1% 0;
        }
    `]
})
export class RessourceEditComponent implements OnInit, OnChanges {
    estAjout: boolean;
    @Input() myRessource: Ressource;
    @Output() vider = new EventEmitter<any>();
    etatUserMessage: boolean;
    userMessage: string;
    activeBoutons: boolean;

    constructor(private _ressourceService: RessourceService, private _erreurService: ErreurService) { 
            this.etatUserMessage = false;
            this.estAjout = true;
            this.activeBoutons = false;
        }

    ngOnInit() { 
    }

    ngOnChanges(changes){
        if(changes.myRessource.currentValue === null){
            this.estAjout = true;
            this.myRessource = {ressourceId: null, nom: null, checked: false};
        }else{
            console.log(this.myRessource);
            this.estAjout = false;
            this.etatUserMessage = false;
        }
    }

    supprimerRessource(){
        if(this.myRessource !== null){
            this._ressourceService.deleteRessource(this.myRessource)
                .subscribe(
                    data => {
                        this.etatUserMessage = true;
                        this.userMessage = "Ressource Supprimée: " + this.myRessource.nom;
                        this.myRessource.nom = "";
                        console.log(data);
                    },
                    error => this._erreurService.handleErreur(error)
                );
        }
    }

    viderRessource(){
        this.estAjout = true;
        this.vider.emit(null);
    }

    nomInput(item){
        if(item.value.length > 0){
            this.activeBoutons = true;
        }else{
            this.activeBoutons = false;
        }
    }

    onSubmit(ressource: Ressource){
        console.log(ressource);
        // if nouveau, appel créé, sinon appel update
        if(ressource.nom !== null && ressource.nom !== ""){
            if(this.estAjout){
                console.log("ressource a sauvegarder : ");
                this.myRessource = ressource;
                this._ressourceService.creerRessource(this.myRessource)
                    .subscribe(
                        data => {
                            this._ressourceService.ressources.push(data);
                            // message succes creation ressource
                            this.etatUserMessage = true;
                            this.userMessage = "Ressource Crée: " + this.myRessource.nom;
                            this.myRessource.nom = "";
                        },
                        error => this._erreurService.handleErreur(error)
                    );
            } else{
                this._ressourceService.updateRessource(this.myRessource)
                    .subscribe(
                        data => {
                            console.log("edit SUCCES : ");
                            console.log(data);
                            this.etatUserMessage = true;
                            this.userMessage = "Ressource Sauvegardée: " + this.myRessource.nom;
                            this.viderRessource();
                        },
                        error => this._erreurService.handleErreur(error)
                    );
            }
        }
    }
}
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
    succesUserMessage: boolean;
    erreurUserMessage: boolean;
    userMessage: string;
    erreurMessage: string;
    activeBoutons: boolean;

    constructor(private _ressourceService: RessourceService, private _erreurService: ErreurService) { 
            this.succesUserMessage = false;
            this.erreurUserMessage = false;
            this.estAjout = true;
            this.activeBoutons = false;
        }

    ngOnInit() { 
    }

    ngOnChanges(changes){
        if(changes.myRessource.currentValue === null){
            this.estAjout = true;
            this.myRessource = {ressourceId: null, nom: null, couleur: null, checked: false};
        }else{
            console.log(this.myRessource);
            this.estAjout = false;
            this.succesUserMessage = false;
        }
    }

    supprimerRessource(){
        if(this.myRessource !== null){
            this._ressourceService.deleteRessource(this.myRessource)
                .subscribe(
                    data => {
                        this.succesUserMessage = true;
                        this.userMessage = "Ressource Supprimée: " + this.myRessource.nom + this.myRessource.couleur;
                        this.myRessource.nom = "";
                        this.myRessource.couleur = "";
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

    inputChange($event){
        if($event.length > 0){
            this.activeBoutons = true;
        }else{
            this.activeBoutons = false;
        }
    }

    couleurChange($event){
        if($event !== "#ffffff" && $event !== "#000000"){
            this.activeBoutons = true;
        }else{
            this.activeBoutons = false;
            this.erreurUserMessage = true;
            this.erreurMessage = "Choissisez une couleur autre que blanc/noir";
        }
        
    }

    onSubmit(ressource: Ressource){
        console.log(ressource);
        // If nouveau, appel créé, sinon appel update.
        if(ressource.nom !== null && ressource.nom !== ""){
            if(this.estAjout){
                console.log("ressource a sauvegarder : ");
                this.myRessource = ressource;
                this._ressourceService.creerRessource(this.myRessource)
                    .subscribe(
                        data => {
                            this._ressourceService.ressources.push(data);
                            // Message succes creation ressource.
                            this.succesUserMessage = true;
                            this.userMessage = "Ressource Crée: " + this.myRessource.nom + this.myRessource.couleur;
                            this.myRessource.nom = "";
                            this.myRessource.couleur = "";
                        },
                        error => this._erreurService.handleErreur(error)
                    );
            } else{
                this._ressourceService.updateRessource(this.myRessource)
                    .subscribe(
                        data => {
                            console.log("edit SUCCES : ");
                            console.log(data);
                            this.succesUserMessage = true;
                            this.userMessage = "Ressource Sauvegardée: " + this.myRessource.nom + this.myRessource.couleur;
                            this.viderRessource();
                        },
                        error => this._erreurService.handleErreur(error)
                    );
            }
        }
    }
}
import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';
import { Ressource } from './ressource';
import { RessourceService } from './ressource.service';
import { ErreurService } from '../erreurs/erreur.service';

@Component({
    moduleId: module.id,
    selector: 'my-ressource-edit',
    templateUrl: 'ressource-edit.component.html'
})
export class RessourceEditComponent implements OnInit, OnChanges {
    estAjout: boolean;
    @Input() myRessource: Ressource;
    @Output() vider = new EventEmitter<any>();
    sauvegardeRessource: boolean;

    constructor(private _ressourceService: RessourceService, private _erreurService: ErreurService) { 
            this.sauvegardeRessource = false;
            this.estAjout = true;
        }

    ngOnInit() { 
    }

    ngOnChanges(changes){
        if(changes.myRessource.currentValue === null){
            this.estAjout = true;
            this.myRessource = {ressourceId: null, nom: null};
        }else{
            console.log(this.myRessource);
            this.estAjout = false;
        }
    }

    supprimerRessource(){
        if(this.myRessource !== null){
            this._ressourceService.deleteRessource(this.myRessource)
                .subscribe(
                    data => {
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

    onSubmit(ressource: Ressource){
        console.log(ressource);
        // if nouveau, appel créé, sinon appel update
        if(this.estAjout){
            console.log("ressource a sauvegarder : ");
            this.myRessource = ressource;
            this._ressourceService.creerRessource(this.myRessource)
                .subscribe(
                    data => {
                        this._ressourceService.ressources.push(data);
                        // message succes creation evx
                        this.sauvegardeRessource = true;
                    },
                    error => this._erreurService.handleErreur(error)
                );
        } else{
            this._ressourceService.updateRessource(this.myRessource)
                .subscribe(
                    data => {
                        console.log("edit SUCCES : ");
                        console.log(data);
                    },
                    error => this._erreurService.handleErreur(error)
                );
        }
    }
}
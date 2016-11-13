export class Ressource{
    ressourceId: string;
    nom: string;

    constructor( ressourceId?: string, nom?: string ){
        this.ressourceId = ressourceId;
        this.nom = nom;
    }
}
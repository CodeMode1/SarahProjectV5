export class Ressource{
    ressourceId: string;
    nom: string;
    checked: boolean;

    constructor( ressourceId?: string, nom?: string, checked?: boolean ){
        this.ressourceId = ressourceId;
        this.nom = nom;
        this.checked = false;
    }
}
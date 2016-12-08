export class Ressource{
    ressourceId: string;
    nom: string;
    couleur: string;
    checked: boolean;

    constructor( ressourceId?: string, nom?: string, couleur?: string, checked?: boolean ){
        this.ressourceId = ressourceId;
        this.nom = nom;
        this.couleur = couleur;
        this.checked = false;
    }
}
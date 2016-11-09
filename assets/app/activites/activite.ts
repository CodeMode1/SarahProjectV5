export class Activite{
    nom: string;
    debut: string;
    fin: string;
    etat: string;

    constructor(nom?: string, debut?: string, fin?: string, etat?: string){
        this.nom = nom;
        this.debut = debut;
        this.fin = fin;
        this.etat= etat;
    }
}
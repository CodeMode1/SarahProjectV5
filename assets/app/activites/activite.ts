export class Activite{
    nom: string;
    debut: string;
    fin: string;
    etat: string;
    nbPersonnes: string;
    serviceTotal: string;
    fraisServiceTotal: string;
    noFacture: string;
    surreservation: boolean;
    raisonNonRetenu: string;
    modifiePar: string;
    modifie: string;

    constructor(nom?: string, debut?: string, fin?: string, etat?: string, nbPersonnes?: string, serviceTotal?: string,
        fraisServiceTotal?: string, noFacture?: string, surreservation?: boolean, raisonNonRetenu?: string, modifiePar?: string,
        modifie?: string){
        this.nom = nom;
        this.debut = debut;
        this.fin = fin;
        this.etat= etat;
        this.nbPersonnes = nbPersonnes;
        this.serviceTotal = serviceTotal;
        this.fraisServiceTotal = fraisServiceTotal;
        this.noFacture = noFacture;
        this.surreservation = surreservation;
        this.raisonNonRetenu = raisonNonRetenu;
        this.modifiePar = modifiePar;
        this.modifie = modifie;
    }
}
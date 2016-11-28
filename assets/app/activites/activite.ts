import { Service } from '../services/service';

export class Activite{
    nom: string;
    debut: string;
    fin: string;
    etat: string;
    nbPersonnes: string;
    serviceTotal: number;
    fraisServiceTotal: number;
    noFacture: string;
    surreservation: boolean;
    raisonNonRetenu: string;
    modifiePar: string;
    modifie: string;
    services: Service[];

    constructor(nom?: string, debut?: string, fin?: string, etat?: string, nbPersonnes?: string, serviceTotal?: number,
        fraisServiceTotal?: number, noFacture?: string, surreservation?: boolean, raisonNonRetenu?: string, modifiePar?: string,
        modifie?: string, services?: Service[]){
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
        if(services == null || services == undefined){
            this.services = [];
        }else{
            this.services = services;
        }
    }
}
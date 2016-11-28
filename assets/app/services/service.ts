export class Service{
    temps: string;
    nom: string;
    categorie: string;
    quantite: number;
    prixUnitaire: number;
    escompte: number;
    fraisService: number;
    fraisServiceTotal: number;
    sousTotal: number;
    modifiePar: string;
    modifie: string;
    total: number;


    constructor(temps?: string, nom?: string, categorie?: string, quantite?: number,
        prixUnitaire?: number, escompte?: number, fraisService?: number, fraisServiceTotal?: number,
        sousTotal?: number, modifiePar?: string, modifie?: string, total?: number){
            this.temps = temps;
            this.nom = nom;
            this.categorie = categorie;
            this.quantite = quantite;
            this.prixUnitaire = prixUnitaire;
            this.escompte = escompte;
            this.fraisService = fraisService;
            this.fraisServiceTotal = fraisServiceTotal;
            this.sousTotal = sousTotal;
            this.modifiePar = modifiePar;
            this.modifie = modifie;
            this.total = total;
    }

}
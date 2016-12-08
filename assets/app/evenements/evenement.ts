import { Activite } from '../activites/activite';

export class Evenement{
    evenementId: string;
    noEvenement: number;
    nom: string;
    dateEvenement: string;
    contact: string;
    client: string;
    selectEtat: string;
    dateSoumission: string;
    dateConfirmation: string;
    dateFacturation: string;
    dateNonRetenu: string;
    dateAnnulation: string;
    notes: string;
    validationTache: boolean;
    creerPar: string;
    dateCree: Date;
    modifPar: string;
    modif: string;
    client_FK: string;
    activites: Activite[];

    constructor( evenementId?: string, noEvenement?: number, nom?: string, dateEvenement?: string,
    contact?: string, client?: string, selectEtat?: string, dateSoumission?: string,
    dateConfirmation?: string, dateFacturation?: string, dateNonRetenu?: string, 
    dateAnnulation?: string, notes?: string, validationTache?: boolean, creerPar?: string,
    dateCree?: Date, modifPar?: string, modif?: string, client_FK?: string, activites?: Activite[]){
        this.evenementId = evenementId;
        this.noEvenement = noEvenement;
        this.nom = nom;
        this.dateEvenement = dateEvenement;
        this.contact = contact;
        this.client = client;
        this.selectEtat = selectEtat;
        this.dateSoumission = dateSoumission;
        this.dateConfirmation = dateConfirmation;
        this.dateFacturation = dateFacturation;
        this.dateNonRetenu = dateNonRetenu;
        this.dateAnnulation = dateAnnulation;
        this.notes = notes;
        this.validationTache = validationTache;
        this.creerPar = creerPar;
        this.dateCree = dateCree;
        this.modifPar = modifPar;
        this.modif = modif;
        this.client_FK = client_FK;
        if(activites == null || activites == undefined){
            this.activites = [];
        }else{
            this.activites = activites;
        }
        //test : this.activites.push(new Activite("TestDaf", "2016-11-09", "2016-11-10", "Soumission"));
    }
}
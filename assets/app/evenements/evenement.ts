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
    modif: Date;
    client_FK: string;

    constructor( evenementId?: string, noEvenement?: number, nom?: string, dateEvenement?: string,
    contact?: string, client?: string, selectEtat?: string, dateSoumission?: string,
    dateConfirmation?: string, dateFacturation?: string, dateNonRetenu?: string, 
    dateAnnulation?: string, notes?: string, validationTache?: boolean, creerPar?: string,
    dateCree?: Date, modifPar?: string, modif?: Date, client_FK?: string){
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
    }
}
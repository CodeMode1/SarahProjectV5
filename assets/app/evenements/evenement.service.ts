import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Evenement } from './evenement';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EvenementService{
    evenements: Evenement[] = [];

    constructor( private _http: Http) { }
    
    getEvenements(): Observable<Evenement[]>{
        return this._http.get('http://localhost:3000/evenement')
            .map((response: Response) => {
                const data = response.json().obj;
                let objs: any[] = [];
                for(let i=0; i < data.length; i++){
                    let evenement = new Evenement(data[i]._id, data[i].noEvenement, data[i].nom,
                        data[i].dateEvenement, data[i].contact, data[i].client,
                        data[i].selectEtat, data[i].dateSoumission, data[i].dateConfirmation, data[i].dateFacturation,
                        data[i].dateNonRetenu, data[i].dateAnnulation, data[i].notes, data[i].validationTache,
                        data[i].creerPar, data[i].dateCree, data[i].modifPar, data[i].modif, data[i].client_FK);
                        objs.push(evenement);  
                        console.log(data[i].client_FK);
                };
                // Mettre a jour le array d'evx du service.
                this.evenements = objs;
                console.log("array du service: " + JSON.stringify(this.evenements));
                return objs;
            })
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }
    
    getEvenement(noEvenement: number): Observable<Evenement>{
        return this._http.get('http://localhost:3000/evenement/' + noEvenement)
            .map((response: Response) => {
                const data = response.json().obj;
                let evenement = new Evenement(data._id, data.noEvenement, data.nom,
                        data.dateEvenement, data.contact, data.client,
                        data.selectEtat, data.dateSoumission, data.dateConfirmation, data.dateFacturation,
                        data.dateNonRetenu, data.dateAnnulation, data.notes, data.validationTache,
                        data.creerPar, data.dateCree, data.modifPar, data.modif, data.client_FK, data.activites);
                return evenement;
            })
            .catch(error => Observable.throw(error.json() ||  'erreur serveur'));
    }

    creerEvenement(evenement: Evenement){
        const body = JSON.stringify(evenement);
        console.log("body de l'evenement : ");
        console.log(body);
        const header = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.post('http://localhost:3000/evenement' + token, body, {headers:header})
            .map((response: Response) => {
                const data = response.json().obj;
                let evenement = new Evenement(data._id, data.noEvenement, data.nom,
                        data.dateEvenement, data.contact, data.client,
                        data.selectEtat, data.dateSoumission, data.dateConfirmation, data.dateFacturation,
                        data.dateNonRetenu, data.dateAnnulation, data.notes, data.validationTache,
                        data.creerPar, data.dateCree, data.modifPar, data.modif, data.client_FK, data.activites);
                return evenement;
            })
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }

    updateEvenement(evenement: Evenement){
        const body = JSON.stringify(evenement);
        const header = new Headers({'Content-Type' : 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.put('http://localhost:3000/evenement/' + evenement.evenementId + token, body, {headers:header})
            .map((response : Response) => response.json())
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }

    deleteEvenement(evenement: Evenement){
        this.evenements.splice(this.evenements.indexOf(evenement), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.delete('http://localhost:3000/evenement/' + evenement.evenementId + token)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error.jsons() || 'erreur serveur'));
    }

    getEvenementsSpecialSearch(textSearch: string): Observable<Evenement[]>{
        return this._http.get('http://localhost:3000/evenement/search/' + textSearch)
            .map((response: Response) => {
                const data = response.json().obj;
                let objs: any[] = [];
                for(let i=0; i < data.length; i++){
                    let evenement = new Evenement(data[i]._id, data[i].noEvenement, data[i].nom,
                        data[i].dateEvenement, data[i].contact, data[i].client,
                        data[i].selectEtat, data[i].dateSoumission, data[i].dateConfirmation, data[i].dateFacturation,
                        data[i].dateNonRetenu, data[i].dateAnnulation, data[i].notes, data[i].validationTache,
                        data[i].creerPar, data[i].dateCree, data[i].modifPar, data[i].modif);
                        objs.push(evenement);
                        console.log('les evx filtrés: ' + JSON.stringify(evenement));
                };
                this.evenements = objs;
                console.log('array filtrer : ');
                console.log(this.evenements);
                return objs;
            })
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }













}


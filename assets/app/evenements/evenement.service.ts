import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Evenement } from './evenement';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EvenementService{
    evenements: Evenement[] = [];

    constructor( private _http: Http) { }
    
    
    //data[i].client_FK._id pour modifier un evenement pour actualiser la selection par rapport au client.
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
                        data[i].creerPar, data[i].dateCree, data[i].modifPar, data[i].modif);
                        objs.push(evenement);
                        console.log('les evx construit dans le service: ' + JSON.stringify(evenement));
                        console.log('client retourné : ')    
                        console.log(data[i].client_FK);
                };
                // mettre a jour le array d'evx du service
                this.evenements = objs;
                console.log("array du service: " + this.evenements);
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
                        data.creerPar, data.dateCree, data.modifPar, data.modif, data.client_FK);
                return evenement;
            })
            .catch(error => Observable.throw(error.json() ||  'erreur serveur'));
    }

    creerEvenement(evenement: Evenement){
        const body = JSON.stringify(evenement);
        const header = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.post('http://localhost:3000/evenement' + token, body, {headers:header})
            .map((response: Response) => {
                const data = response.json().obj;
                let evenement = new Evenement(data._id, data.noEvenement, data.nom,
                        data.dateEvenement, data.contact, data.client,
                        data.selectEtat, data.dateSoumission, data.dateConfirmation, data.dateFacturation,
                        data.dateNonRetenu, data.dateAnnulation, data.notes, data.validationTache,
                        data.creerPar, data.dateCree, data.modifPar, data.modif);
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
            .catch(error => Observable.throw(error.json()))
    }













}


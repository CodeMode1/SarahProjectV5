import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Client } from './client';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientService {
    clients: Client[] = [];

    constructor(private _http: Http) { }

    creerClient(client: Client){
        const body = JSON.stringify(client);
        const header = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.post('http://localhost:3000/client' + token, body, {headers: header})
            .map((response: Response) => {
                const data = response.json().obj;
                let client = new Client(data._id, data.noClient, data.prenom, data.nom, data.noCompte, data.courriel, data.cell, data.compagnie, data.adresse, data.ville,
                    data.codePostal, data.telPrincipal, data.province, data.pays, data.fax, data.telSecondaire, data.memo,
                    data.memoAVenir, data.noExTaxeProv, data.noExTaxeFed, data.selectStatut, data.selectSource, data.modifPar, data.modif, 
                    data.dateDernEv, data.creerPar, data.dateCree);                
                return client;
            })
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }

    getClients(): Observable<Client[]>{
        return this._http.get('http://localhost:3000/client')
            .map((response: Response) => {
                    //console.log('les clients: ' + JSON.stringify(data));
                    const data = response.json().obj;
                    let objs: any[] = [];
                    for(let i=0; i < data.length; i++){
                        let client = new Client(data[i]._id, data[i].noClient, data[i].prenom, data[i].nom, data[i].noCompte, data[i].courriel, data[i].cell, data[i].compagnie, data[i].adresse, data[i].ville,
                    data[i].codePostal, data[i].telPrincipal, data[i].province, data[i].pays, data[i].fax, data[i].telSecondaire, data[i].memo, data[i].memoAVenir, data[i].noExTaxeProv, data[i].noExTaxeFed, 
                    data[i].selectStatut, data[i].selectSource, data[i].modifPar, data[i].modif, 
                    data[i].dateDernEv, data[i].creerPar, data[i].dateCree);
                    objs.push(client);
                    console.log('les clients: ' + JSON.stringify(client));
                    };
                    // Mettre a jour le array de clients du service.
                    this.clients = objs;
                    console.log(this.clients);
                    return objs;
                })
                .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }

    getClient(codeClient: number): Observable<Client>{
        return this._http.get('http://localhost:3000/client/' + codeClient)
            .map((response: Response) => {
                const data = response.json().obj;
                let client = new Client(data._id, data.noClient, data.prenom, data.nom, data.noCompte, data.courriel, data.cell, data.compagnie, data.adresse, data.ville,
                    data.codePostal, data.telPrincipal, data.province, data.pays, data.fax, data.telSecondaire, data.memo,
                    data.memoAVenir, data.noExTaxeProv, data.noExTaxeFed, data.selectStatut, data.selectSource, data.modifPar, data.modif, 
                    data.dateDernEv, data.creerPar, data.dateCree);                
                return client;
            })
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }

    getClientsSpecialSearch(textSearch: string): Observable<Client[]>{
        return this._http.get('http://localhost:3000/client/search/' + textSearch)
            .map((response: Response) => {
                const data = response.json().obj;
                 let objs: any[] = [];
                    for(let i=0; i < data.length; i++){
                        let client = new Client(data[i]._id, data[i].noClient, data[i].prenom, data[i].nom, data[i].noCompte, data[i].courriel, data[i].cell, data[i].compagnie, data[i].adresse, data[i].ville,
                    data[i].codePostal, data[i].telPrincipal, data[i].province, data[i].pays, data[i].fax, data[i].telSecondaire, data[i].memo, data[i].memoAVenir, data[i].noExTaxeProv, data[i].noExTaxeFed, 
                    data[i].selectStatut, data[i].selectSource, data[i].modifPar, data[i].modif, 
                    data[i].dateDernEv, data[i].creerPar, data[i].dateCree);
                    objs.push(client);
                    console.log('les clients: ' + JSON.stringify(client));
                    };
                    this.clients = objs;
                    console.log(this.clients);
                    return objs;
                })
                .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }

    updateClient(client: Client){
        const body = JSON.stringify(client);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.put('http://localhost:3000/client/' + client.clientId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    deleteClient(client: Client){
        this.clients.splice(this.clients.indexOf(client), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.delete('http://localhost:3000/client/' + client.clientId + token)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error.json()));
    }

}

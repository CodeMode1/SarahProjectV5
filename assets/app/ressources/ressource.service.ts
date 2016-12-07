import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Ressource } from './ressource';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RessourceService {
    ressources: Ressource[] = [];

    constructor( private _http: Http) { }

    getRessources(): Observable<Ressource[]>{
        return this._http.get('http://localhost:3000/ressource')
            .map((response: Response) => {
                const data = response.json().obj;
                console.log("fucking ressource a mar de de tabarnak : ");
                console.log(data);
                let objs: any[] = [];
                for(let i=0; i < data.length; i++){
                    let ressource = new Ressource(data[i]._id, data[i].nom);
                        objs.push(ressource);  
                        console.log(data[i].nom);
                };
                // Mettre a jour le array de ressources du service.
                this.ressources = objs;
                console.log("array du service: " + JSON.stringify(this.ressources));
                return objs;
            })
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }

    creerRessource(ressource: Ressource){
        const body = JSON.stringify(ressource);
        console.log("body de la ressource : ");
        console.log(body);
        const header = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.post('http://localhost:3000/ressource' + token, body, {headers:header})
            .map((response: Response) => {
                const data = response.json().obj;
                let ressource = new Ressource(data._id, data.nom);
                return ressource;  
            })
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }

    updateRessource(ressource: Ressource){
        const body = JSON.stringify(ressource);
        const header = new Headers({'Content-Type' : 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.put('http://localhost:3000/ressource/' + ressource.ressourceId + token, body, {headers:header})
            .map((response : Response) => response.json())
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }

    deleteRessource(ressource: Ressource){
        this.ressources.splice(this.ressources.indexOf(ressource), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.delete('http://localhost:3000/ressource/' + ressource.ressourceId + token)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error.jsons() || 'erreur serveur'));
    }
}
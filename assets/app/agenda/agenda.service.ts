import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { agendaRessource } from './agendaRessource';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendaService {
    ressources: agendaRessource[] = [];

    constructor(private _http: Http) { }

    getRessources(): Observable<agendaRessource[]>{
        return this._http.get('http://localhost:3000/ressource')
            .map((response: Response) => {
                const data = response.json().obj;
                console.log("ressource : ");
                console.log(data);
                let objs: any[] = [];
                for(let i=0; i < data.length; i++){
                    let ressource = new agendaRessource(data[i].nom, data[i]._id, data[i].couleur);
                        objs.push(ressource);  
                        console.log(data[i].nom + data[i].couleur);
                };
                // mettre a jour le array de ressources du service
                this.ressources = objs;
                console.log("array du service: " + JSON.stringify(this.ressources));
                return objs;
            })
            .catch(error => Observable.throw(error.json() || 'erreur serveur'));
    }
}
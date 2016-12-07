import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User } from '../users/user';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

    constructor( private _http: Http) { }

    signUp(user: User){
        const body = JSON.stringify(user);
        const header = new Headers({'Content-Type': 'application/json'});
        return this._http.post('http://localhost:3000/user', body, {headers: header})
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    signIn(user: User){
        const body = JSON.stringify(user);
        const header = new Headers({'Content-Type': 'application/json'});
        return this._http.post('http://localhost:3000/user/signin', body, {headers: header})
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    // Flush jeton et userId côté client
    logOut(){
        localStorage.clear();
    }

    // Si un user est loggé
    estLogIn(){
        return localStorage.getItem('token') !== null;
    }
}
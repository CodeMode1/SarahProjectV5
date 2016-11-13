import { Component, OnInit } from "@angular/core";
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'my-header',
    template: `
        <header class="row">
            <div class="col-md-12">
                <my-logo></my-logo>
            </div>
            <nav class="col-md-12" *ngIf="estLogIn()">
                <ul class="nav nav-pills">
                    <li><a>Agenda</a></li>
                    <li><a [routerLink]="['/clients']" routerLinkActive="router-link-active">Clients</a></li>
                    <li><a [routerLink]="['/evenements']" routerLinkActive="router-link-active">Évènements</a></li>
                    <li><a [routerLink]="['/ressources']" routerLinkActive="router-link-active">Ressources</a></li>
                </ul>
            </nav>
        </header>
    `,
    styles: [`
        header {
            width: auto;
            height:auto;
            margin-top: 0px;
            padding: 0 0 0 0;
            background-color: #d7e1ee;
        }

        .row{
            margin-left:0;
            margin-right:0;
        }

        nav{
            background-color: white;
            padding:1% 0 1% 0;
            clear:both;
            float:left;
            width:100%;
        }

        div{
            float:left;
            margin:0;
            padding:0;
            background-color: #d7e1ee;
        }

        ul{
          text-align: left;  
        }

        li {
            float: none;
            display: inline-block;
            padding: 0 3% 0 0;
        }

        li a{
            font-size:1.5vw;
        }

        li:nth-of-type(1){
            padding: 0 3% 0 5%;
        }
        
        .router-link-active{
            background-color: #337ab7;
            color: white;
        }

        .my-login{
            position:absolute;
            bottom:0;
        }
    `]
})
export class HeaderComponent implements OnInit {
    title: string;

    constructor(private _authService: AuthService){
        this.title = "Système abordable de réservation et agenda";
    }

    ngOnInit(){
    }

    estLogIn(){
        return this._authService.estLogIn();
    }
}
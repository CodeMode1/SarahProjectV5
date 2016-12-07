import { Component, OnInit } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'my-home',
    template: `
        <div class="jumbotron col-md-12">
            <h2>{{titre}}</h2>
            <p><a class="btn btn-primary btn-lg" role="button" (click)="showNouvelles()" >Nouvelles</a></p>
        </div>
        <section class="row col-md-12 icons">
            <div class="container col-md-4 icon">
                <span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
            </div>
            <div class="container col-md-4 icon">
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
            </div>
            <div class="container col-md-4 icon">
                <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
            </div>
        </section>
        <article id="nouvelles" class="jumbotron col-md-12">
            <h3>{{nouvelles}}</h3>
            <my-nouvelles *ngIf="this.estNouvelles" ></my-nouvelles>
        </article>
    `,
    styles: [`
        *{
            margin:0;
        }

        h2, h3{
            padding: 2% 0 2% 0;
        }

        .jumbotron{
            clear:both;
            float:left;
            width:100%;
        }

        .container{
            margin:0;
            text-align:center;
            padding:2% 0 2% 0;
            background-color: #A2B5CD;
            width:100%;
        }

        .glyphicon{
            font-size:2vw;
        }

        .row{
            padding:0;
        }
    `]
})
export class HomeComponent implements OnInit {
    titre: string;
    nouvelles: string;
    estNouvelles: boolean;
    constructor() { 
        this.titre = "Système Abordable de Réservation et Agenda";
        this.nouvelles = "Nouvelles";
        this.estNouvelles = false;
    }

    ngOnInit() { }

    showNouvelles(){
        this.estNouvelles = !this.estNouvelles;
    }
}
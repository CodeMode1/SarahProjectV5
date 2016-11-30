import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewChecked, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Activite } from './activite';
import { OrderByPipe } from '../pipes/orderBy.pipe';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'my-activite-list',
    templateUrl: 'activite-list.component.html',
    changeDetection:ChangeDetectionStrategy.OnPush,
    styles: [ `
        .header{
            padding-left: 30px;
        }

        .outer{
            float:left;
            clear:both;
            padding: 0 0 1% 0;
        }
        h2{
            color: #337ab7;
        }

        .space{
            margin: 0 1% 0 1%;
        }

         td, th{
            text-align: center;
            font-size: 1vw;
        }

        thead > tr{
            background-color: #fafafa;
            border-bottom: 0.25em solid #1565c0;
        }

        tbody > tr:hover{
            background-color: #a9d4f9;
        }

        tbody > tr{
            border-bottom: 0.2em solid #ddd;
            cursor: pointer;
        }

        .estSelectRange{
             background-color: #519BDB;
         }

         .checkbox{
             margin-bottom: 9%;
         }

        
    `
    ]
})
export class ActiviteListComponent implements OnInit, AfterViewChecked, OnChanges, OnDestroy {
    @Input() activites: Activite[];
    @Input() estNouveau: boolean;
    titre: string; 
    selectedActivite: Activite;
    indexNom: number = 0;
    defaultActivite: Observable<Activite>;
    nbChanges: number;

    constructor(private cd: ChangeDetectorRef) { 
        this.titre = "Activités";
        this.activites = [];
        this.selectedActivite = new Activite();
        this.selectedActivite.modifie = "";
        this.selectedActivite.modifiePar = "";
        this.selectedActivite.serviceTotal = 0;
        this.selectedActivite.fraisServiceTotal = 0;
        this.nbChanges = 0;
    }

    calculServiceTotal(){
        var total = 0;
        for(var i = 0; i < this.selectedActivite.services.length; i++){
            if(!isNaN(this.selectedActivite.services[i].sousTotal)){
                total += this.selectedActivite.services[i].sousTotal;
            }     
        }
        return Number(total.toFixed(2));
    }

    calculFraisServiceTotal(){
        var total = 0;
        for(var i = 0; i < this.selectedActivite.services.length; i++){
            if(!isNaN(this.selectedActivite.services[i].fraisServiceTotal)){
            total += this.selectedActivite.services[i].fraisServiceTotal;
            }
        }
        return Number(total.toFixed(2));
    }

    setTotauxActivite(){
        this.selectedActivite.serviceTotal = this.calculServiceTotal();
        this.selectedActivite.fraisServiceTotal = this.calculFraisServiceTotal();
    }

    ngOnInit() {  
        console.log(this.nbChanges);
        if(this.nbChanges == 2){
            alert("change ready");
            this.defaultActivite.subscribe( () => {
                // application state changed    
                this.selectedActivite = null;  
                // marks path,  the following is required, otherwise the view will not be updated
                this.cd.markForCheck();         
            })    
        }    
    }


    // run avant OnInit dans le life cycle 
     ngOnChanges(changes: any){
        if(changes.activites != null && changes.activites != undefined){
            this.nbChanges++;
            alert("on change");
            console.log(this.nbChanges);
            console.log(changes.activites.currentValue);
            this.defaultActivite = Observable.of(changes.activites.currentValue[0]);
            console.log("default ac :");
            console.log(this.defaultActivite);
        }

        if(this.nbChanges > 2){
            this.selectedActivite = this.activites[0];
        }
     }


    ngAfterViewChecked(){
        //modifier la date et modifié par seulement lorsqu'on est en mode edition.
        if(!this.estNouveau && this.selectedActivite.modifiePar != ""){
            this.selectedActivite.modifie = this.getDateModif();
            this.selectedActivite.modifiePar = localStorage.getItem('userName');
        }
        if(this.selectedActivite.services !== null || this.selectedActivite.services.length > 0){
            this.setTotauxActivite();
        }

    }

    ngOnDestroy(){
        this.nbChanges = 0;
    }  

    ajouteActivite(){
        var nouvelleActivite: Activite;
        this.indexNom += 1;
        nouvelleActivite = new Activite();
        nouvelleActivite.nom = "Nouveau" + this.indexNom;
        //this.nouvelleActivite.debut = new Date().toLocaleString().substring(0,10);
        nouvelleActivite.debut = this.getDateActuelle();
        nouvelleActivite.etat = "Soumission";
        this.activites.push(nouvelleActivite);
    }

    supprimeActivite(){
        // supprime le dernier activiter de la liste
        //this.activites.pop();
        this.activites.splice(this.activites.indexOf(this.selectedActivite), 1);
    }

    selectActivite(activite: Activite){
        this.selectedActivite = activite;
    }

    getDateActuelle(){
       var date = new Date().toLocaleDateString();
       var yyyy = date.substring(6,10);
       var mm = date.substring(3,5);
       var dd = date.substring(0,2);
       return (yyyy + "-" + mm + "-" + dd);     
    }

    getDateModif(){
       var date = new Date().toLocaleString();
       var yyyy = date.substring(6,10);
       var mm = date.substring(3,5);
       var dd = date.substring(0,2);
       var hh = date.substring(12,14);
       var mm = date.substring(15,17);
       var ss = date.substring(18,20);
       return (yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mm + ":" + ss);
    }      
}
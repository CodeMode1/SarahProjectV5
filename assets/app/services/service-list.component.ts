import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, AfterViewChecked } from '@angular/core';
import { Service } from './service';

@Component({
    moduleId: module.id,
    selector: 'my-service-list',
    templateUrl: 'service-list.component.html',
    changeDetection:ChangeDetectionStrategy.OnPush,
    styles: [ `
        .header{
            padding-left: 30px;
        }
    
        .form-group{
            float: left;
        }

        section{
            clear: both;
            float: left;
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
    `
    ]
})
export class ServiceListComponent implements OnInit, OnChanges, AfterViewChecked {
    @Input() services: Service[];
    @Input() estNouveau: boolean;
    @Input() compteurChanges: number;
    selectedService: Service;
    indexNom: number = 0;
    titre: string;

    constructor() { 
        this.titre = "Services";
        this.services = [];
        this.selectedService = new Service();
        this.selectedService.modifie = "";
        this.selectedService.modifiePar = "";
        this.selectedService.total = 0;
    }

    ngOnInit() {
        console.log("nb changes service init : ");
        if(this.compteurChanges == 2){
            this.selectedService = null;
        }
    }

    ngOnChanges(changes: any){
        if(changes.compteurChanges != null){
            console.log("nb changes services onchanges : ");
            console.log(this.compteurChanges);
            if(this.compteurChanges > 2){
                this.selectedService = this.services[0];
            }
        }
    }

    ngAfterViewChecked(){
        //modifier la date et modifié par seulement lorsqu'on est en mode edition.
        if(!this.estNouveau){
            this.selectedService.modifie = this.getDateModif();
            this.selectedService.modifiePar = localStorage.getItem('userName');
        }
        if(this.services == null || this.services.length < 1){
            this.selectedService.modifie = null;
            this.selectedService.modifiePar = "";
        }
        this.calculServices();
    }

    ajouteService(){
        var nouveauService: Service;
        this.indexNom += 1;
        nouveauService = new Service();
        nouveauService.nom = "Nouveau" + this.indexNom;
        nouveauService.temps = this.getDateActuelle();
        this.services.push(nouveauService);
    }

    supprimeService(){
        this.services.splice(this.services.indexOf(this.selectedService), 1);
    }

    selectService(service: Service){
        this.selectedService = service;
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

    calculServices(){
        this.selectedService.sousTotal = Number(((this.selectedService.quantite * this.selectedService.prixUnitaire) * (1- (this.selectedService.escompte/100))).toFixed(2));
        this.selectedService.fraisServiceTotal = Number((this.selectedService.sousTotal * (this.selectedService.fraisService/100)).toFixed(2));
        if(!isNaN(this.selectedService.sousTotal) && !isNaN(this.selectedService.fraisServiceTotal)){
            this.selectedService.total = Number((this.selectedService.sousTotal + this.selectedService.fraisServiceTotal).toFixed(2));
        } else{
            this.selectedService.total = 0;
        }
        
    }  
}
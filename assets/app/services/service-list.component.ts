import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Service } from './service';

@Component({
    moduleId: module.id,
    selector: 'my-service-list',
    templateUrl: 'service-list.component.html',
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
            font-size: 14px;
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
export class ServiceListComponent implements OnChanges {
    @Input() services: Service[];
    @Input() estNouveau: boolean;
    @Input() compteurChanges: number;
    @Output() recalcTrigger: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() enableSave: EventEmitter<boolean> = new EventEmitter<boolean>();
    selectedService: Service;
    indexNom: number = 0;
    titre: string;

    constructor() { 
        this.titre = "Services";
        this.services = [];
        this.selectedService = new Service();
        this.selectedService.modifie = null;
        this.selectedService.modifiePar = "";
        this.selectedService.total = 0;
    }

    ngOnChanges(){
        if(this.services[0] != null && this.services[0] != undefined){
            this.selectedService = this.services[0];
        }
    }

     /* Réagir au changement usager, cet evenement est applique sur tous les inputs du form.
         selon la syntax: (ngModelChange)="onUserChange($event)" */
     onUserChange($event){
         console.log("ACT-onUserChange: " + $event);

         // Enable Enregistrer bouton.
         this.enableSave.emit(true);

         // Tag Activites avec le user et le timestamp du changement.
         if(!this.estNouveau){
             this.selectedService.modifie = this.getDateModif();
             this.selectedService.modifiePar = localStorage.getItem('userName');
         }
     }

     // Change event sur tous les inputs qui affectent le total.
     onCalcChange($event){
         this.calculServices();

         this.onUserChange($event);

         // Fire event emitter pour trigger la recalculation dans Activite parent.
         this.recalcTrigger.emit(true);
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
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6,10);
        var MM = date.substring(3,5);
        var dd = date.substring(0,2);
        var hh = date.substring(12,14);
        var mm = date.substring(15,17);
        return (yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm);     
    }

    getDateModif(){
        var date = new Date().toLocaleString();
        var yyyy = date.substring(6,10);
        var MM = date.substring(3,5);
        var dd = date.substring(0,2);
        var hh = date.substring(12,14);
        var mm = date.substring(15,17);
        var ss = date.substring(18,20);
        return (yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss);
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
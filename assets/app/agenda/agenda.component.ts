import { Component, OnInit } from '@angular/core';
import { agendaRessource } from './agendaRessource';
import { ErreurService } from '../erreurs/erreur.service';
import { AgendaService } from './agenda.service';
declare  var $, kendo :any;

@Component({
    moduleId: module.id,
    selector: 'my-agenda',
    templateUrl: 'agenda.component.html',
    styles: [ `
        .k-nav-current > .k-link span + span {
            max-width: 200px;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            vertical-align: top;
        }

        #listRessources{
            width: 100%;
            clear: both;
        }

        .inlineInputs{
            display: inline-block;
            width: auto;
            margin: 1%;
        }

    `
    ]
})
export class AgendaComponent implements OnInit {
    /* Liste de toutes les ressources du système avec les propriétés suivantes:
        text: nom de la ressource
        value: ID mongoose 
        color: la couleur de cette ressource. */
    ressources: agendaRessource[];
    ressourcesFiltre: any[]; 
    constructor( private _agendaService: AgendaService, private _erreurService: ErreurService) {
        this.ressources = [];
        this.ressourcesFiltre = [];
    }

    ngOnInit() {
        this.getRessources();
    }    

    // Obtient les ressources du serveur et met en place les propriétés du composant.
    getRessources(){
        this._agendaService.getRessources().subscribe(
            data => {
                this.ressources = data;
                console.log("ressource du serveur pour afficher dans la liste : ");
                for(let i=0; i < this.ressources.length; i++){
                    console.log(this.ressources[i]);
                    console.log(this.ressources[i].text);

                    var filtre = {
                        field: "ownerId",
                        operator: "eq",
                        value: this.ressources[i].value
                    };
                    this.ressourcesFiltre.push(filtre);
                }

                /* Initialise l'agenda seulement après avoir obtenu les ressources
                    pour mettre en place le filtre initial. */
                this.agendaInit();   
            },
            error => this._erreurService.handleErreur(error)
        );
    }

    agendaInit(){
        $("#scheduler").kendoScheduler({
            height: 600,
            editable: false,
            views: [
                "day",
                "week",
                { type: "month", selected: true },
                "agenda",
                { type: "timeline", eventHeight: 50}
            ],
            timezone: "Etc/UTC",
            dataSource: {
                batch: true,
                transport: {
                    read: {
                        // API pour aller chercher les activités à afficher.
                        url: "http://localhost:3000/activite",
                        dataType: "json"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                // Definition du schéma des informations retournés pour chaque activité par l'API.
                schema: {
                    model: {
                        id: "taskId",
                        fields: {
                            //Utiliser identifiant Mongoose de l'activité comme taskId.
                            taskId: { from: "TaskID", type: "string" },
                            //Utiliser le nom de l'activité pour Title.
                            title: { from: "Title", defaultValue: "No title" },
                            start: { type: "date", from: "Start" },
                            end: { type: "date", from: "End" },
                            //Nom evx dans la description.
                            description: { from: "Description", type: "string" },
                            //Utiliser le ID Mongoose de la ressource comme "owner".
                            ownerId: { from: "OwnerID", type: "string" }
                        }
                    }
                },
                filter: {
                    /* Filtre par défaut qui affiche toutes les ressources lu du serveur. */
                    logic: "or",
                    filters: this.ressourcesFiltre 
                }
            },
            resources: [
                {
                    field: "ownerId",
                    title: "Owner",
                    dataSource: this.ressources 
                }
            ]
        });
    }

    /* Met à jour le filtre du Scheduler lorsque l'usager click un checkbox de ressource. */
    filtreChange(filtreCheckbox){
        /* checked est un array contenant tous les ID's des ressources qui 
            sont sélectionnées par l'usager en utilisant les checkbox. */
        var checked = $.map($("#checkRessource :checked"), function(checkbox) {
            return ($(checkbox).val());
        });

        var scheduler = $("#scheduler").data("kendoScheduler");

        /* Applique le filtre sur le schduler basé sur la liste des
            ressources sélectionnées avec les checkbox. */    
        scheduler.dataSource.filter({
            operator: function(task) {
                return $.inArray(task.ownerId, checked) >= 0;
            } 
        });
    }    
}
import { Component, OnInit } from '@angular/core';
import { agendaRessource } from './agendaRessource';
import { agendaActivite } from './agendaActivite';
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
    `
    ]
})
export class AgendaComponent implements OnInit {
    // avec service angular2, appel serveur, complete Init
    //   Liste de toutes les ressources du système avec les propriétés suivantes:
    //      text: nom de la ressource
    //      value: ID mongoose 
    //      color: la couleur de cette ressource.
    ressources: agendaRessource[];
    ressourcesFiltre: any[]; 
    constructor( private _agendaService: AgendaService, private _erreurService: ErreurService) {
        this.ressources = [];
        this.ressourcesFiltre = [];
        this.ressources.push({text: "Patrick", value: "dff", color: "#f8a398"});
        this.ressources.push({text: "Daf", value: "rewrewr", color: "#51a0ed" });
        this.ressources.push({text: "Lapin", value: "rewrew", color: "#56ca85" });
    }

    getRessources(){
        this._agendaService.getRessources().subscribe(
            data => {
                this.ressources = data;
                //print données pour chaque ressource
                console.log("ressource du serveur pour afficher dans la liste : ");
                for(let i=0; i < this.ressources.length; i++){
                    console.log(this.ressources[i]);
                    console.log(this.ressources[i].text);

                    let filtre = {
                        field: "ownerId",
                        operator: "eq",
                        value: this.ressources[i].value
                    };
                    this.ressourcesFiltre.push(filtre);
                }
                this.agendaSettings();   
            },
            error => this._erreurService.handleErreur(error)
        );
    }

    ngOnInit() {
        this.getRessources();
    }

    agendaSettings(){
        $("#scheduler").kendoScheduler({
            //date: new Date("2013/6/13"),
            //startTime: new Date("2013/6/13 07:00 AM"),
            height: 600,
            views: [
                "day",
                /*{ type: "workWeek", selected: true },*/
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
                        // TODO Pour garder les choses simples pour le projet, on va aller
                        //   chercher TOUS les activités dans la BD.
                        url: "http://localhost:3000/activite",
                        dataType: "json"
                        //url: "//demos.telerik.com/kendo-ui/service/tasks",
                        //dataType: "jsonp"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                // Definition du schéma des informations retournés pour chaque appointment par l'API.
                schema: {
                    model: {
                        id: "taskId",
                        fields: {
                            //Utiliser identifiant Mongoose de l'activité comme taskId, changer type pour string
                            taskId: { from: "TaskID", type: "string" },
                            //Utiliser le nom de l'activité pour Title.
                            title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                            start: { type: "date", from: "Start" },
                            end: { type: "date", from: "End" },
                            //Nom evx
                            description: { from: "Description", type: "string" },
                            //Utiliser le ID Mongoose de la ressource, change le type pour string.
                            ownerId: { from: "OwnerID", type: "string" }
                        }
                    }
                },
                filter: {
                    /* TODO Il faut trouver une façon de faire un filtre par défaut qui affiche toutes les ressources lu du serveur... */
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
    
        /* Met à jour le filtre du Scheduler lorsque l'usager click un checkbox de ressource. */
        $("#checkRessource :checkbox").change(function(e) {
            // checked est un array contenant tous les ID's des ressources qui 
            //    sont sélectionnées par l'usager en utilisant les checkbox.
            var checked = $.map($("#checkRessource :checked"), function(checkbox) {
                return ($(checkbox).val());
            });
    
            var scheduler = $("#scheduler").data("kendoScheduler");
    
            // Applique le filtre sur le schduler basé sur la liste des 
            //    ressources sélectionnées avec les checkbox.
            scheduler.dataSource.filter({
                operator: function(task) {
                    return $.inArray(task.ownerId, checked) >= 0;
                }
            });
        }); 
    }
}
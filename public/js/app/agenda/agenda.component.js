"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var erreur_service_1 = require('../erreurs/erreur.service');
var agenda_service_1 = require('./agenda.service');
var AgendaComponent = (function () {
    function AgendaComponent(_agendaService, _erreurService) {
        this._agendaService = _agendaService;
        this._erreurService = _erreurService;
        this.ressources = [];
        this.ressources.push({ text: "Patrick", value: "dff", color: "#f8a398" });
        this.ressources.push({ text: "Daf", value: "rewrewr", color: "#51a0ed" });
        this.ressources.push({ text: "Lapin", value: "rewrew", color: "#56ca85" });
    }
    AgendaComponent.prototype.getRessources = function () {
        var _this = this;
        this._agendaService.getRessources().subscribe(function (data) {
            _this.ressources = data;
            //print données pour chaque ressource
            console.log("ressource du serveur pour afficher dans la liste : ");
            for (var i = 0; i < _this.ressources.length; i++) {
                console.log(_this.ressources[i]);
                console.log(_this.ressources[i].text);
            }
            _this.agendaSettings();
        }, function (error) { return _this._erreurService.handleErreur(error); });
    };
    AgendaComponent.prototype.ngOnInit = function () {
        this.getRessources();
    };
    AgendaComponent.prototype.agendaSettings = function () {
        $("#scheduler").kendoScheduler({
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 07:00 AM"),
            height: 600,
            views: [
                "day",
                /*{ type: "workWeek", selected: true },*/
                "week",
                { type: "month", selected: true },
                "agenda",
                { type: "timeline", eventHeight: 50 }
            ],
            timezone: "Etc/UTC",
            dataSource: {
                batch: true,
                transport: {
                    read: {
                        // TODO Pour garder les choses simples pour le projet, on va aller
                        //   chercher TOUS les activités dans la BD.
                        url: "//demos.telerik.com/kendo-ui/service/tasks",
                        dataType: "jsonp"
                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return { models: kendo.stringify(options.models) };
                        }
                    }
                },
                // Definition du schéma des informations retournés pour chaque appointment par l'API.
                schema: {
                    model: {
                        id: "taskId",
                        fields: {
                            // TODO Utiliser identifiant Mongoose de l'activité comme taskId, changer type pour string
                            taskId: { from: "TaskID", type: "number" },
                            // TODO Utiliser le nom de l'activité pour Title.
                            title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                            start: { type: "date", from: "Start" },
                            end: { type: "date", from: "End" },
                            //Canada/Eastern
                            startTimezone: { from: "StartTimezone" },
                            endTimezone: { from: "EndTimezone" },
                            description: { from: "Description" },
                            //recurrenceId: { from: "RecurrenceID" },
                            //recurrenceRule: { from: "RecurrenceRule" },
                            //recurrenceException: { from: "RecurrenceException" },
                            // TODO Utiliser le ID Mongoose de la ressource, change le type pour string.
                            ownerId: { from: "OwnerID" },
                            isAllDay: { type: "boolean", from: "IsAllDay" }
                        }
                    }
                },
                filter: {
                    /* TODO Il faut trouver une façon de faire un filtre par défaut qui affiche toutes les ressources lu du serveur... */
                    logic: "or",
                    filters: [
                        { field: "ownerId", operator: "eq", value: 1 },
                        { field: "ownerId", operator: "eq", value: 2 }
                    ]
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
        $("#checkRessource :checkbox").change(function (e) {
            // checked est un array contenant tous les ID's des ressources qui 
            //    sont sélectionnées par l'usager en utilisant les checkbox.
            var checked = $.map($("#checkRessource :checked"), function (checkbox) {
                return parseInt($(checkbox).val());
            });
            var scheduler = $("#scheduler").data("kendoScheduler");
            // Applique le filtre sur le schduler basé sur la liste des 
            //    ressources sélectionnées avec les checkbox.
            scheduler.dataSource.filter({
                operator: function (task) {
                    return $.inArray(task.ownerId, checked) >= 0;
                }
            });
        });
    };
    AgendaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-agenda',
            templateUrl: 'agenda.component.html',
            styles: ["\n        .k-nav-current > .k-link span + span {\n            max-width: 200px;\n            display: inline-block;\n            white-space: nowrap;\n            text-overflow: ellipsis;\n            overflow: hidden;\n            vertical-align: top;\n        }\n\n        #listRessources{\n            width: 100%;\n            clear: both;\n        }\n    "
            ]
        }), 
        __metadata('design:paramtypes', [agenda_service_1.AgendaService, erreur_service_1.ErreurService])
    ], AgendaComponent);
    return AgendaComponent;
}());
exports.AgendaComponent = AgendaComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW5kYS9hZ2VuZGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFHbEQsK0JBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsK0JBQThCLGtCQUFrQixDQUFDLENBQUE7QUF3QmpEO0lBT0kseUJBQXFCLGNBQTZCLEVBQVUsY0FBNkI7UUFBcEUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNyRixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsdUNBQWEsR0FBYjtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQ3pDLFVBQUEsSUFBSTtZQUNBLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLHFDQUFxQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDbkUsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1B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Q1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBMUpMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLE1BQU0sRUFBRSxDQUFFLDBXQWNUO2FBQ0E7U0FDSixDQUFDOzt1QkFBQTtJQXVJRixzQkFBQztBQUFELENBdElBLEFBc0lDLElBQUE7QUF0SVksdUJBQWUsa0JBc0kzQixDQUFBIiwiZmlsZSI6ImFnZW5kYS9hZ2VuZGEuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgYWdlbmRhUmVzc291cmNlIH0gZnJvbSAnLi9hZ2VuZGFSZXNzb3VyY2UnO1xyXG5pbXBvcnQgeyBhZ2VuZGFBY3Rpdml0ZSB9IGZyb20gJy4vYWdlbmRhQWN0aXZpdGUnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEFnZW5kYVNlcnZpY2UgfSBmcm9tICcuL2FnZW5kYS5zZXJ2aWNlJztcclxuZGVjbGFyZSAgdmFyICQsIGtlbmRvIDphbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWFnZW5kYScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2FnZW5kYS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFsgYFxyXG4gICAgICAgIC5rLW5hdi1jdXJyZW50ID4gLmstbGluayBzcGFuICsgc3BhbiB7XHJcbiAgICAgICAgICAgIG1heC13aWR0aDogMjAwcHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjbGlzdFJlc3NvdXJjZXN7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICB9XHJcbiAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ2VuZGFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgLy8gYXZlYyBzZXJ2aWNlIGFuZ3VsYXIyLCBhcHBlbCBzZXJ2ZXVyLCBjb21wbGV0ZSBJbml0XHJcbiAgICAvLyBUT0RPIExpc3RlIGRlIHRvdXRlcyBsZXMgcmVzc291cmNlcyBkdSBzeXN0w6htZSBhdmVjIGxlcyBwcm9wcmnDqXTDqXMgc3VpdmFudGVzOlxyXG4gICAgLy8gICAgICB0ZXh0OiBub20gZGUgbGEgcmVzc291cmNlXHJcbiAgICAvLyAgICAgIHZhbHVlOiBJRCBtb25nb29zZSBcclxuICAgIC8vICAgICAgY29sb3I6IGxhIGNvdWxldXIgZGUgY2V0dGUgcmVzc291cmNlLlxyXG4gICAgcmVzc291cmNlczogYWdlbmRhUmVzc291cmNlW107IFxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX2FnZW5kYVNlcnZpY2U6IEFnZW5kYVNlcnZpY2UsIHByaXZhdGUgX2VycmV1clNlcnZpY2U6IEVycmV1clNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLnJlc3NvdXJjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlc3NvdXJjZXMucHVzaCh7dGV4dDogXCJQYXRyaWNrXCIsIHZhbHVlOiBcImRmZlwiLCBjb2xvcjogXCIjZjhhMzk4XCJ9KTtcclxuICAgICAgICB0aGlzLnJlc3NvdXJjZXMucHVzaCh7dGV4dDogXCJEYWZcIiwgdmFsdWU6IFwicmV3cmV3clwiLCBjb2xvcjogXCIjNTFhMGVkXCIgfSk7XHJcbiAgICAgICAgdGhpcy5yZXNzb3VyY2VzLnB1c2goe3RleHQ6IFwiTGFwaW5cIiwgdmFsdWU6IFwicmV3cmV3XCIsIGNvbG9yOiBcIiM1NmNhODVcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXNzb3VyY2VzKCl7XHJcbiAgICAgICAgdGhpcy5fYWdlbmRhU2VydmljZS5nZXRSZXNzb3VyY2VzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzc291cmNlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAvL3ByaW50IGRvbm7DqWVzIHBvdXIgY2hhcXVlIHJlc3NvdXJjZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2UgZHUgc2VydmV1ciBwb3VyIGFmZmljaGVyIGRhbnMgbGEgbGlzdGUgOiBcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMucmVzc291cmNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXNzb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFnZW5kYVNldHRpbmdzKCk7ICAgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2VycmV1clNlcnZpY2UuaGFuZGxlRXJyZXVyKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSZXNzb3VyY2VzKCk7XHJcbn1cclxuXHJcbiAgICBhZ2VuZGFTZXR0aW5ncygpe1xyXG4gICAgICAgICQoXCIjc2NoZWR1bGVyXCIpLmtlbmRvU2NoZWR1bGVyKHtcclxuICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoXCIyMDEzLzYvMTNcIiksXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUoXCIyMDEzLzYvMTMgMDc6MDAgQU1cIiksXHJcbiAgICAgICAgICAgIGhlaWdodDogNjAwLFxyXG4gICAgICAgICAgICB2aWV3czogW1xyXG4gICAgICAgICAgICAgICAgXCJkYXlcIixcclxuICAgICAgICAgICAgICAgIC8qeyB0eXBlOiBcIndvcmtXZWVrXCIsIHNlbGVjdGVkOiB0cnVlIH0sKi9cclxuICAgICAgICAgICAgICAgIFwid2Vla1wiLFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1vbnRoXCIsIHNlbGVjdGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICBcImFnZW5kYVwiLFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInRpbWVsaW5lXCIsIGV2ZW50SGVpZ2h0OiA1MH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgdGltZXpvbmU6IFwiRXRjL1VUQ1wiLFxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB7XHJcbiAgICAgICAgICAgICAgICBiYXRjaDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBQb3VyIGdhcmRlciBsZXMgY2hvc2VzIHNpbXBsZXMgcG91ciBsZSBwcm9qZXQsIG9uIHZhIGFsbGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY2hlcmNoZXIgVE9VUyBsZXMgYWN0aXZpdMOpcyBkYW5zIGxhIEJELlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiLy9kZW1vcy50ZWxlcmlrLmNvbS9rZW5kby11aS9zZXJ2aWNlL3Rhc2tzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25wXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlck1hcDogZnVuY3Rpb24ob3B0aW9ucywgb3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24gIT09IFwicmVhZFwiICYmIG9wdGlvbnMubW9kZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge21vZGVsczoga2VuZG8uc3RyaW5naWZ5KG9wdGlvbnMubW9kZWxzKX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5pdGlvbiBkdSBzY2jDqW1hIGRlcyBpbmZvcm1hdGlvbnMgcmV0b3VybsOpcyBwb3VyIGNoYXF1ZSBhcHBvaW50bWVudCBwYXIgbCdBUEkuXHJcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YXNrSWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIFV0aWxpc2VyIGlkZW50aWZpYW50IE1vbmdvb3NlIGRlIGwnYWN0aXZpdMOpIGNvbW1lIHRhc2tJZCwgY2hhbmdlciB0eXBlIHBvdXIgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSWQ6IHsgZnJvbTogXCJUYXNrSURcIiwgdHlwZTogXCJudW1iZXJcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBVdGlsaXNlciBsZSBub20gZGUgbCdhY3Rpdml0w6kgcG91ciBUaXRsZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB7IGZyb206IFwiVGl0bGVcIiwgZGVmYXVsdFZhbHVlOiBcIk5vIHRpdGxlXCIsIHZhbGlkYXRpb246IHsgcmVxdWlyZWQ6IHRydWUgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHsgdHlwZTogXCJkYXRlXCIsIGZyb206IFwiU3RhcnRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiB7IHR5cGU6IFwiZGF0ZVwiLCBmcm9tOiBcIkVuZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NhbmFkYS9FYXN0ZXJuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWV6b25lOiB7IGZyb206IFwiU3RhcnRUaW1lem9uZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRUaW1lem9uZTogeyBmcm9tOiBcIkVuZFRpbWV6b25lXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7IGZyb206IFwiRGVzY3JpcHRpb25cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZWN1cnJlbmNlSWQ6IHsgZnJvbTogXCJSZWN1cnJlbmNlSURcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZWN1cnJlbmNlUnVsZTogeyBmcm9tOiBcIlJlY3VycmVuY2VSdWxlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVjdXJyZW5jZUV4Y2VwdGlvbjogeyBmcm9tOiBcIlJlY3VycmVuY2VFeGNlcHRpb25cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBVdGlsaXNlciBsZSBJRCBNb25nb29zZSBkZSBsYSByZXNzb3VyY2UsIGNoYW5nZSBsZSB0eXBlIHBvdXIgc3RyaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3duZXJJZDogeyBmcm9tOiBcIk93bmVySURcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNBbGxEYXk6IHsgdHlwZTogXCJib29sZWFuXCIsIGZyb206IFwiSXNBbGxEYXlcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyogVE9ETyBJbCBmYXV0IHRyb3V2ZXIgdW5lIGZhw6dvbiBkZSBmYWlyZSB1biBmaWx0cmUgcGFyIGTDqWZhdXQgcXVpIGFmZmljaGUgdG91dGVzIGxlcyByZXNzb3VyY2VzIGx1IGR1IHNlcnZldXIuLi4gKi9cclxuICAgICAgICAgICAgICAgICAgICBsb2dpYzogXCJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogXCJvd25lcklkXCIsIG9wZXJhdG9yOiBcImVxXCIsIHZhbHVlOiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwib3duZXJJZFwiLCBvcGVyYXRvcjogXCJlcVwiLCB2YWx1ZTogMiB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvdXJjZXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJvd25lcklkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiT3duZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLnJlc3NvdXJjZXMgXHJcbiAgICAgICAgICAgICAgICAgICAgLypbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gUsOpZsOpcmVyIGF1IGFycmF5IGRlIHJlc3NvdXJjZXMgY29uc3RydWl0ZXMgYXZlYyBsYSBjb3VsZXVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgZGFucyBjZSBjb21wb3NhbnQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgdGV4dDogbm9tIGRlIGxhIHJlc3NvdXJjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgIHZhbHVlOiBJRCBtb25nb29zZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICBjb2xvcjogbGEgY291bGV1ciBkZSBjZXR0ZSByZXNzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJBbGV4XCIsIHZhbHVlOiAxLCBjb2xvcjogXCIjZjhhMzk4XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIkJvYlwiLCB2YWx1ZTogMiwgY29sb3I6IFwiIzUxYTBlZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJDaGFybGllXCIsIHZhbHVlOiAzLCBjb2xvcjogXCIjNTZjYTg1XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0qL1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAvKiBNZXQgw6Agam91ciBsZSBmaWx0cmUgZHUgU2NoZWR1bGVyIGxvcnNxdWUgbCd1c2FnZXIgY2xpY2sgdW4gY2hlY2tib3ggZGUgcmVzc291cmNlLiAqL1xyXG4gICAgICAgICQoXCIjY2hlY2tSZXNzb3VyY2UgOmNoZWNrYm94XCIpLmNoYW5nZShmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrZWQgZXN0IHVuIGFycmF5IGNvbnRlbmFudCB0b3VzIGxlcyBJRCdzIGRlcyByZXNzb3VyY2VzIHF1aSBcclxuICAgICAgICAgICAgLy8gICAgc29udCBzw6lsZWN0aW9ubsOpZXMgcGFyIGwndXNhZ2VyIGVuIHV0aWxpc2FudCBsZXMgY2hlY2tib3guXHJcbiAgICAgICAgICAgIHZhciBjaGVja2VkID0gJC5tYXAoJChcIiNjaGVja1Jlc3NvdXJjZSA6Y2hlY2tlZFwiKSwgZnVuY3Rpb24oY2hlY2tib3gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCgkKGNoZWNrYm94KS52YWwoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHZhciBzY2hlZHVsZXIgPSAkKFwiI3NjaGVkdWxlclwiKS5kYXRhKFwia2VuZG9TY2hlZHVsZXJcIik7XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gQXBwbGlxdWUgbGUgZmlsdHJlIHN1ciBsZSBzY2hkdWxlciBiYXPDqSBzdXIgbGEgbGlzdGUgZGVzIFxyXG4gICAgICAgICAgICAvLyAgICByZXNzb3VyY2VzIHPDqWxlY3Rpb25uw6llcyBhdmVjIGxlcyBjaGVja2JveC5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmRhdGFTb3VyY2UuZmlsdGVyKHtcclxuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuaW5BcnJheSh0YXNrLm93bmVySWQsIGNoZWNrZWQpID49IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pOyBcclxuICAgIH1cclxufSJdfQ==

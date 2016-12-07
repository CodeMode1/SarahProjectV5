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
        this.ressourcesFiltre = [];
    }
    AgendaComponent.prototype.ngOnInit = function () {
        this.getRessources();
    };
    // Obtient les ressources du serveur et met en place les propriétés du composant.
    AgendaComponent.prototype.getRessources = function () {
        var _this = this;
        this._agendaService.getRessources().subscribe(function (data) {
            _this.ressources = data;
            console.log("ressource du serveur pour afficher dans la liste : ");
            for (var i = 0; i < _this.ressources.length; i++) {
                console.log(_this.ressources[i]);
                console.log(_this.ressources[i].text);
                var filtre = {
                    field: "ownerId",
                    operator: "eq",
                    value: _this.ressources[i].value
                };
                _this.ressourcesFiltre.push(filtre);
            }
            /* Initialise l'agenda seulement après avoir obtenu les ressources
                pour mettre en place le filtre initial. */
            _this.agendaInit();
        }, function (error) { return _this._erreurService.handleErreur(error); });
    };
    AgendaComponent.prototype.agendaInit = function () {
        $("#scheduler").kendoScheduler({
            height: 600,
            views: [
                "day",
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
                        // API pour aller chercher les activités à afficher.
                        url: "http://localhost:3000/activite",
                        dataType: "json"
                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return { models: kendo.stringify(options.models) };
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
    };
    /* Met à jour le filtre du Scheduler lorsque l'usager click un checkbox de ressource. */
    AgendaComponent.prototype.filtreChange = function (filtreCheckbox) {
        /* checked est un array contenant tous les ID's des ressources qui
            sont sélectionnées par l'usager en utilisant les checkbox. */
        var checked = $.map($("#checkRessource :checked"), function (checkbox) {
            return ($(checkbox).val());
        });
        var scheduler = $("#scheduler").data("kendoScheduler");
        /* Applique le filtre sur le schduler basé sur la liste des
            ressources sélectionnées avec les checkbox. */
        scheduler.dataSource.filter({
            operator: function (task) {
                return $.inArray(task.ownerId, checked) >= 0;
            }
        });
    };
    AgendaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-agenda',
            templateUrl: 'agenda.component.html',
            styles: ["\n        .k-nav-current > .k-link span + span {\n            max-width: 200px;\n            display: inline-block;\n            white-space: nowrap;\n            text-overflow: ellipsis;\n            overflow: hidden;\n            vertical-align: top;\n        }\n\n        #listRessources{\n            width: 100%;\n            clear: both;\n        }\n\n        .inlineInputs{\n            display: inline-block;\n            width: auto;\n            margin: 1%;\n        }\n\n    "
            ]
        }), 
        __metadata('design:paramtypes', [agenda_service_1.AgendaService, erreur_service_1.ErreurService])
    ], AgendaComponent);
    return AgendaComponent;
}());
exports.AgendaComponent = AgendaComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW5kYS9hZ2VuZGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFFbEQsK0JBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsK0JBQThCLGtCQUFrQixDQUFDLENBQUE7QUErQmpEO0lBT0kseUJBQXFCLGNBQTZCLEVBQVUsY0FBNkI7UUFBcEUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNyRixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpRkFBaUY7SUFDakYsdUNBQWEsR0FBYjtRQUFBLGlCQXVCQztRQXRCRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FDekMsVUFBQSxJQUFJO1lBQ0EsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBQ25FLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFckMsSUFBSSxNQUFNLEdBQUc7b0JBQ1QsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLFFBQVEsRUFBRSxJQUFJ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LENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZEOzBEQUNrRDtRQUNsRCxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUN4QixRQUFRLEVBQUUsVUFBUyxJQUFJO2dCQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWxKTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxNQUFNLEVBQUUsQ0FBRSx3ZUFxQlQ7YUFDQTtTQUNKLENBQUM7O3VCQUFBO0lBd0hGLHNCQUFDO0FBQUQsQ0F2SEEsQUF1SEMsSUFBQTtBQXZIWSx1QkFBZSxrQkF1SDNCLENBQUEiLCJmaWxlIjoiYWdlbmRhL2FnZW5kYS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBhZ2VuZGFSZXNzb3VyY2UgfSBmcm9tICcuL2FnZW5kYVJlc3NvdXJjZSc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWdlbmRhU2VydmljZSB9IGZyb20gJy4vYWdlbmRhLnNlcnZpY2UnO1xyXG5kZWNsYXJlICB2YXIgJCwga2VuZG8gOmFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktYWdlbmRhJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnYWdlbmRhLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgLmstbmF2LWN1cnJlbnQgPiAuay1saW5rIHNwYW4gKyBzcGFuIHtcclxuICAgICAgICAgICAgbWF4LXdpZHRoOiAyMDBweDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNsaXN0UmVzc291cmNlc3tcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmlubGluZUlucHV0c3tcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB3aWR0aDogYXV0bztcclxuICAgICAgICAgICAgbWFyZ2luOiAxJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgYFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdlbmRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIC8qIExpc3RlIGRlIHRvdXRlcyBsZXMgcmVzc291cmNlcyBkdSBzeXN0w6htZSBhdmVjIGxlcyBwcm9wcmnDqXTDqXMgc3VpdmFudGVzOlxyXG4gICAgICAgIHRleHQ6IG5vbSBkZSBsYSByZXNzb3VyY2VcclxuICAgICAgICB2YWx1ZTogSUQgbW9uZ29vc2UgXHJcbiAgICAgICAgY29sb3I6IGxhIGNvdWxldXIgZGUgY2V0dGUgcmVzc291cmNlLiAqL1xyXG4gICAgcmVzc291cmNlczogYWdlbmRhUmVzc291cmNlW107XHJcbiAgICByZXNzb3VyY2VzRmlsdHJlOiBhbnlbXTsgXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfYWdlbmRhU2VydmljZTogQWdlbmRhU2VydmljZSwgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMucmVzc291cmNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVzc291cmNlc0ZpbHRyZSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UmVzc291cmNlcygpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICAvLyBPYnRpZW50IGxlcyByZXNzb3VyY2VzIGR1IHNlcnZldXIgZXQgbWV0IGVuIHBsYWNlIGxlcyBwcm9wcmnDqXTDqXMgZHUgY29tcG9zYW50LlxyXG4gICAgZ2V0UmVzc291cmNlcygpe1xyXG4gICAgICAgIHRoaXMuX2FnZW5kYVNlcnZpY2UuZ2V0UmVzc291cmNlcygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXMgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2UgZHUgc2VydmV1ciBwb3VyIGFmZmljaGVyIGRhbnMgbGEgbGlzdGUgOiBcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMucmVzc291cmNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXNzb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0cmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcIm93bmVySWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3I6IFwiZXFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVzc291cmNlc1tpXS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzRmlsdHJlLnB1c2goZmlsdHJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvKiBJbml0aWFsaXNlIGwnYWdlbmRhIHNldWxlbWVudCBhcHLDqHMgYXZvaXIgb2J0ZW51IGxlcyByZXNzb3VyY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgcG91ciBtZXR0cmUgZW4gcGxhY2UgbGUgZmlsdHJlIGluaXRpYWwuICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFnZW5kYUluaXQoKTsgICBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBhZ2VuZGFJbml0KCl7XHJcbiAgICAgICAgJChcIiNzY2hlZHVsZXJcIikua2VuZG9TY2hlZHVsZXIoe1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMCxcclxuICAgICAgICAgICAgdmlld3M6IFtcclxuICAgICAgICAgICAgICAgIFwiZGF5XCIsXHJcbiAgICAgICAgICAgICAgICBcIndlZWtcIixcclxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtb250aFwiLCBzZWxlY3RlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgXCJhZ2VuZGFcIixcclxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ0aW1lbGluZVwiLCBldmVudEhlaWdodDogNTB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRpbWV6b25lOiBcIkV0Yy9VVENcIixcclxuICAgICAgICAgICAgZGF0YVNvdXJjZToge1xyXG4gICAgICAgICAgICAgICAgYmF0Y2g6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFQSSBwb3VyIGFsbGVyIGNoZXJjaGVyIGxlcyBhY3Rpdml0w6lzIMOgIGFmZmljaGVyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FjdGl2aXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyTWFwOiBmdW5jdGlvbihvcHRpb25zLCBvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZWFkXCIgJiYgb3B0aW9ucy5tb2RlbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7bW9kZWxzOiBrZW5kby5zdHJpbmdpZnkob3B0aW9ucy5tb2RlbHMpfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBEZWZpbml0aW9uIGR1IHNjaMOpbWEgZGVzIGluZm9ybWF0aW9ucyByZXRvdXJuw6lzIHBvdXIgY2hhcXVlIGFjdGl2aXTDqSBwYXIgbCdBUEkuXHJcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YXNrSWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1V0aWxpc2VyIGlkZW50aWZpYW50IE1vbmdvb3NlIGRlIGwnYWN0aXZpdMOpIGNvbW1lIHRhc2tJZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJZDogeyBmcm9tOiBcIlRhc2tJRFwiLCB0eXBlOiBcInN0cmluZ1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1V0aWxpc2VyIGxlIG5vbSBkZSBsJ2FjdGl2aXTDqSBwb3VyIFRpdGxlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHsgZnJvbTogXCJUaXRsZVwiLCBkZWZhdWx0VmFsdWU6IFwiTm8gdGl0bGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHsgdHlwZTogXCJkYXRlXCIsIGZyb206IFwiU3RhcnRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiB7IHR5cGU6IFwiZGF0ZVwiLCBmcm9tOiBcIkVuZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL05vbSBldnggZGFucyBsYSBkZXNjcmlwdGlvbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7IGZyb206IFwiRGVzY3JpcHRpb25cIiwgdHlwZTogXCJzdHJpbmdcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9VdGlsaXNlciBsZSBJRCBNb25nb29zZSBkZSBsYSByZXNzb3VyY2UgY29tbWUgXCJvd25lclwiLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3duZXJJZDogeyBmcm9tOiBcIk93bmVySURcIiwgdHlwZTogXCJzdHJpbmdcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyogRmlsdHJlIHBhciBkw6lmYXV0IHF1aSBhZmZpY2hlIHRvdXRlcyBsZXMgcmVzc291cmNlcyBsdSBkdSBzZXJ2ZXVyLiAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2ljOiBcIm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhpcy5yZXNzb3VyY2VzRmlsdHJlIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvdXJjZXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJvd25lcklkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiT3duZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLnJlc3NvdXJjZXMgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBNZXQgw6Agam91ciBsZSBmaWx0cmUgZHUgU2NoZWR1bGVyIGxvcnNxdWUgbCd1c2FnZXIgY2xpY2sgdW4gY2hlY2tib3ggZGUgcmVzc291cmNlLiAqL1xyXG4gICAgZmlsdHJlQ2hhbmdlKGZpbHRyZUNoZWNrYm94KXtcclxuICAgICAgICAvKiBjaGVja2VkIGVzdCB1biBhcnJheSBjb250ZW5hbnQgdG91cyBsZXMgSUQncyBkZXMgcmVzc291cmNlcyBxdWkgXHJcbiAgICAgICAgICAgIHNvbnQgc8OpbGVjdGlvbm7DqWVzIHBhciBsJ3VzYWdlciBlbiB1dGlsaXNhbnQgbGVzIGNoZWNrYm94LiAqL1xyXG4gICAgICAgIHZhciBjaGVja2VkID0gJC5tYXAoJChcIiNjaGVja1Jlc3NvdXJjZSA6Y2hlY2tlZFwiKSwgZnVuY3Rpb24oY2hlY2tib3gpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgkKGNoZWNrYm94KS52YWwoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSAkKFwiI3NjaGVkdWxlclwiKS5kYXRhKFwia2VuZG9TY2hlZHVsZXJcIik7XHJcblxyXG4gICAgICAgIC8qIEFwcGxpcXVlIGxlIGZpbHRyZSBzdXIgbGUgc2NoZHVsZXIgYmFzw6kgc3VyIGxhIGxpc3RlIGRlc1xyXG4gICAgICAgICAgICByZXNzb3VyY2VzIHPDqWxlY3Rpb25uw6llcyBhdmVjIGxlcyBjaGVja2JveC4gKi8gICAgXHJcbiAgICAgICAgc2NoZWR1bGVyLmRhdGFTb3VyY2UuZmlsdGVyKHtcclxuICAgICAgICAgICAgb3BlcmF0b3I6IGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLmluQXJyYXkodGFzay5vd25lcklkLCBjaGVja2VkKSA+PSAwO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSAgICBcclxufSJdfQ==

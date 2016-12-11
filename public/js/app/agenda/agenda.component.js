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
            editable: false,
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
            styles: ["\n        .k-nav-current > .k-link span + span {\n            max-width: 200px;\n            display: inline-block;\n            white-space: nowrap;\n            text-overflow: ellipsis;\n            overflow: hidden;\n            vertical-align: top;\n        }\n\n        #listRessources{\n            width: 100%;\n            clear: both;\n        }\n\n        .inlineInputs{\n            display: inline-block;\n            width: auto;\n            margin: 1%;\n        }\n\n        #colorPicker{\n            width: 20px;\n            height: 20px;\n        }\n\n    "
            ]
        }), 
        __metadata('design:paramtypes', [agenda_service_1.AgendaService, erreur_service_1.ErreurService])
    ], AgendaComponent);
    return AgendaComponent;
}());
exports.AgendaComponent = AgendaComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW5kYS9hZ2VuZGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFFbEQsK0JBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsK0JBQThCLGtCQUFrQixDQUFDLENBQUE7QUFvQ2pEO0lBT0kseUJBQXFCLGNBQTZCLEVBQVUsY0FBNkI7UUFBcEUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNyRixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpRkFBaUY7SUFDakYsdUNBQWEsR0FBYjtRQUFBLGlCQXVCQztRQXRCRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FDekMsVUFBQSxJQUFJO1lBQ0EsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBQ25FLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFckMsSUFBSSxNQUFNLEdBQUc7b0JBQ1QsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLFFBQVEsRUFBRSxJQUFJ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WUFDaEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdkQ7MERBQ2tEO1FBQ2xELFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxVQUFTLElBQUk7Z0JBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBeEpMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLE1BQU0sRUFBRSxDQUFFLGlrQkEwQlQ7YUFDQTtTQUNKLENBQUM7O3VCQUFBO0lBeUhGLHNCQUFDO0FBQUQsQ0F4SEEsQUF3SEMsSUFBQTtBQXhIWSx1QkFBZSxrQkF3SDNCLENBQUEiLCJmaWxlIjoiYWdlbmRhL2FnZW5kYS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBhZ2VuZGFSZXNzb3VyY2UgfSBmcm9tICcuL2FnZW5kYVJlc3NvdXJjZSc7XHJcbmltcG9ydCB7IEVycmV1clNlcnZpY2UgfSBmcm9tICcuLi9lcnJldXJzL2VycmV1ci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWdlbmRhU2VydmljZSB9IGZyb20gJy4vYWdlbmRhLnNlcnZpY2UnO1xyXG5kZWNsYXJlICB2YXIgJCwga2VuZG8gOmFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktYWdlbmRhJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnYWdlbmRhLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogWyBgXHJcbiAgICAgICAgLmstbmF2LWN1cnJlbnQgPiAuay1saW5rIHNwYW4gKyBzcGFuIHtcclxuICAgICAgICAgICAgbWF4LXdpZHRoOiAyMDBweDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNsaXN0UmVzc291cmNlc3tcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmlubGluZUlucHV0c3tcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB3aWR0aDogYXV0bztcclxuICAgICAgICAgICAgbWFyZ2luOiAxJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNjb2xvclBpY2tlcntcclxuICAgICAgICAgICAgd2lkdGg6IDIwcHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMjBweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgYFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdlbmRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIC8qIExpc3RlIGRlIHRvdXRlcyBsZXMgcmVzc291cmNlcyBkdSBzeXN0w6htZSBhdmVjIGxlcyBwcm9wcmnDqXTDqXMgc3VpdmFudGVzOlxyXG4gICAgICAgIHRleHQ6IG5vbSBkZSBsYSByZXNzb3VyY2VcclxuICAgICAgICB2YWx1ZTogSUQgbW9uZ29vc2UgXHJcbiAgICAgICAgY29sb3I6IGxhIGNvdWxldXIgZGUgY2V0dGUgcmVzc291cmNlLiAqL1xyXG4gICAgcmVzc291cmNlczogYWdlbmRhUmVzc291cmNlW107XHJcbiAgICByZXNzb3VyY2VzRmlsdHJlOiBhbnlbXTsgXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfYWdlbmRhU2VydmljZTogQWdlbmRhU2VydmljZSwgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMucmVzc291cmNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVzc291cmNlc0ZpbHRyZSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UmVzc291cmNlcygpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICAvLyBPYnRpZW50IGxlcyByZXNzb3VyY2VzIGR1IHNlcnZldXIgZXQgbWV0IGVuIHBsYWNlIGxlcyBwcm9wcmnDqXTDqXMgZHUgY29tcG9zYW50LlxyXG4gICAgZ2V0UmVzc291cmNlcygpe1xyXG4gICAgICAgIHRoaXMuX2FnZW5kYVNlcnZpY2UuZ2V0UmVzc291cmNlcygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXMgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2UgZHUgc2VydmV1ciBwb3VyIGFmZmljaGVyIGRhbnMgbGEgbGlzdGUgOiBcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMucmVzc291cmNlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXNzb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0cmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcIm93bmVySWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3I6IFwiZXFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVzc291cmNlc1tpXS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzRmlsdHJlLnB1c2goZmlsdHJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvKiBJbml0aWFsaXNlIGwnYWdlbmRhIHNldWxlbWVudCBhcHLDqHMgYXZvaXIgb2J0ZW51IGxlcyByZXNzb3VyY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgcG91ciBtZXR0cmUgZW4gcGxhY2UgbGUgZmlsdHJlIGluaXRpYWwuICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFnZW5kYUluaXQoKTsgICBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyZXVyU2VydmljZS5oYW5kbGVFcnJldXIoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBhZ2VuZGFJbml0KCl7XHJcbiAgICAgICAgJChcIiNzY2hlZHVsZXJcIikua2VuZG9TY2hlZHVsZXIoe1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMCxcclxuICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2aWV3czogW1xyXG4gICAgICAgICAgICAgICAgXCJkYXlcIixcclxuICAgICAgICAgICAgICAgIFwid2Vla1wiLFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1vbnRoXCIsIHNlbGVjdGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICBcImFnZW5kYVwiLFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInRpbWVsaW5lXCIsIGV2ZW50SGVpZ2h0OiA1MH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgdGltZXpvbmU6IFwiRXRjL1VUQ1wiLFxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB7XHJcbiAgICAgICAgICAgICAgICBiYXRjaDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQVBJIHBvdXIgYWxsZXIgY2hlcmNoZXIgbGVzIGFjdGl2aXTDqXMgw6AgYWZmaWNoZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYWN0aXZpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJNYXA6IGZ1bmN0aW9uKG9wdGlvbnMsIG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlYWRcIiAmJiBvcHRpb25zLm1vZGVscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHttb2RlbHM6IGtlbmRvLnN0cmluZ2lmeShvcHRpb25zLm1vZGVscyl9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIERlZmluaXRpb24gZHUgc2Now6ltYSBkZXMgaW5mb3JtYXRpb25zIHJldG91cm7DqXMgcG91ciBjaGFxdWUgYWN0aXZpdMOpIHBhciBsJ0FQSS5cclxuICAgICAgICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRhc2tJZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVXRpbGlzZXIgaWRlbnRpZmlhbnQgTW9uZ29vc2UgZGUgbCdhY3Rpdml0w6kgY29tbWUgdGFza0lkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0lkOiB7IGZyb206IFwiVGFza0lEXCIsIHR5cGU6IFwic3RyaW5nXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVXRpbGlzZXIgbGUgbm9tIGRlIGwnYWN0aXZpdMOpIHBvdXIgVGl0bGUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogeyBmcm9tOiBcIlRpdGxlXCIsIGRlZmF1bHRWYWx1ZTogXCJObyB0aXRsZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogeyB0eXBlOiBcImRhdGVcIiwgZnJvbTogXCJTdGFydFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHsgdHlwZTogXCJkYXRlXCIsIGZyb206IFwiRW5kXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTm9tIGV2eCBkYW5zIGxhIGRlc2NyaXB0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHsgZnJvbTogXCJEZXNjcmlwdGlvblwiLCB0eXBlOiBcInN0cmluZ1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1V0aWxpc2VyIGxlIElEIE1vbmdvb3NlIGRlIGxhIHJlc3NvdXJjZSBjb21tZSBcIm93bmVyXCIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvd25lcklkOiB7IGZyb206IFwiT3duZXJJRFwiLCB0eXBlOiBcInN0cmluZ1wiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKiBGaWx0cmUgcGFyIGTDqWZhdXQgcXVpIGFmZmljaGUgdG91dGVzIGxlcyByZXNzb3VyY2VzIGx1IGR1IHNlcnZldXIuICovXHJcbiAgICAgICAgICAgICAgICAgICAgbG9naWM6IFwib3JcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB0aGlzLnJlc3NvdXJjZXNGaWx0cmUgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc291cmNlczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcIm93bmVySWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJPd25lclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMucmVzc291cmNlcyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIE1ldCDDoCBqb3VyIGxlIGZpbHRyZSBkdSBTY2hlZHVsZXIgbG9yc3F1ZSBsJ3VzYWdlciBjbGljayB1biBjaGVja2JveCBkZSByZXNzb3VyY2UuICovXHJcbiAgICBmaWx0cmVDaGFuZ2UoZmlsdHJlQ2hlY2tib3gpe1xyXG4gICAgICAgIC8qIGNoZWNrZWQgZXN0IHVuIGFycmF5IGNvbnRlbmFudCB0b3VzIGxlcyBJRCdzIGRlcyByZXNzb3VyY2VzIHF1aSBcclxuICAgICAgICAgICAgc29udCBzw6lsZWN0aW9ubsOpZXMgcGFyIGwndXNhZ2VyIGVuIHV0aWxpc2FudCBsZXMgY2hlY2tib3guICovXHJcbiAgICAgICAgdmFyIGNoZWNrZWQgPSAkLm1hcCgkKFwiI2NoZWNrUmVzc291cmNlIDpjaGVja2VkXCIpLCBmdW5jdGlvbihjaGVja2JveCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKCQoY2hlY2tib3gpLnZhbCgpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHNjaGVkdWxlciA9ICQoXCIjc2NoZWR1bGVyXCIpLmRhdGEoXCJrZW5kb1NjaGVkdWxlclwiKTtcclxuXHJcbiAgICAgICAgLyogQXBwbGlxdWUgbGUgZmlsdHJlIHN1ciBsZSBzY2hkdWxlciBiYXPDqSBzdXIgbGEgbGlzdGUgZGVzXHJcbiAgICAgICAgICAgIHJlc3NvdXJjZXMgc8OpbGVjdGlvbm7DqWVzIGF2ZWMgbGVzIGNoZWNrYm94LiAqLyAgICBcclxuICAgICAgICBzY2hlZHVsZXIuZGF0YVNvdXJjZS5maWx0ZXIoe1xyXG4gICAgICAgICAgICBvcGVyYXRvcjogZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuaW5BcnJheSh0YXNrLm93bmVySWQsIGNoZWNrZWQpID49IDA7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSk7XHJcbiAgICB9ICAgIFxyXG59Il19

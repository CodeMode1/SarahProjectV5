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
                var filtre = {
                    field: "ownerId",
                    operator: "eq",
                    value: _this.ressources[i].value
                };
                _this.ressourcesFiltre.push(filtre);
            }
            _this.agendaSettings();
        }, function (error) { return _this._erreurService.handleErreur(error); });
    };
    AgendaComponent.prototype.ngOnInit = function () {
        this.getRessources();
    };
    AgendaComponent.prototype.agendaSettings = function () {
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
                { type: "timeline", eventHeight: 50 }
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
        $("#checkRessource :checkbox").change(function (e) {
            // checked est un array contenant tous les ID's des ressources qui 
            //    sont sélectionnées par l'usager en utilisant les checkbox.
            var checked = $.map($("#checkRessource :checked"), function (checkbox) {
                return ($(checkbox).val());
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW5kYS9hZ2VuZGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFHbEQsK0JBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsK0JBQThCLGtCQUFrQixDQUFDLENBQUE7QUF3QmpEO0lBUUkseUJBQXFCLGNBQTZCLEVBQVUsY0FBNkI7UUFBcEUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNyRixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCx1Q0FBYSxHQUFiO1FBQUEsaUJBcUJDO1FBcEJHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUN6QyxVQUFBLElBQUk7WUFDQSxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixxQ0FBcUM7WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBQ25FLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENB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QXVCO1lBQ3BDLE1BQU0sRUFBRSxDQUFFLDBXQWNUO2FBQ0E7U0FDSixDQUFDOzt1QkFBQTtJQStIRixzQkFBQztBQUFELENBOUhBLEFBOEhDLElBQUE7QUE5SFksdUJBQWUsa0JBOEgzQixDQUFBIiwiZmlsZSI6ImFnZW5kYS9hZ2VuZGEuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgYWdlbmRhUmVzc291cmNlIH0gZnJvbSAnLi9hZ2VuZGFSZXNzb3VyY2UnO1xyXG5pbXBvcnQgeyBhZ2VuZGFBY3Rpdml0ZSB9IGZyb20gJy4vYWdlbmRhQWN0aXZpdGUnO1xyXG5pbXBvcnQgeyBFcnJldXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyZXVycy9lcnJldXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEFnZW5kYVNlcnZpY2UgfSBmcm9tICcuL2FnZW5kYS5zZXJ2aWNlJztcclxuZGVjbGFyZSAgdmFyICQsIGtlbmRvIDphbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWFnZW5kYScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2FnZW5kYS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFsgYFxyXG4gICAgICAgIC5rLW5hdi1jdXJyZW50ID4gLmstbGluayBzcGFuICsgc3BhbiB7XHJcbiAgICAgICAgICAgIG1heC13aWR0aDogMjAwcHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjbGlzdFJlc3NvdXJjZXN7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICB9XHJcbiAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ2VuZGFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgLy8gYXZlYyBzZXJ2aWNlIGFuZ3VsYXIyLCBhcHBlbCBzZXJ2ZXVyLCBjb21wbGV0ZSBJbml0XHJcbiAgICAvLyAgIExpc3RlIGRlIHRvdXRlcyBsZXMgcmVzc291cmNlcyBkdSBzeXN0w6htZSBhdmVjIGxlcyBwcm9wcmnDqXTDqXMgc3VpdmFudGVzOlxyXG4gICAgLy8gICAgICB0ZXh0OiBub20gZGUgbGEgcmVzc291cmNlXHJcbiAgICAvLyAgICAgIHZhbHVlOiBJRCBtb25nb29zZSBcclxuICAgIC8vICAgICAgY29sb3I6IGxhIGNvdWxldXIgZGUgY2V0dGUgcmVzc291cmNlLlxyXG4gICAgcmVzc291cmNlczogYWdlbmRhUmVzc291cmNlW107XHJcbiAgICByZXNzb3VyY2VzRmlsdHJlOiBhbnlbXTsgXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfYWdlbmRhU2VydmljZTogQWdlbmRhU2VydmljZSwgcHJpdmF0ZSBfZXJyZXVyU2VydmljZTogRXJyZXVyU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMucmVzc291cmNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVzc291cmNlc0ZpbHRyZSA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVzc291cmNlcy5wdXNoKHt0ZXh0OiBcIlBhdHJpY2tcIiwgdmFsdWU6IFwiZGZmXCIsIGNvbG9yOiBcIiNmOGEzOThcIn0pO1xyXG4gICAgICAgIHRoaXMucmVzc291cmNlcy5wdXNoKHt0ZXh0OiBcIkRhZlwiLCB2YWx1ZTogXCJyZXdyZXdyXCIsIGNvbG9yOiBcIiM1MWEwZWRcIiB9KTtcclxuICAgICAgICB0aGlzLnJlc3NvdXJjZXMucHVzaCh7dGV4dDogXCJMYXBpblwiLCB2YWx1ZTogXCJyZXdyZXdcIiwgY29sb3I6IFwiIzU2Y2E4NVwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc3NvdXJjZXMoKXtcclxuICAgICAgICB0aGlzLl9hZ2VuZGFTZXJ2aWNlLmdldFJlc3NvdXJjZXMoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vcHJpbnQgZG9ubsOpZXMgcG91ciBjaGFxdWUgcmVzc291cmNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3NvdXJjZSBkdSBzZXJ2ZXVyIHBvdXIgYWZmaWNoZXIgZGFucyBsYSBsaXN0ZSA6IFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5yZXNzb3VyY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzc291cmNlc1tpXS50ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRyZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwib3duZXJJZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvcjogXCJlcVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZXNzb3VyY2VzW2ldLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXNGaWx0cmUucHVzaChmaWx0cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZ2VuZGFTZXR0aW5ncygpOyAgIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UmVzc291cmNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGFnZW5kYVNldHRpbmdzKCl7XHJcbiAgICAgICAgJChcIiNzY2hlZHVsZXJcIikua2VuZG9TY2hlZHVsZXIoe1xyXG4gICAgICAgICAgICAvL2RhdGU6IG5ldyBEYXRlKFwiMjAxMy82LzEzXCIpLFxyXG4gICAgICAgICAgICAvL3N0YXJ0VGltZTogbmV3IERhdGUoXCIyMDEzLzYvMTMgMDc6MDAgQU1cIiksXHJcbiAgICAgICAgICAgIGhlaWdodDogNjAwLFxyXG4gICAgICAgICAgICB2aWV3czogW1xyXG4gICAgICAgICAgICAgICAgXCJkYXlcIixcclxuICAgICAgICAgICAgICAgIC8qeyB0eXBlOiBcIndvcmtXZWVrXCIsIHNlbGVjdGVkOiB0cnVlIH0sKi9cclxuICAgICAgICAgICAgICAgIFwid2Vla1wiLFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1vbnRoXCIsIHNlbGVjdGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICBcImFnZW5kYVwiLFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInRpbWVsaW5lXCIsIGV2ZW50SGVpZ2h0OiA1MH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgdGltZXpvbmU6IFwiRXRjL1VUQ1wiLFxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB7XHJcbiAgICAgICAgICAgICAgICBiYXRjaDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBQb3VyIGdhcmRlciBsZXMgY2hvc2VzIHNpbXBsZXMgcG91ciBsZSBwcm9qZXQsIG9uIHZhIGFsbGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY2hlcmNoZXIgVE9VUyBsZXMgYWN0aXZpdMOpcyBkYW5zIGxhIEJELlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FjdGl2aXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3VybDogXCIvL2RlbW9zLnRlbGVyaWsuY29tL2tlbmRvLXVpL3NlcnZpY2UvdGFza3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kYXRhVHlwZTogXCJqc29ucFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJNYXA6IGZ1bmN0aW9uKG9wdGlvbnMsIG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlYWRcIiAmJiBvcHRpb25zLm1vZGVscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHttb2RlbHM6IGtlbmRvLnN0cmluZ2lmeShvcHRpb25zLm1vZGVscyl9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIERlZmluaXRpb24gZHUgc2Now6ltYSBkZXMgaW5mb3JtYXRpb25zIHJldG91cm7DqXMgcG91ciBjaGFxdWUgYXBwb2ludG1lbnQgcGFyIGwnQVBJLlxyXG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFza0lkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9VdGlsaXNlciBpZGVudGlmaWFudCBNb25nb29zZSBkZSBsJ2FjdGl2aXTDqSBjb21tZSB0YXNrSWQsIGNoYW5nZXIgdHlwZSBwb3VyIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0lkOiB7IGZyb206IFwiVGFza0lEXCIsIHR5cGU6IFwic3RyaW5nXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVXRpbGlzZXIgbGUgbm9tIGRlIGwnYWN0aXZpdMOpIHBvdXIgVGl0bGUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogeyBmcm9tOiBcIlRpdGxlXCIsIGRlZmF1bHRWYWx1ZTogXCJObyB0aXRsZVwiLCB2YWxpZGF0aW9uOiB7IHJlcXVpcmVkOiB0cnVlIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB7IHR5cGU6IFwiZGF0ZVwiLCBmcm9tOiBcIlN0YXJ0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogeyB0eXBlOiBcImRhdGVcIiwgZnJvbTogXCJFbmRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Ob20gZXZ4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogeyBmcm9tOiBcIkRlc2NyaXB0aW9uXCIsIHR5cGU6IFwic3RyaW5nXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVXRpbGlzZXIgbGUgSUQgTW9uZ29vc2UgZGUgbGEgcmVzc291cmNlLCBjaGFuZ2UgbGUgdHlwZSBwb3VyIHN0cmluZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG93bmVySWQ6IHsgZnJvbTogXCJPd25lcklEXCIsIHR5cGU6IFwic3RyaW5nXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIFRPRE8gSWwgZmF1dCB0cm91dmVyIHVuZSBmYcOnb24gZGUgZmFpcmUgdW4gZmlsdHJlIHBhciBkw6lmYXV0IHF1aSBhZmZpY2hlIHRvdXRlcyBsZXMgcmVzc291cmNlcyBsdSBkdSBzZXJ2ZXVyLi4uICovXHJcbiAgICAgICAgICAgICAgICAgICAgbG9naWM6IFwib3JcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB0aGlzLnJlc3NvdXJjZXNGaWx0cmUgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc291cmNlczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcIm93bmVySWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJPd25lclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMucmVzc291cmNlcyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgLyogTWV0IMOgIGpvdXIgbGUgZmlsdHJlIGR1IFNjaGVkdWxlciBsb3JzcXVlIGwndXNhZ2VyIGNsaWNrIHVuIGNoZWNrYm94IGRlIHJlc3NvdXJjZS4gKi9cclxuICAgICAgICAkKFwiI2NoZWNrUmVzc291cmNlIDpjaGVja2JveFwiKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyBjaGVja2VkIGVzdCB1biBhcnJheSBjb250ZW5hbnQgdG91cyBsZXMgSUQncyBkZXMgcmVzc291cmNlcyBxdWkgXHJcbiAgICAgICAgICAgIC8vICAgIHNvbnQgc8OpbGVjdGlvbm7DqWVzIHBhciBsJ3VzYWdlciBlbiB1dGlsaXNhbnQgbGVzIGNoZWNrYm94LlxyXG4gICAgICAgICAgICB2YXIgY2hlY2tlZCA9ICQubWFwKCQoXCIjY2hlY2tSZXNzb3VyY2UgOmNoZWNrZWRcIiksIGZ1bmN0aW9uKGNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCQoY2hlY2tib3gpLnZhbCgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgdmFyIHNjaGVkdWxlciA9ICQoXCIjc2NoZWR1bGVyXCIpLmRhdGEoXCJrZW5kb1NjaGVkdWxlclwiKTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBBcHBsaXF1ZSBsZSBmaWx0cmUgc3VyIGxlIHNjaGR1bGVyIGJhc8OpIHN1ciBsYSBsaXN0ZSBkZXMgXHJcbiAgICAgICAgICAgIC8vICAgIHJlc3NvdXJjZXMgc8OpbGVjdGlvbm7DqWVzIGF2ZWMgbGVzIGNoZWNrYm94LlxyXG4gICAgICAgICAgICBzY2hlZHVsZXIuZGF0YVNvdXJjZS5maWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5pbkFycmF5KHRhc2sub3duZXJJZCwgY2hlY2tlZCkgPj0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7IFxyXG4gICAgfVxyXG59Il19

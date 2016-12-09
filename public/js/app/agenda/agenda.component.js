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
            styles: ["\n        .k-nav-current > .k-link span + span {\n            max-width: 200px;\n            display: inline-block;\n            white-space: nowrap;\n            text-overflow: ellipsis;\n            overflow: hidden;\n            vertical-align: top;\n        }\n\n        #listRessources{\n            width: 100%;\n            clear: both;\n        }\n\n        .inlineInputs{\n            display: inline-block;\n            width: auto;\n            margin: 1%;\n        }\n\n    "
            ]
        }), 
        __metadata('design:paramtypes', [agenda_service_1.AgendaService, erreur_service_1.ErreurService])
    ], AgendaComponent);
    return AgendaComponent;
}());
exports.AgendaComponent = AgendaComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW5kYS9hZ2VuZGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFFbEQsK0JBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsK0JBQThCLGtCQUFrQixDQUFDLENBQUE7QUErQmpEO0lBT0kseUJBQXFCLGNBQTZCLEVBQVUsY0FBNkI7UUFBcEUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNyRixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpRkFBaUY7SUFDakYsdUNBQWEsR0FBYjtRQUFBLGlCQXVCQztRQXRCRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FDekMsVUFBQSxJQUFJO1lBQ0EsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBQ25FLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFckMsSUFBSSxNQUFNLEdBQUc7b0JBQ1QsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLFFBQVEsRUFBRSxJQUFJ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WUFDaEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdkQ7MERBQ2tEO1FBQ2xELFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxVQUFTLElBQUk7Z0JBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBbkpMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLE1BQU0sRUFBRSxDQUFFLHdlQXFCVDthQUNBO1NBQ0osQ0FBQzs7dUJBQUE7SUF5SEYsc0JBQUM7QUFBRCxDQXhIQSxBQXdIQyxJQUFBO0FBeEhZLHVCQUFlLGtCQXdIM0IsQ0FBQSIsImZpbGUiOiJhZ2VuZGEvYWdlbmRhLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGFnZW5kYVJlc3NvdXJjZSB9IGZyb20gJy4vYWdlbmRhUmVzc291cmNlJztcclxuaW1wb3J0IHsgRXJyZXVyU2VydmljZSB9IGZyb20gJy4uL2VycmV1cnMvZXJyZXVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBZ2VuZGFTZXJ2aWNlIH0gZnJvbSAnLi9hZ2VuZGEuc2VydmljZSc7XHJcbmRlY2xhcmUgIHZhciAkLCBrZW5kbyA6YW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1hZ2VuZGEnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdhZ2VuZGEuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbIGBcclxuICAgICAgICAuay1uYXYtY3VycmVudCA+IC5rLWxpbmsgc3BhbiArIHNwYW4ge1xyXG4gICAgICAgICAgICBtYXgtd2lkdGg6IDIwMHB4O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2xpc3RSZXNzb3VyY2Vze1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuaW5saW5lSW5wdXRze1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgICAgICAgICBtYXJnaW46IDElO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ2VuZGFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgLyogTGlzdGUgZGUgdG91dGVzIGxlcyByZXNzb3VyY2VzIGR1IHN5c3TDqG1lIGF2ZWMgbGVzIHByb3ByacOpdMOpcyBzdWl2YW50ZXM6XHJcbiAgICAgICAgdGV4dDogbm9tIGRlIGxhIHJlc3NvdXJjZVxyXG4gICAgICAgIHZhbHVlOiBJRCBtb25nb29zZSBcclxuICAgICAgICBjb2xvcjogbGEgY291bGV1ciBkZSBjZXR0ZSByZXNzb3VyY2UuICovXHJcbiAgICByZXNzb3VyY2VzOiBhZ2VuZGFSZXNzb3VyY2VbXTtcclxuICAgIHJlc3NvdXJjZXNGaWx0cmU6IGFueVtdOyBcclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9hZ2VuZGFTZXJ2aWNlOiBBZ2VuZGFTZXJ2aWNlLCBwcml2YXRlIF9lcnJldXJTZXJ2aWNlOiBFcnJldXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gW107XHJcbiAgICAgICAgdGhpcy5yZXNzb3VyY2VzRmlsdHJlID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSZXNzb3VyY2VzKCk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8vIE9idGllbnQgbGVzIHJlc3NvdXJjZXMgZHUgc2VydmV1ciBldCBtZXQgZW4gcGxhY2UgbGVzIHByb3ByacOpdMOpcyBkdSBjb21wb3NhbnQuXHJcbiAgICBnZXRSZXNzb3VyY2VzKCl7XHJcbiAgICAgICAgdGhpcy5fYWdlbmRhU2VydmljZS5nZXRSZXNzb3VyY2VzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzc291cmNlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3NvdXJjZSBkdSBzZXJ2ZXVyIHBvdXIgYWZmaWNoZXIgZGFucyBsYSBsaXN0ZSA6IFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5yZXNzb3VyY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3NvdXJjZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzc291cmNlc1tpXS50ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRyZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwib3duZXJJZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvcjogXCJlcVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZXNzb3VyY2VzW2ldLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXNGaWx0cmUucHVzaChmaWx0cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8qIEluaXRpYWxpc2UgbCdhZ2VuZGEgc2V1bGVtZW50IGFwcsOocyBhdm9pciBvYnRlbnUgbGVzIHJlc3NvdXJjZXNcclxuICAgICAgICAgICAgICAgICAgICBwb3VyIG1ldHRyZSBlbiBwbGFjZSBsZSBmaWx0cmUgaW5pdGlhbC4gKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuYWdlbmRhSW5pdCgpOyAgIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJldXJTZXJ2aWNlLmhhbmRsZUVycmV1cihlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGFnZW5kYUluaXQoKXtcclxuICAgICAgICAkKFwiI3NjaGVkdWxlclwiKS5rZW5kb1NjaGVkdWxlcih7XHJcbiAgICAgICAgICAgIGhlaWdodDogNjAwLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZpZXdzOiBbXHJcbiAgICAgICAgICAgICAgICBcImRheVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ3ZWVrXCIsXHJcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhcIiwgc2VsZWN0ZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIFwiYWdlbmRhXCIsXHJcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwidGltZWxpbmVcIiwgZXZlbnRIZWlnaHQ6IDUwfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0aW1lem9uZTogXCJFdGMvVVRDXCIsXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHtcclxuICAgICAgICAgICAgICAgIGJhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBUEkgcG91ciBhbGxlciBjaGVyY2hlciBsZXMgYWN0aXZpdMOpcyDDoCBhZmZpY2hlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hY3Rpdml0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlck1hcDogZnVuY3Rpb24ob3B0aW9ucywgb3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24gIT09IFwicmVhZFwiICYmIG9wdGlvbnMubW9kZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge21vZGVsczoga2VuZG8uc3RyaW5naWZ5KG9wdGlvbnMubW9kZWxzKX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5pdGlvbiBkdSBzY2jDqW1hIGRlcyBpbmZvcm1hdGlvbnMgcmV0b3VybsOpcyBwb3VyIGNoYXF1ZSBhY3Rpdml0w6kgcGFyIGwnQVBJLlxyXG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFza0lkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9VdGlsaXNlciBpZGVudGlmaWFudCBNb25nb29zZSBkZSBsJ2FjdGl2aXTDqSBjb21tZSB0YXNrSWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSWQ6IHsgZnJvbTogXCJUYXNrSURcIiwgdHlwZTogXCJzdHJpbmdcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9VdGlsaXNlciBsZSBub20gZGUgbCdhY3Rpdml0w6kgcG91ciBUaXRsZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB7IGZyb206IFwiVGl0bGVcIiwgZGVmYXVsdFZhbHVlOiBcIk5vIHRpdGxlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB7IHR5cGU6IFwiZGF0ZVwiLCBmcm9tOiBcIlN0YXJ0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogeyB0eXBlOiBcImRhdGVcIiwgZnJvbTogXCJFbmRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Ob20gZXZ4IGRhbnMgbGEgZGVzY3JpcHRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogeyBmcm9tOiBcIkRlc2NyaXB0aW9uXCIsIHR5cGU6IFwic3RyaW5nXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVXRpbGlzZXIgbGUgSUQgTW9uZ29vc2UgZGUgbGEgcmVzc291cmNlIGNvbW1lIFwib3duZXJcIi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG93bmVySWQ6IHsgZnJvbTogXCJPd25lcklEXCIsIHR5cGU6IFwic3RyaW5nXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIEZpbHRyZSBwYXIgZMOpZmF1dCBxdWkgYWZmaWNoZSB0b3V0ZXMgbGVzIHJlc3NvdXJjZXMgbHUgZHUgc2VydmV1ci4gKi9cclxuICAgICAgICAgICAgICAgICAgICBsb2dpYzogXCJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMucmVzc291cmNlc0ZpbHRyZSBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwib3duZXJJZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk93bmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5yZXNzb3VyY2VzIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogTWV0IMOgIGpvdXIgbGUgZmlsdHJlIGR1IFNjaGVkdWxlciBsb3JzcXVlIGwndXNhZ2VyIGNsaWNrIHVuIGNoZWNrYm94IGRlIHJlc3NvdXJjZS4gKi9cclxuICAgIGZpbHRyZUNoYW5nZShmaWx0cmVDaGVja2JveCl7XHJcbiAgICAgICAgLyogY2hlY2tlZCBlc3QgdW4gYXJyYXkgY29udGVuYW50IHRvdXMgbGVzIElEJ3MgZGVzIHJlc3NvdXJjZXMgcXVpIFxyXG4gICAgICAgICAgICBzb250IHPDqWxlY3Rpb25uw6llcyBwYXIgbCd1c2FnZXIgZW4gdXRpbGlzYW50IGxlcyBjaGVja2JveC4gKi9cclxuICAgICAgICB2YXIgY2hlY2tlZCA9ICQubWFwKCQoXCIjY2hlY2tSZXNzb3VyY2UgOmNoZWNrZWRcIiksIGZ1bmN0aW9uKGNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoJChjaGVja2JveCkudmFsKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgc2NoZWR1bGVyID0gJChcIiNzY2hlZHVsZXJcIikuZGF0YShcImtlbmRvU2NoZWR1bGVyXCIpO1xyXG5cclxuICAgICAgICAvKiBBcHBsaXF1ZSBsZSBmaWx0cmUgc3VyIGxlIHNjaGR1bGVyIGJhc8OpIHN1ciBsYSBsaXN0ZSBkZXNcclxuICAgICAgICAgICAgcmVzc291cmNlcyBzw6lsZWN0aW9ubsOpZXMgYXZlYyBsZXMgY2hlY2tib3guICovICAgIFxyXG4gICAgICAgIHNjaGVkdWxlci5kYXRhU291cmNlLmZpbHRlcih7XHJcbiAgICAgICAgICAgIG9wZXJhdG9yOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5pbkFycmF5KHRhc2sub3duZXJJZCwgY2hlY2tlZCkgPj0gMDtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgIH0gICAgXHJcbn0iXX0=

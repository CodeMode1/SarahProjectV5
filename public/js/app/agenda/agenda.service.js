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
var http_1 = require('@angular/http');
var agendaRessource_1 = require('./agendaRessource');
require('rxjs/Rx');
var Observable_1 = require('rxjs/Observable');
var AgendaService = (function () {
    function AgendaService(_http) {
        this._http = _http;
        this.ressources = [];
    }
    AgendaService.prototype.getRessources = function () {
        var _this = this;
        return this._http.get('http://localhost:3000/ressource')
            .map(function (response) {
            var data = response.json().obj;
            console.log("ressource : ");
            console.log(data);
            var objs = [];
            for (var i = 0; i < data.length; i++) {
                var ressource = new agendaRessource_1.agendaRessource(data[i].nom, data[i]._id, data[i].couleur);
                objs.push(ressource);
                console.log(data[i].nom + data[i].couleur);
            }
            ;
            // mettre a jour le array de ressources du service
            _this.ressources = objs;
            console.log("array du service: " + JSON.stringify(_this.ressources));
            return objs;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'erreur serveur'); });
    };
    AgendaService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AgendaService);
    return AgendaService;
}());
exports.AgendaService = AgendaService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW5kYS9hZ2VuZGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLHFCQUF3QyxlQUFlLENBQUMsQ0FBQTtBQUN4RCxnQ0FBZ0MsbUJBQW1CLENBQUMsQ0FBQTtBQUNwRCxRQUFPLFNBQVMsQ0FBQyxDQUFBO0FBQ2pCLDJCQUEyQixpQkFBaUIsQ0FBQyxDQUFBO0FBRzdDO0lBR0ksdUJBQW9CLEtBQVc7UUFBWCxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBRi9CLGVBQVUsR0FBc0IsRUFBRSxDQUFDO0lBRUEsQ0FBQztJQUVwQyxxQ0FBYSxHQUFiO1FBQUEsaUJBa0JDO1FBakJHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQzthQUNuRCxHQUFHLENBQUMsVUFBQyxRQUFrQjtZQUNwQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksR0FBVSxFQUFFLENBQUM7WUFDckIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7Z0JBQy9CLElBQUksU0FBUyxHQUFHLElBQUksaUNBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFBQSxDQUFDO1lBQ0Ysa0RBQWtEO1lBQ2xELEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFsRCxDQUFrRCxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQXhCTDtRQUFDLGlCQUFVLEVBQUU7O3FCQUFBO0lBeUJiLG9CQUFDO0FBQUQsQ0F4QkEsQUF3QkMsSUFBQTtBQXhCWSxxQkFBYSxnQkF3QnpCLENBQUEiLCJmaWxlIjoiYWdlbmRhL2FnZW5kYS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBhZ2VuZGFSZXNzb3VyY2UgfSBmcm9tICcuL2FnZW5kYVJlc3NvdXJjZSc7XHJcbmltcG9ydCAncnhqcy9SeCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQWdlbmRhU2VydmljZSB7XHJcbiAgICByZXNzb3VyY2VzOiBhZ2VuZGFSZXNzb3VyY2VbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApIHsgfVxyXG5cclxuICAgIGdldFJlc3NvdXJjZXMoKTogT2JzZXJ2YWJsZTxhZ2VuZGFSZXNzb3VyY2VbXT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvcmVzc291cmNlJylcclxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzc291cmNlIDogXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqczogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3NvdXJjZSA9IG5ldyBhZ2VuZGFSZXNzb3VyY2UoZGF0YVtpXS5ub20sIGRhdGFbaV0uX2lkLCBkYXRhW2ldLmNvdWxldXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2gocmVzc291cmNlKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2ldLm5vbSArIGRhdGFbaV0uY291bGV1cik7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy8gbWV0dHJlIGEgam91ciBsZSBhcnJheSBkZSByZXNzb3VyY2VzIGR1IHNlcnZpY2VcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzc291cmNlcyA9IG9ianM7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFycmF5IGR1IHNlcnZpY2U6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5yZXNzb3VyY2VzKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqcztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpIHx8ICdlcnJldXIgc2VydmV1cicpKTtcclxuICAgIH1cclxufSJdfQ==

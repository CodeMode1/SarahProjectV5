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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var agendaRessource_1 = require("./agendaRessource");
require("rxjs/Rx");
var Observable_1 = require("rxjs/Observable");
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
    return AgendaService;
}());
AgendaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AgendaService);
exports.AgendaService = AgendaService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvYWdlbmRhL2FnZW5kYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBQ3hELHFEQUFvRDtBQUNwRCxtQkFBaUI7QUFDakIsOENBQTZDO0FBRzdDLElBQWEsYUFBYTtJQUd0Qix1QkFBb0IsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07UUFGL0IsZUFBVSxHQUFzQixFQUFFLENBQUM7SUFFQSxDQUFDO0lBRXBDLHFDQUFhLEdBQWI7UUFBQSxpQkFrQkM7UUFqQkcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDO2FBQ25ELEdBQUcsQ0FBQyxVQUFDLFFBQWtCO1lBQ3BCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksSUFBSSxHQUFVLEVBQUUsQ0FBQztZQUNyQixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztnQkFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsQ0FBQztZQUFBLENBQUM7WUFDRixrREFBa0Q7WUFDbEQsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLGdCQUFnQixDQUFDLEVBQWxELENBQWtELENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQXhCQSxBQXdCQyxJQUFBO0FBeEJZLGFBQWE7SUFEekIsaUJBQVUsRUFBRTtxQ0FJa0IsV0FBSTtHQUh0QixhQUFhLENBd0J6QjtBQXhCWSxzQ0FBYSIsImZpbGUiOiJhZ2VuZGEvYWdlbmRhLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IGFnZW5kYVJlc3NvdXJjZSB9IGZyb20gJy4vYWdlbmRhUmVzc291cmNlJztcclxuaW1wb3J0ICdyeGpzL1J4JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBZ2VuZGFTZXJ2aWNlIHtcclxuICAgIHJlc3NvdXJjZXM6IGFnZW5kYVJlc3NvdXJjZVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cCkgeyB9XHJcblxyXG4gICAgZ2V0UmVzc291cmNlcygpOiBPYnNlcnZhYmxlPGFnZW5kYVJlc3NvdXJjZVtdPntcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9yZXNzb3VyY2UnKVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkub2JqO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2UgOiBcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBvYmpzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzc291cmNlID0gbmV3IGFnZW5kYVJlc3NvdXJjZShkYXRhW2ldLm5vbSwgZGF0YVtpXS5faWQsIGRhdGFbaV0uY291bGV1cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ianMucHVzaChyZXNzb3VyY2UpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0ubm9tICsgZGF0YVtpXS5jb3VsZXVyKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyBtZXR0cmUgYSBqb3VyIGxlIGFycmF5IGRlIHJlc3NvdXJjZXMgZHUgc2VydmljZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNzb3VyY2VzID0gb2JqcztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXJyYXkgZHUgc2VydmljZTogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnJlc3NvdXJjZXMpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmpzO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkgfHwgJ2VycmV1ciBzZXJ2ZXVyJykpO1xyXG4gICAgfVxyXG59Il19

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
var Colors;
(function (Colors) {
    Colors[Colors["b000ff"] = 0] = "b000ff";
    Colors[Colors["56a996"] = 1] = "56a996";
    Colors[Colors["305bf8"] = 2] = "305bf8";
    Colors[Colors["f8cd30"] = 3] = "f8cd30";
    Colors[Colors["be6c8d"] = 4] = "be6c8d";
    Colors[Colors["630e70"] = 5] = "630e70";
    Colors[Colors["87fbe4"] = 6] = "87fbe4";
    Colors[Colors["e49c61"] = 7] = "e49c61";
})(Colors || (Colors = {}));
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
                var ressource = new agendaRessource_1.agendaRessource(data[i].nom, data[i]._id, "#" + Colors[i]);
                objs.push(ressource);
                console.log(data[i].nom);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW5kYS9hZ2VuZGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLHFCQUF3QyxlQUFlLENBQUMsQ0FBQTtBQUN4RCxnQ0FBZ0MsbUJBQW1CLENBQUMsQ0FBQTtBQUNwRCxRQUFPLFNBQVMsQ0FBQyxDQUFBO0FBQ2pCLDJCQUEyQixpQkFBaUIsQ0FBQyxDQUFBO0FBRTdDLElBQUssTUFTSjtBQVRELFdBQUssTUFBTTtJQUNQLHVDQUFRLENBQUE7SUFDUix1Q0FBUSxDQUFBO0lBQ1IsdUNBQVEsQ0FBQTtJQUNSLHVDQUFRLENBQUE7SUFDUix1Q0FBUSxDQUFBO0lBQ1IsdUNBQVEsQ0FBQTtJQUNSLHVDQUFRLENBQUE7SUFDUix1Q0FBUSxDQUFBO0FBQ1osQ0FBQyxFQVRJLE1BQU0sS0FBTixNQUFNLFFBU1Y7QUFHRDtJQUdJLHVCQUFvQixLQUFXO1FBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUYvQixlQUFVLEdBQXNCLEVBQUUsQ0FBQztJQUVBLENBQUM7SUFFcEMscUNBQWEsR0FBYjtRQUFBLGlCQW1CQztRQWxCRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUM7YUFDbkQsR0FBRyxDQUFDLFVBQUMsUUFBa0I7WUFDcEIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxJQUFJLEdBQVUsRUFBRSxDQUFDO1lBQ3JCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO2dCQUMvQixJQUFJLFNBQVMsR0FBRyxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUN4RCxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQSxDQUFDO1lBQ0Ysa0RBQWtEO1lBQ2xELEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFsRCxDQUFrRCxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQXpCTDtRQUFDLGlCQUFVLEVBQUU7O3FCQUFBO0lBNEJiLG9CQUFDO0FBQUQsQ0EzQkEsQUEyQkMsSUFBQTtBQTNCWSxxQkFBYSxnQkEyQnpCLENBQUEiLCJmaWxlIjoiYWdlbmRhL2FnZW5kYS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBhZ2VuZGFSZXNzb3VyY2UgfSBmcm9tICcuL2FnZW5kYVJlc3NvdXJjZSc7XHJcbmltcG9ydCAncnhqcy9SeCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5cclxuZW51bSBDb2xvcnN7XHJcbiAgICBcImIwMDBmZlwiLFxyXG4gICAgXCI1NmE5OTZcIixcclxuICAgIFwiMzA1YmY4XCIsXHJcbiAgICBcImY4Y2QzMFwiLFxyXG4gICAgXCJiZTZjOGRcIixcclxuICAgIFwiNjMwZTcwXCIsXHJcbiAgICBcIjg3ZmJlNFwiLFxyXG4gICAgXCJlNDljNjFcIlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBZ2VuZGFTZXJ2aWNlIHtcclxuICAgIHJlc3NvdXJjZXM6IGFnZW5kYVJlc3NvdXJjZVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cCkgeyB9XHJcblxyXG4gICAgZ2V0UmVzc291cmNlcygpOiBPYnNlcnZhYmxlPGFnZW5kYVJlc3NvdXJjZVtdPntcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9yZXNzb3VyY2UnKVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkub2JqO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNzb3VyY2UgOiBcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBvYmpzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzc291cmNlID0gbmV3IGFnZW5kYVJlc3NvdXJjZShkYXRhW2ldLm5vbSwgZGF0YVtpXS5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiI1wiICsgQ29sb3JzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Jqcy5wdXNoKHJlc3NvdXJjZSk7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS5ub20pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vIG1ldHRyZSBhIGpvdXIgbGUgYXJyYXkgZGUgcmVzc291cmNlcyBkdSBzZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXMgPSBvYmpzO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhcnJheSBkdSBzZXJ2aWNlOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMucmVzc291cmNlcykpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ianM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSB8fCAnZXJyZXVyIHNlcnZldXInKSk7XHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==
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
var ressource_1 = require("./ressource");
require("rxjs/Rx");
var Observable_1 = require("rxjs/Observable");
var RessourceService = (function () {
    function RessourceService(_http) {
        this._http = _http;
        this.ressources = [];
    }
    RessourceService.prototype.getRessources = function () {
        var _this = this;
        return this._http.get('http://localhost:3000/ressource')
            .map(function (response) {
            var data = response.json().obj;
            console.log(data);
            var objs = [];
            for (var i = 0; i < data.length; i++) {
                var ressource = new ressource_1.Ressource(data[i]._id, data[i].nom, data[i].couleur);
                objs.push(ressource);
                console.log(data[i].nom);
            }
            ;
            // Mettre a jour le array de ressources du service.
            _this.ressources = objs;
            console.log("array du service: " + JSON.stringify(_this.ressources));
            return objs;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'erreur serveur'); });
    };
    RessourceService.prototype.creerRessource = function (ressource) {
        var body = JSON.stringify(ressource);
        console.log("body de la ressource : ");
        console.log(body);
        var header = new http_1.Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.post('http://localhost:3000/ressource' + token, body, { headers: header })
            .map(function (response) {
            var data = response.json().obj;
            var ressource = new ressource_1.Ressource(data._id, data.nom, data.couleur);
            return ressource;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'erreur serveur'); });
    };
    RessourceService.prototype.updateRessource = function (ressource) {
        var body = JSON.stringify(ressource);
        var header = new http_1.Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.put('http://localhost:3000/ressource/' + ressource.ressourceId + token, body, { headers: header })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'erreur serveur'); });
    };
    RessourceService.prototype.deleteRessource = function (ressource) {
        this.ressources.splice(this.ressources.indexOf(ressource), 1);
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.delete('http://localhost:3000/ressource/' + ressource.ressourceId + token)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.jsons() || 'erreur serveur'); });
    };
    return RessourceService;
}());
RessourceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RessourceService);
exports.RessourceService = RessourceService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvcmVzc291cmNlcy9yZXNzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUN4RCx5Q0FBd0M7QUFDeEMsbUJBQWlCO0FBQ2pCLDhDQUE2QztBQUc3QyxJQUFhLGdCQUFnQjtJQUd6QiwwQkFBcUIsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07UUFGaEMsZUFBVSxHQUFnQixFQUFFLENBQUM7SUFFTyxDQUFDO0lBRXJDLHdDQUFhLEdBQWI7UUFBQSxpQkFpQkM7UUFoQkcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDO2FBQ25ELEdBQUcsQ0FBQyxVQUFDLFFBQWtCO1lBQ3BCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksR0FBVSxFQUFFLENBQUM7WUFDckIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7Z0JBQy9CLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQUEsQ0FB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TyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxrQ0FBa0MsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzthQUN2RixHQUFHLENBQUMsVUFBQyxRQUFrQixJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQzthQUM1QyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksZ0JBQWdCLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFDTCx1QkFBQztBQUFELENBdkRBLEFBdURDLElBQUE7QUF2RFksZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7cUNBSW1CLFdBQUk7R0FIdkIsZ0JBQWdCLENBdUQ1QjtBQXZEWSw0Q0FBZ0IiLCJmaWxlIjoicmVzc291cmNlcy9yZXNzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgUmVzc291cmNlIH0gZnJvbSAnLi9yZXNzb3VyY2UnO1xyXG5pbXBvcnQgJ3J4anMvUngnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlc3NvdXJjZVNlcnZpY2Uge1xyXG4gICAgcmVzc291cmNlczogUmVzc291cmNlW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfaHR0cDogSHR0cCkgeyB9XHJcblxyXG4gICAgZ2V0UmVzc291cmNlcygpOiBPYnNlcnZhYmxlPFJlc3NvdXJjZVtdPntcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9yZXNzb3VyY2UnKVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkub2JqO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqczogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3NvdXJjZSA9IG5ldyBSZXNzb3VyY2UoZGF0YVtpXS5faWQsIGRhdGFbaV0ubm9tLCBkYXRhW2ldLmNvdWxldXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2gocmVzc291cmNlKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2ldLm5vbSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBhcnJheSBkZSByZXNzb3VyY2VzIGR1IHNlcnZpY2UuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3NvdXJjZXMgPSBvYmpzO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhcnJheSBkdSBzZXJ2aWNlOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMucmVzc291cmNlcykpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ianM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSB8fCAnZXJyZXVyIHNlcnZldXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlZXJSZXNzb3VyY2UocmVzc291cmNlOiBSZXNzb3VyY2Upe1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXNzb3VyY2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9keSBkZSBsYSByZXNzb3VyY2UgOiBcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpID8gJz90b2tlbj0nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiAnJztcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvcmVzc291cmNlJyArIHRva2VuLCBib2R5LCB7aGVhZGVyczpoZWFkZXJ9KVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkub2JqO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3NvdXJjZSA9IG5ldyBSZXNzb3VyY2UoZGF0YS5faWQsIGRhdGEubm9tLCBkYXRhLmNvdWxldXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3NvdXJjZTsgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkgfHwgJ2VycmV1ciBzZXJ2ZXVyJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVJlc3NvdXJjZShyZXNzb3VyY2U6IFJlc3NvdXJjZSl7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlc3NvdXJjZSk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnIDogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvcmVzc291cmNlLycgKyByZXNzb3VyY2UucmVzc291cmNlSWQgKyB0b2tlbiwgYm9keSwge2hlYWRlcnM6aGVhZGVyfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2UgOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkgfHwgJ2VycmV1ciBzZXJ2ZXVyJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVJlc3NvdXJjZShyZXNzb3VyY2U6IFJlc3NvdXJjZSl7XHJcbiAgICAgICAgdGhpcy5yZXNzb3VyY2VzLnNwbGljZSh0aGlzLnJlc3NvdXJjZXMuaW5kZXhPZihyZXNzb3VyY2UpLCAxKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpID8gJz90b2tlbj0nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiAnJztcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5kZWxldGUoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9yZXNzb3VyY2UvJyArIHJlc3NvdXJjZS5yZXNzb3VyY2VJZCArIHRva2VuKVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbnMoKSB8fCAnZXJyZXVyIHNlcnZldXInKSk7XHJcbiAgICB9XHJcbn0iXX0=

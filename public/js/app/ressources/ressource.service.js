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
var ressource_1 = require('./ressource');
require('rxjs/Rx');
var Observable_1 = require('rxjs/Observable');
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
    RessourceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RessourceService);
    return RessourceService;
}());
exports.RessourceService = RessourceService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3NvdXJjZXMvcmVzc291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUMzQyxxQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLFFBQU8sU0FBUyxDQUFDLENBQUE7QUFDakIsMkJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFHN0M7SUFHSSwwQkFBcUIsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07UUFGaEMsZUFBVSxHQUFnQixFQUFFLENBQUM7SUFFTyxDQUFDO0lBRXJDLHdDQUFhLEdBQWI7UUFBQSxpQkFpQkM7UUFoQkcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDO2FBQ25ELEdBQUcsQ0FBQyxVQUFDLFFBQWtCO1lBQ3BCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksR0FBVSxFQUFFLENBQUM7WUFDckIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7Z0JBQy9CLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFH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TSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxrQ0FBa0MsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzthQUN2RixHQUFHLENBQUMsVUFBQyxRQUFrQixJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQzthQUM1QyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksZ0JBQWdCLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUF2REw7UUFBQyxpQkFBVSxFQUFFOzt3QkFBQTtJQXdEYix1QkFBQztBQUFELENBdkRBLEFBdURDLElBQUE7QUF2RFksd0JBQWdCLG1CQXVENUIsQ0FBQSIsImZpbGUiOiJyZXNzb3VyY2VzL3Jlc3NvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBSZXNzb3VyY2UgfSBmcm9tICcuL3Jlc3NvdXJjZSc7XHJcbmltcG9ydCAncnhqcy9SeCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVzc291cmNlU2VydmljZSB7XHJcbiAgICByZXNzb3VyY2VzOiBSZXNzb3VyY2VbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9odHRwOiBIdHRwKSB7IH1cclxuXHJcbiAgICBnZXRSZXNzb3VyY2VzKCk6IE9ic2VydmFibGU8UmVzc291cmNlW10+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL3Jlc3NvdXJjZScpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKS5vYmo7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBvYmpzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzc291cmNlID0gbmV3IFJlc3NvdXJjZShkYXRhW2ldLl9pZCwgZGF0YVtpXS5ub20sIGRhdGFbaV0uY291bGV1cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ianMucHVzaChyZXNzb3VyY2UpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0ubm9tKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIGFycmF5IGRlIHJlc3NvdXJjZXMgZHUgc2VydmljZS5cclxuICAgICAgICAgICAgICAgIHRoaXMucmVzc291cmNlcyA9IG9ianM7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFycmF5IGR1IHNlcnZpY2U6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5yZXNzb3VyY2VzKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqcztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpIHx8ICdlcnJldXIgc2VydmV1cicpKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVlclJlc3NvdXJjZShyZXNzb3VyY2U6IFJlc3NvdXJjZSl7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlc3NvdXJjZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJib2R5IGRlIGxhIHJlc3NvdXJjZSA6IFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA6ICcnO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9yZXNzb3VyY2UnICsgdG9rZW4sIGJvZHksIHtoZWFkZXJzOmhlYWRlcn0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKS5vYmo7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzc291cmNlID0gbmV3IFJlc3NvdXJjZShkYXRhLl9pZCwgZGF0YS5ub20sIGRhdGEuY291bGV1cik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzc291cmNlOyAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSB8fCAnZXJyZXVyIHNlcnZldXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUmVzc291cmNlKHJlc3NvdXJjZTogUmVzc291cmNlKXtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVzc291cmNlKTtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZScgOiAnYXBwbGljYXRpb24vanNvbid9KTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpID8gJz90b2tlbj0nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiAnJztcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9yZXNzb3VyY2UvJyArIHJlc3NvdXJjZS5yZXNzb3VyY2VJZCArIHRva2VuLCBib2R5LCB7aGVhZGVyczpoZWFkZXJ9KVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZSA6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSB8fCAnZXJyZXVyIHNlcnZldXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlUmVzc291cmNlKHJlc3NvdXJjZTogUmVzc291cmNlKXtcclxuICAgICAgICB0aGlzLnJlc3NvdXJjZXMuc3BsaWNlKHRoaXMucmVzc291cmNlcy5pbmRleE9mKHJlc3NvdXJjZSksIDEpO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA6ICcnO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSgnaHR0cDovL2xvY2FsaG9zdDozMDAwL3Jlc3NvdXJjZS8nICsgcmVzc291cmNlLnJlc3NvdXJjZUlkICsgdG9rZW4pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29ucygpIHx8ICdlcnJldXIgc2VydmV1cicpKTtcclxuICAgIH1cclxufSJdfQ==

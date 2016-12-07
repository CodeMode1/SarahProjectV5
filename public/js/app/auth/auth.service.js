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
require('rxjs/Rx');
var Observable_1 = require('rxjs/Observable');
var AuthService = (function () {
    function AuthService(_http) {
        this._http = _http;
    }
    AuthService.prototype.signUp = function (user) {
        var body = JSON.stringify(user);
        var header = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post('http://localhost:3000/user', body, { headers: header })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
    };
    AuthService.prototype.signIn = function (user) {
        var body = JSON.stringify(user);
        var header = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post('http://localhost:3000/user/signin', body, { headers: header })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
    };
    // Flush jeton et userId côté client
    AuthService.prototype.logOut = function () {
        localStorage.clear();
    };
    // Si un user est loggé
    AuthService.prototype.estLogIn = function () {
        return localStorage.getItem('token') !== null;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkIsZUFBZSxDQUFDLENBQUE7QUFDM0MscUJBQXdDLGVBQWUsQ0FBQyxDQUFBO0FBRXhELFFBQU8sU0FBUyxDQUFDLENBQUE7QUFDakIsMkJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFHN0M7SUFFSSxxQkFBcUIsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07SUFBSSxDQUFDO0lBRXJDLDRCQUFNLEdBQU4sVUFBTyxJQUFVO1FBQ2IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUM7UUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQzthQUN4RSxHQUFHLENBQUMsVUFBQyxRQUFrQixJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQzthQUM1QyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sSUFBVTtRQUNiLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDL0UsR0FBRyxDQUFDLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7YUFDNUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLDRCQUFNLEdBQU47UUFDSSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELHVCQUF1QjtJQUN2Qiw4QkFBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDO0lBQ2xELENBQUM7SUE3Qkw7UUFBQyxpQkFBVSxFQUFFOzttQkFBQTtJQThCYixrQkFBQztBQUFELENBN0JBLEFBNkJDLElBQUE7QUE3QlksbUJBQVcsY0E2QnZCLENBQUEiLCJmaWxlIjoiYXV0aC9hdXRoLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2Vycy91c2VyJztcclxuaW1wb3J0ICdyeGpzL1J4JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX2h0dHA6IEh0dHApIHsgfVxyXG5cclxuICAgIHNpZ25VcCh1c2VyOiBVc2VyKXtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkodXNlcik7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlcicsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJ9KVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbkluKHVzZXI6IFVzZXIpe1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh1c2VyKTtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC91c2VyL3NpZ25pbicsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJ9KVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmx1c2ggamV0b24gZXQgdXNlcklkIGPDtHTDqSBjbGllbnRcclxuICAgIGxvZ091dCgpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpIHVuIHVzZXIgZXN0IGxvZ2fDqVxyXG4gICAgZXN0TG9nSW4oKXtcclxuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IG51bGw7XHJcbiAgICB9XHJcbn0iXX0=

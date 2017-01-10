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
require("rxjs/Rx");
var Observable_1 = require("rxjs/Observable");
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
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvYXV0aC9hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsbUJBQWlCO0FBQ2pCLDhDQUE2QztBQUc3QyxJQUFhLFdBQVc7SUFFcEIscUJBQXFCLEtBQVc7UUFBWCxVQUFLLEdBQUwsS0FBSyxDQUFNO0lBQUksQ0FBQztJQUVyQyw0QkFBTSxHQUFOLFVBQU8sSUFBVTtRQUNiLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDeEUsR0FBRyxDQUFDLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7YUFDNUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLElBQVU7UUFDYixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQU0sTUFBTSxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDO2FBQy9FLEdBQUcsQ0FBQyxVQUFDLFFBQWtCLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2FBQzVDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELG9DQUFvQztJQUNwQyw0QkFBTSxHQUFOO1FBQ0ksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsOEJBQVEsR0FBUjtRQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQztJQUNsRCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQTdCQSxBQTZCQyxJQUFBO0FBN0JZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FHbUIsV0FBSTtHQUZ2QixXQUFXLENBNkJ2QjtBQTdCWSxrQ0FBVyIsImZpbGUiOiJhdXRoL2F1dGguc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXJzL3VzZXInO1xyXG5pbXBvcnQgJ3J4anMvUngnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfaHR0cDogSHR0cCkgeyB9XHJcblxyXG4gICAgc2lnblVwKHVzZXI6IFVzZXIpe1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh1c2VyKTtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC91c2VyJywgYm9keSwge2hlYWRlcnM6IGhlYWRlcn0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBzaWduSW4odXNlcjogVXNlcil7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHVzZXIpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXIvc2lnbmluJywgYm9keSwge2hlYWRlcnM6IGhlYWRlcn0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGbHVzaCBqZXRvbiBldCB1c2VySWQgY8O0dMOpIGNsaWVudFxyXG4gICAgbG9nT3V0KCl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2kgdW4gdXNlciBlc3QgbG9nZ8OpXHJcbiAgICBlc3RMb2dJbigpe1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gbnVsbDtcclxuICAgIH1cclxufSJdfQ==

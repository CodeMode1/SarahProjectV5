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
var evenement_1 = require('./evenement');
require('rxjs/Rx');
var Observable_1 = require('rxjs/Observable');
var EvenementService = (function () {
    function EvenementService(_http) {
        this._http = _http;
        this.evenements = [];
    }
    //data[i].client_FK._id pour modifier un evenement pour actualiser la selection par rapport au client.
    EvenementService.prototype.getEvenements = function () {
        var _this = this;
        return this._http.get('http://localhost:3000/evenement')
            .map(function (response) {
            var data = response.json().obj;
            var objs = [];
            for (var i = 0; i < data.length; i++) {
                var evenement = new evenement_1.Evenement(data[i]._id, data[i].noEvenement, data[i].nom, data[i].dateEvenement, data[i].contact, data[i].client, data[i].selectEtat, data[i].dateSoumission, data[i].dateConfirmation, data[i].dateFacturation, data[i].dateNonRetenu, data[i].dateAnnulation, data[i].notes, data[i].validationTache, data[i].creerPar, data[i].dateCree, data[i].modifPar, data[i].modif);
                objs.push(evenement);
            }
            ;
            // mettre a jour le array d'evx du service
            _this.evenements = objs;
            console.log("array du service: " + JSON.stringify(_this.evenements));
            return objs;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'erreur serveur'); });
    };
    EvenementService.prototype.getEvenement = function (noEvenement) {
        return this._http.get('http://localhost:3000/evenement/' + noEvenement)
            .map(function (response) {
            var data = response.json().obj;
            var evenement = new evenement_1.Evenement(data._id, data.noEvenement, data.nom, data.dateEvenement, data.contact, data.client, data.selectEtat, data.dateSoumission, data.dateConfirmation, data.dateFacturation, data.dateNonRetenu, data.dateAnnulation, data.notes, data.validationTache, data.creerPar, data.dateCree, data.modifPar, data.modif, data.client_FK);
            return evenement;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'erreur serveur'); });
    };
    EvenementService.prototype.creerEvenement = function (evenement) {
        var body = JSON.stringify(evenement);
        var header = new http_1.Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.post('http://localhost:3000/evenement' + token, body, { headers: header })
            .map(function (response) {
            var data = response.json().obj;
            var evenement = new evenement_1.Evenement(data._id, data.noEvenement, data.nom, data.dateEvenement, data.contact, data.client, data.selectEtat, data.dateSoumission, data.dateConfirmation, data.dateFacturation, data.dateNonRetenu, data.dateAnnulation, data.notes, data.validationTache, data.creerPar, data.dateCree, data.modifPar, data.modif);
            return evenement;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'erreur serveur'); });
    };
    EvenementService.prototype.updateEvenement = function (evenement) {
        var body = JSON.stringify(evenement);
        var header = new http_1.Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.put('http://localhost:3000/evenement/' + evenement.evenementId + token, body, { headers: header })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'erreur serveur'); });
    };
    EvenementService.prototype.deleteEvenement = function (evenement) {
        this.evenements.splice(this.evenements.indexOf(evenement), 1);
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this._http.delete('http://localhost:3000/evenement/' + evenement.evenementId + token)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.jsons() || 'erreur serveur'); });
    };
    EvenementService.prototype.getEvenementsSpecialSearch = function (textSearch) {
        var _this = this;
        return this._http.get('http://localhost:3000/evenement/search/' + textSearch)
            .map(function (response) {
            var data = response.json().obj;
            var objs = [];
            for (var i = 0; i < data.length; i++) {
                var evenement = new evenement_1.Evenement(data[i]._id, data[i].noEvenement, data[i].nom, data[i].dateEvenement, data[i].contact, data[i].client, data[i].selectEtat, data[i].dateSoumission, data[i].dateConfirmation, data[i].dateFacturation, data[i].dateNonRetenu, data[i].dateAnnulation, data[i].notes, data[i].validationTache, data[i].creerPar, data[i].dateCree, data[i].modifPar, data[i].modif);
                objs.push(evenement);
                console.log('les evx filtrés: ' + JSON.stringify(evenement));
            }
            ;
            _this.evenements = objs;
            console.log('array filtrer : ');
            console.log(_this.evenements);
            return objs;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'erreur serveur'); });
    };
    EvenementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EvenementService);
    return EvenementService;
}());
exports.EvenementService = EvenementService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW5lbWVudHMvZXZlbmVtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFtQyxlQUFlLENBQUMsQ0FBQTtBQUNuRCxxQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQsMEJBQTBCLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLFFBQU8sU0FBUyxDQUFDLENBQUE7QUFDakIsMkJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFHN0M7SUFHSSwwQkFBcUIsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07UUFGaEMsZUFBVSxHQUFnQixFQUFFLENBQUM7SUFFTyxDQUFDO0lBR3JDLHNHQUFzRztJQUN0Ryx3Q0FBYSxHQUFiO1FBQUEsaUJBb0JDO1FBbkJHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQzthQUNuRCxHQUFHLENBQUMsVUFBQyxRQUFrQjtZQUNwQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2pDLElBQUksSUFBSSxHQUFVLEVBQUUsQ0FBQztZQUNyQixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztnQkFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUN2RSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFDdEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFD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LENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQ3JGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUFBLENBQUM7WUFDRixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksZ0JBQWdCLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFsR0w7UUFBQyxpQkFBVSxFQUFFOzt3QkFBQTtJQWdIYix1QkFBQztBQUFELENBL0dBLEFBK0dDLElBQUE7QUEvR1ksd0JBQWdCLG1CQStHNUIsQ0FBQSIsImZpbGUiOiJldmVuZW1lbnRzL2V2ZW5lbWVudC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudCB9IGZyb20gJy4vZXZlbmVtZW50JztcclxuaW1wb3J0ICdyeGpzL1J4JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFdmVuZW1lbnRTZXJ2aWNle1xyXG4gICAgZXZlbmVtZW50czogRXZlbmVtZW50W10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfaHR0cDogSHR0cCkgeyB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLy9kYXRhW2ldLmNsaWVudF9GSy5faWQgcG91ciBtb2RpZmllciB1biBldmVuZW1lbnQgcG91ciBhY3R1YWxpc2VyIGxhIHNlbGVjdGlvbiBwYXIgcmFwcG9ydCBhdSBjbGllbnQuXHJcbiAgICBnZXRFdmVuZW1lbnRzKCk6IE9ic2VydmFibGU8RXZlbmVtZW50W10+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2V2ZW5lbWVudCcpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKS5vYmo7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqczogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2ZW5lbWVudCA9IG5ldyBFdmVuZW1lbnQoZGF0YVtpXS5faWQsIGRhdGFbaV0ubm9FdmVuZW1lbnQsIGRhdGFbaV0ubm9tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldLmRhdGVFdmVuZW1lbnQsIGRhdGFbaV0uY29udGFjdCwgZGF0YVtpXS5jbGllbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0uc2VsZWN0RXRhdCwgZGF0YVtpXS5kYXRlU291bWlzc2lvbiwgZGF0YVtpXS5kYXRlQ29uZmlybWF0aW9uLCBkYXRhW2ldLmRhdGVGYWN0dXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXS5kYXRlTm9uUmV0ZW51LCBkYXRhW2ldLmRhdGVBbm51bGF0aW9uLCBkYXRhW2ldLm5vdGVzLCBkYXRhW2ldLnZhbGlkYXRpb25UYWNoZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXS5jcmVlclBhciwgZGF0YVtpXS5kYXRlQ3JlZSwgZGF0YVtpXS5tb2RpZlBhciwgZGF0YVtpXS5tb2RpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ianMucHVzaChldmVuZW1lbnQpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YVtpXS5jbGllbnRfRkspO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vIG1ldHRyZSBhIGpvdXIgbGUgYXJyYXkgZCdldnggZHUgc2VydmljZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVuZW1lbnRzID0gb2JqcztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXJyYXkgZHUgc2VydmljZTogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmV2ZW5lbWVudHMpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmpzO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkgfHwgJ2VycmV1ciBzZXJ2ZXVyJykpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRFdmVuZW1lbnQobm9FdmVuZW1lbnQ6IG51bWJlcik6IE9ic2VydmFibGU8RXZlbmVtZW50PntcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9ldmVuZW1lbnQvJyArIG5vRXZlbmVtZW50KVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkub2JqO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW5lbWVudCA9IG5ldyBFdmVuZW1lbnQoZGF0YS5faWQsIGRhdGEubm9FdmVuZW1lbnQsIGRhdGEubm9tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmRhdGVFdmVuZW1lbnQsIGRhdGEuY29udGFjdCwgZGF0YS5jbGllbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuc2VsZWN0RXRhdCwgZGF0YS5kYXRlU291bWlzc2lvbiwgZGF0YS5kYXRlQ29uZmlybWF0aW9uLCBkYXRhLmRhdGVGYWN0dXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5kYXRlTm9uUmV0ZW51LCBkYXRhLmRhdGVBbm51bGF0aW9uLCBkYXRhLm5vdGVzLCBkYXRhLnZhbGlkYXRpb25UYWNoZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jcmVlclBhciwgZGF0YS5kYXRlQ3JlZSwgZGF0YS5tb2RpZlBhciwgZGF0YS5tb2RpZiwgZGF0YS5jbGllbnRfRkspO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW5lbWVudDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpIHx8ICAnZXJyZXVyIHNlcnZldXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlZXJFdmVuZW1lbnQoZXZlbmVtZW50OiBFdmVuZW1lbnQpe1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShldmVuZW1lbnQpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2V2ZW5lbWVudCcgKyB0b2tlbiwgYm9keSwge2hlYWRlcnM6aGVhZGVyfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajtcclxuICAgICAgICAgICAgICAgIGxldCBldmVuZW1lbnQgPSBuZXcgRXZlbmVtZW50KGRhdGEuX2lkLCBkYXRhLm5vRXZlbmVtZW50LCBkYXRhLm5vbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5kYXRlRXZlbmVtZW50LCBkYXRhLmNvbnRhY3QsIGRhdGEuY2xpZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnNlbGVjdEV0YXQsIGRhdGEuZGF0ZVNvdW1pc3Npb24sIGRhdGEuZGF0ZUNvbmZpcm1hdGlvbiwgZGF0YS5kYXRlRmFjdHVyYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZGF0ZU5vblJldGVudSwgZGF0YS5kYXRlQW5udWxhdGlvbiwgZGF0YS5ub3RlcywgZGF0YS52YWxpZGF0aW9uVGFjaGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuY3JlZXJQYXIsIGRhdGEuZGF0ZUNyZWUsIGRhdGEubW9kaWZQYXIsIGRhdGEubW9kaWYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW5lbWVudDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpIHx8ICdlcnJldXIgc2VydmV1cicpKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVFdmVuZW1lbnQoZXZlbmVtZW50OiBFdmVuZW1lbnQpe1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShldmVuZW1lbnQpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJyA6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA6ICcnO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnB1dCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2V2ZW5lbWVudC8nICsgZXZlbmVtZW50LmV2ZW5lbWVudElkICsgdG9rZW4sIGJvZHksIHtoZWFkZXJzOmhlYWRlcn0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlIDogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpIHx8ICdlcnJldXIgc2VydmV1cicpKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVFdmVuZW1lbnQoZXZlbmVtZW50OiBFdmVuZW1lbnQpe1xyXG4gICAgICAgIHRoaXMuZXZlbmVtZW50cy5zcGxpY2UodGhpcy5ldmVuZW1lbnRzLmluZGV4T2YoZXZlbmVtZW50KSwgMSk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZGVsZXRlKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvZXZlbmVtZW50LycgKyBldmVuZW1lbnQuZXZlbmVtZW50SWQgKyB0b2tlbilcclxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb25zKCkgfHwgJ2VycmV1ciBzZXJ2ZXVyJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEV2ZW5lbWVudHNTcGVjaWFsU2VhcmNoKHRleHRTZWFyY2g6IHN0cmluZyk6IE9ic2VydmFibGU8RXZlbmVtZW50W10+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2V2ZW5lbWVudC9zZWFyY2gvJyArIHRleHRTZWFyY2gpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKS5vYmo7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqczogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2ZW5lbWVudCA9IG5ldyBFdmVuZW1lbnQoZGF0YVtpXS5faWQsIGRhdGFbaV0ubm9FdmVuZW1lbnQsIGRhdGFbaV0ubm9tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldLmRhdGVFdmVuZW1lbnQsIGRhdGFbaV0uY29udGFjdCwgZGF0YVtpXS5jbGllbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0uc2VsZWN0RXRhdCwgZGF0YVtpXS5kYXRlU291bWlzc2lvbiwgZGF0YVtpXS5kYXRlQ29uZmlybWF0aW9uLCBkYXRhW2ldLmRhdGVGYWN0dXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXS5kYXRlTm9uUmV0ZW51LCBkYXRhW2ldLmRhdGVBbm51bGF0aW9uLCBkYXRhW2ldLm5vdGVzLCBkYXRhW2ldLnZhbGlkYXRpb25UYWNoZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXS5jcmVlclBhciwgZGF0YVtpXS5kYXRlQ3JlZSwgZGF0YVtpXS5tb2RpZlBhciwgZGF0YVtpXS5tb2RpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ianMucHVzaChldmVuZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbGVzIGV2eCBmaWx0csOpczogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW5lbWVudCkpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbmVtZW50cyA9IG9ianM7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXJyYXkgZmlsdHJlciA6ICcpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ldmVuZW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmpzO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkgfHwgJ2VycmV1ciBzZXJ2ZXVyJykpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuIl19

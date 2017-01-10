"use strict";
var core_1 = require("@angular/core");
var erreur_1 = require("./erreur");
var ErreurService = (function () {
    function ErreurService() {
        this.erreurArrivee = new core_1.EventEmitter();
    }
    ErreurService.prototype.handleErreur = function (erreur) {
        var erreurData = new erreur_1.Erreur(erreur.title, erreur.error.message);
        this.erreurArrivee.emit(erreurData);
    };
    return ErreurService;
}());
exports.ErreurService = ErreurService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvZXJyZXVycy9lcnJldXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTZDO0FBQzdDLG1DQUFrQztBQUVsQztJQUFBO1FBQ0ksa0JBQWEsR0FBRyxJQUFJLG1CQUFZLEVBQVUsQ0FBQztJQU0vQyxDQUFDO0lBSkcsb0NBQVksR0FBWixVQUFhLE1BQVc7UUFDcEIsSUFBTSxVQUFVLEdBQUcsSUFBSSxlQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDTCxvQkFBQztBQUFELENBUEEsQUFPQyxJQUFBO0FBUFksc0NBQWEiLCJmaWxlIjoiZXJyZXVycy9lcnJldXIuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFcnJldXIgfSBmcm9tICcuL2VycmV1cic7XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyZXVyU2VydmljZXtcclxuICAgIGVycmV1ckFycml2ZWUgPSBuZXcgRXZlbnRFbWl0dGVyPEVycmV1cj4oKTtcclxuXHJcbiAgICBoYW5kbGVFcnJldXIoZXJyZXVyOiBhbnkpe1xyXG4gICAgICAgIGNvbnN0IGVycmV1ckRhdGEgPSBuZXcgRXJyZXVyKGVycmV1ci50aXRsZSwgZXJyZXVyLmVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuZXJyZXVyQXJyaXZlZS5lbWl0KGVycmV1ckRhdGEpO1xyXG4gICAgfVxyXG59Il19

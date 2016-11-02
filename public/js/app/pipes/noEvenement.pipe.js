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
var NoEvenementPipe = (function () {
    function NoEvenementPipe() {
    }
    NoEvenementPipe.prototype.transform = function (value, args) {
        console.log("pipe");
        console.log(args);
        var filtre;
        filtre = args ? args.toLocaleLowerCase() : null;
        console.log(args);
        return filtre ? value.filter(function (evenement) { return evenement.noEvenement.toString().toLocaleLowerCase().indexOf(filtre) > -1; }) : value;
    };
    NoEvenementPipe = __decorate([
        core_1.Pipe({
            name: 'noEvenementPipe'
        }), 
        __metadata('design:paramtypes', [])
    ], NoEvenementPipe);
    return NoEvenementPipe;
}());
exports.NoEvenementPipe = NoEvenementPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpcGVzL25vRXZlbmVtZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFvQyxlQUFlLENBQUMsQ0FBQTtBQU9wRDtJQUFBO0lBWUEsQ0FBQztJQVhHLG1DQUFTLEdBQVQsVUFBVSxLQUFrQixFQUFFLElBQVk7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksTUFBYyxDQUFDO1FBQ25CLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUN4QixVQUFDLFNBQW9CLElBQUssT0FBQSxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUF6RSxDQUF5RSxDQUNsRyxHQUFHLEtBQUssQ0FBQztJQUVsQixDQUFDO0lBZkw7UUFBQyxXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsaUJBQWlCO1NBQzFCLENBQUM7O3VCQUFBO0lBY0Ysc0JBQUM7QUFBRCxDQVpBLEFBWUMsSUFBQTtBQVpZLHVCQUFlLGtCQVkzQixDQUFBIiwiZmlsZSI6InBpcGVzL25vRXZlbmVtZW50LnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW5lbWVudCB9IGZyb20gJy4uL2V2ZW5lbWVudHMvZXZlbmVtZW50JztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdub0V2ZW5lbWVudFBpcGUnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTm9FdmVuZW1lbnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IEV2ZW5lbWVudFtdLCBhcmdzOiBzdHJpbmcpOiBFdmVuZW1lbnRbXSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwaXBlXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MpOyAgICBcclxuICAgICAgICB2YXIgZmlsdHJlOiBzdHJpbmc7IFxyXG4gICAgICAgIGZpbHRyZSA9IGFyZ3MgPyBhcmdzLnRvTG9jYWxlTG93ZXJDYXNlKCkgOiBudWxsO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MpO1xyXG4gICAgICAgIHJldHVybiBmaWx0cmUgPyB2YWx1ZS5maWx0ZXIoXHJcbiAgICAgICAgICAgIChldmVuZW1lbnQ6IEV2ZW5lbWVudCkgPT4gZXZlbmVtZW50Lm5vRXZlbmVtZW50LnRvU3RyaW5nKCkudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmRleE9mKGZpbHRyZSkgPiAtMVxyXG4gICAgICAgICAgICApIDogdmFsdWU7XHJcblxyXG4gICAgfVxyXG59Il19

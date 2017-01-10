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
var CapitalizePipe = (function () {
    function CapitalizePipe() {
        this.stringSplit = [];
        this.chaine = "";
    }
    CapitalizePipe.prototype.transform = function (value, args) {
        if (value) {
            this.stringSplit = value.split(/\s+/);
            var nouvelleChaine = "";
            for (var i in this.stringSplit) {
                console.log(i);
                this.chaine = this.stringSplit[i].charAt(0).toUpperCase() + this.stringSplit[i].substring(1).toLocaleLowerCase();
                console.log(this.chaine);
                nouvelleChaine += this.chaine + " ";
            }
            return nouvelleChaine;
        }
    };
    return CapitalizePipe;
}());
CapitalizePipe = __decorate([
    core_1.Pipe({
        name: 'capitalizePipe'
    }),
    __metadata("design:paramtypes", [])
], CapitalizePipe);
exports.CapitalizePipe = CapitalizePipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvcGlwZXMvY2FwaXRhbGl6ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0Q7QUFNcEQsSUFBYSxjQUFjO0lBSjNCO1FBS0ksZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFDM0IsV0FBTSxHQUFXLEVBQUUsQ0FBQztJQWV4QixDQUFDO0lBZEcsa0NBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxJQUFXO1FBQ2hDLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7WUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDOUIsQ0FBQztnQkFDRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDakgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLGNBQWMsSUFBSyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUMxQixDQUFDO0lBQ0wsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSxjQUFjO0lBSjFCLFdBQUksQ0FBQztRQUNGLElBQUksRUFBRSxnQkFBZ0I7S0FDekIsQ0FBQzs7R0FFVyxjQUFjLENBaUIxQjtBQWpCWSx3Q0FBYyIsImZpbGUiOiJwaXBlcy9jYXBpdGFsaXplLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnY2FwaXRhbGl6ZVBpcGUnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FwaXRhbGl6ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHN0cmluZ1NwbGl0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgY2hhaW5lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogYW55IHsgXHJcbiAgICAgICAgaWYodmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLnN0cmluZ1NwbGl0ID0gdmFsdWUuc3BsaXQoL1xccysvKTtcclxuICAgICAgICAgICAgdmFyIG5vdXZlbGxlQ2hhaW5lID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yKGxldCBpIGluIHRoaXMuc3RyaW5nU3BsaXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFpbmUgPSB0aGlzLnN0cmluZ1NwbGl0W2ldLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5zdHJpbmdTcGxpdFtpXS5zdWJzdHJpbmcoMSkudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hhaW5lKTtcclxuICAgICAgICAgICAgICAgIG5vdXZlbGxlQ2hhaW5lICArPSB0aGlzLmNoYWluZSArIFwiIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub3V2ZWxsZUNoYWluZTtcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG59Il19

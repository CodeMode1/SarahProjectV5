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
    return NoEvenementPipe;
}());
NoEvenementPipe = __decorate([
    core_1.Pipe({
        name: 'noEvenementPipe'
    }),
    __metadata("design:paramtypes", [])
], NoEvenementPipe);
exports.NoEvenementPipe = NoEvenementPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvcGlwZXMvbm9FdmVuZW1lbnQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQW9EO0FBT3BELElBQWEsZUFBZTtJQUE1QjtJQVlBLENBQUM7SUFYRyxtQ0FBUyxHQUFULFVBQVUsS0FBa0IsRUFBRSxJQUFZO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLE1BQWMsQ0FBQztRQUNuQixNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FDeEIsVUFBQyxTQUFvQixJQUFLLE9BQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBekUsQ0FBeUUsQ0FDbEcsR0FBRyxLQUFLLENBQUM7SUFFbEIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FaQSxBQVlDLElBQUE7QUFaWSxlQUFlO0lBSjNCLFdBQUksQ0FBQztRQUNGLElBQUksRUFBRSxpQkFBaUI7S0FDMUIsQ0FBQzs7R0FFVyxlQUFlLENBWTNCO0FBWlksMENBQWUiLCJmaWxlIjoicGlwZXMvbm9FdmVuZW1lbnQucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbmVtZW50IH0gZnJvbSAnLi4vZXZlbmVtZW50cy9ldmVuZW1lbnQnO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ25vRXZlbmVtZW50UGlwZSdcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBOb0V2ZW5lbWVudFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSh2YWx1ZTogRXZlbmVtZW50W10sIGFyZ3M6IHN0cmluZyk6IEV2ZW5lbWVudFtdIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBpcGVcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJncyk7ICAgIFxyXG4gICAgICAgIHZhciBmaWx0cmU6IHN0cmluZzsgXHJcbiAgICAgICAgZmlsdHJlID0gYXJncyA/IGFyZ3MudG9Mb2NhbGVMb3dlckNhc2UoKSA6IG51bGw7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJncyk7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRyZSA/IHZhbHVlLmZpbHRlcihcclxuICAgICAgICAgICAgKGV2ZW5lbWVudDogRXZlbmVtZW50KSA9PiBldmVuZW1lbnQubm9FdmVuZW1lbnQudG9TdHJpbmcoKS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdHJlKSA+IC0xXHJcbiAgICAgICAgICAgICkgOiB2YWx1ZTtcclxuXHJcbiAgICB9XHJcbn0iXX0=

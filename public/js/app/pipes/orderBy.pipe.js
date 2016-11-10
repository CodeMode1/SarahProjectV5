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
var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (activites, dateDebut) {
        activites.sort(function (a, b) {
            if (a[dateDebut] < b[dateDebut]) {
                return 1;
            }
            else if (a[dateDebut] > b[dateDebut]) {
                return -1;
            }
            else {
                return 0;
            }
        });
        return activites;
    };
    OrderByPipe = __decorate([
        core_1.Pipe({
            name: 'orderByPipe',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], OrderByPipe);
    return OrderByPipe;
}());
exports.OrderByPipe = OrderByPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpcGVzL29yZGVyQnkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQW9DLGVBQWUsQ0FBQyxDQUFBO0FBU3BEO0lBQUE7SUFhQSxDQUFDO0lBWkcsK0JBQVMsR0FBVCxVQUFXLFNBQXFCLEVBQUUsU0FBaUI7UUFDL0MsU0FBUyxDQUFDLElBQUksQ0FBRSxVQUFXLENBQUMsRUFBRSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFFLENBQUMsQ0FBQSxDQUFDO2dCQUMvQixNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBRSxDQUFDLENBQUEsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsQ0FBQztZQUFDLElBQUksQ0FBQSxDQUFDO2dCQUNILE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFsQkw7UUFBQyxXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsYUFBYTtZQUNuQixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUM7O21CQUFBO0lBZ0JGLGtCQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSxtQkFBVyxjQWF2QixDQUFBIiwiZmlsZSI6InBpcGVzL29yZGVyQnkucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZpdGUgfSBmcm9tICcuLi9hY3Rpdml0ZXMvYWN0aXZpdGUnO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ29yZGVyQnlQaXBlJyxcclxuICAgIHB1cmU6IGZhbHNlXHJcbn0pXHJcblxyXG4vL3BpcGUgcXVpIG9yZHJlIERFU0MgcGFyIGxhIGRhdGUgZMOpYnV0LlxyXG5leHBvcnQgY2xhc3MgT3JkZXJCeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSggYWN0aXZpdGVzOiBBY3Rpdml0ZVtdLCBkYXRlRGVidXQ6IHN0cmluZyk6IEFjdGl2aXRlW10ge1xyXG4gICAgICAgIGFjdGl2aXRlcy5zb3J0KCBmdW5jdGlvbiAoIGEsIGIgKXtcclxuICAgICAgICAgICAgaWYgKCBhW2RhdGVEZWJ1dF0gPCBiW2RhdGVEZWJ1dF0gKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBhW2RhdGVEZWJ1dF0gPiBiW2RhdGVEZWJ1dF0gKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZpdGVzO1xyXG4gICAgfVxyXG59Il19

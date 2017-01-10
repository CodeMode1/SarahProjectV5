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
var OrderByPipe = (function () {
    // Pipe qui ordre DESC par la date début.
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
    return OrderByPipe;
}());
OrderByPipe = __decorate([
    core_1.Pipe({
        name: 'orderByPipe',
        pure: false
    }),
    __metadata("design:paramtypes", [])
], OrderByPipe);
exports.OrderByPipe = OrderByPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvcGlwZXMvb3JkZXJCeS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0Q7QUFTcEQsSUFBYSxXQUFXO0lBRHhCLHlDQUF5QztJQUN6QztJQWFBLENBQUM7SUFaRywrQkFBUyxHQUFULFVBQVcsU0FBcUIsRUFBRSxTQUFpQjtRQUMvQyxTQUFTLENBQUMsSUFBSSxDQUFFLFVBQVcsQ0FBQyxFQUFFLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUUsQ0FBQyxDQUFBLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFFLENBQUMsQ0FBQSxDQUFDO2dCQUN0QyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFBLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSxXQUFXO0lBTnZCLFdBQUksQ0FBQztRQUNGLElBQUksRUFBRSxhQUFhO1FBQ25CLElBQUksRUFBRSxLQUFLO0tBQ2QsQ0FBQzs7R0FHVyxXQUFXLENBYXZCO0FBYlksa0NBQVciLCJmaWxlIjoicGlwZXMvb3JkZXJCeS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3Rpdml0ZSB9IGZyb20gJy4uL2FjdGl2aXRlcy9hY3Rpdml0ZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnb3JkZXJCeVBpcGUnLFxyXG4gICAgcHVyZTogZmFsc2VcclxufSlcclxuXHJcbi8vIFBpcGUgcXVpIG9yZHJlIERFU0MgcGFyIGxhIGRhdGUgZMOpYnV0LlxyXG5leHBvcnQgY2xhc3MgT3JkZXJCeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSggYWN0aXZpdGVzOiBBY3Rpdml0ZVtdLCBkYXRlRGVidXQ6IHN0cmluZyk6IEFjdGl2aXRlW10ge1xyXG4gICAgICAgIGFjdGl2aXRlcy5zb3J0KCBmdW5jdGlvbiAoIGEsIGIgKXtcclxuICAgICAgICAgICAgaWYgKCBhW2RhdGVEZWJ1dF0gPCBiW2RhdGVEZWJ1dF0gKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBhW2RhdGVEZWJ1dF0gPiBiW2RhdGVEZWJ1dF0gKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZpdGVzO1xyXG4gICAgfVxyXG59Il19

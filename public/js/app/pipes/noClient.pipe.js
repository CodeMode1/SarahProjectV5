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
var NoClientPipe = (function () {
    function NoClientPipe() {
    }
    NoClientPipe.prototype.transform = function (value, args) {
        console.log("pipe");
        console.log(args);
        var filtre;
        filtre = args ? args.toLocaleLowerCase() : null;
        console.log(args);
        return filtre ? value.filter(function (client) { return client.noClient.toString().toLocaleLowerCase().indexOf(filtre) > -1; }) : value;
    };
    return NoClientPipe;
}());
NoClientPipe = __decorate([
    core_1.Pipe({
        name: 'noClientPipe'
    }),
    __metadata("design:paramtypes", [])
], NoClientPipe);
exports.NoClientPipe = NoClientPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvcGlwZXMvbm9DbGllbnQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQW9EO0FBT3BELElBQWEsWUFBWTtJQUF6QjtJQVlBLENBQUM7SUFYRyxnQ0FBUyxHQUFULFVBQVUsS0FBZSxFQUFFLElBQVk7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksTUFBYyxDQUFDO1FBQ25CLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUN4QixVQUFDLE1BQWMsSUFBSyxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQW5FLENBQW1FLENBQ3RGLEdBQUcsS0FBSyxDQUFDO0lBRWxCLENBQUM7SUFDTCxtQkFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBWlksWUFBWTtJQUp4QixXQUFJLENBQUM7UUFDRixJQUFJLEVBQUUsY0FBYztLQUN2QixDQUFDOztHQUVXLFlBQVksQ0FZeEI7QUFaWSxvQ0FBWSIsImZpbGUiOiJwaXBlcy9ub0NsaWVudC5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICcuLi9jbGllbnRzL2NsaWVudCc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnbm9DbGllbnRQaXBlJ1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vQ2xpZW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBDbGllbnRbXSwgYXJnczogc3RyaW5nKTogQ2xpZW50W10ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGlwZVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcmdzKTsgICAgXHJcbiAgICAgICAgdmFyIGZpbHRyZTogc3RyaW5nOyBcclxuICAgICAgICBmaWx0cmUgPSBhcmdzID8gYXJncy50b0xvY2FsZUxvd2VyQ2FzZSgpIDogbnVsbDtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcmdzKTtcclxuICAgICAgICByZXR1cm4gZmlsdHJlID8gdmFsdWUuZmlsdGVyKFxyXG4gICAgICAgICAgICAoY2xpZW50OiBDbGllbnQpID0+IGNsaWVudC5ub0NsaWVudC50b1N0cmluZygpLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0cmUpID4gLTFcclxuICAgICAgICAgICAgKSA6IHZhbHVlO1xyXG5cclxuICAgIH1cclxufSJdfQ==

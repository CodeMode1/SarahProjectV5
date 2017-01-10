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
var SpinnerComponent = (function () {
    function SpinnerComponent() {
        this.requete = false;
    }
    SpinnerComponent.prototype.ngOnInit = function () { };
    SpinnerComponent.prototype.ngOnChanges = function (changes) {
        console.log("changes" + changes.estRunning.currentValue);
        if (changes.estRunning.currentValue === true) {
            console.log("requete true");
            this.requete = true;
        }
        else {
            this.requete = false;
        }
    };
    return SpinnerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SpinnerComponent.prototype, "estRunning", void 0);
SpinnerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'mon-spinner',
        templateUrl: 'spinner.component.html',
        styles: ["\n        .spinner {\n            width: 40px;\n            height: 40px;\n            position: relative;\n            margin: 100px auto;\n        }\n        \n        .double-bounce1, .double-bounce2 {\n            width: 100%;\n            height: 100%;\n            border-radius: 50%;\n            background-color: #333;\n            opacity: 0.6;\n            position: absolute;\n            top: 0;\n            left: 0;   \n            -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n            animation: sk-bounce 2.0s infinite ease-in-out;\n        }\n        \n        .double-bounce2 {\n            -webkit-animation-delay: -1.0s;\n            animation-delay: -1.0s;\n        }\n        \n        @-webkit-keyframes sk-bounce {\n            0%, 100% { -webkit-transform: scale(0.0) }\n            50% { -webkit-transform: scale(1.0) }\n        }\n        \n        @keyframes sk-bounce {\n            0%, 100% {\n                transform: scale(0.0);\n                -webkit-transform: scale(0.0);\n            } 50% {\n                transform: scale(1.0);\n                -webkit-transform: scale(1.0);\n            }\n        }\n            \n            "]
    }),
    __metadata("design:paramtypes", [])
], SpinnerComponent);
exports.SpinnerComponent = SpinnerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvc3Bpbm5lci9zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBaURwRSxJQUFhLGdCQUFnQjtJQUl6QjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxtQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLHNDQUFXLEdBQVgsVUFBWSxPQUFZO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUEsQ0FBQztZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBakJZO0lBQVIsWUFBSyxFQUFFOztvREFBWTtBQUZYLGdCQUFnQjtJQS9DNUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLE1BQU0sRUFBRSxDQUFDLHVxQ0F5Q0EsQ0FBQztLQUNiLENBQUM7O0dBQ1csZ0JBQWdCLENBbUI1QjtBQW5CWSw0Q0FBZ0IiLCJmaWxlIjoic3Bpbm5lci9zcGlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ21vbi1zcGlubmVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLnNwaW5uZXIge1xyXG4gICAgICAgICAgICB3aWR0aDogNDBweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMTAwcHggYXV0bztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLmRvdWJsZS1ib3VuY2UxLCAuZG91YmxlLWJvdW5jZTIge1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNjtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICAgIGxlZnQ6IDA7ICAgXHJcbiAgICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1ib3VuY2UgMi4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiBzay1ib3VuY2UgMi4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLmRvdWJsZS1ib3VuY2UyIHtcclxuICAgICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stYm91bmNlIHtcclxuICAgICAgICAgICAgMCUsIDEwMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKSB9XHJcbiAgICAgICAgICAgIDUwJSB7IC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgQGtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAgICAgICAwJSwgMTAwJSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgICAgICAgfSA1MCUge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Bpbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICByZXF1ZXRlOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgZXN0UnVubmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgdGhpcy5yZXF1ZXRlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlc1wiICsgY2hhbmdlcy5lc3RSdW5uaW5nLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgaWYoY2hhbmdlcy5lc3RSdW5uaW5nLmN1cnJlbnRWYWx1ZSA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVxdWV0ZSB0cnVlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVldGUgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVldGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=

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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpinnerComponent.prototype, "estRunning", void 0);
    SpinnerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mon-spinner',
            templateUrl: 'spinner.component.html',
            styles: ["\n        .spinner {\n            width: 40px;\n            height: 40px;\n            position: relative;\n            margin: 100px auto;\n        }\n        \n        .double-bounce1, .double-bounce2 {\n            width: 100%;\n            height: 100%;\n            border-radius: 50%;\n            background-color: #333;\n            opacity: 0.6;\n            position: absolute;\n            top: 0;\n            left: 0;   \n            -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n            animation: sk-bounce 2.0s infinite ease-in-out;\n        }\n        \n        .double-bounce2 {\n            -webkit-animation-delay: -1.0s;\n            animation-delay: -1.0s;\n        }\n        \n        @-webkit-keyframes sk-bounce {\n            0%, 100% { -webkit-transform: scale(0.0) }\n            50% { -webkit-transform: scale(1.0) }\n        }\n        \n        @keyframes sk-bounce {\n            0%, 100% {\n                transform: scale(0.0);\n                -webkit-transform: scale(0.0);\n            } 50% {\n                transform: scale(1.0);\n                -webkit-transform: scale(1.0);\n            }\n        }\n            \n            "]
        }), 
        __metadata('design:paramtypes', [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFvRCxlQUFlLENBQUMsQ0FBQTtBQWlEcEU7SUFJSTtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxtQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLHNDQUFXLEdBQVgsVUFBWSxPQUFZO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUEsQ0FBQztZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBaEJEO1FBQUMsWUFBSyxFQUFFOzt3REFBQTtJQWpEWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxNQUFNLEVBQUUsQ0FBQyx1cUNBeUNBLENBQUM7U0FDYixDQUFDOzt3QkFBQTtJQW9CRix1QkFBQztBQUFELENBbkJBLEFBbUJDLElBQUE7QUFuQlksd0JBQWdCLG1CQW1CNUIsQ0FBQSIsImZpbGUiOiJzcGlubmVyL3NwaW5uZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbW9uLXNwaW5uZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdzcGlubmVyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuc3Bpbm5lciB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgbWFyZ2luOiAxMDBweCBhdXRvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAuZG91YmxlLWJvdW5jZTEsIC5kb3VibGUtYm91bmNlMiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgICAgICAgICAgb3BhY2l0eTogMC42O1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgICAgbGVmdDogMDsgICBcclxuICAgICAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgICBhbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAuZG91YmxlLWJvdW5jZTIge1xyXG4gICAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAgICAgICAwJSwgMTAwJSB7IC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjApIH1cclxuICAgICAgICAgICAgNTAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCkgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBAa2V5ZnJhbWVzIHNrLWJvdW5jZSB7XHJcbiAgICAgICAgICAgIDAlLCAxMDAlIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICAgICAgICB9IDUwJSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHJlcXVldGU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBlc3RSdW5uaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuICAgICAgICB0aGlzLnJlcXVldGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2VzXCIgKyBjaGFuZ2VzLmVzdFJ1bm5pbmcuY3VycmVudFZhbHVlKTtcclxuICAgICAgICBpZihjaGFuZ2VzLmVzdFJ1bm5pbmcuY3VycmVudFZhbHVlID09PSB0cnVlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXF1ZXRlIHRydWVcIik7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWV0ZSA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==

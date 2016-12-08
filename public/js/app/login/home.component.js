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
var HomeComponent = (function () {
    function HomeComponent() {
        this.titre = "Système Abordable de Réservation et Agenda";
        this.nouvelles = "Nouvelles";
        this.estNouvelles = false;
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.showNouvelles = function () {
        this.estNouvelles = !this.estNouvelles;
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-home',
            template: "\n        <div class=\"jumbotron col-md-12\">\n            <h2>{{titre}}</h2>\n            <p><a class=\"btn btn-primary btn-lg\" role=\"button\" (click)=\"showNouvelles()\" >Nouvelles</a></p>\n        </div>\n        <section class=\"row col-md-12 icons\">\n            <div class=\"container col-md-4 icon\">\n                <span class=\"glyphicon glyphicon-calendar\" aria-hidden=\"true\"></span>\n            </div>\n            <div class=\"container col-md-4 icon\">\n                <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\n            </div>\n            <div class=\"container col-md-4 icon\">\n                <span class=\"glyphicon glyphicon-list-alt\" aria-hidden=\"true\"></span>\n            </div>\n        </section>\n        <article id=\"nouvelles\" class=\"jumbotron col-md-12\">\n            <h3>{{nouvelles}}</h3>\n            <my-nouvelles *ngIf=\"this.estNouvelles\" ></my-nouvelles>\n        </article>\n    ",
            styles: ["\n        *{\n            margin:0;\n        }\n\n        h2, h3{\n            padding: 2% 0 2% 0;\n        }\n\n        .jumbotron{\n            clear:both;\n            float:left;\n            width:100%;\n        }\n\n        .container{\n            margin:0;\n            text-align:center;\n            padding:2% 0 2% 0;\n            background-color: #A2B5CD;\n            width:100%;\n        }\n\n        .glyphicon{\n            font-size:2vw;\n        }\n\n        .row{\n            padding:0;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUEyRGxEO0lBSUk7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLDRDQUE0QyxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLHFDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQyxDQUFDO0lBdEVMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsdThCQW9CVDtZQUNELE1BQU0sRUFBRSxDQUFDLDhnQkE4QlIsQ0FBQztTQUNMLENBQUM7O3FCQUFBO0lBZ0JGLG9CQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSxxQkFBYSxnQkFlekIsQ0FBQSIsImZpbGUiOiJsb2dpbi9ob21lLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1ob21lJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImp1bWJvdHJvbiBjb2wtbWQtMTJcIj5cclxuICAgICAgICAgICAgPGgyPnt7dGl0cmV9fTwvaDI+XHJcbiAgICAgICAgICAgIDxwPjxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1sZ1wiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwic2hvd05vdXZlbGxlcygpXCIgPk5vdXZlbGxlczwvYT48L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJyb3cgY29sLW1kLTEyIGljb25zXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgY29sLW1kLTQgaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNhbGVuZGFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBjb2wtbWQtNCBpY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXNlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgY29sLW1kLTQgaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWxpc3QtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPGFydGljbGUgaWQ9XCJub3V2ZWxsZXNcIiBjbGFzcz1cImp1bWJvdHJvbiBjb2wtbWQtMTJcIj5cclxuICAgICAgICAgICAgPGgzPnt7bm91dmVsbGVzfX08L2gzPlxyXG4gICAgICAgICAgICA8bXktbm91dmVsbGVzICpuZ0lmPVwidGhpcy5lc3ROb3V2ZWxsZXNcIiA+PC9teS1ub3V2ZWxsZXM+XHJcbiAgICAgICAgPC9hcnRpY2xlPlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAqe1xyXG4gICAgICAgICAgICBtYXJnaW46MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGgyLCBoM3tcclxuICAgICAgICAgICAgcGFkZGluZzogMiUgMCAyJSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmp1bWJvdHJvbntcclxuICAgICAgICAgICAgY2xlYXI6Ym90aDtcclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgICAgd2lkdGg6MTAwJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5jb250YWluZXJ7XHJcbiAgICAgICAgICAgIG1hcmdpbjowO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICAgICAgcGFkZGluZzoyJSAwIDIlIDA7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNBMkI1Q0Q7XHJcbiAgICAgICAgICAgIHdpZHRoOjEwMCU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZ2x5cGhpY29ue1xyXG4gICAgICAgICAgICBmb250LXNpemU6MnZ3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnJvd3tcclxuICAgICAgICAgICAgcGFkZGluZzowO1xyXG4gICAgICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHRpdHJlOiBzdHJpbmc7XHJcbiAgICBub3V2ZWxsZXM6IHN0cmluZztcclxuICAgIGVzdE5vdXZlbGxlczogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuICAgICAgICB0aGlzLnRpdHJlID0gXCJTeXN0w6htZSBBYm9yZGFibGUgZGUgUsOpc2VydmF0aW9uIGV0IEFnZW5kYVwiO1xyXG4gICAgICAgIHRoaXMubm91dmVsbGVzID0gXCJOb3V2ZWxsZXNcIjtcclxuICAgICAgICB0aGlzLmVzdE5vdXZlbGxlcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyB9XHJcblxyXG4gICAgc2hvd05vdXZlbGxlcygpe1xyXG4gICAgICAgIHRoaXMuZXN0Tm91dmVsbGVzID0gIXRoaXMuZXN0Tm91dmVsbGVzO1xyXG4gICAgfVxyXG59Il19

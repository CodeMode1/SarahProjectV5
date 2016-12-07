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
            template: "\n        <div class=\"jumbotron col-md-12\">\n            <h2>{{titre}}</h2>\n            <p><a class=\"btn btn-primary btn-lg\" role=\"button\" (click)=\"showNouvelles()\">Nouvelles</a></p>\n        </div>\n        <section class=\"row col-md-12 icons\">\n            <div class=\"container col-md-4 icon\">\n                <span class=\"glyphicon glyphicon-calendar\" aria-hidden=\"true\"></span>\n            </div>\n            <div class=\"container col-md-4 icon\">\n                <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\n            </div>\n            <div class=\"container col-md-4 icon\">\n                <span class=\"glyphicon glyphicon-list-alt\" aria-hidden=\"true\"></span>\n            </div>\n        </section>\n        <article id=\"nouvelles\" class=\"jumbotron col-md-12\">\n            <h3>{{nouvelles}}</h3>\n            <my-nouvelles *ngIf=\"this.estNouvelles\" ></my-nouvelles>\n        </article>\n    ",
            styles: ["\n        *{\n            margin:0;\n        }\n\n        h2, h3{\n            padding: 2% 0 2% 0;\n        }\n\n        .jumbotron{\n            clear:both;\n            float:left;\n            width:100%;\n        }\n\n        .container{\n            margin:0;\n            text-align:center;\n            padding:2% 0 2% 0;\n            background-color: #A2B5CD;\n            width:100%;\n        }\n\n        .glyphicon{\n            font-size:2vw;\n        }\n\n        .row{\n            padding:0;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUEyRGxEO0lBSUk7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLDRDQUE0QyxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLHFDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQyxDQUFDO0lBdEVMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsczhCQW9CVDtZQUNELE1BQU0sRUFBRSxDQUFDLDhnQkE4QlIsQ0FBQztTQUNMLENBQUM7O3FCQUFBO0lBZ0JGLG9CQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSxxQkFBYSxnQkFlekIsQ0FBQSIsImZpbGUiOiJsb2dpbi9ob21lLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdteS1ob21lJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImp1bWJvdHJvbiBjb2wtbWQtMTJcIj5cclxuICAgICAgICAgICAgPGgyPnt7dGl0cmV9fTwvaDI+XHJcbiAgICAgICAgICAgIDxwPjxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1sZ1wiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwic2hvd05vdXZlbGxlcygpXCI+Tm91dmVsbGVzPC9hPjwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInJvdyBjb2wtbWQtMTIgaWNvbnNcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBjb2wtbWQtNCBpY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2FsZW5kYXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGNvbC1tZC00IGljb25cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBjb2wtbWQtNCBpY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbGlzdC1hbHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8YXJ0aWNsZSBpZD1cIm5vdXZlbGxlc1wiIGNsYXNzPVwianVtYm90cm9uIGNvbC1tZC0xMlwiPlxyXG4gICAgICAgICAgICA8aDM+e3tub3V2ZWxsZXN9fTwvaDM+XHJcbiAgICAgICAgICAgIDxteS1ub3V2ZWxsZXMgKm5nSWY9XCJ0aGlzLmVzdE5vdXZlbGxlc1wiID48L215LW5vdXZlbGxlcz5cclxuICAgICAgICA8L2FydGljbGU+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgICp7XHJcbiAgICAgICAgICAgIG1hcmdpbjowO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaDIsIGgze1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAyJSAwIDIlIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuanVtYm90cm9ue1xyXG4gICAgICAgICAgICBjbGVhcjpib3RoO1xyXG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgICAgICAgICB3aWR0aDoxMDAlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNvbnRhaW5lcntcclxuICAgICAgICAgICAgbWFyZ2luOjA7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgICAgICBwYWRkaW5nOjIlIDAgMiUgMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0EyQjVDRDtcclxuICAgICAgICAgICAgd2lkdGg6MTAwJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5nbHlwaGljb257XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZToydnc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAucm93e1xyXG4gICAgICAgICAgICBwYWRkaW5nOjA7XHJcbiAgICAgICAgfVxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdGl0cmU6IHN0cmluZztcclxuICAgIG5vdXZlbGxlczogc3RyaW5nO1xyXG4gICAgZXN0Tm91dmVsbGVzOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoKSB7IFxyXG4gICAgICAgIHRoaXMudGl0cmUgPSBcIlN5c3TDqG1lIEFib3JkYWJsZSBkZSBSw6lzZXJ2YXRpb24gZXQgQWdlbmRhXCI7XHJcbiAgICAgICAgdGhpcy5ub3V2ZWxsZXMgPSBcIk5vdXZlbGxlc1wiO1xyXG4gICAgICAgIHRoaXMuZXN0Tm91dmVsbGVzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IH1cclxuXHJcbiAgICBzaG93Tm91dmVsbGVzKCl7XHJcbiAgICAgICAgdGhpcy5lc3ROb3V2ZWxsZXMgPSAhdGhpcy5lc3ROb3V2ZWxsZXM7XHJcbiAgICB9XHJcbn0iXX0=

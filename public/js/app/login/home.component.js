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
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-home',
        template: "\n        <div class=\"jumbotron col-md-12\">\n            <h2>{{titre}}</h2>\n            <p><a class=\"btn btn-primary btn-lg\" role=\"button\" (click)=\"showNouvelles()\" >Nouvelles</a></p>\n        </div>\n        <section class=\"row col-md-12 icons\">\n            <div class=\"container col-md-4 icon\">\n                <span class=\"glyphicon glyphicon-calendar\" aria-hidden=\"true\"></span>\n            </div>\n            <div class=\"container col-md-4 icon\">\n                <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\n            </div>\n            <div class=\"container col-md-4 icon\">\n                <span class=\"glyphicon glyphicon-list-alt\" aria-hidden=\"true\"></span>\n            </div>\n        </section>\n        <article id=\"nouvelles\" class=\"jumbotron col-md-12\">\n            <h3>{{nouvelles}}</h3>\n            <my-nouvelles *ngIf=\"this.estNouvelles\" ></my-nouvelles>\n        </article>\n    ",
        styles: ["\n        *{\n            margin:0;\n        }\n\n        h2, h3{\n            padding: 2% 0 2% 0;\n        }\n\n        .jumbotron{\n            clear:both;\n            float:left;\n            width:100%;\n        }\n\n        .container{\n            margin:0;\n            text-align:center;\n            padding:2% 0 2% 0;\n            background-color: #A2B5CD;\n            width:100%;\n        }\n\n        .glyphicon{\n            font-size:2vw;\n        }\n\n        .row{\n            padding:0;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvbG9naW4vaG9tZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQTJEbEQsSUFBYSxhQUFhO0lBSXRCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyw0Q0FBNEMsQ0FBQztRQUMxRCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsZ0NBQVEsR0FBUixjQUFhLENBQUM7SUFFZCxxQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0MsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSxhQUFhO0lBeER6QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFFBQVEsRUFBRSx1OEJBb0JUO1FBQ0QsTUFBTSxFQUFFLENBQUMsOGdCQThCUixDQUFDO0tBQ0wsQ0FBQzs7R0FDVyxhQUFhLENBZXpCO0FBZlksc0NBQWEiLCJmaWxlIjoibG9naW4vaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnbXktaG9tZScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJqdW1ib3Ryb24gY29sLW1kLTEyXCI+XHJcbiAgICAgICAgICAgIDxoMj57e3RpdHJlfX08L2gyPlxyXG4gICAgICAgICAgICA8cD48YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInNob3dOb3V2ZWxsZXMoKVwiID5Ob3V2ZWxsZXM8L2E+PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicm93IGNvbC1tZC0xMiBpY29uc1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGNvbC1tZC00IGljb25cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jYWxlbmRhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgY29sLW1kLTQgaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGNvbC1tZC00IGljb25cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1saXN0LWFsdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDxhcnRpY2xlIGlkPVwibm91dmVsbGVzXCIgY2xhc3M9XCJqdW1ib3Ryb24gY29sLW1kLTEyXCI+XHJcbiAgICAgICAgICAgIDxoMz57e25vdXZlbGxlc319PC9oMz5cclxuICAgICAgICAgICAgPG15LW5vdXZlbGxlcyAqbmdJZj1cInRoaXMuZXN0Tm91dmVsbGVzXCIgPjwvbXktbm91dmVsbGVzPlxyXG4gICAgICAgIDwvYXJ0aWNsZT5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgKntcclxuICAgICAgICAgICAgbWFyZ2luOjA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoMiwgaDN7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIlIDAgMiUgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5qdW1ib3Ryb257XHJcbiAgICAgICAgICAgIGNsZWFyOmJvdGg7XHJcbiAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgIHdpZHRoOjEwMCU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuY29udGFpbmVye1xyXG4gICAgICAgICAgICBtYXJnaW46MDtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6MiUgMCAyJSAwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQTJCNUNEO1xyXG4gICAgICAgICAgICB3aWR0aDoxMDAlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmdseXBoaWNvbntcclxuICAgICAgICAgICAgZm9udC1zaXplOjJ2dztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5yb3d7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6MDtcclxuICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB0aXRyZTogc3RyaW5nO1xyXG4gICAgbm91dmVsbGVzOiBzdHJpbmc7XHJcbiAgICBlc3ROb3V2ZWxsZXM6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgdGhpcy50aXRyZSA9IFwiU3lzdMOobWUgQWJvcmRhYmxlIGRlIFLDqXNlcnZhdGlvbiBldCBBZ2VuZGFcIjtcclxuICAgICAgICB0aGlzLm5vdXZlbGxlcyA9IFwiTm91dmVsbGVzXCI7XHJcbiAgICAgICAgdGhpcy5lc3ROb3V2ZWxsZXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICAgIHNob3dOb3V2ZWxsZXMoKXtcclxuICAgICAgICB0aGlzLmVzdE5vdXZlbGxlcyA9ICF0aGlzLmVzdE5vdXZlbGxlcztcclxuICAgIH1cclxufSJdfQ==

import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'mon-spinner',
    templateUrl: 'spinner.component.html',
    styles: [`
        .spinner {
            width: 40px;
            height: 40px;
            position: relative;
            margin: 100px auto;
        }
        
        .double-bounce1, .double-bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #333;
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;   
            -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
            animation: sk-bounce 2.0s infinite ease-in-out;
        }
        
        .double-bounce2 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }
        
        @-webkit-keyframes sk-bounce {
            0%, 100% { -webkit-transform: scale(0.0) }
            50% { -webkit-transform: scale(1.0) }
        }
        
        @keyframes sk-bounce {
            0%, 100% {
                transform: scale(0.0);
                -webkit-transform: scale(0.0);
            } 50% {
                transform: scale(1.0);
                -webkit-transform: scale(1.0);
            }
        }
            
            `]
})
export class SpinnerComponent implements OnInit {
    requete: boolean;
    @Input() estRunning;

    constructor() { 
        this.requete = false;
    }

    ngOnInit() { }

    ngOnChanges(changes: any){
        console.log("changes" + changes.estRunning.currentValue);
        if(changes.estRunning.currentValue === true){
            console.log("requete true");
            this.requete = true;
        }else{
            this.requete = false;
        }
    }
}
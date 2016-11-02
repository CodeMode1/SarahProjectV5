import { Pipe, PipeTransform } from '@angular/core';
import { Evenement } from '../evenements/evenement';

@Pipe({
    name: 'noEvenementPipe'
})

export class NoEvenementPipe implements PipeTransform {
    transform(value: Evenement[], args: string): Evenement[] {
        console.log("pipe");
        console.log(args);    
        var filtre: string; 
        filtre = args ? args.toLocaleLowerCase() : null;
        console.log(args);
        return filtre ? value.filter(
            (evenement: Evenement) => evenement.noEvenement.toString().toLocaleLowerCase().indexOf(filtre) > -1
            ) : value;

    }
}
import { Pipe, PipeTransform } from '@angular/core';
import { Activite } from '../activites/activite';

@Pipe({
    name: 'orderByPipe',
    pure: false
})

//pipe qui ordre DESC par la date début.
export class OrderByPipe implements PipeTransform {
    transform( activites: Activite[], dateDebut: string): Activite[] {
        activites.sort( function ( a, b ){
            if ( a[dateDebut] < b[dateDebut] ){
                return 1;
            } else if ( a[dateDebut] > b[dateDebut] ){
                return -1;
            } else{
                return 0;
            }
        });
        return activites;
    }
}
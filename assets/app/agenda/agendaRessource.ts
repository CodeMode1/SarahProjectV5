export class agendaRessource{
    text: string;
    value: string;
    color: string;

    constructor(text?: string, value?: string, color?: string){
        this.text = text;
        this.value = value;
        this.color = color;
    }
}
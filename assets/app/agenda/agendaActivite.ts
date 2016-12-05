export class agendaActivite{
    taskId: string;
    title: string;
    start: Date;
    end: Date;
    startTimezone: string;
    endTimezone: string;
    description: string;
    ownerId: string;
    isAllDay: boolean;

    constructor(taskId?: string, title?: string, start?: Date, end?: Date,
        startTimezone?: string, endTimezone?: string, description?: string,
        ownerId?: string, isAllDay?: boolean)
    {
            this.taskId = taskId;
            this.title = title;
            this.start = start;
            this.end = end;
            this.startTimezone = startTimezone;
            this.endTimezone = endTimezone;
            this.description = description;
            this.ownerId = ownerId;
            this.isAllDay = isAllDay;
    }
}
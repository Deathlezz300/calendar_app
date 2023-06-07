import {parseISO} from 'date-fns'

export const ConvertEventsToDateEvents=(eventos=[])=>{
    return eventos.map(evento=>{
        return {
            ...evento,
            start:parseISO(evento.start),
            end:parseISO(evento.end)
        }
    });
}
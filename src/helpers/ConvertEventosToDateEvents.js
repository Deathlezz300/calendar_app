export const ConvertEventsToDateEvents=(eventos=[])=>{
    return eventos.map(evento=>{
        return {
            ...evento,
            start:new Date(evento.start),
            end:new Date(evento.end)
        }
    });
}
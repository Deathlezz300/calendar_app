export const events=[
    {
        id:'1',
        start:new Date('2022-10-21 13:00:00'),
        end:new Date('2022-10-21 15:00:00'),
        title:'Cumpleaños de alguien',
        notes:'Alguna cosa'
    },
    {
        id:'2',
        start:new Date('2022-10-09 13:00:00'),
        end:new Date('2022-10-09 15:00:00'),
        title:'Cumpleaños de el reloj',
        notes:'Ninguna cosa'
    }
];

export const CalendarInitialState={
    statusLoading:null,
    eventos:[],
    activeEvent:null,
    hasEventSelected:false
}

export const CalendarWithEventState={
    statusLoading:null,
    eventos:[...events],
    activeEvent:null,
    hasEventSelected:false
}

export const CalendarWithActiveEventState={
    statusLoading:null,
    eventos:[...events],
    activeEvent:{...events[0]},
    hasEventSelected:true
}
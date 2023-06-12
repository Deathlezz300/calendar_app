import { CalendarSlice, clearData, onAddNewEvent, onDeleteEvent, onSetEvents, onUpdateNote, setActiveEvent } from "../../../store/Calendar/CalendarSlice";
import { CalendarInitialState,CalendarWithActiveEventState,CalendarWithEventState,events } from "../../fixtures/CalendarStates";

describe('Pruebas en calendarSlice',()=>{
    test('Debe de regresar el estado por defecto',()=>{
        const state=CalendarSlice.getInitialState();
        expect(state).toEqual(CalendarInitialState);
    });

    test('Debe de activar el event',()=>{
        const state=CalendarSlice.reducer(CalendarInitialState,setActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('Debe de cambiar los eventos',()=>{
        const state=CalendarSlice.reducer(CalendarInitialState,onSetEvents(events));
        expect(state.eventos).toEqual(events);
    });

    test('Debe agregar un evento',()=>{
        const newEvent={
            id:'3',
            start:new Date('2022-11-09 16:00:00'),
            end:new Date('2022-11-09 18:00:00'),
            title:'Nuevo evento',
            notes:'Evento agregado'
        };

        const state=CalendarSlice.reducer(CalendarWithEventState,onAddNewEvent(newEvent));
        expect(state.eventos).toEqual([...events,newEvent]);
    });

    test('Debe actualizar un evento',()=>{
        const UpdateNote={
            id:'2',
            start:new Date('2022-10-09 13:00:00'),
            end:new Date('2022-10-09 15:00:00'),
            title:'Cumpleaños de goku',
            notes:'Nota actualizada'
        };

        const state=CalendarSlice.reducer(CalendarWithActiveEventState,onUpdateNote(UpdateNote));
        expect(state.eventos).toContain(UpdateNote);
    });

    test('Debe eliminar un evento',()=>{
        const state=CalendarSlice.reducer(CalendarWithActiveEventState,onDeleteEvent());
        expect(state.activeEvent).toBe(null);
        expect(state.eventos).not.toContain(events[0]);
    });

    test('El logOut debe limpiar la data',()=>{
        const state=CalendarSlice.reducer(CalendarWithActiveEventState,clearData());
        expect(state).toEqual(CalendarInitialState);
    })

});


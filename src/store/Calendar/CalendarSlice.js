import { createSlice } from '@reduxjs/toolkit';
import {addHours} from 'date-fns';

const Tempevent={
    id: new Date().getTime(),
    title:'Cumpleaños del jefe',
    notes:'Hay que comprar el pastel',
    start:new Date(),
    end: addHours(new Date(),2),
    bgColor:'#fafafa',
    user:{
      _id:'123',
      name:'Alejandro'
    }
  };

export const CalendarSlice = createSlice({
    name: 'Calendar',
    initialState: {
     eventos:[Tempevent],
     activeEvent:null,
     user:{
      id:'123',
      name:'Alejandro'
     },
     hasEventSelected:false
    },
    reducers: {
         setActiveEvent:(state,{payload})=>{
            state.activeEvent=payload;
            state.hasEventSelected=true;
         },
         onAddNewEvent:(state,{payload})=>{
            state.eventos.push(payload);
            state.activeEvent=null;
         },
         onUpdateNote:(state,{payload})=>{
            state.eventos=state.eventos.map(note=>{
              if(note.id===payload.id){
                return payload;
              }

              return note;

            })
            state.activeEvent=null;
         },
         onDeleteEvent:(state)=>{
            state.eventos=state.eventos.filter(note=>{
              return note.id!=state.activeEvent.id;
            })
            state.activeEvent=null;
            state.hasEventSelected=false;
         }
    }
});


// Action creators are generated for each case reducer function
export const { setActiveEvent,onAddNewEvent,onUpdateNote,onDeleteEvent } = CalendarSlice.actions;
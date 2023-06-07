import { createSlice } from '@reduxjs/toolkit';


export const CalendarSlice = createSlice({
    name: 'Calendar',
    initialState: {
     statusLoading:null,
     eventos:[],
     activeEvent:null,
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
            state.statusLoading=null;
         },
         onUpdateNote:(state,{payload})=>{
            state.eventos=state.eventos.map(note=>{
              if(note.id===payload.id){
                return payload;
              }

              return note;

            })
            state.activeEvent=null;
            state.statusLoading=null;
         },
         onDeleteEvent:(state)=>{
            state.eventos=state.eventos.filter(note=>{
              return note.id!=state.activeEvent.id;
            })
            state.activeEvent=null;
            state.hasEventSelected=false;
            state.statusLoading=null;
         },
         onSetEvents:(state,{payload})=>{
           state.eventos=payload;
           state.statusLoading=null;
         },
         onChangeStatus:(state)=>{
           state.statusLoading='loading';
         },
         clearData:(state)=>{
            state.eventos=[];
            state.activeEvent=null;
            state.hasEventSelected=false;
            state.statusLoading=null;
         }

    }
});


// Action creators are generated for each case reducer function
export const { setActiveEvent,onAddNewEvent,onUpdateNote,onDeleteEvent,onSetEvents,onChangeStatus,clearData } = CalendarSlice.actions;
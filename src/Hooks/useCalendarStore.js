import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onUpdateNote, setActiveEvent } from "../store/Calendar/CalendarSlice";

export const useCalendarStore=()=>{

    const dispatch=useDispatch();

    const {eventos,activeEvent,user,hasEventSelected}=useSelector(state=>state.calendar);

    const onSetActiveEvent=(evento)=>{
        dispatch(setActiveEvent(evento));
    }

    const onAddNote=async(nota)=>{
        if(!nota.id){
            dispatch(onAddNewEvent({
                id:new Date().getTime(),
                user:user,
                ...nota
            }));
        }else{
            dispatch(onUpdateNote(nota));
        }
    }

    const DeleteEvent=()=>{
        dispatch(onDeleteEvent());
    }

    return {
        eventos,
        activeEvent,
        onSetActiveEvent,
        onAddNote,
        DeleteEvent,
        hasEventSelected
    }
}
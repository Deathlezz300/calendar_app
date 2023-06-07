import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { onAddNewEvent, onChangeStatus, onDeleteEvent, onSetEvents, onUpdateNote, setActiveEvent } from "../store/Calendar/CalendarSlice";
import calendarApi from "../Api/CalendarApi";
import { ConvertEventsToDateEvents } from "../helpers/ConvertEventosToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore=()=>{

    const dispatch=useDispatch();

    const {eventos,activeEvent,hasEventSelected}=useSelector(state=>state.calendar);

    const {user}=useSelector(state=>state.auth);

    const onSetActiveEvent=(evento)=>{
        dispatch(setActiveEvent(evento));
    }

    const onAddNote=async({id=null,title,notes,start,end})=>{
        dispatch(onChangeStatus());
        if(!id){
            try{

                const {data}=await calendarApi.post('/eventos/crear',{title,notes,start,end});

                dispatch(onAddNewEvent({
                    id:data.eventoGuardado.id,
                    user:user,
                    title,
                    notes,
                    start,
                    end
                }));

            }catch(error){
                console.log(error)
            }
        }else{
            try{
                const {data}=await calendarApi.put(`/eventos/actualizar/${id}`,{title,notes,start,end});
                if(data.ok){
                    dispatch(onUpdateNote({
                        ...data.evento,
                        user:{_id:data.evento.user,name:user.name}
                    }));
                }

            }catch(error){
                console.log(error);
                Swal.fire('Error al guardar',error.response.data?.message,'error');
            }
        }
    }

    const onLoadEventos=async()=>{
        dispatch(onChangeStatus());
        try{

            const {data}=await calendarApi.get('/eventos');
            let eventos=ConvertEventsToDateEvents(data.eventos);
            eventos=eventos.filter(evento1=>{
                return evento1.user._id==user.uid;
            });
            if(data.ok){
                dispatch(onSetEvents(eventos))
            }

        }catch(error){
            console.log(error);
        }
    }

    const DeleteEvent=async()=>{
        dispatch(onChangeStatus());
        try{
            const {data}=await calendarApi.delete(`/eventos/borrar/${activeEvent.id}`);
            if(data.ok){
                dispatch(onDeleteEvent());
            }

        }catch(error){
            console.log(error);
        }
    }

    return {
        eventos,
        activeEvent,
        onSetActiveEvent,
        onAddNote,
        DeleteEvent,
        hasEventSelected,
        onLoadEventos
    }
}
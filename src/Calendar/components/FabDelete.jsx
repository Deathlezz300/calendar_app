import { useCalendarStore } from "../../Hooks/useCalendarStore"

export const FabDelete = () => {

    const {DeleteEvent,activeEvent,hasEventSelected}=useCalendarStore();

    const onDeleteNote=()=>{
        if(activeEvent || activeEvent?.id){
            DeleteEvent();
        }
    }

  return (
    <button onClick={onDeleteNote} style={{display: hasEventSelected ? '' : 'none'}} className="btn btn-danger fab-danger">
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}

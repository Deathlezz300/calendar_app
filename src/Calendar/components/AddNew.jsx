import { useCalendarStore } from "../../Hooks/useCalendarStore";
import { useUIModal } from "../../Hooks/useUIModal"
import { addHours } from "date-fns";

export const AddNew = () => {

    const {onToogleModal}=useUIModal();

    const {onSetActiveEvent}=useCalendarStore();

    const onNewClick=()=>{
        onSetActiveEvent({
            title:'',
            notes:'',
            start:new Date(),
            end:addHours(new Date(),2)
          })
        onToogleModal();
    }


  return (
    <button onClick={onNewClick} className="btn btn-primary fab">
        <i className="fas fa-plus"></i>
    </button>
  )
}

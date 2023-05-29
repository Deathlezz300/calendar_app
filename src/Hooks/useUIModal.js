import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { ChangeModal, CloseModal } from "../store/Calendar/uiSlice";

export const useUIModal=()=>{

    const dispatch=useDispatch();

    const {showModal}=useSelector(state=>state.ui);


    const onToogleModal=()=>{
        return showModal ? dispatch(CloseModal()) : dispatch(ChangeModal()); 
    }

    return {
        showModal,
        onToogleModal
    }
}
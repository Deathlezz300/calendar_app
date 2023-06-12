import Modal from 'react-modal'
import { useState } from 'react';
import '../../assets/css/Modal.css'
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker,{registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useMemo } from 'react';
import { useUIModal } from '../../Hooks/useUIModal';
import { useEffect } from 'react';
import { useCalendarStore } from '../../Hooks/useCalendarStore';
import { getEnvVariables } from '../../helpers/getEnvVariables';

registerLocale('es',es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


if(getEnvVariables().MODE!='TEST'){
  Modal.setAppElement('#root');
}

export const CalendarModal = () => {


  const {showModal,onToogleModal}=useUIModal();

  const {activeEvent,onAddNote}=useCalendarStore();

  const [formSubmited, setformSubmited] = useState(false);

  const [formValues,setformValues]=useState({
    title:'',
    notes:'',
    start:new Date(),
    end:addHours(new Date(),2)
  })

  useEffect(() => {
    if(activeEvent){
      setformValues({
        ...activeEvent
      })
    }
  }, [activeEvent])
  
  
  const titleClass=useMemo(() => {
    if(!formSubmited) return '';

    return (formValues.title.length>0) ? 'is-valid' : 'is-invalid' 

  }, [formValues.title,formSubmited])

  const onCloseModal=()=>{
    onToogleModal();
  }
  
  const onInputChange=({target})=>{
    const {name,value}=target;
    setformValues({
        ...formValues,
        [name]:value
    });
  };

  const onDateChange=(evento,changing)=>{
    setformValues({
        ...formValues,
        [changing]:evento
    })
  }

  const onSubmit=(evento)=>{
    evento.preventDefault();
    setformSubmited(true);
    const diferencia=differenceInSeconds(formValues.end,formValues.start);
    if(isNaN(diferencia) || diferencia<0){
        Swal.fire('Fechas incorrectas','Revisar fechas ingresadas','error')
        return 'Error en fechas';
    }

    if(formValues.title.length<=0){
        return 'Error en titulo';
    }

    onAddNote(formValues);
    onToogleModal();
    setformSubmited(false);
    if(formValues.id){
      Swal.fire('Nota Actualizada','Actualizada correctamente','success');
    }else{
      Swal.fire('Nota creada','Agregada correctamente','success');
    }
  }

  return (
    <Modal isOpen={showModal} style={customStyles} onRequestClose={onCloseModal} className='modal' overlayClassName='modal-fondo' closeTimeoutMS={200}>
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker  timeCaption='Hora' locale='es' showTimeSelect selected={formValues.start} className='form-control' onChange={(evento)=>onDateChange(evento,'start')} dateFormat='Pp' />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker  timeCaption='Hora' locale='es' showTimeSelect selected={formValues.end} minDate={formValues.start} className='form-control' onChange={(evento)=>onDateChange(evento,'end')} dateFormat='Pp'/>
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Título del evento"
                    name="title"
                    value={formValues.title}
                    autoComplete="off"
                    onChange={onInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
